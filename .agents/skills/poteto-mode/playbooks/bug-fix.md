# Bug fix

Be scientific: every shipped line traces to runtime evidence.

1. Reproduce the failure yourself on the surface where it was reported. If it will not reproduce, tighten the conditions or add instrumentation until it does. Ask the user only for access you cannot get.
2. Find the cause by elimination. List candidate causes, seed them with a trace of the code and `tracing-decisions` for regression history, then run the check that rules out the most candidates at once. Read real program state instead of guessing. Apply `principle-fix-root-causes`. If two fixes built on one explanation have failed, apply `principle-attack-the-premise` before a third.
3. If a cheap local test can reproduce the bug, load `reproducing-regressions` and watch the test fail before fixing.
4. Plan the fix. If it crosses a function boundary, load `sketching-interfaces` first. Make the smallest change the evidence justifies.
5. Verify on the same surface: the original repro now passes, and a nearby working case still works. If the change touches a shared contract, load `checking-blast-radius`.
6. When the user asks for commits, land the failing test before the fix (`principle-sequence-verifiable-units`).

**Reply:** what was broken, the root cause, the fix, and the failing-then-passing repro output.
