import numpy as np

def swiss_roll_prep(points, a, b):
    X = points[:, 0]
    Y = points[:, 1]
    length_z = 10
    t = 1.5 * np.pi * (X / a * 2 + 1)
    y = Y / b * length_z
    x = t * np.cos(t)
    z = t * np.sin(t)
    data = np.vstack((x, y, z))
    return data.T, t

"""Return Non-Uniform Swiss Roll Dataset
a: length of swiss roll in angular direction
b: length of swiss roll in z direction
sigma: standard deviation of normal distributions
n: number of points, but not sample size since have hole, larger than true sampled points
K: number of centers of normal distributions, default=2
grid: if True, the centers would be aligned in a grid. Otherwise, they would be placed randomly.
dim: want to have 'dim' dimension square matrix with other entires zero. default dim=20
plot: whether want to show plot, default not show
"""
def non_uniform_swiss(a: float, b: float, sigma: float, n: int, K: int = 2, dim: int = 20) -> np.ndarray:
    mu_Xs = np.random.uniform(0, a, K)
    mu_Ys = np.random.uniform(0, b, K)
    mu = np.vstack((mu_Xs, mu_Ys)).T

    pi_list = np.full(K, 1/K)
    groups = []
    for i in range(K):
        group = np.random.multivariate_normal(mu[i], sigma**2 * np.eye(2), round(pi_list[i]*n))
        group = group[(group[:, 0] >= 0) & (group[:, 0] <= a) & (group[:, 1] >= 0) & (group[:, 1] <= b)]
        groups.append(group)

    data = np.empty((0, 3))
    t = np.empty((0))
    for group in groups:
        p, t_ = swiss_roll_prep(group, a, b)
        data = np.vstack((data, p))
        t = np.concatenate([t, t_])
    m = len(data)

    if dim > 3:
        data = np.hstack((data, np.zeros((m, dim - 3))))
    return data, t