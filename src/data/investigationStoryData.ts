export interface StoryChapter {
  title: string;
  brief: string;
  outcome: string;
  threshold: number;
}

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    title: 'Ordinary Archive',
    brief: 'Establish a clean baseline before trusting the reconstruction.',
    outcome: 'The public archive is not as static as its catalog claims.',
    threshold: 0
  },
  {
    title: 'Cross-Contamination',
    brief: 'Trace the October 2003 event through sources that should not agree.',
    outcome: 'Independent archives repeat the same impossible route and timestamp.',
    threshold: 1
  },
  {
    title: 'The Human Cost',
    brief: 'Stop treating the records as packets. Identify who remained inside them.',
    outcome: 'Alden, Noemi, Douglas, and wintermute42 form a human chain across the breach.',
    threshold: 3
  },
  {
    title: 'Aperture',
    brief: 'Separate investigative progress from authorization, then test the boundary.',
    outcome: 'The route can be observed publicly; institutional systems still require a real keycard.',
    threshold: 6
  },
  {
    title: 'Stable Crossing',
    brief: 'Decide whether the mesh is an archive, a refuge, or a living witness.',
    outcome: 'The crossing is a narrative route—not a staff promotion.',
    threshold: 9
  }
];
