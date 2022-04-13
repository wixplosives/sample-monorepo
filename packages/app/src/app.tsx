import type React from 'react';
import { Main } from '@sample/components';

export interface AppProps {
  text: string;
}

export const App: React.FC<AppProps> = ({ text }) => <Main text={text} />;
