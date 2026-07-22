'use client';

import cn from 'classnames';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, type JSX } from 'react';
import Link from '@/components/atoms/Link';
import { Typography as TypographyProps } from './types';
import MarkdownRenderer from './renderers/MarkdownRenderer';
import StructuredTextRenderer from './renderers/StructuredTextRenderer';
import './Typography.css';

const hasMoreLines = (element: HTMLElement, maxLines: number) => {
  const lineHeight = parseInt(window.getComputedStyle(element).lineHeight) || 1.3;
  const height = element.scrollHeight;
  return height > lineHeight * (maxLines + 1);
};

const Typography = ({
  data,
  modNoStyle,
  modPreWrap,
  variant = 'default',
  tagName = 'div',
  numberOfLines,
  children,
  wrapperClassName,
  className,
}: TypographyProps): JSX.Element => {
  const t = useTranslations('common');
  const ref = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldClamp, setShouldClamp] = useState(false);

  const wrapperClasses = cn('typography-wrapper', wrapperClassName);

  const typographyClasses = cn(
    'typography',
    `typography--${variant}`,
    !modNoStyle && 'typography--styled',
    modPreWrap && 'typography--pre-wrap',
    isExpanded && 'typography--expanded',
    className,
  );

  const typographyStyles: React.CSSProperties | undefined =
    numberOfLines && !isExpanded
      ? {
          WebkitLineClamp: numberOfLines,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          maxHeight: isExpanded ? 'none' : undefined,
        }
      : undefined;

  const TagName: keyof JSX.IntrinsicElements = tagName;

  useEffect(() => {
    const element = ref.current;
    if (!element || !numberOfLines) return;

    const checkOverflow = () => {
      setShouldClamp(hasMoreLines(element, numberOfLines));
    };

    setTimeout(checkOverflow, 0);

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(checkOverflow, 100);
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [numberOfLines, data, children]);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const renderContent = () => {
    if (data && Array.isArray(data) && 'type' in (data[0] || {})) {
      return <StructuredTextRenderer data={data} />;
    }

    if (data && typeof data === 'string') {
      return <MarkdownRenderer data={data} className={typographyClasses} />;
    }

    return children;
  };

  if (!data && !children) return <></>;

  return (
    <div className={wrapperClasses}>
      <TagName ref={ref} className={typographyClasses} style={typographyStyles}>
        {renderContent()}
      </TagName>
      {Boolean(numberOfLines) && shouldClamp && (
        <Link variant="link3" className="typography__read-more" onClick={handleToggle}>
          {isExpanded ? t('readLess') : t('readMore')}
        </Link>
      )}
    </div>
  );

  return <></>;
};

export default Typography;
