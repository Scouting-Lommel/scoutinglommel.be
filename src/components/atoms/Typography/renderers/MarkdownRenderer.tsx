'use client';
import type { JSX } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import sanitizeHtml from 'sanitize-html';
import { MarkdownRendererProps } from '../types';

const MarkdownRenderer = ({ data, className }: MarkdownRendererProps): JSX.Element => {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {sanitizeHtml(data)}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
