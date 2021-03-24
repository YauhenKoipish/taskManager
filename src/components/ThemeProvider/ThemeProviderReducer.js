import { THEME_SWITCH, THEME_SAVE } from './types';
import { setUserTheme } from '../../services/services';

const handlers = {
  [THEME_SAVE]: (state, action) => {
    const { theme, userId } = action.payload;
    setUserTheme(theme, userId);

    return { ...state, theme };
  },
  [THEME_SWITCH]: (state, action) => ({ ...state, ...action.payload }),

  DEFAULT: (state) => state,
};

export const themeProviderReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
