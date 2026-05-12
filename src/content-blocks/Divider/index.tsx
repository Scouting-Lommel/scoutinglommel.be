import type { JSX } from 'react';
import Divider from '@/components/atoms/Divider';
import { Divider as DividerProps } from './types';

const DividerBlock = ({ variant }: DividerProps): JSX.Element => {
  return <Divider variant={variant} />;
};

export default DividerBlock;
