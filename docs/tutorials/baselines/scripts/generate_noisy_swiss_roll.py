#!/usr/bin/env python3
"""
Generate noisy Swiss Roll datasets and compute t-SNE embeddings.

Outputs (written to the provided data directory):
 - swiss_noise_{noise}.csv
 - swiss_noise_{noise}_embedding.csv

Usage:
  python generate_noisy_swiss_roll.py --noise 0.5 --data-dir ../data
"""
import argparse
from pathlib import Path
import numpy as np
import pandas as pd
from sklearn.datasets import make_swiss_roll
from sklearn.manifold import TSNE


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--noise", type=float, required=True, help="noise magnitude to add to the Swiss roll")
    p.add_argument("--n-samples", type=int, default=1500)
    p.add_argument("--random-state", type=int, default=42)
    p.add_argument("--perplexity", type=float, default=100.0)
    p.add_argument("--data-dir", type=str, default="../data")
    args = p.parse_args()

    outdir = Path(args.data_dir)
    outdir.mkdir(parents=True, exist_ok=True)

    # generate base swiss roll (noiseless in make_swiss_roll call) then add Gaussian noise
    X, t = make_swiss_roll(args.n_samples, noise=0.0, random_state=args.random_state)
    rng = np.random.RandomState(args.random_state)
    X_noisy = X + args.noise * rng.normal(size=X.shape)

    # compute t-SNE embedding
    tsne = TSNE(n_components=2, perplexity=args.perplexity, random_state=args.random_state, learning_rate="auto")
    X_emb = tsne.fit_transform(X_noisy)

    noise_str = str(args.noise)
    # save CSVs
    pd.DataFrame(X_noisy).to_csv(outdir / f"swiss_noise_{noise_str}.csv", index=False)
    pd.DataFrame(X_emb).to_csv(outdir / f"swiss_noise_{noise_str}_embedding.csv", index=False)

    print(f"Wrote: {outdir / f'swiss_noise_{noise_str}.csv'}")
    print(f"Wrote: {outdir / f'swiss_noise_{noise_str}_embedding.csv'}")


if __name__ == "__main__":
    main()
