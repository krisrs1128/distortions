# LICENSE: Simplified BSD https://github.com/mmp2/megaman/blob/master/LICENSE

from __future__ import division
import numpy as np
from scipy.sparse import isspmatrix
from sklearn.utils.validation import check_array

from .utils import RegisterSubclasses


def compute_affinity_matrix(adjacency_matrix, method='auto', **kwargs):
    """
    Compute an affinity matrix with the given method.
    
    This is the main interface function for computing affinity matrices from
    adjacency matrices. It automatically selects the Gaussian kernel method
    if method='auto' is specified.

    Parameters
    ----------
    adjacency_matrix : array-like or sparse matrix, shape (n_samples, n_samples)
        The input adjacency matrix containing distances or connectivity information.
    method : str, default='auto'
        The method to use for affinity computation. Options include 'auto',
        'gaussian', etc. When 'auto', defaults to 'gaussian'.
    **kwargs : keyword arguments
        Additional arguments passed to the specific affinity method.

    Returns
    -------
    affinity_matrix : array-like or sparse matrix, shape (n_samples, n_samples)
        The computed affinity matrix with pairwise affinity values.
    """
    if method == 'auto':
        method = 'gaussian'
    return Affinity.init(method, **kwargs).affinity_matrix(adjacency_matrix)


def affinity_methods():
    """
    Return the list of valid affinity methods.
    
    This function returns all available affinity computation methods,
    including the 'auto' method which automatically selects an appropriate
    algorithm.

    Returns
    -------
    methods : list of str
        List of available affinity computation methods.
    """
    return ['auto'] + list(Affinity.methods())


class Affinity(RegisterSubclasses):
    """
    Base class for computing affinity matrices.
    
    Parameters
    ----------
    radius : float
        The radius parameter for the affinity computation. 
    symmetrize : bool, default=True
        Whether to symmetrize the resulting affinity matrix. 
    """
    def __init__(self, radius=None, symmetrize=True):
        if radius is None:
            raise ValueError("must specify radius for affinity matrix")
        self.radius = radius
        self.symmetrize = symmetrize

    def affinity_matrix(self, adjacency_matrix):
        """
        Compute an affinity matrix from an adjacency matrix.
    
        Parameters
        ----------
        adjacency_matrix : array-like or sparse matrix, shape (n_samples, n_samples)
            The input adjacency matrix containing distance or connectivity data.

        Returns
        -------
        affinity_matrix : array-like or sparse matrix, shape (n_samples, n_samples)
            The computed affinity matrix with kernel-transformed values.
        """
        raise NotImplementedError()


class GaussianAffinity(Affinity):
    """
    Gaussian kernel affinity matrix computation.
    
    This class implements affinity matrix computation using the Gaussian (RBF)
    kernel
    """
    name = "gaussian"

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
            The symmetrized matrix with A_sym[i,j] = A_sym[j,i].
            
        Notes
        -----
        TODO: make this more efficient?
        Also, need to maintain explicit zeros!
        """
        # TODO: make this more efficient?
        # Also, need to maintain explicit zeros!
        return 0.5 * (A + A.T)

    def affinity_matrix(self, adjacency_matrix):
        """
        Compute affinity matrix using Gaussian kernel transformation.
        
        This method transforms an adjacency matrix containing distances into
        an affinity matrix using the Gaussian (RBF) kernel. 

        Parameters
        ----------
        adjacency_matrix : array-like or sparse matrix, shape (n_samples, n_samples)
            The input adjacency matrix containing distance values between points.

        Returns
        -------
        affinity_matrix : array-like or sparse matrix, shape (n_samples, n_samples)
            The computed affinity matrix with Gaussian kernel-transformed values.
        """
        A = check_array(adjacency_matrix, dtype=float, copy=True,
                        accept_sparse=['csr', 'csc', 'coo'])

        if isspmatrix(A):
            data = A.data
        else:
            data = A

        # in-place computation of
        # data = np.exp(-(data / radius) ** 2)
        data **= 2
        data /= -self.radius ** 2
        np.exp(data, out=data)

        if self.symmetrize:
            A = self._symmetrize(A)

        # for sparse, need a true zero on the diagonal
        # TODO: make this more efficient?
        if isspmatrix(A):
            A.setdiag(1)

        return A
