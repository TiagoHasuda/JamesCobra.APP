import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            white: string
            black: string
            gray: string
            green: string
            lightGreen: string
            darkGreen: string
        }
    }
}
