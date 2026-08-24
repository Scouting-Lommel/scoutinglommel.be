const deriveEmail = (firstName: string, lastName: string): string => {
  const localPart = `${firstName}.${lastName}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9.]/g, '');
  return `${localPart}@scoutinglommel.be`;
};

export default deriveEmail;
