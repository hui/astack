---
name: reproducing-regressions
description: Applies red/green TDD to bug fixes when a local test can reproduce an observable regression.
---

Pick the narrowest existing test entry point that exhibits the user’s failure. Derive the expected result from the caller’s contract. Choose input that distinguishes the defect from a nearby working case.

Run the new assertion on the unfixed behavior. Check that it fails for the reported symptom, not because setup failed. If it passes, revisit the reproduction before editing production code. Make the fix and run the same check unchanged, then its neighboring tests. Report the red and green results. If no practical automated path exists, use a local reproduction and say which part remains untested rather than calling it TDD.
