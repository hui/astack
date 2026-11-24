# astack

Selected engineering workflows from Lauren Tan’s [pstack](https://github.com/cursor/plugins/tree/ca782ed8b3c2c521cead8e1720d55c3a5dbf2347/pstack), adapted for Amp under the [MIT license](LICENSE). Each skill works on its own, and [poteto-mode](.agents/skills/poteto-mode/SKILL.md) orchestrates them.

## Use Poteto mode

Open this checkout in Amp and start a request with `poteto mode:` followed by your task. It’s a chat instruction, not a model selector setting. Amp picks a [playbook](.agents/skills/poteto-mode/SKILL.md#playbooks) and loads the skills it needs as it goes. You don’t have to name those skills yourself.

- **Fix a bug:** “poteto mode: the CSV export drops orders on the last page. Reproduce it, add a regression test, and fix it.” The [bug-fix playbook](.agents/skills/poteto-mode/playbooks/bug-fix.md) checks the same reproduction before and after the fix.
- **Investigate without edits:** “poteto mode: trace why exports sometimes time out. Report the evidence without changing code.”
- **Plan without implementing:** “poteto mode: plan the API migration in phases. Give each phase a verification step; don’t implement yet.”

Amp follows Poteto mode for later requests while it has that instruction in the thread’s context. Say `stop poteto mode` to turn it off. Repeat `poteto mode:` in a new thread or if the current thread loses the context. The mode doesn’t authorize pushing, opening or merging PRs, or posting comments.

### Use it in another project

With an astack checkout that includes `poteto-mode`, run this from the target project to install the mode and the skills it calls:

```bash
amp skill add /absolute/path/to/astack/.agents/skills
```

In an existing thread, ask Amp to reload skills. If you only need one skill, point `amp skill add` at that skill’s directory instead, then call it directly (for example, “Use `checking-blast-radius` on this diff. Could an older client still read the response?”).

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
