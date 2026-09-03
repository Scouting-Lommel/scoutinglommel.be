import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const body = `# scoutinglommel.be

> Scouting Lommel - Website for Scouting Lommel, a Belgian scouting group in Lommel, Limburg.

## Homepage

- [Scouting Lommel](https://scoutinglommel.be): Main website for Scouting Lommel, with information about the group, activities, and practical details.

## Activiteiten

- [Activiteiten](https://scoutinglommel.be/activiteiten): Overview of all upcoming and past activities for Scouting Lommel.
- [Kampen](https://scoutinglommel.be/kampen): Information about summer camps and other multi-day camps organized by Scouting Lommel.

## Groepen

- [Groepen](https://scoutinglommel.be/groepen): Overview of all age groups (takken) within Scouting Lommel, from Kapoenen to Internationaal.

## Over ons

- [Over ons](https://scoutinglommel.be/over-ons): Information about the history, mission, and organization of Scouting Lommel.
- [Leidingsploeg](https://scoutinglommel.be/over-ons/leidingsploeg): The leadership team behind Scouting Lommel.

## Documenten

- [Documenten](https://scoutinglommel.be/documenten): Useful documents, forms, and resources for members and parents of Scouting Lommel.
`;

export function GET() {
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

export function HEAD() {
  return new NextResponse(null, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
