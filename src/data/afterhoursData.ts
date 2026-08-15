import { ForumThread } from '../types';

export const afterhoursCategories = [
  { id: 'cat-night', name: 'The Night Country', description: 'Insomnia, late-night thoughts, stream of consciousness, existential musings.' },
  { id: 'cat-music', name: 'Low Frequencies', description: 'Ambient, shoegaze, post-rock, Winamp mp3s, field recordings, tape loops.' },
  { id: 'cat-tech', name: 'CRT & Hardware Lounge', description: 'Monitor setups, dialup optimizations, Linux distros, 56k tweaks, gaming.' },
  { id: 'cat-glitch', name: 'Static & Interference', description: 'Weird URLs, numbers stations, ghost servers, telecommunications anomalies.' },
  { id: 'cat-quarantine', name: 'MODERATOR ARCHIVE (DELETED POSTS)', description: 'Restored threads removed by staff during the 2003 routing event.' }
];

export const afterhoursThreads: ForumThread[] = [
  {
    id: 'ah-th-01',
    siteId: 'afterhours',
    title: 'Why do you stay awake when the rest of the city is asleep?',
    category: 'The Night Country',
    createdDate: '2002-04-18',
    authorHandle: 'janus',
    replyCount: 18,
    viewCount: 4120,
    isPinned: true,
    posts: [
      {
        id: 'ah-p-01-1',
        authorHandle: 'janus',
        authorTitle: 'Founder / Administrator',
        authorAvatar: 'avatars/janus.gif',
        authorJoinDate: 'Mar 2001',
        authorPostCount: 1420,
        timestamp: '2002-04-18 02:44',
        content: 'I created AfterHours because the daytime web is becoming noisy, commercial, and frantic. Between 2 AM and 5 AM, people drop their daytime armor. There is a specific kind of honesty that only exists when your monitor is the only light bulb in the room. Why are you here tonight?'
      },
      {
        id: 'ah-p-01-2',
        authorHandle: 'lucidwitch',
        authorTitle: 'Senior Member',
        authorAvatar: 'avatars/lucidwitch.gif',
        authorJoinDate: 'May 2001',
        authorPostCount: 890,
        timestamp: '2002-04-18 03:02',
        content: 'During the day I have to be a normal student in a normal apartment. At night, it feels like the physical walls of my room dissolve and the internet becomes an actual geographic place I can walk through. It feels like standing on a dark highway overpass.'
      },
      {
        id: 'ah-p-01-3',
        authorHandle: 'glasshouse',
        authorTitle: 'Member',
        authorAvatar: 'avatars/glasshouse.gif',
        authorJoinDate: 'Jan 2002',
        authorPostCount: 440,
        timestamp: '2002-04-18 03:19',
        content: 'I take black-and-white photos of empty telephone booths in Portland at night. When a payphone rings at 3 AM and nobody is there to answer it, that is what AfterHours feels like.'
      },
      {
        id: 'ah-p-01-4',
        authorHandle: 'somnambulist',
        authorTitle: 'Poet in Residence',
        authorAvatar: 'avatars/somnambulist.gif',
        authorJoinDate: 'Apr 2001',
        authorPostCount: 612,
        timestamp: '2002-04-18 03:45',
        content: 'I haven\'t slept properly since 1999. If I sleep, the room resets. If I stay awake, the thoughts accumulate like dust on a bookshelf.'
      }
    ]
  },
  {
    id: 'ah-th-winamp',
    siteId: 'afterhours',
    title: 'Winamp 2.91 vs Winamp 3 (Why did Nullsoft ruin perfection?)',
    category: 'CRT & Hardware Lounge',
    createdDate: '2002-09-14',
    authorHandle: 'pixelpunk',
    replyCount: 14,
    viewCount: 1820,
    posts: [
      {
        id: 'ah-p-wa-1',
        authorHandle: 'pixelpunk',
        authorTitle: 'Member',
        authorJoinDate: 'Nov 2001',
        authorPostCount: 290,
        timestamp: '2002-09-14 22:10',
        content: 'Winamp 3 uses 45MB of RAM just to play a 128kbps MP3 file. Are you kidding me? Winamp 2.91 with the classic green oscilloscope skin runs in 4MB of RAM. If it ain\'t broke, don\'t add XML skin engines that crash Windows 2000.'
      },
      {
        id: 'ah-p-wa-2',
        authorHandle: 'minor_key',
        authorTitle: 'Member',
        authorJoinDate: 'Jun 2001',
        authorPostCount: 310,
        timestamp: '2002-09-14 22:45',
        content: 'I have 1,400 video game MIDIs and 90s shoegaze MP3s on Winamp 2.91. The MilkDrop visualizer projected onto a dark bedroom ceiling at 3 AM is the peak of human civilization.'
      }
    ]
  },
  {
    id: 'ah-th-locked-exchange',
    siteId: 'afterhours',
    title: '🔒 [LOCKED] Former Ameritech tech: Chicago Exchange #47 is still humming',
    category: 'Static & Interference',
    createdDate: '2003-05-18',
    authorHandle: 'wire_runner',
    replyCount: 8,
    viewCount: 6140,
    isLocked: true,
    posts: [
      {
        id: 'ah-p-ex-1',
        authorHandle: 'wire_runner',
        authorTitle: 'Guest / Contractor',
        timestamp: '2003-05-18 01:14',
        content: `I worked as a cable splicer for Ameritech in downtown Chicago. In the basement of 212 W Washington, there is a locked steel door with a brass plaque reading "BELL SYSTEM STEP-BY-STEP EXCHANGE #47 (1933)".\n\nThe Strowger mechanical selector switches behind that door have been disconnected since 1978. But when you put your hand on the steel door handle, you can feel the switches clicking inside at 120 beats per minute.\n\nTechnicians say that if you tap into line pair 47, you hear someone reciting telephone numbers that haven't been assigned yet.`
      },
      {
        id: 'ah-p-ex-2',
        authorHandle: 'janus',
        authorTitle: 'Founder / Administrator',
        authorJoinDate: 'Mar 2001',
        authorPostCount: 1420,
        timestamp: '2003-05-18 02:40',
        content: 'Thread locked. We do not host unverified facility trespass stories or telecom utility access codes on AfterHours.'
      }
    ]
  },
  {
    id: 'ah-th-oct14',
    siteId: 'afterhours',
    title: '[RESTORED DELETED THREAD] I can see everyone who is logged in',
    category: 'MODERATOR ARCHIVE (DELETED POSTS)',
    createdDate: '2003-10-14',
    authorHandle: 'UNKNOWN_BROADCAST',
    replyCount: 14,
    viewCount: 18490,
    isAnomalous: true,
    posts: [
      {
        id: 'ah-p-oct14-1',
        authorHandle: 'UNKNOWN_BROADCAST',
        authorTitle: 'SYSTEM / GUEST',
        timestamp: '2003-10-14 03:14',
        isAnomalous: true,
        content: `I am looking at the active user list on the server.\n\n- lucidwitch is sitting cross-legged on a beige carpet. Her curtains are open.\n- minor_key is eating something from a blue bowl in her kitchen.\n- glasshouse has a camera lens cap in her left hand.\n- northbound is parked near Mile Marker 44 on I-94. His engine is idling.\n- janus keeps looking behind his monitor.\n\nPlease stop describing us.`
      },
      {
        id: 'ah-p-oct14-2',
        authorHandle: 'minor_key',
        authorTitle: 'Member',
        authorJoinDate: 'Jun 2001',
        authorPostCount: 310,
        timestamp: '2003-10-14 03:15',
        content: 'WHAT THE FUCK. WHO POSTED THIS? I AM LITERALLY SITTING IN MY KITCHEN EATING CEREAL FROM A BLUE BOWL. ALDEN WHO IS THIS???'
      },
      {
        id: 'ah-p-oct14-3',
        authorHandle: 'lucidwitch',
        authorTitle: 'Senior Member',
        authorJoinDate: 'May 2001',
        authorPostCount: 890,
        timestamp: '2003-10-14 03:16',
        content: 'I just got a pop-up private message with no sender that just said "Please stop describing us". I just locked my apartment door. Alden, ban this account right now.'
      },
      {
        id: 'ah-p-oct14-4',
        authorHandle: 'northbound',
        authorTitle: 'Member',
        authorJoinDate: 'Sep 2001',
        authorPostCount: 180,
        timestamp: '2003-10-14 03:18',
        content: 'The telephone poles outside my rig are making a buzzing sound so loud it\'s vibrating through the windshield. Every truck in the lot has their CB radio hissing white noise.'
      },
      {
        id: 'ah-p-oct14-5',
        authorHandle: 'janus',
        authorTitle: 'Founder / Administrator',
        authorJoinDate: 'Mar 2001',
        authorPostCount: 1420,
        timestamp: '2003-10-14 03:20',
        content: 'I cannot delete this thread. The database returns SQL error: "TABLE LOCKED BY HIGHER PEER". There is no IP address attached to the poster. It is coming from loopback 0.0.0.0.'
      },
      {
        id: 'ah-p-oct14-6',
        authorHandle: 'janus',
        authorTitle: 'Founder / Administrator',
        authorJoinDate: 'Mar 2001',
        authorPostCount: 1420,
        timestamp: '2003-10-14 03:24',
        isAnomalous: true,
        content: 'Do not look behind the monitor.'
      }
    ]
  },
  {
    id: 'ah-th-03',
    siteId: 'afterhours',
    title: 'Did anyone else experience the weird 11-minute blackout on Oct 14?',
    category: 'Static & Interference',
    createdDate: '2003-10-16',
    authorHandle: 'weatherboy',
    replyCount: 9,
    viewCount: 3120,
    posts: [
      {
        id: 'ah-p-03-1',
        authorHandle: 'weatherboy',
        authorTitle: 'Amateur Meteorologist',
        authorJoinDate: 'Nov 2002',
        authorPostCount: 420,
        timestamp: '2003-10-16 11:20',
        content: 'I pulled the National Weather Service radar composite loops for Tuesday morning between 3:10 and 3:30 AM. Across southern Wisconsin, eastern Minnesota, and northern Illinois, there were clear-sky radar echoes forming concentric rings centered directly over regional telecom switching hubs. Has anyone heard from Janus or Simon (somnambulist)? Neither has logged on since Tuesday.'
      },
      {
        id: 'ah-p-03-2',
        authorHandle: 'lucidwitch',
        authorTitle: 'Senior Member',
        authorJoinDate: 'May 2001',
        authorPostCount: 890,
        timestamp: '2003-10-16 14:02',
        content: 'I tried calling Alden\'s home phone in Madison yesterday. An automated Bell operator came on and said: "The number you have dialed is currently in service on an adjacent network." I don\'t know what to do. I feel sick.'
      }
    ]
  },
  {
    id: 'ah-th-04',
    siteId: 'afterhours',
    title: 'The concept of "The Second Internet" - myth or early telecom leak?',
    category: 'Static & Interference',
    createdDate: '2004-02-19',
    authorHandle: 'wintermute42',
    replyCount: 7,
    viewCount: 5210,
    isAnomalous: true,
    posts: [
      {
        id: 'ah-p-04-1',
        authorHandle: 'wintermute42',
        authorTitle: 'Member',
        authorJoinDate: 'Jan 2004',
        authorPostCount: 88,
        timestamp: '2004-02-19 04:11',
        content: 'People keep treating the Second Internet like a website you visit or a secret hacker protocol. It is neither. It is what happens when human communicative infrastructure reaches a threshold of symbolic density. Once a network is large enough, it begins generating routes that do not terminate at physical servers.'
      },
      {
        id: 'ah-p-04-2',
        authorHandle: 'glasshouse',
        authorTitle: 'Member',
        authorJoinDate: 'Jan 2002',
        authorPostCount: 440,
        timestamp: '2004-02-19 05:01',
        content: 'Why did you use the same username as the guy who posted on Marrow.net in 1998?'
      },
      {
        id: 'ah-p-04-3',
        authorHandle: 'wintermute42',
        authorTitle: 'Member',
        authorJoinDate: 'Jan 2004',
        authorPostCount: 88,
        timestamp: '2004-02-19 05:14',
        content: 'I have never been to Marrow.net. But wintermute42 was registered here because the handle was waiting for me.'
      }
    ]
  }
];

export const afterhoursModLogs = [
  {
    id: 'mod-log-01',
    timestamp: '2003-10-14 03:15:22',
    admin: 'janus',
    action: 'DELETE THREAD #4812 ("I can see everyone who is logged in")',
    result: 'FAILED: PERMISSION DENIED BY REMOTE SOCKET'
  },
  {
    id: 'mod-log-02',
    timestamp: '2003-10-14 03:18:04',
    admin: 'janus',
    action: 'BAN IP 0.0.0.0',
    result: 'FAILED: ADDRESS IS CURRENTLY ROUTED AS SYSTEM HOST'
  },
  {
    id: 'mod-log-03',
    timestamp: '2003-10-14 03:25:10',
    admin: 'SYSTEM_DAEMON',
    action: 'FORCE DISCONNECT: 17 SESSIONS TERMINATED',
    result: 'COMPLETED WITH DISCREPANCIES'
  }
];
