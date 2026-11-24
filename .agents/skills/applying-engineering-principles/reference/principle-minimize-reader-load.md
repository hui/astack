# Minimize reader load

Trace where a value comes from and everything that can change it. Remove a forwarding layer if it contributes no contract or ownership boundary. Prefer a local derived value to a field synchronized from somewhere else. Recheck the same trace: the reader should have fewer jumps or fewer possible writers to hold in mind.
