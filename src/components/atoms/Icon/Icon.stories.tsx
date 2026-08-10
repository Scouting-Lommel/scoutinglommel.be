import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { JSX } from 'react';
import { iconMap, IconNames } from './IconMap';
import Icon from './';

const CustomIconGallery = (): JSX.Element => {
  return (
    <div className="sb-section">
      {Object.entries(iconMap).map(([name, _]) => {
        return (
          <div className="sb-list__item" key={name}>
            <div className="sb-list__item__cell">
              <div className="sb-icon-swatch">
                <Icon name={name as IconNames} size="lg" />
              </div>
            </div>
            <div className="sb-code sb-code--styled">{name}</div>
          </div>
        );
      })}
    </div>
  );
};

const meta: Meta<typeof Icon> = {
  title: '3 Components / Atoms / Icons',
  component: Icon,
  argTypes: {
    name: {
      description: 'The icon to display',
      control: { type: 'select' },
      options: Object.entries(iconMap).map(([name, _]) => name),
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'The size of the icon',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'arrow-down',
    size: 'lg',
  },
};

const AllIconsTemplate = () => <CustomIconGallery />;
export const IconList = AllIconsTemplate.bind({});
