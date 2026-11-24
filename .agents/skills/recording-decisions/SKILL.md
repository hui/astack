---
name: recording-decisions
description: Keeps an evidence-linked decision record for a long investigation when the user needs to audit hypotheses, rejected paths, and choices afterward.
---

Start with the question and an observable stopping condition. Pick the first uncertain decision that affects the next step. Before running its check, write the hypothesis and the result that would contradict it. Prefer a probe that distinguishes two explanations over a broad check that would pass under either.

Keep one chronological record. For each consequential choice, capture the hypothesis, discriminating check, observed result with an evidence pointer, and decision. For example: “Suspected queue wait. Compared enqueue-to-start and start-to-finish timings on the same slow jobs. Only execution time rose [trace]. Investigate the worker, not queue capacity.” Record failed and inconclusive probes too; distinguish those from a hypothesis actually ruled out. Skip routine tool calls.

Use an existing review record when one exists; keep working notes local unless the user wants a lasting record. At handoff, check that evidence pointers still resolve and state whether the stopping condition was met. Preserve the unresolved decision and the next discriminating check if it was not.
