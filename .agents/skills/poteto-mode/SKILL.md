---
name: poteto-mode
description: Applies the Poteto workflow in this thread or starts a requested thread with the Poteto agent. Use for explicit requests for the Poteto workflow or the Poteto agent.
---

# Poteto workflow

Poteto picks one playbook for the task, follows its steps, and loads the astack skill each step names. Once invoked, keep applying it to later requests in this thread until the user says to stop.

## Set up models before the first task

The first time Poteto is invoked in a thread, ask the user which model runs the worker threads, before starting the task. The user asked for this question; it is not optional. Skip it only when this thread's prompt says it is a Poteto worker, or when the invocation already names the worker model, such as “use GPT-6.2 Sol for the workers”.

1. Call `get_thread_status` on this thread's URL for its `model` and `reasoningEffort`, and `list_agent_modes` for this project.
2. Call `ask_user_choice` with `allowOther: true`, the question “This thread runs on <current model label> and orchestrates. Which model should run the worker threads that do the work?”, and these options: “Same as this thread (<current model label>)”, up to two other `topModel` labels from the list, and “No worker threads; do the work in this thread”. The thread's own model is set in Amp's model picker, not by a tool; if the user wants a different orchestrator, tell them to switch it there.
3. Resolve an Other answer to a key from the list, with the effort they name, if any. If it matches no available model, ask again instead of substituting one.
4. Write the setup in one line, such as “Poteto setup: orchestrator Claude Opus 5.5 (high), workers GPT-6.2 Sol (default effort)”, and use it for the rest of the thread. Ask again only when the user asks to change it.

## Orchestrate with worker threads

With a worker model chosen, this thread is the orchestrator: it restates the goal, picks the playbook, splits the work, and integrates and verifies the results. Worker threads on the chosen model do the implementation and other slices one owner can finish alone. Keep work here that takes less effort than writing its brief, such as a read-only question answered from a few files.

1. Split per `partitioning-work`: give each worker its own files, and keep dependent steps with one owner.
2. Start each worker with `create_thread`: `model` set to the chosen key, `effort` only if chosen, `intent: "delegation"`, and this thread's project, plus the same `executor` and `runner_id` when this thread runs on a runner. Begin its prompt with “Load the poteto-mode skill. You are a Poteto worker thread: skip model setup, start no further threads, and handle this task:”. Then give the goal, the evidence so far, the files it may change, the check that proves its slice, and: “When finished, use send_thread_message to send <this thread's URL> the files you changed, each check you ran with its result, and any blockers. Don't push, open pull requests, or post comments.”
3. A new orb starts from the project's default branch, without this checkout's uncommitted changes. When a worker needs them, list the paths in its prompt as arriving shortly, then send each file with `upload_thread_file` right after `create_thread` returns.
4. While workers run, continue independent work here, or end the turn by listing the workers in flight and what each owns. Workers report back by message, so don't also call `wait_for_threads` on them.
5. When a worker reports, copy its changes here with `download_thread_changes`, limiting `paths` to the files it owned. Read the diff and run the playbook's checks in this checkout; a worker's report is a claim, not verification. Send corrections to the same worker with `send_thread_message` instead of starting a replacement.

With “No worker threads”, do the work in this thread and use `Task` for parallel slices. `Task` workers always run on this thread's model and effort; a different model needs a worker thread.

## Starting a separate thread

“Start a thread with the Poteto agent” asks the launcher to create one thread, not to do the work here. Use `create_thread` with the requested project and task. Pass the repository names, PR or issue references and any constraints the new thread needs. Start its prompt with “Load the poteto-mode skill and handle this task in this thread:” followed by the task itself, not the instruction to start a thread. That thread becomes the orchestrator and asks the setup question there. Return the actual thread link. “Use the Poteto workflow” without a launch request stays here, and this thread asks the setup question.

If the user names a model for the new thread, resolve it with `list_agent_modes` for the destination and pass its key as `model`; pass `effort` only if requested and supported. Otherwise, for a request for the Poteto agent, use the registered Poteto key from that list. If Poteto isn't listed, omit `model` and keep the skill instruction in the prompt. A missing plugin is not a missing model request. If an explicitly requested model or the destination project is unavailable, report that limitation instead of silently substituting another.

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
- Run a bake-off with `comparing-candidates` only when the user asks for one or the playbook calls for it.
- For docs, PR descriptions, and commit messages, load `editing-engineering-docs`.
- Answer with your real judgment. When asked whether to do something, declining or pushing back is a valid answer.
- The Poteto workflow does not widen authority. Pushing, merging, opening or commenting on pull requests, and other shared or irreversible actions still need the user's request or approval.

## Writing the reply

Lead with what changed for the user. Label each claim as measured, observed, or inferred, and attach its evidence. Never hand the user a check you could run yourself. In the reply, name each principle that changed a decision and the choice it changed; skip principles that changed nothing.
