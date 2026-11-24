---
name: validating-benchmarks
description: Checks whether a measured speedup or regression supports a performance claim or a choice between implementations.
---

State the claim with its workload and unit. Read the timer boundaries: did both sides finish the same useful work inside them? Count completed outputs, errors and retries, and check output correctness. An export that returns before its writes finish is not a faster export. For a requested ballpark, one run with these checks is enough; label it a single observation.

For a comparison, match inputs, concurrency, build settings and cache conditions to the intended use. Alternate the two versions for at least five runs per side. Report medians, ranges and sample counts; if the result changes sign between runs, investigate the variation before recommending a winner. Profile separately from timed runs to identify the limiter, including the load generator. Check that the claimed time saved fits within the time the changed step originally took.

Distinguish a faster operation from a faster user workflow: time the end-to-end path before claiming the latter. If a side skips work, is untuned, or the difference cannot be distinguished from noise, name the missing evidence rather than ranking the implementations.
