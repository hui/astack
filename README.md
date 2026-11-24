# astack

Selected engineering workflows from Lauren Tan’s [pstack](https://github.com/cursor/plugins/tree/ca782ed8b3c2c521cead8e1720d55c3a5dbf2347/pstack), adapted for Amp under the [MIT license](LICENSE). These are independent project skills, not a plugin or an always-on agent mode.

Open this checkout in Amp and ask, for example, “Use `checking-blast-radius` on this diff. Could an older client still read the response?” To use one skill in another project, run `amp skill add /absolute/path/to/astack/.agents/skills/checking-blast-radius` from that project with this checkout available. In an existing thread, ask Amp to reload skills.

| Upstream workflow | Amp skill | Use it for |
| --- | --- | --- |
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
