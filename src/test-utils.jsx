// test-utils.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// eslint-disable-next-line import/no-unresolved
import reducer from 'store/reducers/rootReducer';

function render(
  ui,
  { initialState, store = createStore(reducer, initialState, applyMiddleware(thunk)), ...renderOptions } = {},
) {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
