import React from 'react';

export interface MainProps {
    text: string;
}

export const Main: React.FunctionComponent<MainProps> = ({ text }) => <main>{text}</main>;
