/* @flow */

/**
 * Combines an array of reducers into a single reducer.
 */
function composeReducers/*::<T, U>*/(...reducers /*: Array<(T, U) => T> */) /*: (T, U) => T */ {
  return (state, action) => reducers.reduce(
    (currentState, reducer) => reducer(currentState, action),
    state
  );
}

/*::
type Options = {
  genericizeKey: boolean,
  actionTypes: [string, string, string]
}
*/

const defaultOptions /*: Options */ = {
  genericizeKey: false,
  actionTypes: ['FAILURE', 'REQUEST', 'SUCCESS']
};

/**
 * Creates action types for an action that can possibly fail.
 */
function createActionTypes(
  action /*: string */,
  name /*: string */,
  options /*: $Shape<Options> */ = {}
) /*: { [string]: number } */ {
  const {genericizeKey, actionTypes} = Object.assign({}, defaultOptions, options);
  action = action.toUpperCase();
  name = name.toUpperCase();

  const key = genericizeKey ? action : `${action}_${name}`;

  return actionTypes.reduce(
    (actions, type) => {
      actions[`${key}_${type}`] = `${action}_${name}_${type}`;

      return actions;
    },
    {}
  );
}

/*::
type Action = {
  type: string
}

type Reducer<T, U: Action> = (T, U) => T
*/

/**
 * Creates a reducer from an action map.
 */
function createReducer/*::<T, U: Action>*/(
  initialState /*: T */,
  actionHandlers /*: { [string]: ?Reducer<T, U> } */
) /*: Reducer<T, U> */ {
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
