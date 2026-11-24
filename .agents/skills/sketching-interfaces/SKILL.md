---
name: sketching-interfaces
description: Compares caller-facing API shapes when designing a feature that crosses module boundaries.
---

Start with one actual caller and the data it already owns. Sketch its call under two plausible designs, including what happens on failure or retry. Identify who creates, updates, and disposes of each piece of state. Compare the knowledge each design forces onto the caller, not just the number of parameters.

Recommend one signature and the module that should own it. Show the caller before the internals. If the existing API already expresses the operation, count keeping it as a design. For a design-only request, leave the sketch in the reply.
