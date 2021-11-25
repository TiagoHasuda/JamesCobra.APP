import React, { ReactFragment, useRef, useState } from 'react'
import { Animated } from 'react-native'
import { ModalContext } from '../contexts/modal.context'
import { sleep } from '../utils/sleep'
import { Modal } from './components/modal'

export const ModalProvider: React.FC = ({ children }) => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [content, setContent] = useState<ReactFragment>(<></>)
    const animationValue = useRef(new Animated.Value(0)).current

    const show = ({
        content,
    }: {
        content: ReactFragment
    }): void => {
        setShowModal(true)
        setContent(content)
        Animated.timing(animationValue, {
            toValue: 100,
            duration: 200,
            useNativeDriver: false,
        }).start()
    }

    const close = async (): Promise<void> => {
        Animated.timing(animationValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start()
        await sleep(200)
        setShowModal(false)
        setContent(<></>)
    }

    const callback = async (): Promise<void> => {
        await close()
    }

    return <ModalContext.Provider value={{
        close,
        show,
    }}>
        {children}
        <Modal
            show={showModal}
            content={content}
            callback={callback}
            animationValue={animationValue}
        />
    </ModalContext.Provider>
}
