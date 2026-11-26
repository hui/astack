# astack

Selected engineering workflows from Lauren Tan’s [pstack](https://github.com/cursor/plugins/tree/ca782ed8b3c2c521cead8e1720d55c3a5dbf2347/pstack), adapted for Amp under the [MIT license](LICENSE). Each skill works on its own, and [poteto-mode](.agents/skills/poteto-mode/SKILL.md) orchestrates them.

## Install

Paste this into an Amp thread:

```text
Install the astack skills from https://github.com/hui/astack as my personal Amp skills.
```

For a local checkout, give `amp skill add` the collection path (`/path/to/astack/.agents/skills`), not an individual `SKILL.md` or skill directory. Installing from the collection preserves bundled files such as the verification skill’s worked examples.

No local checkout is required. If you also want **Poteto** in the agent picker, ask Amp to install `plugins/poteto.ts` from the same repository as a personal plugin. The workflow itself only needs the skills.

## Use the Poteto workflow

**Why “Poteto workflow” instead of “Poteto mode”?** Asking Amp to “start a thread in Poteto mode” can make the launcher look for an agent in the model picker. Installing the skill alone doesn’t add a picker entry. Say **Poteto workflow** when you want your chosen model to follow the playbooks, and **Poteto agent** when you want to launch the optional plugin agent. The skill’s ID is `poteto-mode`.

**In this thread:** “Use the Poteto workflow to review these PRs.” Your current model follows the [playbook](.agents/skills/poteto-mode/SKILL.md#playbooks).

**In a new thread with the default Poteto model:** “Start a thread with the Poteto agent for these PRs.” The optional [Poteto agent plugin](plugins/poteto.ts) registers **Poteto** under **Your Agents** and uses GPT-6.2 Astra. Install it alongside the astack skills to get the picker entry.

**In a new thread with your choice of model:** “Start a Claude Opus 5.5 thread and use the Poteto workflow to review these PRs.” Opus runs the thread; Poteto guides the work. This only needs the skills.

### Set up Poteto's models

When Poteto starts, it asks four questions before the task:

- **Workers:** which model runs the worker threads that do the work: the same model as this thread, another of your top models, any model you type, or no worker threads.
- **Reviewer:** which model gives a second opinion on contested or risky changes. It suggests a model from another vendor, because it catches mistakes your thread’s model shares.
- **Budget:** each model’s default reasoning, or `large`, `medium`, or `small`, like pstack’s `/setup-pstack`.
- **Save:** whether to keep these choices as your default. Poteto saves one `Poteto setup` line in your [personal Amp guidance](https://ampcode.com/settings/instructions#global-agents-md), and later threads offer to reuse it with one click.

The thread you started stays the orchestrator. It picks the playbook, splits the work, starts each worker thread on the chosen model, then copies their changes back and runs the checks itself. Workers never question you, report back to the orchestrator, and don’t push or comment. To skip setup, name the worker model up front: “Use the Poteto workflow with GPT-6.2 Sol workers to fix the export bug.” To change the orchestrator’s model, switch it in Amp’s model picker. Say “change Poteto's models” to set up again, or delete the saved line to forget it. If your project has no verification skill, setup offers once to create one. See [the setup and orchestration rules](.agents/skills/poteto-mode/SKILL.md#set-up-models-before-the-first-task) for details.

- **Fix a bug:** “Use Poteto to reproduce and fix the missing last page of the CSV export.” The [bug-fix playbook](.agents/skills/poteto-mode/playbooks/bug-fix.md) checks the same reproduction before and after the fix.
- **Investigate without edits:** “Use Poteto to trace why exports sometimes time out. Report the evidence without changing code.”
- **Plan without implementing:** “Use Poteto to plan the API migration in phases. Give each phase a verification step; don’t implement yet.”

Amp follows the workflow for later requests while the instruction is in context. Say “stop using Poteto” to turn it off. Invoking the workflow doesn’t authorize pushing, opening or merging PRs, or posting comments.

## Skill catalog

| Upstream workflow | Amp skill | Use it for |
| --- | --- | --- |
| poteto-mode | [poteto-mode](.agents/skills/poteto-mode/SKILL.md) | Route a task to a playbook that calls the skills below. |
| why | [tracing-decisions](.agents/skills/tracing-decisions/SKILL.md) | Recover the historical reason for a choice. |
| blast-radius | [checking-blast-radius](.agents/skills/checking-blast-radius/SKILL.md) | Check the assumption a change’s safety depends on. |
| architect | [sketching-interfaces](.agents/skills/sketching-interfaces/SKILL.md) | Compare two API shapes from a caller’s perspective. |
| tdd | [reproducing-regressions](.agents/skills/reproducing-regressions/SKILL.md) | Watch the regression test fail before fixing the bug. |
| interrogate | [challenging-diffs](.agents/skills/challenging-diffs/SKILL.md) | Test concrete objections to a patch. |
| swarm | [partitioning-work](.agents/skills/partitioning-work/SKILL.md) | Divide a requested parallel task by independent ownership. |
| technical-writing + unslop | [editing-engineering-docs](.agents/skills/editing-engineering-docs/SKILL.md) | Edit a draft around what its reader must do or decide. |
| reframe | [reframing-problems](.agents/skills/reframing-problems/SKILL.md) | Turn an ambiguous idea into a testable brief. |
| benchmark-checklist | [validating-benchmarks](.agents/skills/validating-benchmarks/SKILL.md) | Check whether a performance comparison supports its claim. |
| correct | [preventing-repeat-mistakes](.agents/skills/preventing-repeat-mistakes/SKILL.md) | Find a guard that would have caught a recurring mistake. |
| recall | [resuming-topic-work](.agents/skills/resuming-topic-work/SKILL.md) | Recover decisions across threads and verify what actually landed. |
| create-verification-skill + maintain-verification-skill | [maintaining-verification-recipes](.agents/skills/maintaining-verification-recipes/SKILL.md) | Create or audit reusable instructions for driving the real app. |
| arena | [comparing-candidates](.agents/skills/comparing-candidates/SKILL.md) | Compare independent attempts at the same task on request. |
| figure-it-out + show-me-your-work | [recording-decisions](.agents/skills/recording-decisions/SKILL.md) | Preserve the evidence behind investigation decisions. |
| typescript-best-practices | [reviewing-typescript-models](.agents/skills/reviewing-typescript-models/SKILL.md) | Find type contracts that admit values their callers cannot handle. |
| All 24 `principle-*` skills | [applying-engineering-principles](.agents/skills/applying-engineering-principles/SKILL.md) | Apply a named principle to a concrete engineering decision. |

For example, ask “Apply `principle-make-operations-idempotent` to this retry loop.” The principles share one skill entry; each upstream name selects a separate reference. For `how`, use Amp’s existing `explaining-code` skill. See [amp.md](amp.md) for tool mappings and omissions.
