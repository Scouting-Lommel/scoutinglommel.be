import type { JSX } from 'react';
import Divider from '@/components/atoms/Divider';
import { Divider as DividerProps } from './types';

const DividerBlock = ({ dividerVariant }: DividerProps): JSX.Element => {
  return <Divider variant={dividerVariant} />;
};

export default DividerBlock;
