---
name: poteto-mode
description: Applies the Poteto workflow in this thread or starts a requested thread with the Poteto agent. Use for explicit requests for the Poteto workflow or the Poteto agent, and to set up or change Poteto's models.
---

# Poteto workflow

Poteto picks one playbook for the task, follows its steps, and loads the astack skill each step names. Once invoked, keep applying it to later requests in this thread until the user says to stop.

## Set up models before the first task

The first time Poteto is invoked in a thread, set up its models before starting the task. The user asked for this step; it is not optional. Skip it only in a worker thread, or when the invocation already names the worker model, such as “use GPT-6.2 Sol for the workers”. Run it again whenever the user asks to set up or change Poteto's models.

Setup chooses two roles. **Workers** are threads that implement slices of the task. **The reviewer** is a thread that gives a second opinion on a contested or risky change; a model from another vendor than this thread catches mistakes this thread's model shares. This thread is the orchestrator. Its model and effort are set in Amp's model picker, not by a tool; if the user wants a different orchestrator, tell them to switch it there.

1. Read the current state: `get_thread_status` on this thread's URL for its `model` and `reasoningEffort`, `list_agent_modes` for this project, and the user's saved setup, which is the line starting with `Poteto setup` in the `global_agent_guidance` setting (`manage_amp` topic `settings`, operation `get`).
2. If a saved setup exists and every model it names is in the list, call `ask_user_choice` with “Use your saved Poteto setup? <the saved line>” and the options “Use saved setup” and “Change it”. On “Use saved setup”, go to step 5. If a saved model is no longer available, say which one and go to step 3.
3. Ask these four questions as four parallel `ask_user_choice` calls, each with `allowOther: true`:
   - “This thread runs on <current model label> and orchestrates. Which model should run the worker threads that do the work?” Options: “Same as this thread (<current model label>)”, up to two other `topModel` labels, and “No worker threads; do the work in this thread”.
   - “Which model should review contested or risky changes?” Options: up to two `topModel` labels from a vendor other than this thread's, “Same as the workers”, and “No separate reviewer; review in this thread”.
   - “How much reasoning should the workers and the reviewer use?” Options: “Each model's default”, “large — xhigh reasoning”, “medium — high reasoning”, and “small — medium reasoning”.
   - “Save these choices as your default for new Poteto threads?” Options: “Yes, save as my default” and “No, this thread only”.
4. Resolve each model answer to a key from the list. For a budget, give each model the highest effort in its `reasoningEfforts` at or below the target, or its lowest effort when none is; an effort the user typed overrides the budget. If an answer matches no available model, or several, ask that question again with the matches as options instead of substituting one.
5. Write the setup in one line, such as “Poteto setup (applies only when the Poteto workflow runs): workers openai/gpt-6.2-sol (high); reviewer anthropic/claude-opus-5-5 (high).”, and use it for the rest of the thread. If the user chose to save, read `global_agent_guidance` again, replace its `Poteto setup` line or append one, and write it back with `manage_amp` operation `update`, keeping every other line unchanged. Amp includes that setting in every new thread.
6. If the project has no `verifying-*` skill under `.agents/skills/` and no harness that drives the real app, offer once, in one sentence, to create one with `maintaining-verification-recipes`, so workers can prove changes on the real app. Continue with the task whatever the answer.

## Orchestrate with worker threads

With a worker model chosen, this thread is the orchestrator: it restates the goal, picks the playbook, splits the work, and integrates and verifies the results. Worker threads on the chosen model do the implementation and other slices one owner can finish alone. Keep work here that takes less effort than writing its brief, such as a read-only question answered from a few files.

1. Split per `partitioning-work`: give each worker its own files, and keep dependent steps with one owner.
2. Start each worker with `create_thread`: `model` set to the worker key, `effort` only if set up, `intent: "delegation"`, and this thread's project, plus the same `executor` and `runner_id` when this thread runs on a runner. Begin its prompt with “Load the poteto-mode skill. You are a Poteto worker thread; follow its rules for worker threads and handle this task:”. Then give the goal, the evidence so far, the files it may change, the check that proves its slice, and: “When finished, use send_thread_message to send <this thread's URL> the files you changed, each check you ran with its result, and any blockers. Don't push, open pull requests, or post comments.”
3. A new orb starts from the project's default branch, without this checkout's uncommitted changes. When a worker needs them, list the paths in its prompt as arriving shortly, then send each file with `upload_thread_file` right after `create_thread` returns.
4. While workers run, continue independent work here, or end the turn by listing the workers in flight and what each owns. Workers report back by message, so don't also call `wait_for_threads` on them.
5. When a worker reports, copy its changes here with `download_thread_changes`, limiting `paths` to the files it owned. Read the diff and run the playbook's checks in this checkout; a worker's report is a claim, not verification. Send corrections to the same worker with `send_thread_message` instead of starting a replacement.
6. When a playbook step loads `challenging-diffs` to challenge a contested or risky change, and a reviewer model is set up, start the review the same way on the reviewer key. Upload the changed files, name the base revision, and ask it to load `challenging-diffs`, change no files, and report confirmed findings. Reproduce each finding here before acting on it.

With “No worker threads”, do the work in this thread and use `Task` for parallel slices. `Task` workers always run on this thread's model and effort; a different model needs a worker thread.

## Rules for worker threads

A thread whose prompt says it is a Poteto worker skips model setup and starts no further threads. It follows the playbook for its slice, with these rules:

- Never call `ask_user_choice` or another tool that shows a person a question; the user is watching the orchestrator. Make any choice you can undo, then report what you chose and why.
- The check in your prompt is the whole bar. Add no extra check, gate, or review round above it. With no check stated, the change must be no worse than its base and pass its own tests.
- Report a problem the base already has in one line instead of fixing it.

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
