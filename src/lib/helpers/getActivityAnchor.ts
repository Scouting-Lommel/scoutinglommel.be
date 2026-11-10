import { slugify } from './slugify';

type ActivityAnchorInput = {
  title: string;
  startDate: string;
};

// Title plus start date: the same title repeats across a group's calendar, so
// the title alone would produce duplicate ids.
const getActivityAnchor = ({ title, startDate }: ActivityAnchorInput): string =>
  `${slugify(title) || 'activiteit'}-${startDate}`;

// Suffixes repeated anchors with -2, -3, ... so a list never renders duplicate
// ids.
const getActivityAnchors = (items: ActivityAnchorInput[]): string[] => {
  const seen = new Map<string, number>();

  return items.map((item) => {
    const anchor = getActivityAnchor(item);
    const count = (seen.get(anchor) ?? 0) + 1;
    seen.set(anchor, count);

    return count === 1 ? anchor : `${anchor}-${count}`;
  });
};

export { getActivityAnchor, getActivityAnchors };
