# Refactoring

The structure changes; the behavior does not. A missing feature or real bug found along the way gets split out and reported.

1. Pin current behavior first with a characterization test, snapshot, or output diff. Type checks and lint are not a pin.
2. Name the structure the code is missing (`principle-model-the-domain`) and the target shape if built today (`principle-redesign-from-first-principles`). If the target crosses a function boundary, load `sketching-interfaces`.
3. Subtract first: delete dead code, one-caller wrappers, and redundant guards before adding the new shape (`principle-subtract-before-you-add`).
4. Move in small steps that keep the pin green. For an internal API change you fully control, migrate every caller and delete the old API together (`principle-migrate-callers-then-delete-legacy-apis`). Check renames against strings and docs, which a symbol search misses.
5. Prove behavior is unchanged with the pin, not "it compiles".
6. Keep the change only if it lowers reader load (`principle-minimize-reader-load`). Otherwise revert it.

**Reply:** the structure that changed, the pin it held against, the equivalence evidence, and what you reverted.
