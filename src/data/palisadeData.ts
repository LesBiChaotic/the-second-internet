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
  },
  {
    id: 'pal-rowan', handle: 'rowan.glass', name: 'Rowan Glass', headline: 'Night Photographer | Portland, OR', location: 'Portland, OR', joinDate: 'April 2007', relationshipStatus: 'It’s Complicated', avatarUrl: 'avatars/default.jpg', friendsCount: 76, recentStatus: 'Developed three rolls and only ruined one. This qualifies as growth.', statusDate: '2007-08-26 01:12',
    wallPosts: [
      { id: 'pal-w-05', author: 'Noemi Castille', authorAvatar: 'avatars/pal_naomi.jpg', date: '2007-08-27', content: 'Mail me the telephone booth photo! The one where the reflection looks like a second street.' },
      { id: 'pal-w-06', author: 'Rowan Glass', authorAvatar: 'avatars/default.jpg', date: '2007-08-27', content: 'That one stayed blank in the darkroom. I’m sending the laundromat series instead. Much less haunted, much better socks.' },
      { id: 'pal-w-07', author: 'Alden Corliss', authorAvatar: 'avatars/default.jpg', date: '2007-10-14', content: 'The second street still has your bicycle chained outside.', isAnomalous: true }
    ], isAnomalous: true
  },
  {
    id: 'pal-marcus', handle: 'marcus.corliss', name: 'Marcus Corliss', headline: 'Library Assistant | Madison, WI', location: 'Madison, WI', joinDate: 'May 2007', relationshipStatus: 'Married', avatarUrl: 'avatars/pal_markus.jpg', friendsCount: 51, recentStatus: 'Digitizing family photos. Why did every camera in 1994 stamp the date in radioactive orange?', statusDate: '2007-09-03 19:06',
    wallPosts: [
      { id: 'pal-w-08', author: 'Tessa Corliss', authorAvatar: 'avatars/default.jpg', date: '2007-09-03', content: 'Because you refused to read the manual, darling. Please come downstairs; dinner is becoming archaeology.' },
      { id: 'pal-w-09', author: 'Noemi Castille', authorAvatar: 'avatars/pal_naomi.jpg', date: '2007-09-15', content: 'I’m sorry I snapped about the laptop. Keep the family photos. If you find files from AfterHours, please ask before opening them.' },
      { id: 'pal-w-10', author: 'Marcus Corliss', authorAvatar: 'avatars/pal_markus.jpg', date: '2007-09-15', content: 'Understood. I made an encrypted image and put the original in the deposit box. Nothing gets shared without your permission.' }
    ]
  },
  {
    id: 'pal-cassia', handle: 'cassia.reed', name: 'Cassia Reed', headline: 'Campus Radio Producer | Madison, WI', location: 'Madison, WI', joinDate: 'January 2007', relationshipStatus: 'Single', avatarUrl: 'avatars/default.jpg', friendsCount: 133, recentStatus: 'Tonight’s show: songs for fluorescent grocery stores at midnight. Requests welcome.', statusDate: '2007-10-02 22:40',
    wallPosts: [
      { id: 'pal-w-11', author: 'Noemi Castille', authorAvatar: 'avatars/pal_naomi.jpg', date: '2007-10-02', content: 'Play something warm for people doing laundry alone.' },
      { id: 'pal-w-12', author: 'Cassia Reed', authorAvatar: 'avatars/default.jpg', date: '2007-10-03', content: 'Done. Also the station phone rang during a song even though we disconnected that line last spring. I did not answer it.' },
      { id: 'pal-w-13', author: 'Julian Frost', authorAvatar: 'avatars/pal_frost.jpg', date: '2007-10-14', content: 'Request: eleven minutes of clear weather.', isAnomalous: true }
    ]
  },
  {
    id: 'pal-corbin', handle: 'corbin.keller', name: 'Corbin Keller', headline: 'Systems Consultant | Milwaukee, WI', location: 'Milwaukee, WI', joinDate: 'February 2007', relationshipStatus: 'In a Relationship', avatarUrl: 'avatars/default.jpg', friendsCount: 88, recentStatus: 'Retired another beige server today. It fought bravely and smelled terrible.', statusDate: '2007-06-19 18:22',
    wallPosts: [
      { id: 'pal-w-14', author: 'Alden Corliss', authorAvatar: 'avatars/default.jpg', date: '2007-06-19', content: 'You never retired Rack #4. You only moved the door.', isAnomalous: true },
      { id: 'pal-w-15', author: 'Corbin Keller', authorAvatar: 'avatars/default.jpg', date: '2007-06-20', content: 'Whoever is impersonating Alden: stop. This account belongs to a dead friend, not an ARG.' },
      { id: 'pal-w-16', author: 'Noemi Castille', authorAvatar: 'avatars/pal_naomi.jpg', date: '2007-06-20', content: 'Screenshot it, report it, then log off. Do not engage and do not send it personal information.' }
    ], isAnomalous: true
  },
  {
    id: 'pal-maribel', handle: 'maribel.ortiz', name: 'Maribel Ortiz', headline: 'Customer Operations Manager | Milwaukee, WI', location: 'Milwaukee, WI', joinDate: 'July 2007', relationshipStatus: 'Married', avatarUrl: 'avatars/default.jpg', friendsCount: 109, recentStatus: 'My tomatoes survived the heat and my team survived quarter close. Miracles remain possible.', statusDate: '2007-08-31 17:55',
    wallPosts: [
      { id: 'pal-w-17', author: 'Betty Lin', authorAvatar: 'avatars/default.jpg', date: '2007-09-01', content: 'You forgot the third miracle: the billing printer only jammed twice.' },
      { id: 'pal-w-18', author: 'Maribel Ortiz', authorAvatar: 'avatars/default.jpg', date: '2007-09-01', content: 'We do not praise it where it can hear us.' },
      { id: 'pal-w-19', author: 'Douglas Van Houten', authorAvatar: 'avatars/default.jpg', date: '2007-09-04', content: 'I still owe night operations three coffees from 1998. Some debts propagate farther than expected.' }
    ]
  }
];
