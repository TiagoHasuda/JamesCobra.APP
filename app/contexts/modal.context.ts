import { createContext, ReactFragment } from "react"

interface ModalContextProps {
    close: () => Promise<void>
    show: ({ content }: { content: ReactFragment }) => void
}

export const ModalContext = createContext({} as ModalContextProps)
