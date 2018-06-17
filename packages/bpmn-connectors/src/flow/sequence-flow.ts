import { INativeConnector, IToken, ITokenStep } from 'quantumlib';

/**
 * User tasks yield a new task and then resume on continue of that
 */
export const sequenceFlow: INativeConnector = {
	description: 'Executes a user task activity',
	execute: (_token: IToken, step: ITokenStep) => {
		step.state.complete = true;
		return step;
	},
	id: 'bpmn:SequenceFlow',
};
