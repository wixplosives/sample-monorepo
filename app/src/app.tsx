import * as React from 'react'
import { Main } from 'components';

export interface AppProps {
    text: string
}

export const App: React.SFC<AppProps> = ({text}) => <Main text={text} />
