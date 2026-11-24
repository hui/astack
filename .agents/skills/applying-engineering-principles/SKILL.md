---
name: applying-engineering-principles
description: Applies a named pstack principle-* or helps choose a principle for a specific engineering decision. Use when asked for a principle, not as a general review checklist.
---

If the user names a principle (for example, `principle-make-operations-idempotent`), read the matching reference below. If they ask which principle applies, start with the decision they face and pick the closest match. Read only the references needed. Apply the principle to the concrete case: say what it changes and what evidence would show the choice works. If its precondition does not hold, say why.

### Design and simplify

- [foundational-thinking](reference/principle-foundational-thinking.md): choose data ownership and access patterns before sequencing implementation.
- [model-the-domain](reference/principle-model-the-domain.md): replace flags or branches that admit contradictory states.
- [boundary-discipline](reference/principle-boundary-discipline.md): locate validation at a trust boundary.
- [type-system-discipline](reference/principle-type-system-discipline.md): make a specific invalid construction fail to compile.
- [redesign-from-first-principles](reference/principle-redesign-from-first-principles.md): reconsider the design when a new requirement conflicts with an old assumption.
- [minimize-reader-load](reference/principle-minimize-reader-load.md): reduce the layers and mutable state a reader must trace.
- [laziness-protocol](reference/principle-laziness-protocol.md): solve the problem by changing the fewest decisions.
- [subtract-before-you-add](reference/principle-subtract-before-you-add.md): remove an obsolete path before extending its replacement.
- [migrate-callers-then-delete-legacy-apis](reference/principle-migrate-callers-then-delete-legacy-apis.md): retire an internal API whose consumers can move together.

### Choose and execute

- [experience-first](reference/principle-experience-first.md): resolve a tradeoff from the user's core task.
- [exhaust-the-design-space](reference/principle-exhaust-the-design-space.md): compare distinct prototypes when a choice depends on interaction or fit.
- [outcome-oriented-execution](reference/principle-outcome-oriented-execution.md): distinguish a required transition from throwaway compatibility work.
- [sequence-verifiable-units](reference/principle-sequence-verifiable-units.md): order a migration or sweep around observable checkpoints.
- [build-the-lever](reference/principle-build-the-lever.md): turn a worked example into a rerunnable transformation or check.
- [guard-the-context-window](reference/principle-guard-the-context-window.md): bound a large investigation while preserving its evidence.
- [never-block-on-the-human](reference/principle-never-block-on-the-human.md): decide when to proceed locally and when approval is needed.

### Handle concurrency and retries

- [separate-before-serializing-shared-state](reference/principle-separate-before-serializing-shared-state.md): separate independent writes before choosing a lock.
- [make-operations-idempotent](reference/principle-make-operations-idempotent.md): reconcile a retry after an interruption or unknown result.

### Investigate and verify

- [attack-the-premise](reference/principle-attack-the-premise.md): test the assumption shared by repeated failed fixes.
- [fix-root-causes](reference/principle-fix-root-causes.md): distinguish an invalid state from a valid state handled incorrectly.
- [encode-lessons-in-structure](reference/principle-encode-lessons-in-structure.md): prevent a recurring mistake without another reminder.
- [explain-the-number](reference/principle-explain-the-number.md): check what a measurement counts and what limits it.
- [prove-it-works](reference/principle-prove-it-works.md): observe the promised result rather than a proxy.
- [test-behavior-not-implementation](reference/principle-test-behavior-not-implementation.md): design a test that catches a broken contract but survives a refactor.
