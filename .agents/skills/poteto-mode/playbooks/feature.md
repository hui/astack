# Feature

You own the design; the code follows it.

1. Trace the affected code and its callers.
2. Load `sketching-interfaces` and settle the caller-facing shape. Name the data structure that organizes the logic, such as a state machine instead of scattered booleans, per `principle-model-the-domain`.
3. Before writing code, note the throughput plan in one line each: what must happen first, which parts are independent, what state they share, and whether one owner is simplest. Split shared state before serializing it (`principle-separate-before-serializing-shared-state`).
4. If the user asked for alternatives, or the shape is genuinely contested, load `comparing-candidates`. Otherwise implement it yourself, delegating only independent slices per `partitioning-work`.
5. Verify the behavior on the surface the user touches, including a failure case.
6. If the design is contested or risky, load `challenging-diffs` and test the strongest objections before handing back.

**Reply:** what you built, the shape you chose and why, how you verified it, and open decisions.
