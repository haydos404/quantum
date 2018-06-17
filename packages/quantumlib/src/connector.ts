import { IToken, ITokenStep } from './token';

/**
 * Connectors provide specific implementations for action steps
 */
export interface IConnector {
	/**
	 * Unique Id of this connector.
	 */
	id: string;

	/**
	 * Human description describing connector
	 */
	description?: string;
}

/**
 * Native connectors expose functionality from core systems
 */
export interface INativeConnector extends IConnector {
	/**
	 * Perform actions and yield next items if successful
	 */
	execute: (
		token: IToken,
		step: ITokenStep,
	) => Promise<ITokenStep> | ITokenStep;
}

/**
 * API Security details for access
 */
export interface IAPIKeySecurity {
	/**
	 * Human label for key
	 */
	label: string;

	/**
	 * API Key
	 */
	key: string;

	/**
	 * Property key on header to set with key
	 *
	 * @example AUTHORIZATION
	 */
	headerKey: string;
}

/**
 * Request specific data
 */
export interface IRequest {
	/**
	 * HTTP Verb to use
	 */
	verb: 'GET' | 'DELETE' | 'POST' | 'PUT' | 'HEAD' | 'OPTIONS' | 'PATCH';

	/**
	 * Url to use from the host
	 */
	url: string;

	/**
	 * Query parameters to append
	 */
	query: {
		[key: string]: any;
	};

	/**
	 * Headers to append
	 */
	headers: {
		[key: string]: any;
	};

	/**
	 * Body to append
	 */
	body: {
		[key: string]: any;
	};
}

/**
 * HTTP connectors expose execute step implementation details on an external
 * system
 */
export interface IHTTPConnector extends IConnector {
	/**
	 * Use TLS encryption or not
	 */
	scheme: 'http' | 'https';

	/**
	 * Destination host to request to
	 *
	 * @example quantum.api.com.au
	 */
	host: string;

	/**
	 * Security details for the destination host
	 */
	security?: IAPIKeySecurity;

	/**
	 * Specific request details
	 */
	request: IRequest;
}
