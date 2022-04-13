import type React from 'react';

export interface MainProps {
  text: string;
}

export const Main: React.FC<MainProps> = ({ text }) => <main>{text}</main>;
