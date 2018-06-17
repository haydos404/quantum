/**
 * Defines an execution step
 */
export interface IDefinitionStep {
	/**
	 * Id of this execution step
	 */
	id: string;

	/**
	 * Id of connector that executes this step
	 */
	connectorId: string;

	/**
	 * Next steps for this step if successful
	 */
	next: string[];
}

/**
 * Definition defines the execution steps and persisted diagram metadata.
 */
export interface IDefinition {
	/**
	 * Id of the definition
	 */
	id: string;
	/**
	 * Execution information
	 */
	execution: IDefinitionStep[];
	/**
	 * Diagram information
	 */
	diagram: any;
}
