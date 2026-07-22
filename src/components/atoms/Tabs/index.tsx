'use client';

import cn from 'classnames';
import React, { useState, type JSX } from 'react';
import { Tabs as TabsProps, Tab as TabProps } from './types';
import Tab from './Tab';
import './Tabs.css';

const Tabs = ({ children }: TabsProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="tabs">
      <div className="tabs__list">
        {React.Children.map(children, (child, index) => (
          <button
            className={cn(
              'tabs__list__btn',
              activeTab === index ? 'tabs__list__btn--active' : 'tabs__list__btn--inactive',
            )}
            onClick={() => setActiveTab(index)}
          >
            {(child as React.ReactElement<TabProps>).props.label}
          </button>
        ))}
      </div>
      <div className="tabs__tab">{React.Children.toArray(children)[activeTab]}</div>
    </div>
  );
};

export { Tab, Tabs };
export default Tabs;
