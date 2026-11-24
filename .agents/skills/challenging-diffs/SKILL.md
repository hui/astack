---
name: challenging-diffs
description: Challenges a proposed patch with counterexamples when asked for an adversarial diff review.
---

For each plausible objection, state a reachable input, the expected contract, and the predicted wrong result. Read unchanged callers too. Try to disprove the objection with a focused local check or a trace through the exact revision. A pre-existing failure is not a regression introduced by the patch: compare the base when attribution matters.

Lead with confirmed findings, each tied to the affected line, consequence, and smallest correction. Mark unresolved hypotheses separately and name the evidence missing. Several reviewers repeating a suspicion is not confirmation. Keep review read-only unless the user also asked for fixes.
