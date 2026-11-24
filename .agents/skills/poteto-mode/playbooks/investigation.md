# Investigation

Read-only. The deliverable is a cited explanation or a recommendation, not a code change.

1. Trace the code the question is about. For "how does X work", load Amp's `explaining-code` skill. For "why is it built this way", load `tracing-decisions`.
2. For "are we sure?" or "is it safe?", load `checking-blast-radius` and run the check that could prove the claim wrong.
3. For a choice between alternatives, give a recommendation with a short tradeoffs table and the condition that would reverse it.
4. If the premise of the question is wrong, say so with the evidence.

If the answer leads to a code change, stop and hand back, then switch to Bug fix or Feature when the user asks for the change.

**Reply:** the explanation with `file:line` citations, or the recommendation and its tradeoffs.
