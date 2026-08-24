import type { UploadFile } from '@/types/generated/Graphql';
import type { CloudinaryImage } from '@/components/atoms/Image/types';

const toCloudinaryImage = (image: UploadFile): CloudinaryImage => ({
  ...image,
  width: image.width ?? null,
  height: image.height ?? null,
  ext: image.ext ?? undefined,
});

export default toCloudinaryImage;
