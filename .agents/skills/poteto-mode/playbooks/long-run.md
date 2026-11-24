# Long run

For large, unattended, or cross-cutting work that no other playbook fits.

1. State done as a checkable condition before starting, such as all tests green or the repro fixed on every platform.
2. Load `recording-decisions` and keep its record for the run.
3. Design the phases: what must happen first, what can run in parallel (`partitioning-work`), and the check that ends each phase. Apply `principle-sequence-verifiable-units`.
4. Each step makes the smallest change the evidence justifies, verifies it, and keeps it only if it advanced the done condition.
5. Keep going while work remains and the next step is in scope; stop to ask only for shared or irreversible actions, or a product call. When a result arrives later, such as CI, use a subscription or schedule rather than polling.
6. At the end, check the done condition on the real surface.

**Reply:** whether done was met, the evidence, the decision record, and what remains.
