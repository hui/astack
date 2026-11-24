# Type system discipline

Identify a specific invalid value that currently compiles. Encode the distinction where the value is created: use variants for exclusive states, distinct types for easily swapped identifiers, and types derived from an authoritative schema rather than synchronized copies. Validate untrusted input before constructing the type. Check that a bad construction fails and a nearby valid one still works.
