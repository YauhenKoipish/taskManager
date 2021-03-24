/* eslint-disable no-shadow */
import { useCallback, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { THEME_SWITCH, THEME_SAVE } from './types';
import { ThemeProviderContext } from './ThemeProviderContext';
import { themeProviderReducer } from './ThemeProviderReducer';

export const ThemeProvider = ({ children, intitialTheme }) => {
  const [{ theme }, dispatch] = useReducer(themeProviderReducer, { theme: intitialTheme });

  const changeTheme = useCallback((theme) => dispatch({ type: THEME_SWITCH, payload: { theme } }), []);

  const saveUserTheme = useCallback(
    (theme, userId) => () => dispatch({ type: THEME_SAVE, payload: { theme, userId } }),
    [],
  );

  const memoProps = useMemo(
    () => ({
      theme,
    }),
    [theme],
  );

  return (
    <ThemeProviderContext.Provider value={{ ...memoProps, saveUserTheme, changeTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
  intitialTheme: PropTypes.string,
};

ThemeProvider.defaultProps = {
  intitialTheme: 'default',
};
