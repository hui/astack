# Perf

Tie every fix to a measurement. Do not infer speed from reading the source.

1. Capture a baseline on the real workload, then load `validating-benchmarks` and vet it.
2. Profile to find the limiter. Try fixes in this order and stop at the first that meets the target: don't do the work, don't do it twice, do less, do it later, do it while nobody waits, do it concurrently, do it cheaper.
3. If the fix crosses a function boundary, load `sketching-interfaces`. Verify each attempt before the next (`principle-sequence-verifiable-units`).
4. Measure after the fix with the same method and vet that number too.

**Reply:** baseline, after, delta, run count and spread, the limiter, and where the raw results are.
