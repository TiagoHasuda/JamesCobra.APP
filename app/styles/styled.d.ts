import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string
            primaryLight: string
            secondary: string
            secondaryLight: string
            white: string
            black: string
            gray: string
            green: string
            lightGreen: string
            darkGreen: string
        }
    }
}
