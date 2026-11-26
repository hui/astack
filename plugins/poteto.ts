// @amp-agent-mode {"key":"poteto","label":"Poteto"}
import type { PluginAPI } from '@ampcode/plugin'

export const description = 'Adds Poteto to the agent picker. Requires the astack poteto-mode skill.'

export default function (amp: PluginAPI) {
	const agent = amp.createAgent({
		model: 'openai/gpt-6.2-astra',
		instructions: 'Selecting Poteto invokes the poteto-mode skill. Load it before starting the first task and follow it in this thread unless the user opts out. If it is missing, report the missing skill instead of claiming the workflow ran.',
	})
	amp.registerAgentMode({
		key: 'poteto',
		label: 'Poteto',
		description: 'Use when asked to start a thread with the Poteto agent. Loads the Poteto workflow.',
		agent: agent.definition,
	})
}
