import React from 'react'
import { Main } from '@sample-monorepo/components'

export interface IAppProps {
    text: string
}

export const App: React.SFC<IAppProps> = ({text}) => <Main text={text} />
