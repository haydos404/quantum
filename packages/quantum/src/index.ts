(<any>Symbol).asyncIterator =
	Symbol.asyncIterator || Symbol.for('Symbol.asyncIterator');

export { fromDefinition, fromToken } from './quantum';
