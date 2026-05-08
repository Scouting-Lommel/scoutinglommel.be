import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as imageStory } from '@/components/atoms/Image/Image.stories';
import WieIsWie from '.';

const meta: Meta<typeof WieIsWie> = {
  title: '3 Components/Organisms/WieIsWie',
  component: WieIsWie,
};

export default meta;
type Story = StoryObj<typeof meta>;

const image = {
  ...imageStory.args!.data!,
  documentId: 'image-1',
  mime: 'image/png',
  provider: 'cloudinary',
  size: 123456,
};

export const Default: Story = {
  args: {
    groups: [
      {
        documentId: 'group-1',
        name: 'Kapoenen',
        slug: 'kapoenen',
        files: [],
        leaders: [
          {
            documentId: 'leader-1',
            firstName: 'Jan',
            lastName: 'Jansen',
            active: true,
            isGroupLeader: true,
            image,
            groupFunction: {
              documentId: 'function-1',
              title: 'Takverantwoordelijke',
              description: 'Verantwoordelijk voor de algemene werking van de kapoenen.',
            },
          },
          {
            documentId: 'leader-2',
            firstName: 'Piet',
            lastName: 'Peeters',
            active: true,
            isGroupLeader: false,
            image,
          },
        ],
      },
      {
        documentId: 'group-2',
        name: 'Welpen',
        slug: 'welpen',
        files: [],
        leaders: [
          {
            documentId: 'leader-3',
            firstName: 'Marie',
            lastName: 'Maes',
            active: true,
            isGroupLeader: true,
            image,
            groupFunction: {
              documentId: 'function-2',
              title: 'Takverantwoordelijke',
              description: 'Leidt de wekelijkse activiteiten van de welpen.',
            },
          },
          {
            documentId: 'leader-4',
            firstName: 'Lisa',
            lastName: 'Lambert',
            active: true,
            isGroupLeader: false,
          },
          {
            documentId: 'leader-5',
            firstName: 'Tom',
            lastName: 'Timmermans',
            active: true,
            isGroupLeader: false,
            image,
            groupFunction: {
              documentId: 'function-3',
              title: 'Hulptakverantwoordelijke',
            },
          },
        ],
      },
    ],
  },
};
