# Separate before serializing shared state

Ask whether concurrent writers are publishing independent facts. If so, give each its own key, file or branch and combine at read time. Updating different fields of one read-modify-write file still risks lost updates. If a single shared invariant is necessary, enforce it with a transaction, compare-and-swap, lock or single owner; instructions to take turns are not a lock.
