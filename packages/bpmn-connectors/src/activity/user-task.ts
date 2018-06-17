import { INativeConnector, IToken, ITokenStep } from 'quantumlib';

/**
 * Custom user task properties
 */
interface IUserTaskProps {
	handled: boolean;
	[key: string]: any;
}

/**
 * Type of user task step
 */
interface IUserTaskStep extends ITokenStep {
	properties: IUserTaskProps;
}

/**
 * Actions
 */
interface IStateMachine {
	Handle: (token: IToken, step: IUserTaskStep) => IUserTaskStep;
	Complete: (token: IToken, step: IUserTaskStep) => IUserTaskStep;
}

/**
 * Get the key
 */
type State = keyof IStateMachine;

/**
 * Execute state machine for this user task
 */
const reducer: IStateMachine = {
	Complete: (token: IToken, step: IUserTaskStep) => {
		step.state.complete = true;
		return step;
	},
	Handle: (token: IToken, step: IUserTaskStep) => {
		step.properties.handled = true;

		return step;
	},
};

/**
 * Fetch the next state for this user task
 *
 * @param step - Step object to evaluate next step
 */
function getState(step: ITokenStep): State | undefined {
	if (!step.state.started) {
		// Started first time handle
		return 'Handle';
	} else if (!step.properties.handled) {
		// If somehow in invalid state handle this
		return 'Handle';
	} else if (step.properties.handled && step.properties.signalled) {
		// If handled and signalled complete
		return 'Complete';
	} else {
		return;
	}
}
/**
 * User tasks yield a new task and then resume on continue of that
 */
export const bpmnUserTask: INativeConnector = {
	description: 'Executes a user task activity',
	execute: (token: IToken, step: IUserTaskStep) => {
		const state = getState(step);

		if (!state) {
			return step;
		}

		return reducer[state](token, step);
	},
	id: 'bpmn:UserTask',
};
