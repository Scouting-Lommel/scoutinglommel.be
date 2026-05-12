import type { JSX } from 'react';
import BlockContainer from '@/components/atoms/BlockContainer';
import YearThemeSection from '@/components/organisms/YearThemeSection';
import { YearThemeBlock as YearThemeBlockProps } from './types';

const YearThemeBlock = ({ cta, yearThemeBlockProperties, yearTheme }: YearThemeBlockProps): JSX.Element => {
  return (
    <BlockContainer
      variant={yearThemeBlockProperties?.variant}
      orientation={yearThemeBlockProperties?.orientation}
      slug={yearThemeBlockProperties?.slug}
      cta={cta}
    >
      <div className="sl-layout">
        <YearThemeSection yearTheme={yearTheme} />
      </div>
    </BlockContainer>
  );
};

export default YearThemeBlock;
