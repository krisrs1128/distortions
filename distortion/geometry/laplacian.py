# LICENSE: Simplified BSD https://github.com/mmp2/megaman/blob/master/LICENSE
from __future__ import division
import numpy as np
from scipy.sparse import isspmatrix
from sklearn.utils.validation import check_array

from .utils import RegisterSubclasses


def compute_laplacian_matrix(affinity_matrix, method='auto', **kwargs):
    """
    Compute a Laplacian matrix with the given method.
    
    This is the main interface function for computing Laplacian matrices from
    affinity matrices. It automatically selects the geometric Laplacian method
    if method='auto' is specified.

    Parameters
    ----------
    affinity_matrix : array-like or sparse matrix, shape (n_samples, n_samples)
        The input affinity matrix containing pairwise affinity values.
    method : str, default='auto'
        The method to use for Laplacian computation. Options include 'auto',
        'geometric', 'unnormalized', 'randomwalk', 'symmetricnormalized', 
        'renormalized'. When 'auto', defaults to 'geometric'.
    **kwargs : keyword arguments
        Additional arguments passed to the specific Laplacian method.

    Returns
    -------
    laplacian_matrix : array-like or sparse matrix, shape (n_samples, n_samples)
        The computed Laplacian matrix.
    """
    if method == 'auto':
        method = 'geometric'
    return Laplacian.init(method, **kwargs).laplacian_matrix(affinity_matrix)


def laplacian_methods():
    """Return the list of valid laplacian methods"""
    return ['auto'] + list(Laplacian.methods())


class Laplacian(RegisterSubclasses):
    """
    Base class for computing Laplacian matrices.
    
    This is an abstract base class that defines the interface for all Laplacian
    matrix computation methods. Subclasses must implement the _compute_laplacian
    method to provide specific Laplacian variants (unnormalized, geometric,
    random walk, symmetric normalized, etc.).
    
    Parameters
    ----------
    symmetrize_input : bool, default=True
        Whether to symmetrize the input affinity matrix before computing
        the Laplacian.
    scaling_epps : float, optional
        Scaling parameter for the Laplacian matrix. If provided and > 0,
        the Laplacian is scaled by 4 / (scaling_epps^2).
    full_output : bool, default=False
        If True, return tuple (laplacian, symmetric_laplacian, degrees).
        If False, return only the laplacian matrix.

    Notes
    -----
    The methods here all return the negative of the standard
    Laplacian definition.
    """
    symmetric = False

    def __init__(self, symmetrize_input=True,
                 scaling_epps=None, full_output=False):
        self.symmetrize_input = symmetrize_input
        self.scaling_epps = scaling_epps
        self.full_output = full_output

    @staticmethod
    def _symmetrize(A):
        """
        Symmetrize a matrix by averaging with its transpose.

        Parameters
        ----------
        A : array-like or sparse matrix, shape (n_samples, n_samples)
            The input matrix to symmetrize.

        Returns
        -------
        symmetric_matrix : array-like or sparse matrix, shape (n_samples, n_samples)
            
        Notes
        -----
        TODO: make this more efficient?
        """
        return 0.5 * (A + A.T)

    @classmethod
    def symmetric_methods(cls):
        """
        Generator yielding names of symmetric Laplacian methods.
        
        Returns method names for Laplacian variants that produce
        symmetric matrices.

        Yields
        ------
        method : str
            Name of a symmetric Laplacian method.
        """
        for method in cls.methods():
            if cls.get_method(method).symmetric:
                yield method

    @classmethod
    def asymmetric_methods(cls):
        """
        Generator yielding names of asymmetric Laplacian methods.
        
        Returns method names for Laplacian variants that produce
        asymmetric matrices.

        Yields
        ------
        method : str
            Name of an asymmetric Laplacian method.
        """
        for method in cls.methods():
            if not cls.get_method(method).symmetric:
                yield method

    def laplacian_matrix(self, affinity_matrix):
        """
        Compute a Laplacian matrix from an affinity matrix.

        Parameters
        ----------
        affinity_matrix : array-like or sparse matrix, shape (n_samples, n_samples)
            The input affinity matrix containing pairwise affinity values.

        Returns
        -------
        laplacian_matrix : array-like or sparse matrix, shape (n_samples, n_samples)
            The computed Laplacian matrix.
        laplacian_symmetric : array-like or sparse matrix, optional
            The symmetric version of the Laplacian (returned if full_output=True).
        degrees : array, shape (n_samples,), optional  
            The degree vector (returned if full_output=True).
        """
        affinity_matrix = check_array(affinity_matrix, copy=False, dtype=float,
                                      accept_sparse=['csr', 'csc', 'coo'])
        if self.symmetrize_input:
            affinity_matrix = self._symmetrize(affinity_matrix)

        if isspmatrix(affinity_matrix):
            affinity_matrix = affinity_matrix.tocoo()
        else:
            affinity_matrix = affinity_matrix.copy()

        lap, lapsym, w = self._compute_laplacian(affinity_matrix)

        if self.scaling_epps is not None and self.scaling_epps > 0.:
            if isspmatrix(lap):
                lap.data *= 4 / (self.scaling_epps ** 2)
            else:
                lap *= 4 / (self.scaling_epps ** 2)

        if self.full_output:
            return lap, lapsym, w
        else:
            return lap

    def _compute_laplacian(self, lap):
        raise NotImplementedError()


class UnNormalizedLaplacian(Laplacian):
    """
    This class computes the unnormalized Laplacian matrix:
    """
    name = 'unnormalized'
    symmetric = True

    def _compute_laplacian(self, lap):
        """
        Compute the unnormalized Laplacian matrix.


        Parameters
        ----------
        lap : array-like or sparse matrix, shape (n_samples, n_samples)
            The input affinity matrix.

        Returns
        -------
        laplacian : array-like or sparse matrix, shape (n_samples, n_samples)
            The unnormalized Laplacian matrix.
        laplacian_symmetric : array-like or sparse matrix, shape (n_samples, n_samples)
            Same as laplacian (always symmetric for unnormalized case).
        degrees : array, shape (n_samples,)
            The degree vector.
        """
        w = _degree(lap)
        _subtract_from_diagonal(lap, w)
        return lap, lap, w


class GeometricLaplacian(Laplacian):
    """
    This class computes the geometric Laplacian matrix computation.
    """
    name = 'geometric'
    symmetric = False

    def _compute_laplacian(self, lap):
        """
        Compute the geometric Laplacian matrix.

        Parameters
        ----------
        lap : array-like or sparse matrix, shape (n_samples, n_samples)
            The input affinity matrix.

        Returns
        -------
        laplacian : array-like or sparse matrix, shape (n_samples, n_samples)
            The geometric Laplacian matrix (asymmetric).
        laplacian_symmetric : array-like or sparse matrix, shape (n_samples, n_samples)
            The symmetric version of the Laplacian.
        degrees : array, shape (n_samples,)
            The degree vector.
        """
        _normalize_laplacian(lap, symmetric=True)
        lapsym = lap.copy()

        w, nonzero = _normalize_laplacian(lap, symmetric=False)
        _subtract_from_diagonal(lap, nonzero)

        return lap, lapsym, w


class RandomWalkLaplacian(Laplacian):
    """
    Random walk Laplacian matrix computation.
    """
    name = 'randomwalk'
    symmetric = False

    def _compute_laplacian(self, lap):
        """
        Compute the random walk Laplacian matrix.

        Parameters
        ----------
        lap : array-like or sparse matrix, shape (n_samples, n_samples)
            The input affinity matrix.

        Returns
        -------
        laplacian : array-like or sparse matrix, shape (n_samples, n_samples)
            The random walk Laplacian matrix (asymmetric).
        laplacian_symmetric : array-like or sparse matrix, shape (n_samples, n_samples)
            The symmetric version before row normalization.
        degrees : array, shape (n_samples,)
            The degree vector.
        """
        lapsym = lap.copy()
        w, nonzero = _normalize_laplacian(lap, symmetric=False)
        _subtract_from_diagonal(lap, nonzero)
        return lap, lapsym, w


class SymmetricNormalizedLaplacian(Laplacian):
    """
    Symmetric normalized Laplacian matrix computation.
    """
    name = 'symmetricnormalized'
    symmetric = True

    def _compute_laplacian(self, lap):
        """
        Compute the symmetric normalized Laplacian matrix.

        Parameters
        ----------
        lap : array-like or sparse matrix, shape (n_samples, n_samples)
            The input affinity matrix.

        Returns
        -------
        laplacian : array-like or sparse matrix, shape (n_samples, n_samples)
            The symmetric normalized Laplacian matrix.
        laplacian_symmetric : array-like or sparse matrix, shape (n_samples, n_samples)
            Same as laplacian (always symmetric for this normalization).
        degrees : array, shape (n_samples,)
            The degree vector raised to power 0.5.
        """
        w, nonzero = _normalize_laplacian(lap, symmetric=True, degree_exp=0.5)
        _subtract_from_diagonal(lap, nonzero)
        return lap, lap, w


class RenormalizedLaplacian(Laplacian):
    """
    This class computes a generalized renormalized Laplacian matrix with
    a configurable renormalization exponent. 
    
    Parameters
    ----------
    symmetrize_input : bool, default=True
        Whether to symmetrize the input affinity matrix.
    scaling_epps : float, optional
        Scaling parameter for the Laplacian matrix.
    full_output : bool, default=False
        If True, return tuple (laplacian, symmetric_laplacian, degrees).
    renormalization_exponent : float, default=1
        The exponent for degree-based renormalization.
    """
    name = 'renormalized'
    symmetric = False

    def __init__(self, symmetrize_input=True,
                 scaling_epps=None,
                 full_output=False,
                 renormalization_exponent=1):
        self.symmetrize_input = symmetrize_input
        self.scaling_epps = scaling_epps
        self.full_output = full_output
        self.renormalization_exponent = renormalization_exponent

    def _compute_laplacian(self, lap):
        """
        Compute the renormalized Laplacian matrix.
        
        Applies renormalization with the specified exponent, then follows
        the geometric Laplacian procedure.

        Parameters
        ----------
        lap : array-like or sparse matrix, shape (n_samples, n_samples)
            The input affinity matrix.

        Returns
        -------
        laplacian : array-like or sparse matrix, shape (n_samples, n_samples)
            The renormalized Laplacian matrix (asymmetric).
        laplacian_symmetric : array-like or sparse matrix, shape (n_samples, n_samples)
            The symmetric version after initial renormalization.
        degrees : array, shape (n_samples,)
            The degree vector.
        """
        _normalize_laplacian(lap, symmetric=True,
                             degree_exp=self.renormalization_exponent)
        lapsym = lap.copy()
        w, nonzero = _normalize_laplacian(lap, symmetric=False)
        _subtract_from_diagonal(lap, nonzero)

        return lap, lapsym, w


# Utility routines: these operate in-place and assume either coo matrix or
# dense array

def _degree(lap):
    """
    Compute the degree vector of a graph from its adjacency/affinity matrix.

    Parameters
    ----------
    lap : array-like or sparse matrix, shape (n_samples, n_samples)
        The adjacency or affinity matrix.

    Returns
    -------
    degrees : array, shape (n_samples,)
        The degree vector where degrees[i] is the sum of row i.
    """
    return np.asarray(lap.sum(1)).squeeze()


def _divide_along_rows(lap, vals):
    """
    Divide each row of a matrix by corresponding values vals .

    Parameters
    ----------
    lap : array-like or sparse matrix, shape (n_samples, n_samples)
        The matrix to divide (modified in-place).
    vals : array, shape (n_samples,)
        The values to divide each row by.
    """
    if isspmatrix(lap):
        lap.data /= vals[lap.row]
    else:
        lap /= vals[:, np.newaxis]


def _divide_along_cols(lap, vals):
    """
    Divide each column of a matrix by corresponding values

    Parameters
    ----------
    lap : array-like or sparse matrix, shape (n_samples, n_samples)
        The matrix to divide (modified in-place).
    vals : array, shape (n_samples,)
        The values to divide each column by.
    """
    if isspmatrix(lap):
        lap.data /= vals[lap.col]
    else:
        lap /= vals


def _normalize_laplacian(lap, symmetric=False, degree_exp=None):
    """
    Apply degree-based normalization to a matrix.

    Parameters
    ----------
    lap : array-like or sparse matrix, shape (n_samples, n_samples)
        The matrix to normalize (modified in-place).
    symmetric : bool, default=False
        If True, apply symmetric normalization (divide both rows and columns).
        If False, apply asymmetric normalization (divide rows only).
    degree_exp : float, optional
        Exponent to raise the degree vector to before normalization.
        If None, uses degree_exp=1.

    Returns
    -------
    degrees : array, shape (n_samples,)
        The degree vector (possibly raised to degree_exp power).
    nonzero_degrees : array, shape (n_samples,)
        Boolean array indicating which nodes have non-zero degree.
    """
    w = _degree(lap)
    w_nonzero = (w != 0)
    w[~w_nonzero] = 1

    if degree_exp is not None:
        w **= degree_exp

    if symmetric:
        _divide_along_rows(lap, w)
        _divide_along_cols(lap, w)
    else:
        _divide_along_rows(lap, w)

    return w, w_nonzero


def _subtract_from_diagonal(lap, vals):
    """
    Subtract values from the diagonal of a matrix

    Parameters
    ----------
    lap : array-like or sparse matrix, shape (n_samples, n_samples)
        The matrix to modify (modified in-place).
    vals : array, shape (n_samples,)
        The values to subtract from each diagonal element.
    """
    if isspmatrix(lap):
        lap.data[lap.row == lap.col] -= vals
    else:
        lap.flat[::lap.shape[0] + 1] -= vals
