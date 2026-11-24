---
name: resuming-topic-work
description: Reconstructs where work on a named topic left off across Amp threads and checks what landed before suggesting the next action.
---

Scope recall to the requested topic, project and time window. Use supplied thread links directly; otherwise use `find_thread` to locate relevant conversations. Use `read_thread` with full context for past decisions and attempts. Extract the decision, evidence, unresolved question and any branch, PR or issue needed to check it. If the user already supplied that context, go straight to the outstanding checks.

Separate what was discussed from what landed. Verify delivery against the named checkout, target branch or PR, including later reverts. A passing test in another thread is not proof of a merge, and a merge is not proof of deployment. If the original checkout or remote record is unavailable, attribute the claim to its thread and leave delivery unconfirmed.

Return a short brief: what was decided, the verified state, and the most useful open action. Link each consequential claim to the thread or delivery record that supports it. A catch-up request asks for the brief, not execution of the next action.
