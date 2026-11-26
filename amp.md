# Running pstack workflows in Amp

These are maintainer notes, not prerequisites for loading a skill. Each port stands alone. A workflow describes **how** to do requested work; it cannot authorize external writes, change access, or grant a worker permissions.

| Cursor concept | Amp equivalent and limit |
| --- | --- |
| Slash command, sticky `poteto-mode` | Invoke the skill in chat on any model, or install the [Poteto plugin](plugins/poteto.ts) for a discoverable launcher mode. For another model, start a regular child on that model with an explicit skill instruction. |
| `poteto-agent`, `Task`, `readonly`, background workers | Use `Task` for bounded work when delegation is warranted. Put read-only scope or writable paths in the brief; that is an instruction, not an access control. Use the tool’s native async mode for independent work. |
| `/setup-pstack`, `pstack-models.mdc`, per-role `model` / review panel | `Task` inherits the thread’s model and effort, so Poteto runs other models as child threads. Its startup setup replaces `/setup-pstack`: it detects models with `list_agent_modes`, asks for a worker model, a reviewer model, and a budget, and can save one `Poteto setup` line in the user’s `global_agent_guidance` setting in place of the always-applied rule. Upstream’s per-playbook roles collapse into one worker model, and its three-model panels into one reviewer. For an explicitly requested multi-model panel, use independently owned threads with the requested available models. Give each the same exact diff and base, transferring unpushed work first. If unavailable, disclose the gap rather than calling one model a panel. |
| `worker.md` kickoff rules | Poteto’s worker prompt points at the skill’s “Rules for worker threads”: no questions to the user, the brief’s check is the whole bar, and pre-existing problems get one line. PR title and body rules don’t apply, because workers never open PRs. |
| `AskQuestion`, todo tool | Use `ask_user_choice` only when the user asked to be questioned and concrete options fit, such as Poteto’s startup model question. Otherwise ask a blocking question in the reply. No todo tool is required. |
| Cursor transcripts | Find the relevant Amp thread with `find_thread`; use `read_thread` on its ID for decisions. A chat account of intent is not proof of shipped behavior. |
| Bugbot, Automations, `/loop` | Existing PR feedback and CI results can be read directly. For requested event monitoring use a supported subscription; for explicitly requested timed checks use `building-schedules`. Neither runs Bugbot, grants merge permission, nor substitutes for a missing review. |
| `/deslop`, `control-ui`, `control-cli` | No `cursor-team-kit` dependency. Exercise the real CLI or UI with the project’s verification workflow; use Amp’s `proving-changes` for requested end-to-end proof. |
| Autonomous shipping | Keep checks local unless the user authorized the specific external action. A request to review, for example, does not authorize posting a PR comment or pushing a fix. |

Host contracts: [skills](https://ampcode.com/docs/customize/skills), [models and subagents](https://ampcode.com/docs/models-and-subagents).
