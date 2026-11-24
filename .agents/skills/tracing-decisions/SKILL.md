---
name: tracing-decisions
description: Reconstructs why a design was chosen from commits and discussions. Use for historical rationale rather than current behavior.
---

Find the change that introduced the behavior, not just the last edit to its line. Follow renames and later reversals. Read the introducing diff and its surrounding commit message, linked PR, or decision record. If the record cites an incident, check what actually failed.

Answer with the original constraint, the choice it led to, and whether that constraint still appears to hold. Attribute stated motives to the record. Label an explanation inferred from the diff as inference; if the record establishes only when the code appeared, say so rather than supplying an author’s motive.
