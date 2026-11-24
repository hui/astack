---
name: reviewing-typescript-models
description: Reviews TypeScript API and domain types for invalid states or unchecked boundary assumptions. Use for type-design reviews, not ordinary TypeScript edits.
---

Trace one value from its producer through the public type to a real consumer. Show a value the type admits that the consumer cannot handle, or a valid value it wrongly excludes. A cast or non-null assertion is a place to investigate, not a finding on its own. Check where the asserted invariant is actually established.

Choose the smallest type that reflects the contract. For example, if `status: 'ready'` requires `data`, pair them in one discriminated union member rather than making `data` optional for every status. If empty lists are valid, keep the array type and handle emptiness at the caller. At an external boundary, check runtime validation before trusting an inferred or branded type; a type annotation does not parse incoming JSON.

For each finding, give the counterexample, affected caller, and proposed correction. Use the project’s compiler settings to check that invalid constructions fail and nearby valid ones still compile. For untrusted input, exercise the real parser too. If the example cannot arise because an existing boundary already enforces the contract, explain that rather than recommending another type.
