import type React from 'react';
import { classes } from './main.st.css';

export interface MainProps {
  text: string;
}

export const Main: React.VFC<MainProps> = ({ text }) => <main className={classes.root}>{text}</main>;
