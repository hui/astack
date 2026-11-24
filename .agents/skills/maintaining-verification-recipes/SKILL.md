---
name: maintaining-verification-recipes
description: Creates or audits a project-local verification skill and feature map. Use for “create-verification-skill”, “make a control skill for this repo”, or “audit the verify skill”, not for one-off proof of a change.
---

# Create or audit a verification skill

Write for the next agent, opening the project cold. Find the project's existing verification skill before creating another. For an audit, go directly to **Audit an existing skill**.

## Interview the repo, not the user

Identify the primary user surface (web, desktop, mobile, CLI/TUI, API, or library) and note secondary entry points. Read the quickstart, manifests, and existing harnesses for how to launch, drive, observe, and isolate it. Use the project's own driver first; otherwise choose the public interface a user would use, such as a browser, PTY, HTTP client, or library call. Ask only for prerequisites you cannot discover.

Start the real target before writing instructions. Resolve a local setup problem or report the exact blocker; don't invent commands for a broken checkout. If verification needs an otherwise irrelevant missing asset, identify it as scaffolding and remove it in cleanup. Determine whether parallel runs can isolate their ports, data, and profiles. If not, refuse to drive a shared instance.

## Generate the project skill

Load `building-skills`. Write `.agents/skills/verifying-<app>/SKILL.md` with a matching frontmatter `name` and a `description` naming the actual app, surface, and trigger. Replace placeholders with commands, paths, and observations from this checkout. Include:

- **Launch:** Start from an empty data directory. Include dependency setup, environment and auth prerequisites, migrations, seeds, and a readiness signal that means the app is usable, not just listening. Link teardown. For a short-lived CLI, build once and run each drive in a fresh isolated session (PTY for interactive commands).
- **Doctor:** Give one read-only check that distinguishes this run's usable instance from the wrong port owner, build, data directory, or login. Run it before driving and again when a drive surprises you.
- **Drive:** Link `features/README.md`. Use the actual harness and stable handles: accessible names, prompt strings, route paths, or public commands rather than coordinates or tab order.
- **Evidence:** Name the artifact location. Capture the user action and resulting state; verify side effects independently (e.g. reopen the saved record or inspect exported rows). Drive the user path, not internal setters or test-only endpoints. Mock only at an existing production boundary. For a dry-run, observe which files, network requests, or refs actually change rather than trusting the flag's name.
- **Cleanup:** Remove only this run's instances and scratch state, by owned handle, never by process name. Keep evidence outside the teardown target.
- **Helpers:** Make any shipped scripts executable and show their exact invocations in the skill body.

## Seed the feature map

Under the generated skill, create `features/README.md` and one file per mapped user-facing feature. Start with the top 3–5 identifiable from routes, commands, menus, and docs, or fewer if the app has fewer. Read the [example index](reference/feature-map-example/README.md), [mutation journey](reference/feature-map-example/create-note.md), and [search journey](reference/feature-map-example/search.md) for the format; their Notes commands are illustrative, not dependencies.

The index links each file and specifies baseline preconditions, driving conventions, and how to record proof and skips by feature ID and entry point. Each file starts with an H1 and a paragraph of user-visible behavior, then exactly four H2s in order:

1. `Sub-features`: stable short IDs and the behaviors they identify.
2. `How to get to it (user POV)`: every known user entry point, including shortcuts or alternative surfaces.
3. `Driving it with <harness>`: use the real driver name. Start with `Preconditions:`. Pair each labeled action with a literal command and an observable expected result.
4. `Gotchas`: traps, unmet seed preconditions, and what invalidates a run. If the seed cannot exercise a journey, record the failed attempt and why. Don't weaken the expectation or count one entry point as proof of another.

## Prove the generated skill

Replay its written instructions from clean state: launch, doctor, drive one mapped feature, capture proof, clean up, then check the evidence still exists at the named location. Clean up failed attempts too. Fix the recipe and repeat if it cannot be followed as written. An unexecuted skill is a draft. Report which journey ran, which remain untested, and any setup steps supplied by a stand-in but not verified on the intended target. Offer an audit with this same skill as the app changes; suggest a cadence only if asked.

## Audit an existing skill

Reconcile the map index with its sibling files. Compare every feature with current source entry points and look for new unmapped surfaces. Exercise each mapped feature live using the recipe's own launch model; source inspection alone isn't coverage. Doctor each fresh session and recheck or reset after surprises. If an independent drive works but the documented one fails, correct the recipe or its harness and rerun it. Keep edits inside the verification skill. If the product violates its contract, report the regression rather than rewriting the expectation. Retain proof through teardown and report coverage, corrections, and blocked paths with attempted routes and concrete missing prerequisites.
