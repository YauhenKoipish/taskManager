import { useContext } from 'react';
import { ThemeProviderContext } from '../components/ThemeProvider/ThemeProviderContext';

export const useTheme = () => useContext(ThemeProviderContext);
