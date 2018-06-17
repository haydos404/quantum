import { IConnector, INativeConnector } from 'quantumlib';

/**
 * Fetches a connector by id
 *
 * @param connectors - Connector collection to search
 * @param id - Id of connector
 */
export function getConnectorById(connectors: IConnector[], id: string) {
	const connector = connectors.find(i => i.id === id);

	if (!connector) {
		throw new Error(`Cannot find connector by Id ${id}`);
	}

	return connector;
}

/**
 * Returns true if connector is native
 *
 * @param connector - Connector to assert
 */
export function isNativeConnector(
	connector: IConnector,
): connector is INativeConnector {
	return (
		'execute' in connector &&
		typeof (connector as INativeConnector).execute === 'function'
	);
}
