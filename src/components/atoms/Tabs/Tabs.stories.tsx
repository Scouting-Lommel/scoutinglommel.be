import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tabs, Tab } from '.';

const meta: Meta<typeof Tabs> = {
  title: '3 Components/Atoms/Tabs',
  component: Tabs,
  tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    () => (
      <div style={{ maxWidth: '500px' }}>
        <Tabs>
          <Tab label="Tab 1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil fuga reiciendis,
            consequatur delectus error obcaecati molestiae cupiditate, cumque dolores perspiciatis
            sed dolore doloremque, quaerat voluptate rem impedit quam quas ratione.
          </Tab>
          <Tab label="Tab 2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptatem ducimus
            illum architecto magni, excepturi inventore, ad a aliquid, quasi id molestiae sint
            doloribus autem amet totam nobis consequuntur illo.
          </Tab>
          <Tab label="Tab 3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam nam architecto hic
            porro repudiandae perferendis molestias aut, inventore, laboriosam sint suscipit quas
            neque quos facilis! Illo provident amet nisi.
          </Tab>
        </Tabs>
      </div>
    ),
  ],
};
