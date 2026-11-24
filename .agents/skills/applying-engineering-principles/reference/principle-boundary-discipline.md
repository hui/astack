# Boundary discipline

Trace untrusted input to the point where it becomes a domain value. Parse and reject invalid data there, and give internal consumers the validated value rather than a transport object. Remove a repeated guard only after verifying every entry path establishes the same invariant; a second public entry point may be a separate boundary.
