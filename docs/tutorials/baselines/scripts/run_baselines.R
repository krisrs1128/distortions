#!/usr/bin/env Rscript
# Run baseline algorithms (MDBD perturbation score and Sleepwalk) on saved Swiss Roll outputs.
# Usage:
#   Rscript run_baselines.R --noise 0.5 --data-dir ../data

args <- commandArgs(trailingOnly = TRUE)
parse_args <- function(args) {
  out <- list(noise = NULL, data_dir = "../data")
  i <- 1
  while (i <= length(args)) {
    a <- args[i]
    if (a %in% c("--noise")) { out$noise <- args[i+1]; i <- i + 2 }
    else if (a %in% c("--data-dir")) { out$data_dir <- args[i+1]; i <- i + 2 }
    else { stop(paste("Unknown arg", a)) }
  }
  if (is.null(out$noise)) stop("--noise is required")
  out
}

opts <- parse_args(args)
data_dir <- opts$data_dir
noise <- opts$noise

library(tidyverse)
library(fs)
library(neMDBD)
library(sleepwalk)

data_csv <- path(data_dir, paste0("swiss_noise_", noise, ".csv"))
emb_csv  <- path(data_dir, paste0("swiss_noise_", noise, "_embedding.csv"))

message("Reading data from: ", as.character(data_csv))
X <- as.matrix(read_csv(data_csv)[, 1:3])
Y <- as.matrix(read_csv(emb_csv)[, 1:2])

# compute perturbation score (MDBD)
message(sprintf("Computing perturbation score for noise=%s", noise))
pscore_val <- perturbation_score_compute(X, Y, 100, approx = 2)

out_pscore <- tibble(score = pscore_val)
pscore_path <- path(data_dir, paste0("pscore_", noise, ".csv"))
write_csv(out_pscore, pscore_path)
message("Wrote pscore to: ", as.character(pscore_path))

# produce a Sleepwalk HTML file (embedding vs original distances)
html_file <- path(data_dir, paste0("swissroll_noise_", noise, ".html"))
message("Saving sleepwalk html to: ", as.character(html_file))
sleepwalk(Y, X, saveToFile = as.character(html_file))