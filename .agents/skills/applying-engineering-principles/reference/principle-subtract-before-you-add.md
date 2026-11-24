# Subtract before you add

Before adding another route, option or guard, identify what the new behavior replaces. Confirm the old path has no required callers, remove it as a behavior-preserving step when possible, and verify that baseline before extending it. Limit subtraction to the requested change; neither unrelated cleanup nor removing a live compatibility contract makes the feature simpler.
