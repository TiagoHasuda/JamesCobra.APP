import React from 'react'
import { ThemeProvider as ThemeProviderStyled } from 'styled-components'
import theme from '../styles/theme'

export const ThemeProvider: React.FC = ({ children }) => {
    return <ThemeProviderStyled theme={theme}>
        {children}
    </ThemeProviderStyled>
}
