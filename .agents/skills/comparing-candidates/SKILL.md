---
name: comparing-candidates
description: Runs an explicitly requested bake-off between independent solutions to the same task, using common acceptance criteria.
---

Use when the user wants competing attempts, not when different workers own different parts of one solution. Before launching, fix the deliverable, starting revision, inputs and acceptance checks. Choose criteria that distinguish usable results, such as preserving old-client behavior or completing a representative workload within its budget.

Give each worker the same brief and exact starting state, with its own output location. Include uncommitted inputs if the task depends on them. Use Task for same-model candidates; for a requested multi-model comparison use separate threads on the requested available models and transfer the inputs. If a model or input is unavailable, disclose the missing comparison. Do not let candidates edit the same checkout files or see one another’s drafts.

Run the same checks on each result and judge against the original criteria, not the workers’ self-assessments. Pick the best qualifying base, or report that none qualifies. Adopt a piece from another candidate only for a named improvement, then rerun the checks on the combined result. Report which result won, the deciding evidence, and any tradeoff the checks did not settle.
