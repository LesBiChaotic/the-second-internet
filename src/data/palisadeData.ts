import { PalisadeProfile } from '../types';

export const palisadeProfiles: PalisadeProfile[] = [
  {
    id: 'pal-noemi',
    handle: 'noemi.castille',
    name: 'Noemi Castille',
    headline: 'Digital Media Specialist | Chicago, IL',
    location: 'Chicago, IL',
    joinDate: 'June 2007',
    relationshipStatus: 'In a Relationship',
    avatarUrl: 'avatars/pal_naomi.jpg',
    friendsCount: 184,
    recentStatus: 'Finally finished unpacking the new apartment in Lincoln Park! Anyone know a good coffee place near Clark?',
    statusDate: '2007-09-12 16:40',
    wallPosts: [
      {
        id: 'pal-w-01',
        author: 'Marcus Corliss',
        authorAvatar: 'avatars/pal_markus.jpg',
        date: '2007-09-14',
        content: 'Hey Noemi! Uncle Alden\'s old laptop was finally returned to us by the police. There are some old backup files on here with your name on them if you want copies.'
      },
      {
        id: 'pal-w-02',
        author: 'Noemi Castille',
        authorAvatar: 'avatars/pal_naomi.jpg',
        date: '2007-09-14',
        content: 'Marcus, please do not mail them to me. Please delete them. I mean it.'
      }
    ]
  },
  {
    id: 'pal-frost',
    handle: 'julian.frost',
    name: 'Julian Frost (weatherboy)',
    headline: 'Meteorology Student | Twin Cities',
    location: 'Minneapolis, MN',
    joinDate: 'March 2007',
    relationshipStatus: 'Single',
    avatarUrl: 'avatars/pal_frost.jpg',
    friendsCount: 92,
    recentStatus: 'Barometric pressure 29.92 inHg. Wind calm. Clear skies over the unmapped lake.',
    statusDate: '2007-10-14 03:14 (Posted 400 days after recorded date of death)',
    isAnomalous: true,
    wallPosts: [
      {
        id: 'pal-w-03',
        author: 'Anonymous Classmate',
        authorAvatar: 'avatars/default.jpg',
        date: '2007-10-15',
        content: 'Who is running Julian\'s account?? Julian died in a car crash on I-94 last year. This is really sick, take this down.'
      },
      {
        id: 'pal-w-04',
        author: 'Julian Frost',
        authorAvatar: 'avatars/pal_frost.jpg',
        date: '2007-10-15',
        content: 'The car did not stop at the exit. The highway just continued into the next subnet.',
        isAnomalous: true
      }
    ]
  }
];
