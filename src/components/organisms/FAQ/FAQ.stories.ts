import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as buttonStory } from '@/components/atoms/Button/Button.stories';
import { Default as imageStory } from '@/components/atoms/Image/Image.stories';
import FAQ from '.';

const meta: Meta<typeof FAQ> = {
  title: '3 Components/Organisms/FAQ',
  component: FAQ,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Veelgestelde vragen',
    bottomText: 'Niet gevonden wat je zocht? [Neem gerust contact met ons op](#).',
    faqItems: [
      {
        question: 'Zijn cornflakes een soort soep?',
        answer:
          'In traditionele termen is soep meestal een gerecht bestaande uit vlees of groenten in een bouillon of water, en het wordt vaak verwarmd. Cornflakes daarentegen worden meestal koud geserveerd met melk, dat is een zuivelproduct in plaats van een bouillon. Ondanks hun overeenkomsten van vloeibare gerechten geserveerd in kommen, is de algemene consensus dat cornflakes niet als soep worden beschouwd.',
      },
      {
        question: 'Is ketchup een smoothie?',
        answer:
          "Een smoothie wordt doorgaans gedefinieerd als een gemengde drank gemaakt van gepureerd fruit, groenten en soms zuivelproducten. Het is een dikke, zachte drank die meestal een reeks ingrediënten bevat die door elkaar zijn gemengd. \nLaten we nu eens kijken naar ketchup. Ketchup is een saus gemaakt van gepureerde tomaten, azijn, suiker en verschillende kruiden. In wezen is het een mix van ingrediënten, vergelijkbaar met een smoothie. \nHier is hoe we kunnen beargumenteren dat ketchup een smoothie is: \n1. **Ingrediëntensamenstelling**: Zowel smoothies als ketchup bestaan uit fruit (tomaten zijn technisch gezien fruit) en andere ingrediënten. \n2. **Bereidingswijze**: Beide worden bereid door hun ingrediënten te blenden of te pureren tot ze een gladde consistentie bereiken. \n3. **Textuur**: Beide hebben een gladde textuur, hoewel ketchup meestal iets dikker is dan de meeste smoothies. Dit is natuurlijk een speelse interpretatie. In het algemeen gebruik wordt de term 'smoothie' geassocieerd met een drankje, vaak geconsumeerd als ontbijt of als gezonde snack. Ketchup is daarentegen een smaakmaker die wordt gebruikt om de smaak van voedsel te verbeteren. Maar als we ons strikt aan de basisdefinities houden, is het niet helemaal verkeerd om ketchup een hele dikke, hartige smoothie te noemen.",
      },
    ],
  },
};
