import numpy as np
from distortions.geometry import Geometry, local_distortions
import pandas as pd
from itertools import product
from copy import deepcopy

def expand_parameters(parameters: dict[list]) -> pd.DataFrame:
    keys = list(parameters.keys())
    values = list(parameters.values())
    combinations = product(*values)
    return pd.DataFrame(combinations, columns=keys)


def expand_geoms(geom: Geometry, params: dict[list]):
    geoms = []
    expanded = expand_parameters(params)
    for i in range(len(expanded)):
        gi = deepcopy(geom)
        if "radius" in expanded.columns:
            gi.affinity_kwds["radius"] = expanded.radius[i]

        if "scaling_epps" in expanded.columns:
            gi.laplacian_kwds["scaling_epps"] = expanded.scaling_epps[i]

        geoms.append(gi)
    return geoms, expanded


def metric_sensitivity(geoms: list[Geometry], embedding: np.array, data: pd.DataFrame) -> np.array:
    Hvv, Hs = [], []
    for g in geoms:
        _, Hvv_i, Hs_i = local_distortions(embedding, data, g)
        Hvv.append(Hvv_i)
        Hs.append(Hs_i)
    return np.stack(Hvv), np.stack(Hs)