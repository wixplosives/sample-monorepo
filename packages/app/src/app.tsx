import React from 'react'
import { Main } from 'components'

export interface IAppProps {
    text: string
}

export const App: React.SFC<IAppProps> = ({text}) => <Main text={text} />
