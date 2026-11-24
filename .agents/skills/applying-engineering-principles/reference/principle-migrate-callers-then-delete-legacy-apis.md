# Migrate callers, then delete legacy APIs

Use a coordinated replacement when you control all callers and can update them together. Check non-code consumers too: persisted data, configuration, older clients and published integrations do not appear in a symbol search. Move the callers and contract tests, verify the new route, then remove the old one. If independently deployed callers still need it, plan a compatibility window instead.
