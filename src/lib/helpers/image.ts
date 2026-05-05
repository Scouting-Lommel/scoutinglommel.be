const generateImageUrl = (hash: string): string => {
  return `https://res.cloudinary.com/scoutinglommel/${hash}.webp`;
};

export { generateImageUrl };
