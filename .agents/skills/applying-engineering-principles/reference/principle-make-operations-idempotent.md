# Make operations idempotent

Derive the next action from observed state and the intended end state. Consider a crash both before and after the effect but before its acknowledgement. A timeout does not establish failure: inspect the destination or use a stable idempotency key before repeating an external write. In disposable state, run twice and interrupt between steps; check the final state and count effects, not just successful exits.
