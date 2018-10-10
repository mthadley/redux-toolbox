# `redux-toolbox`

Just a small collection of redux utilities I've found useful between different
projects.

## Usage

```
$ npm install redux-toolbox
```

Then import the desired utility:

```js
import {createReducer} from 'redux-toolbox';

export default createReducer(0, {
  increment: (state) => state + 1,
  decrement: (state) => state - 1
});
```

### API

* `composeReducers(...reducers)`
* `createActionTypes(action, name, [options])`
* `createReducer(initialState, actionHandlers)`

See source code for more type information.

## LICENSE

MIT
