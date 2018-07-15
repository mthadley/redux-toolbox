/* @flow */
const Util = require('..');

describe('index', () => {
	describe('composeReducers', () => {
		it('should call all reducers passed', () => {
			const state = {};

			const reducers = [];

			for (let i = 0; i < 3; i++) {
				reducers.push(jest.fn().mockReturnValue(state));
			}

			const rootReducer = Util.composeReducers(...reducers);

			rootReducer(state, {});

			reducers.forEach(mock => expect(mock).toBeCalled());
		});
	});

	describe('createReducer', () => {
		it('should return a function', () => {
			expect(typeof Util.createReducer({}, {})).toBe('function');
		});

		it('should call the matching action handler', () => {
			const TEST_ACTION = 'TEST_ACTION';

			const mockHandler = jest.fn(() => ({
				result: 2
			}));

			const reducer = Util.createReducer(
				{},
				{
					[TEST_ACTION]: mockHandler
				}
			);

			let state = reducer(
				{
					result: 1
				},
				{
					type: 'ACTION_NOT_FOUND'
				}
			);

			expect(state.result).toBe(1);
			expect(mockHandler).not.toBeCalled();

			state = reducer(state, {
				type: TEST_ACTION
			});

			expect(state.result).toBe(2);
			expect(mockHandler).toBeCalled();
		});

		it('should return an initial state if not passed one', () => {
			const initialState = {};

			const reducer = Util.createReducer(initialState, {});

			const state = reducer(undefined, {type: 'FOO'});

			expect(state).toBe(initialState);
		});
	});

	describe('createActionTypes', () => {
		it('should return an object of three actionTypes', () => {
			const actionTypes = Util.createActionTypes('foo', 'test');

			Object.keys(actionTypes).forEach(type =>
				expect(actionTypes[type]).toContain('FOO_TEST')
			);
		});

		it('should genericize action keys', () => {
			const actionTypes = Util.createActionTypes('foo', 'test', {
				genericizeKey: true
			});

			Object.keys(actionTypes).forEach(type =>
				expect(type).not.toContain('TEST')
			);
		});
	});
});
