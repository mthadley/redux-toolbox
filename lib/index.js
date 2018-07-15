/* @flow */

/**
 * Combines an array of reducers into a single reducer.
 * @param {...function} reducers - The reducers to compose.
 * @returns {function} - The composed reducer.
 */
function composeReducers /* ::<T, U> */(
	...reducers /* : Array<(T, U) => T> */
) /* : (T, U) => T */ {
	return (state, action) =>
		reducers.reduce(
			(currentState, reducer) => reducer(currentState, action),
			state
		);
}

/* ::
type Options = {
  genericizeKey: boolean,
  actionTypes: [string, string, string]
}
*/

const defaultOptions /* : Options */ = {
	genericizeKey: false,
	actionTypes: ['FAILURE', 'REQUEST', 'SUCCESS']
};

/**
 * Creates action types for an action that can possibly fail.
 * @param {string} action - The "verb" of the action.
 * @param {string} name - The "subject" of the action.
 * @param {object?} options - Options for configuring how the actions are created.
 * @returns {object} - A map of action types.
 */
function createActionTypes(
	action /* : string */,
	name /* : string */,
	options /* : $Shape<Options> */ = {}
) /* : { [string]: number } */ {
	const {genericizeKey, actionTypes} = Object.assign(
		{},
		defaultOptions,
		options
	);
	action = action.toUpperCase();
	name = name.toUpperCase();

	const key = genericizeKey ? action : `${action}_${name}`;

	return actionTypes.reduce((actions, type) => {
		actions[`${key}_${type}`] = `${action}_${name}_${type}`;

		return actions;
	}, {});
}

/* ::
type Action = {
  type: string
}

type Reducer<T, U: Action> = (T, U) => T
*/

/**
 * Creates a reducer from an action map.
 * @param {T} initialState -  The initial state of the reducer.
 * @param {object} actionHandlers - A map of action types to their handlers.
 * @returns {function} - The reducer.
 */
function createReducer /* ::<T, U: Action> */(
	initialState /* : T */,
	actionHandlers /* : { [string]: ?Reducer<T, U> } */
) /* : Reducer<T, U> */ {
	return (state = initialState, action) => {
		const handler = actionHandlers[action.type];

		return handler ? handler(state, action) : state;
	};
}

module.exports = {
	composeReducers,
	createActionTypes,
	createReducer
};
