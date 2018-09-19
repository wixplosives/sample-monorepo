import React from 'react'

export interface IMainProps {
    text: string
}

export const Main: React.SFC<IMainProps> = ({text}) => <main>{text}</main>
