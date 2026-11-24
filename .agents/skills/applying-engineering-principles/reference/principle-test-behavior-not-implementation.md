# Test behavior, not implementation

Imagine two edits: one breaks an observable result; the other reorganizes private helpers while preserving it. The test should fail only for the first. Drive the public interface, derive the expected result from its contract, and check the value, error or external effect the caller relies on. An internal call count is usually incidental; a duplicate charge is not.
