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
	Handle: (step: IUserTaskStep) => IUserTaskStep;
	Complete: (step: IUserTaskStep) => IUserTaskStep;
}

/**
 * Get the key
 */
type State = keyof IStateMachine;

/**
 * User tasks yield a new task and then resume on continue of that
 */
export const userTask: INativeConnector = {
	description: 'Executes a user task activity',
	execute: (_token: IToken, step: IUserTaskStep) => {
		const state = getState(step);

		if (!state) {
			return step;
		}

		return reducerStateMachine[state](step);
	},
	id: 'bpmn:UserTask',
};

/**
 * Execute state machine for this user task
 */
const reducerStateMachine: IStateMachine = {
	Complete: (step: IUserTaskStep) => step,
	Handle: (step: IUserTaskStep) => step,
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
