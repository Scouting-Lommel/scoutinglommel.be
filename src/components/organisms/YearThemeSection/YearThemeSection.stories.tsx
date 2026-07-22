import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BlockContainer from '@/components/atoms/BlockContainer';
import { Default as yearThemeStory } from '@/components/molecules/YearTheme/YearTheme.stories';
import YearThemeSection from '.';

const meta: Meta<typeof YearThemeSection> = {
  title: '3 Components/Organisms/Year Theme Section',
  component: YearThemeSection,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    yearTheme: {
      ...yearThemeStory!.args!,
      image: {
        ...yearThemeStory!.args!.image!,
        data: { attributes: yearThemeStory!.args!.image! },
      },
    },
  },
  decorators: [
    (Story) => (
      <BlockContainer variant="dark" slug="year-theme">
        <div className="sl-layout">
          <Story />
        </div>
      </BlockContainer>
    ),
  ],
};
