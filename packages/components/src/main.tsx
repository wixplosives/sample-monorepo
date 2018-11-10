import React from 'react'

export interface IMainProps {
    text: string
}

export const Main: React.FunctionComponent<IMainProps> = ({text}) => <main>{text}</main>
