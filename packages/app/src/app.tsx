import React from 'react';
import { Main } from '@sample-monorepo/components';
import {hot} from 'react-hot-loader/root'

export interface IAppProps {
    text: string;
}

export const AppBase: React.FunctionComponent<IAppProps> = ({ text }) => {
    return <Main text={text} />
};

export let App = hot(AppBase)
