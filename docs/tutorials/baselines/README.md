Swiss Roll tutorial: scripted workflow

This folder now contains a small Snakemake workflow to generate noisy Swiss Roll datasets and run baseline analyses (MDBD perturbation score and Sleepwalk).

Files added:

- `scripts/generate_noisy_swiss_roll.py`: Python script that generates noisy data and computes a t-SNE embedding. Call with `--noise` and `--data-dir`.
- `scripts/run_baselines.R`: R script that reads the generated files, computes the perturbation score using `neMDBD::perturbation_score_compute`, and saves a Sleepwalk HTML visualization.
- `Snakefile`: Snakemake workflow that loops over noise values [0, 0.25, 0.5, 0.75, 1.0] and runs the two steps.

```bash
cd distortions/docs/tutorials/baselines
snakemake -f --cores all
```

Notes:
- The R step may be slow for high sample counts or a large number of permutations inside `perturbation_score_compute`.
- The scripts write to `distortions/docs/tutorials/data/` by default.
