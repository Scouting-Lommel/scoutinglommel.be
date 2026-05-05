import type { JSX } from 'react';
import Button from '@/components/atoms/Button';
import { ActionTitle as ActionTitleProps } from './types';
import './ActionTitle.css';


const ActionTitle = ({ title, tagName = 'h2', button }: ActionTitleProps): JSX.Element => {
  const TagName = tagName;

  return (
    <div className="action-title">
      <TagName className="t-headline-2 action-title__title">{title}</TagName>
      <Button {...button} />
    </div>
  );
};

export default ActionTitle;
