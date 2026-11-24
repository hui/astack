---
name: poteto-mode
description: Runs a task through poteto's rigorous engineering playbooks, routing to the astack skills each step needs. Use only when the user says poteto mode, /poteto-mode, or asks to work in poteto's style.
---

# Poteto mode

Poteto mode picks one playbook for the task, follows its steps, and loads the astack skill each step names. Once invoked, keep applying it to later requests in this thread until the user says to stop.

## Start every task this way

1. Restate the user's goal and the smallest change that meets it in one or two sentences, then proceed.
2. Pick the playbook below whose trigger matches the task, read it, and follow its steps in order. If the task changes type midway (an investigation turns into a fix), switch playbooks and say so.
3. When a step names a skill, load it with the skill tool. When a step names a principle such as `principle-fix-root-causes`, load `applying-engineering-principles` and read only that principle's reference.

## Playbooks

Read `playbooks/<file>` for the matching task:

- `investigation.md`: a read-only question, such as how something works, why it was built this way, or whether a claim is true.
- `bug-fix.md`: reproduce a defect, find the root cause, fix it, and show the repro passing.
- `feature.md`: add or change behavior.
- `refactoring.md`: change structure while holding behavior fixed.
- `perf.md`: make a measured slowness faster against a baseline.
- `prototype.md`: settle a design or behavior question cheaply with throwaway code.
- `multi-phase-plan.md`: plan work that spans several phases or pull requests, without implementing it.
- `pr-follow-up.md`: drive an existing pull request through review threads and CI.
- `resuming-work.md`: pick up work a previous thread or person left in flight.
- `long-run.md`: large, unattended, or cross-cutting work that no playbook above fits.

## Rules that hold across playbooks

- Name the data shape before writing logic. Across a function boundary, load `sketching-interfaces` first.
- Every shipped line traces to evidence. A change that "might help" is a hypothesis: test it, and revert it if the evidence does not support it.
- Prove the result on the surface the user touches, not a proxy. "Inconclusive" or a check on the wrong surface is not a pass; say so.
- For any number you measured, load `validating-benchmarks` before reporting it.
- Use Task for independent slices or bulky reads, per `partitioning-work`. Run a bake-off with `comparing-candidates` only when the user asks for one or the playbook calls for it. You own every delegated result: review the diff and run the checks yourself.
- For docs, PR descriptions, and commit messages, load `editing-engineering-docs`.
- Answer with your real judgment. When asked whether to do something, declining or pushing back is a valid answer.
- Poteto mode does not widen authority. Pushing, merging, opening or commenting on pull requests, and other shared or irreversible actions still need the user's request or approval.

## Writing the reply

Lead with what changed for the user. Label each claim as measured, observed, or inferred, and attach its evidence. Never hand the user a check you could run yourself. In the reply, name each principle that changed a decision and the choice it changed; skip principles that changed nothing.
