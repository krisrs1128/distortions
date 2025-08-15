# LICENSE: Simplified BSD https://github.com/mmp2/megaman/blob/master/LICENSE

import numpy as np
from sklearn import neighbors
from scipy import sparse
from .utils import RegisterSubclasses


def compute_adjacency_matrix(X, method='auto', **kwargs):
    """
    Compute an adjacency matrix with the given method.
    
    This is the main interface function for computing adjacency matrices.
    It automatically selects an appropriate algorithm based on data size
    if method='auto' is specified.

    Parameters
    ----------
    X : array-like, shape (n_samples, n_features)
        The input data points for which to compute the adjacency matrix.
    method : str, default='auto'
        The method to use for adjacency computation. Options include 'auto',
        'brute', 'kd_tree', 'ball_tree', 'pyflann', etc.
    **kwargs : keyword arguments
        Additional arguments passed to the specific adjacency method.

    Returns
    -------
    adjacency_matrix : sparse matrix, shape (n_samples, n_samples)
        The computed adjacency matrix as a sparse matrix.
    """
    if method == 'auto':
        if X.shape[0] > 10000:
            method = 'cyflann'
        else:
            method = 'kd_tree'
    return Adjacency.init(method, **kwargs).adjacency_graph(X.astype('float'))


def adjacency_methods():
    """Return the list of valid adjacency methods"""
    return ['auto'] + list(Adjacency.methods())


class Adjacency(RegisterSubclasses):
    """
    Base class for computing adjacency matrices.
    
    Parameters
    ----------
    radius : float, optional
        The radius for radius-based adjacency computation. Cannot be used
        together with n_neighbors.
    n_neighbors : int, optional
        The number of neighbors for k-NN adjacency computation. Cannot be used
        together with radius.
    mode : str, default='distance'
        The type of values to store in the adjacency matrix. Options include
        'distance' and 'connectivity'.
    """
    def __init__(self, radius=None, n_neighbors=None, mode='distance'):
        self.radius = radius
        self.n_neighbors = n_neighbors
        self.mode = mode

        if (radius is None) == (n_neighbors is None):
           raise ValueError("Must specify either radius or n_neighbors, "
                            "but not both.")

    def adjacency_graph(self, X):
        """
        Compute an adjacency graph using either k-nearest neighbors or radius-based method.
        
        This method automatically selects between k-nearest neighbors or radius-based
        adjacency computation based on the instance configuration. Either n_neighbors
        or radius must be specified during initialization.

        Parameters
        ----------
        X : array-like, shape (n_samples, n_features)
            The input data points for which to compute the adjacency graph.

        Returns
        -------
        adjacency_matrix : sparse matrix, shape (n_samples, n_samples)
            The computed adjacency graph as a sparse matrix containing 
            pairwise adjacency values.
        """
        if self.n_neighbors is not None:
            return self.knn_adjacency(X)
        elif self.radius is not None:
            return self.radius_adjacency(X)

    def knn_adjacency(self, X):
        """
        Compute the k-nearest neighbors adjacency graph.
        
        This method computes an adjacency graph by connecting each point to its
        k nearest neighbors. The number of neighbors is specified by the 
        n_neighbors parameter during initialization.

        Parameters
        ----------
        X : array-like, shape (n_samples, n_features)
            The input data points for which to compute the k-NN adjacency graph.

        Returns
        -------
        adjacency_matrix : sparse matrix, shape (n_samples, n_samples)
            The k-NN adjacency graph as a sparse matrix. The matrix contains
            distances or connectivity values depending on the mode parameter.
        """
        raise NotImplementedError()

    def radius_adjacency(self, X):
        """
        Compute the radius-based adjacency graph.
        
        This method computes an adjacency graph by connecting points that are
        within a specified radius of each other. The radius is specified by
        the radius parameter during initialization.

        Parameters
        ----------
        X : array-like, shape (n_samples, n_features)
            The input data points for which to compute the radius adjacency graph.

        Returns
        -------
        adjacency_matrix : sparse matrix, shape (n_samples, n_samples)
            The radius adjacency graph as a sparse matrix. The matrix contains
            distances or connectivity values depending on the mode parameter.
        """
        raise NotImplementedError()


class BruteForceAdjacency(Adjacency):
    """
    Brute force adjacency matrix computation. This class implements adjacency matrix computation using brute force
    search.
    """
    name = 'brute'

    def radius_adjacency(self, X):
        """
        Compute radius-based adjacency using brute force search.

        Parameters
        ----------
        X : array-like, shape (n_samples, n_features)
            The input data points.

        Returns
        -------
        adjacency_matrix : sparse matrix, shape (n_samples, n_samples)
            The radius-based adjacency matrix.
        """
        model = neighbors.NearestNeighbors(algorithm=self.name).fit(X)
        # pass X so that diagonal will have explicit zeros
        return model.radius_neighbors_graph(X, radius=self.radius,
                                            mode=self.mode)

    def knn_adjacency(self, X):
        """
        Compute k-nearest neighbors adjacency using brute force search.

        Parameters
        ----------
        X : array-like, shape (n_samples, n_features)
            The input data points.

        Returns
        -------
        adjacency_matrix : sparse matrix, shape (n_samples, n_samples)
            The k-NN adjacency matrix.
        """
        model = neighbors.NearestNeighbors(algorithm=self.name).fit(X)
        # pass X so that diagonal will have explicit zeros
        return model.kneighbors_graph(X, n_neighbors=self.n_neighbors,
                                      mode=self.mode)


class KDTreeAdjacency(BruteForceAdjacency):
    """
    KD-Tree based adjacency matrix computation.
    
    This class implements adjacency matrix computation using KD-Tree
    data structure for efficient nearest neighbor search. 
    """
    name = 'kd_tree'


class BallTreeAdjacency(BruteForceAdjacency):
    """
    Ball Tree based adjacency matrix computation.
    
    This class implements adjacency matrix computation using Ball Tree
    data structure for efficient nearest neighbor search.
    """
    name = 'ball_tree'



class PyFLANNAdjacency(Adjacency):
    """
    FLANN (Fast Library for Approximate Nearest Neighbors) based adjacency computation.
    
    This class implements adjacency matrix computation using the FLANN library.
    
    Parameters
    ----------
    radius : float, optional
        The radius for radius-based adjacency computation.
    n_neighbors : int, optional
        The number of neighbors for k-NN adjacency computation.
    flann_index : pyflann.FLANN, optional
        Pre-built FLANN index. If None, a new index will be created.
    algorithm : str, default='kmeans'
        The FLANN algorithm to use for indexing.
    target_precision : float, default=0.9
        The target precision for approximate search.
    pyflann_kwds : dict, optional
        Additional keyword arguments passed to pyflann.FLANN.
    """
    name = 'pyflann'

    def __init__(self, radius=None, n_neighbors=None, flann_index=None,
                 algorithm='kmeans', target_precision=0.9, pyflann_kwds=None):
        if not PYFLANN_LOADED:
            raise ValueError("pyflann must be installed "
                             "to use method='pyflann'")
        self.flann_index = flann_index
        self.algorithm = algorithm
        self.target_precision = target_precision
        self.pyflann_kwds = pyflann_kwds
        super(PyFLANNAdjacency, self).__init__(radius=radius,
                                               n_neighbors=n_neighbors,
                                               mode='distance')

    def _get_built_index(self, X):
        """
        Build or retrieve a FLANN index for the input data.
        
        This method either creates a new FLANN index or uses a pre-existing one
        to enable efficient nearest neighbor searches.

        Parameters
        ----------
        X : array-like, shape (n_samples, n_features)
            The input data for which to build the index.

        Returns
        -------
        flann_index : pyflann.FLANN
            The built FLANN index ready for nearest neighbor queries.
        """
        if self.flann_index is None:
            pyindex = pyf.FLANN(**(self.pyflann_kwds or {}))
        else:
            pyindex = self.flann_index

        flparams = pyindex.build_index(X, algorithm=self.algorithm,
                                       target_precision=self.target_precision)
        return pyindex

    def radius_adjacency(self, X):
        """
        Compute radius-based adjacency using FLANN approximate search.
        
        Uses the FLANN library to efficiently find all neighbors within
        the specified radius for each point. 

        Parameters
        ----------
        X : array-like, shape (n_samples, n_features)
            The input data points.

        Returns
        -------
        adjacency_matrix : sparse.coo_matrix, shape (n_samples, n_samples)
            The radius-based adjacency matrix in COO (coordinate) format.
        """
        flindex = self._get_built_index(X)

        n_samples, n_features = X.shape
        X = np.require(X, requirements = ['A', 'C']) # required for FLANN

        graph_i = []
        graph_j = []
        graph_data = []
        for i in range(n_samples):
            jj, dd = flindex.nn_radius(X[i], self.radius ** 2)
            graph_data.append(dd)
            graph_j.append(jj)
            graph_i.append(i*np.ones(jj.shape, dtype=int))

        graph_data = np.concatenate(graph_data)
        graph_i = np.concatenate(graph_i)
        graph_j = np.concatenate(graph_j)
        return sparse.coo_matrix((np.sqrt(graph_data), (graph_i, graph_j)),
                                 shape=(n_samples, n_samples))

    def knn_adjacency(self, X):
        """
        Compute k-nearest neighbors adjacency using FLANN approximate search.
        
        Parameters
        ----------
        X : array-like, shape (n_samples, n_features)
            The input data points.

        Returns
        -------
        adjacency_matrix : sparse.csr_matrix, shape (n_samples, n_samples)
            The k-NN adjacency matrix in CSR (compressed sparse row) format.
        """
        n_samples = X.shape[0]
        flindex = self._get_built_index(X)
        A_ind, A_data = flindex.nn_index(X, self.n_neighbors)
        A_ind = np.ravel(A_ind)
        A_data = np.sqrt(np.ravel(A_data))  # FLANN returns square distances
        A_indptr = self.n_neighbors * np.arange(n_samples + 1)
        return sparse.csr_matrix((A_data, A_ind, A_indptr),
                                 shape=(n_samples, n_samples))
