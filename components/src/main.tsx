import * as React from 'react'

export interface MainProps {
    text: string
}

export const Main: React.SFC<MainProps> = ({text}) => <main>{text}</main>
