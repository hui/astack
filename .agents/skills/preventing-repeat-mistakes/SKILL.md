---
name: preventing-repeat-mistakes
description: Finds an enforceable guard for a recurring repository mistake when the same correction keeps coming up in reviews or fixes.
---

Find two distinct occurrences in commits, reverts, reviews or issue reports. A review and a fix for the same incident count once. Cite the examples and name the condition that allowed both. If only one occurrence is supported, treat it as an individual defect rather than introducing a repository-wide rule.

Look first for a way to remove the wrong choice, such as deriving a second list from the first instead of requiring synchronized edits. If the choice must remain, try expressing the constraint in the type system, then a targeted lint or behavioral check. Reserve written guidance for decisions a check cannot distinguish. Choose a guard that covers both occurrences without rejecting valid uses.

For a diagnostic request, return the evidence and proposed guard. When implementing it, replay a real past mistake against the guard in disposable local state, then run the same check on a valid neighboring case. Report what failed and what passed; don't count an unrelated build failure as proof.
