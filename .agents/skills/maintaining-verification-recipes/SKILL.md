---
name: maintaining-verification-recipes
description: Creates or audits a reusable project skill for driving a real app. Use when a team needs repeatable verification instructions rather than evidence for one change.
---

Find the project’s existing verification skill, launch command and test driver. For a new recipe, load `building-skills` and write a project skill under `.agents/skills/`. Organize it by user-visible task: prerequisites, isolated starting state, action, expected observation, and cleanup. Record exact commands that worked. Distinguish a healthy process from a working feature: a readiness response does not prove that an export produced the expected rows.

Pilot the recipe on the runnable app using disposable data. Start again from a clean state and follow the written steps without relying on an earlier session. Check the resulting output, retain the evidence, and clean up only resources this run created. If a prerequisite is missing, name the step it blocks instead of calling the recipe verified.

For an audit, compare the existing recipe with current entry points and drive each in-scope feature live. If an independent drive works but the documented one fails, correct the recipe or its harness and rerun it. If the app violates its intended contract, report the regression rather than rewriting the expectation. Identify any features not exercised and why.
