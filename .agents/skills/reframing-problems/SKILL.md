---
name: reframing-problems
description: Rewrites an ambiguous product or engineering idea as a testable brief when the user is unsure what to call or build.
---

Anchor the interpretations in one concrete example from the user. Name the two plausible meanings that would lead to different builds, then identify an observation that distinguishes them. For example, “undo a bad import” could mean restoring old rows or applying a compensating transaction; ask what should happen to edits made after the import.

Introduce a term from a neighboring system only if it changes a requirement; explain where the analogy fails. Return a short rewritten brief with the actor, outcome, discriminating example, and any unresolved choice. Do not implement a guess when the request is to frame the problem.
