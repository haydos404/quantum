import * as BPMN from 'bpmn-connectors';
import { fromDefinition } from 'quantum';
import { IDefinition } from 'quantumlib';

// TODO move to test file

const definition: IDefinition = {
	diagram: [],
	execution: [
		{
			connectorId: 'bpmn:StartEvent',
			id: 'Start_1',
			next: ['Flow_1'],
		},
		{
			connectorId: 'bpmn:SequenceFlow',
			id: 'Flow_1',
			next: ['UserTask_1'],
		},
		{
			connectorId: 'bpmn:UserTask',
			id: 'UserTask_1',
			next: ['Flow_2'],
		},
		{
			connectorId: 'bpmn:SequenceFlow',
			id: 'Flow_2',
			next: ['End_1'],
		},
		{
			connectorId: 'bpmn:EndEvent',
			id: 'End_1',
			next: [],
		},
	],
	id: 'spice',
};

fromDefinition(Object.values(BPMN), definition).then(t =>
	console.log(JSON.stringify(t)),
);
