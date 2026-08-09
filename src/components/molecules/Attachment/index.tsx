import type { JSX } from 'react';
import { Attachment as AttachmentProps } from './types';
import File from './components/File';
import Link from './components/Link';

const Attachment = (props: AttachmentProps): JSX.Element => {
  switch (props.variant) {
    case 'link': {
      return (
        <Link
          {...props.link}
          groupId={props.groupId}
          allLinks={props.allLinks}
          deleteCallback={props.deleteCallback}
          modDeleteable={props.modDeleteable}
        />
      );
    }

    case 'file': {
      return (
        <File
          {...props.file}
          groupId={props.groupId}
          allFiles={props.allFiles}
          deleteCallback={props.deleteCallback}
          modDeleteable={props.modDeleteable}
        />
      );
    }

    default: {
      console.warn('No component found for this variant');
      return <></>;
    }
  }
};

export default Attachment;
