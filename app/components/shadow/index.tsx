import React from 'react'
import { Container } from './styles'

interface ShadowProps {
    size: number
    position: 'toptobottom' | 'bottomtotop' | 'lefttoright' | 'righttoleft'
    opacity?: number
}

export const Shadow: React.FC<ShadowProps> = ({
    size,
    position,
    opacity
}) => {
    return <Container
        direction={position === 'toptobottom' || position === 'bottomtotop' ? 'vertical' : 'horizontal'}
        size={size}
        colors={position === 'bottomtotop' || position === 'righttoleft' ? ['#fff', `#000000${opacity || 30}`] : [`#000000${opacity || 30}`, '#fff']}
        angle={90}
    />
}
