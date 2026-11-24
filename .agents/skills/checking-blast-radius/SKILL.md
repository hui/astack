---
name: checking-blast-radius
description: Traces downstream breakage when asked what else a small change could affect or whether it is safe for existing consumers.
---

Write the safety claim in falsifiable terms: for example, “the previous client accepts a response with the new field absent.” Trace the changed contract across its first untyped or external boundary. A symbol search won’t find a stored payload or an older deployed consumer.

Exercise the real reader with the input most likely to contradict the claim, alongside a known-good control. Separate observed breakage, risks the check ruled out, and consumers you could not exercise. Report the command and decisive result. A green test on the new producer alone says nothing about the old reader.
