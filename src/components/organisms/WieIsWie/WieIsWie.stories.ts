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
            totem: 'Razende Rivier',
            dateOfBirth: '1988-04-12',
            occupation: 'Leerkracht basisonderwijs',
            isStudent: false,
            fieldOfStudy: null,
            memberSince: 24,
            leaderSince: 8,
            bio: 'Als takverantwoordelijke zorg ik ervoor dat elke zaterdag een nieuw avontuur wordt voor onze jongste kapoenen.',
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
            totem: 'Vlugge Vos',
            dateOfBirth: '1995-09-03',
            occupation: null,
            isStudent: true,
            fieldOfStudy: 'Industrieel ingenieur',
            memberSince: 12,
            leaderSince: 3,
            bio: null,
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
            totem: 'Moedige Merel',
            dateOfBirth: '1992-11-20',
            occupation: 'Verpleegkundige',
            isStudent: false,
            fieldOfStudy: null,
            memberSince: 18,
            leaderSince: 6,
            bio: 'De welpen zijn mijn tweede thuis. Ik hou ervan om samen met de kinderen te bouwen, spelen en ontdekken.',
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
            totem: 'Lichte Leeuw',
            dateOfBirth: '1998-02-15',
            occupation: 'Student',
            isStudent: true,
            fieldOfStudy: 'Rechten',
            memberSince: 14,
            leaderSince: 2,
            bio: null,
            active: true,
            isGroupLeader: false,
          },
          {
            documentId: 'leader-5',
            firstName: 'Tom',
            lastName: 'Timmermans',
            totem: 'Trotse Torenvalk',
            dateOfBirth: '1990-07-08',
            occupation: 'Timmerman',
            isStudent: false,
            fieldOfStudy: null,
            memberSince: 22,
            leaderSince: 5,
            bio: 'Altijd in voor een goed kampvuurverhaal en een uitdagend spel in het bos.',
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
