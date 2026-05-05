export type CloudinaryImage = {
  [x: string]: any;
  name: string;
  width: number;
  height: number;
  url: string;
  hash: string;
  alternativeText?: string | null;
  caption?: string | null;
  ext?: string;
  blurhash?: string;
};

export type Image = {
  data: CloudinaryImage;
  loadingStrategy?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  modMaximisable?: boolean;
  modWithShadow?: boolean;
  modRounded?: boolean;
  modWithCaption?: boolean;
} & React.HTMLAttributes<HTMLElement>;
