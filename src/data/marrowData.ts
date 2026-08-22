import { ForumThread } from '../types';

export interface MarrowMember {
  handle: string;
  realName: string;
  joinDate: string;
  major: string;
  homepageUrl: string;
  status: string;
  quote: string;
  postCount: number;
  isAnomalous?: boolean;
}

export const marrowMembers: MarrowMember[] = [
  {
    handle: 'nyxgirl',
    realName: 'Noemi Castille',
    joinDate: 'Nov 14, 1997',
    major: 'Comparative Literature / CompSci Minor',
    homepageUrl: 'users/nyxgirl',
    status: 'Online',
    quote: 'we are all just html tables floating in the void ~*',
    postCount: 142
  },
  {
    handle: 'pixelpunk',
    realName: 'Corbin Keller',
    joinDate: 'Oct 02, 1997',
    major: 'Electrical Engineering',
    homepageUrl: 'users/pixelpunk',
    status: 'Offline',
    quote: 'Compile without warnings or die trying.',
    postCount: 388
  },
  {
    handle: 'wintermute42',
    realName: '[Restricted / Undefined]',
    joinDate: 'Apr 12, 1998 (Database lists 2004)',
    major: 'None',
    homepageUrl: 'users/wintermute42',
    status: 'Online',
    quote: 'The street finds its own uses for things.',
    postCount: 19,
    isAnomalous: true
  },
  {
    handle: 'cassia_m',
    realName: 'Cassia Morello',
    joinDate: 'May 12, 1998',
    major: 'Music Theory',
    homepageUrl: 'users/cassia_m',
    status: 'Offline',
    quote: 'C minor is the saddest key in existence.',
    postCount: 67
  },
  {
    handle: 'corliss_a',
    realName: 'Alden Corliss',
    joinDate: 'Feb 19, 1998',
    major: 'Philosophy & Logic',
    homepageUrl: 'users/corliss_a',
    status: 'Offline',
    quote: 'The night is a different country.',
    postCount: 94
  },
  {
    handle: 'redshift',
    realName: 'Bram Kostadinov',
    joinDate: 'Dec 01, 1997',
    major: 'Physics',
    homepageUrl: 'users/redshift',
    status: 'Away',
    quote: 'Linux 2.0.33 kernel is peak human achievement.',
    postCount: 512
  }
];

export const marrowGuestbook = [
  {
    id: 'gb-01',
    author: 'CoolDude99',
    date: '1998-03-14',
    location: 'Austin, TX',
    comment: 'Awesome portal!! Love the dark teal background and the spinning skull GIF lol. Keep it up Madison crew!'
  },
  {
    id: 'gb-02',
    author: 'nyxgirl',
    date: '1998-04-02',
    location: 'Madison, WI',
    comment: 'Welcome to all the new spring semester transfers! Make sure to sign up for the IRC channel #marrow on EFnet.'
  },
  {
    id: 'gb-03',
    author: 'redshift',
    date: '1998-05-19',
    location: 'Madison, WI',
    comment: 'Whoever keeps unplugging the web server in the CS lab basement to plug in their mini-fridge, I will personally compile a curse into your kernel.'
  },
  {
    id: 'gb-04',
    author: 'wintermute42',
    date: '1998-06-11',
    location: 'Unknown',
    comment: 'The door in room 4 is open. You have not noticed yet.',
    isAnomalous: true
  },
  {
    id: 'gb-05',
    author: 'CyberKitten',
    date: '1998-09-01',
    location: 'Chicago, IL',
    comment: 'Hey guys! Found your webring from Yahoo! directory. Great links page!'
  }
];

export const marrowThreads: ForumThread[] = [
  {
    id: 'mw-th-01',
    siteId: 'marrow',
    title: 'Welcome to Marrow.net Forum v1.4 (Please read rules)',
    category: 'Announcements',
    createdDate: '1997-11-14',
    authorHandle: 'pixelpunk',
    replyCount: 4,
    viewCount: 1240,
    isPinned: true,
    posts: [
      {
        id: 'mw-p-01-1',
        authorHandle: 'pixelpunk',
        authorTitle: 'Webmaster / Admin',
        authorJoinDate: 'Oct 1997',
        authorPostCount: 388,
        timestamp: '1997-11-14 18:22',
        content: 'Welcome everyone! We finally migrated from the old flat-file guestbook script to our own custom Perl/CGI discussion board. Please keep discussions civil, no pirated commercial software links on the public board (use FTP for that), and remember to link your homepages in your profile!'
      },
      {
        id: 'mw-p-01-2',
        authorHandle: 'nyxgirl',
        authorTitle: 'Ringmaster',
        authorJoinDate: 'Nov 1997',
        authorPostCount: 142,
        timestamp: '1997-11-14 19:05',
        content: 'Congrats Corbin! The teal looks great. I will start importing the member directory links tonight.'
      },
      {
        id: 'mw-p-01-3',
        authorHandle: 'redshift',
        authorTitle: 'Kernel God',
        authorJoinDate: 'Dec 1997',
        authorPostCount: 512,
        timestamp: '1997-11-14 20:11',
        content: 'CGI script is leaking memory on Apache child processes. I give it 3 days before we crash the CS department subnet.'
      }
    ]
  },
  {
    id: 'mw-th-02',
    siteId: 'marrow',
    title: 'Broken links in the user directory taking you to weird pages?',
    category: 'Tech Support & Bugs',
    createdDate: '1998-11-19',
    authorHandle: 'nyxgirl',
    replyCount: 8,
    viewCount: 2890,
    isAnomalous: true,
    posts: [
      {
        id: 'mw-p-02-1',
        authorHandle: 'nyxgirl',
        authorTitle: 'Ringmaster',
        authorJoinDate: 'Nov 1997',
        authorPostCount: 142,
        timestamp: '1998-11-19 23:44',
        content: 'Has anyone else had this happen? I was auditing the user links directory for dead homepages. I clicked on an old member URL and mistyped it as /~room/nyxgirl. Instead of our 404 page, it loaded a completely unstyled white page that had a single text line: "Noemi is typing in room 214 of Chadbourne Hall."\n\nCorbin, are you running a prank script or something? How did it know my dorm room number?'
      },
      {
        id: 'mw-p-02-2',
        authorHandle: 'pixelpunk',
        authorTitle: 'Webmaster / Admin',
        authorJoinDate: 'Oct 1997',
        authorPostCount: 388,
        timestamp: '1998-11-20 00:15',
        content: 'Definitely not me. I don\'t even know what dorm you\'re in Noemi. We don\'t have an alias for /~room/ in the httpd.conf file. It should return a standard 404.'
      },
      {
        id: 'mw-p-02-3',
        authorHandle: 'redshift',
        authorTitle: 'Kernel God',
        authorJoinDate: 'Dec 1997',
        authorPostCount: 512,
        timestamp: '1998-11-20 01:04',
        content: 'Checked the Apache access logs. The request never hit our physical server box. Your browser resolved /~room/ through Greyline\'s upstream proxy node in Milwaukee. Weird routing glitch.'
      },
      {
        id: 'mw-p-02-4',
        authorHandle: 'wintermute42',
        authorTitle: 'Member',
        authorJoinDate: 'Apr 1998 (2004)',
        authorPostCount: 19,
        timestamp: '1998-11-20 03:31',
        isAnomalous: true,
        content: 'The room was not empty when you left the light on.'
      },
      {
        id: 'mw-p-02-5',
        authorHandle: 'nyxgirl',
        authorTitle: 'Ringmaster',
        authorJoinDate: 'Nov 1997',
        authorPostCount: 142,
        timestamp: '1998-11-20 08:12',
        content: 'Who is wintermute42? You joined in April but your profile says registered in 2004?? Corbin, check the database.'
      }
    ]
  },
  {
    id: 'mw-th-bandwidth',
    siteId: 'marrow',
    title: 'How to bypass Chadbourne Hall 28.8k modem throttling (MP3 guide)',
    category: 'Tech Support & Bugs',
    createdDate: '1998-10-04',
    authorHandle: 'pixelpunk',
    replyCount: 11,
    viewCount: 1680,
    posts: [
      {
        id: 'mw-p-bw-1',
        authorHandle: 'pixelpunk',
        authorTitle: 'Webmaster / Admin',
        authorJoinDate: 'Oct 1997',
        authorPostCount: 388,
        timestamp: '1998-10-04 21:05',
        content: 'If the campus PBX keeps dropping your connection after 45 minutes of downloading 3MB MP3s from IRC DCC bots, add AT&F1S11=40 into your modem initialization string. It forces the Hayes command set to ignore the carrier drop pulse.'
      },
      {
        id: 'mw-p-bw-2',
        authorHandle: 'redshift',
        authorTitle: 'Kernel God',
        authorJoinDate: 'Dec 1997',
        authorPostCount: 512,
        timestamp: '1998-10-04 22:30',
        content: 'Or just run a 100-foot CAT5 cable out your dorm window into the basement telco riser behind the vending machines like a civilized human being.'
      }
    ]
  },
  {
    id: 'mw-th-03',
    siteId: 'marrow',
    title: 'Netscape 4.08 vs Internet Explorer 4.0 - flame wars go here',
    category: 'General Discussion',
    createdDate: '1998-04-15',
    authorHandle: 'redshift',
    replyCount: 12,
    viewCount: 940,
    posts: [
      {
        id: 'mw-p-03-1',
        authorHandle: 'redshift',
        authorTitle: 'Kernel God',
        authorJoinDate: 'Dec 1997',
        authorPostCount: 512,
        timestamp: '1998-04-15 14:10',
        content: 'If you use IE4 with its Active Desktop garbage you are actively inviting Bill Gates to install spyware into your kernel. Netscape Navigator forever.'
      },
      {
        id: 'mw-p-03-2',
        authorHandle: 'pixelpunk',
        authorTitle: 'Webmaster / Admin',
        authorJoinDate: 'Oct 1997',
        authorPostCount: 388,
        timestamp: '1998-04-15 15:20',
        content: 'Netscape tables render like molasses when nested 3 levels deep. IE4 CSS support is honestly 10x better even if Microsoft is an evil monopoly.'
      }
    ]
  },
  {
    id: 'mw-th-04',
    siteId: 'marrow',
    title: 'Late night music recommendations (post your favorite mp3s)',
    category: 'Music & Arts',
    createdDate: '1998-09-22',
    authorHandle: 'cassia_m',
    replyCount: 6,
    viewCount: 620,
    posts: [
      {
        id: 'mw-p-04-1',
        authorHandle: 'cassia_m',
        authorTitle: 'Member',
        authorJoinDate: 'May 1998',
        authorPostCount: 67,
        timestamp: '1998-09-22 01:14',
        content: 'Listening to Portishead - Dummy and Slowdive - Souvlaki on repeat through Winamp. What is everyone else listening to while coding at 2am?'
      },
      {
        id: 'mw-p-04-2',
        authorHandle: 'corliss_a',
        authorTitle: 'Member',
        authorJoinDate: 'Feb 1998',
        authorPostCount: 94,
        timestamp: '1998-09-22 02:40',
        content: 'Brian Eno - Music for Airports. Music that exists in the background of empty places. I am thinking of building a new board specifically for nocturnal thoughts. A place called AfterHours.'
      }
    ]
  },
  {
    id: 'mw-th-laundry-truce', siteId: 'marrow', title: 'Dorm laundry theft amnesty thread (return the red sweater)', category: 'General Discussion', createdDate: '1998-10-02', authorHandle: 'nyxgirl', replyCount: 9, viewCount: 488,
    posts: [
      { id: 'mw-p-laundry-1', authorHandle: 'nyxgirl', authorTitle: 'Ringmaster', authorJoinDate: 'Nov 1997', authorPostCount: 142, timestamp: '1998-10-02 19:08', content: 'Someone took my red wool sweater from dryer three in Chadbourne. Return it to the front desk and I will ask no questions. It was my mother’s and it shrank perfectly.' },
      { id: 'mw-p-laundry-2', authorHandle: 'cassia_m', authorTitle: 'Member', authorJoinDate: 'May 1998', authorPostCount: 67, timestamp: '1998-10-02 19:31', content: 'Not me, but dryer three runs hot enough to open a portal to Wisconsin hell. I lost two socks and a Cure shirt there.' },
      { id: 'mw-p-laundry-3', authorHandle: 'corliss_a', authorTitle: 'Member', authorJoinDate: 'Feb 1998', authorPostCount: 94, timestamp: '1998-10-02 23:17', content: 'Found it folded on the basement telephone shelf. Nobody was down there, but the payphone receiver was off the hook. I left the sweater with the desk attendant.' }
    ]
  },
  {
    id: 'mw-th-zine-night', siteId: 'marrow', title: 'Friday photocopy zine night — bring scissors and terrible poetry', category: 'Music & Arts', createdDate: '1998-10-09', authorHandle: 'cassia_m', replyCount: 13, viewCount: 704,
    posts: [
      { id: 'mw-p-zine-1', authorHandle: 'cassia_m', authorTitle: 'Member', authorJoinDate: 'May 1998', authorPostCount: 67, timestamp: '1998-10-09 16:22', content: 'Student union basement at eight. I have glue sticks, old magazines, and exactly twelve dollars of copy credit. Theme is “places you only visit at night.”' },
      { id: 'mw-p-zine-2', authorHandle: 'nyxgirl', authorTitle: 'Ringmaster', authorJoinDate: 'Nov 1997', authorPostCount: 142, timestamp: '1998-10-09 17:02', content: 'I’m bringing the photos Corbin took of the server room. The fluorescent lights made all of us look already archived.' },
      { id: 'mw-p-zine-3', authorHandle: 'pixelpunk', authorTitle: 'Webmaster / Admin', authorJoinDate: 'Oct 1997', authorPostCount: 388, timestamp: '1998-10-10 01:48', content: 'Good night. Whoever slipped the page reading “ROOM 4 MISSES ALDEN” into the master copy: funny once, unsettling after thirty duplicate sheets.' }
    ]
  },
  {
    id: 'mw-th-phone-bill', siteId: 'marrow', title: 'Mystery 11-minute calls on dorm phone bills', category: 'Tech Support & Bugs', createdDate: '1998-11-27', authorHandle: 'corliss_a', replyCount: 10, viewCount: 1329, isAnomalous: true,
    posts: [
      { id: 'mw-p-bill-1', authorHandle: 'corliss_a', authorTitle: 'Member', authorJoinDate: 'Feb 1998', authorPostCount: 94, timestamp: '1998-11-27 00:14', content: 'Check your November statements. Mine shows an outgoing call at 03:14 every Tuesday, always exactly eleven minutes, destination listed only as EXT 0047. I am awake then and I have never placed it.' },
      { id: 'mw-p-bill-2', authorHandle: 'pixelpunk', authorTitle: 'Webmaster / Admin', authorJoinDate: 'Oct 1997', authorPostCount: 388, timestamp: '1998-11-27 00:42', content: 'Same charge on the CS lab line and it is not attached to our campus PBX. I’ll ask Greyline whether their modem pool is seizing the voice circuit.' },
      { id: 'mw-p-bill-3', authorHandle: 'wintermute42', authorTitle: 'Member', timestamp: '1998-11-27 03:14', authorPostCount: 19, content: 'The call is not outgoing.', isAnomalous: true }
    ]
  }
];

export const marrowBelowContent = {
  url: 'archive/marrow/below',
  title: 'MARROW // BELOW (UNINDEXED SECTOR)',
  timestamp: '1998-11-20T03:31:00Z',
  observedAnomaly: 'Unmapped directory branch residing outside physical server root.',
  content: `
  [SYSTEM STATUS: CONNECTED THROUGH GREYLINE NODE 04 (MILWAUKEE)]
  [REMOTE PEER: 0.0.0.0/room]
  
  MEMBER CACHE:
  --------------------------------------------------
  nyxgirl (Noemi Castille): Present / 214 Chadbourne Hall
  pixelpunk (Corbin Keller): Present / CS Lab Terminal 12
  wintermute42: Present / EVERYWHERE ON THE SECOND BUS
  corliss_a (Alden Corliss): Away from network (Scheduled departure: 2003)
  
  "The archive is not a museum of what was.
   It is a blueprint of what cannot be closed."
  
  [CLICK HERE TO RETURN UP]
  `
};
