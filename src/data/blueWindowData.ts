import { BlogPost } from '../types';

export const blueWindowBlogs: BlogPost[] = [
  {
    id: 'bw-post-rowan-01',
    authorHandle: 'rowanglass',
    authorName: 'Rowan Glass',
    date: '2004-03-12',
    year: 2004,
    title: 'Rain on Burnside and moving away from the old boards',
    mood: 'pensive',
    music: 'Low - Things We Lost in the Fire',
    content: `I needed a fresh place to write. After what happened to AfterHours in October, none of us could really go back there without feeling like someone was standing right behind the monitor watching us type.\n\nI bought three rolls of Ilford HP5 black and white film today. Walked across the Burnside Bridge in the rain. Portland is quiet when you stop expecting it to speak back to you.\n\nNoemi, if you find this blog, leave a comment so I know you're okay.`,
    comments: [
      {
        id: 'bw-c-01-1',
        author: 'noemi_c',
        date: '2004-03-14',
        content: 'I found you! Bookmarked. I’m moving to Chicago in June to start my masters. Let’s promise not to stay up until 4am reading weird web theories anymore.'
      },
      {
        id: 'bw-c-01-2',
        author: 'rowanglass',
        date: '2004-03-14',
        content: 'Deal. Normal daytime human lives from now on.'
      }
    ]
  },
  {
    id: 'bw-post-rowan-02',
    authorHandle: 'rowanglass',
    authorName: 'Rowan Glass',
    date: '2007-11-28',
    year: 2007,
    title: 'Blue Window is shutting down next week',
    mood: 'nostalgic',
    music: 'Stars of the Lid - The Tired Sounds Of',
    content: `Got the automated admin email this morning. Blue Window’s servers are being turned off on December 15th. Everyone is moving over to Facebook and Twitter now.\n\nIt feels like the end of something that won't ever happen again. Ten years of staying up late talking to strangers across telephone lines, and now everyone wants their real name, real face, and real employer listed in 12pt Helvetica.\n\nI’m going to leave this journal here. Even when the power cord is pulled, maybe the words stay etched in the silicon somewhere.`,
    comments: [
      {
        id: 'bw-c-02-1',
        author: 'noemi_c',
        date: '2007-12-01',
        content: 'I archived all my entries to a CD-R. Find me on Palisade or Facebook under my real name! Love you Rowan.'
      }
    ]
  },
  {
    id: 'bw-post-rowan-03',
    authorHandle: 'rowanglass',
    authorName: 'Rowan Glass',
    date: '2011-04-09',
    year: 2011,
    title: 'The streetlights outside my window are buzzing again',
    mood: 'cold',
    music: 'None',
    isImpossibleDate: true,
    content: `I don't know why everyone stopped posting here. The site still loads fine on my browser.\n\nI walked down to the corner store this afternoon. The clerk looked at me like he was trying to remember what year it was. I came back to the apartment and brewed tea.\n\nAlden left a comment on my draft yesterday saying the weather in Madison was getting clear. But Alden has been gone since 2003. When I tried to click his username, my browser window turned into a gray square.`,
    comments: [
      {
        id: 'bw-c-03-1',
        author: 'janus_archive',
        date: '2011-04-10',
        content: 'The room is warm, Rowan. You do not need to keep the heater running.',
        isAnomalous: true
      }
    ]
  },
  {
    id: 'bw-post-rowan-04',
    authorHandle: 'rowanglass',
    authorName: 'Rowan Glass',
    date: '2026-07-14',
    year: 2026,
    title: 'To whoever is crawling this archive',
    mood: 'clear',
    music: 'Silence',
    isImpossibleDate: true,
    content: `I can see the user-agent strings in my hit counter.\n\n"NetHistoryFoundationBot/3.2 (+https://nethistoryfoundation.org/bot)"\n\nYou keep downloading this page every twenty-four hours. You think you are looking at a cached database from 2004.\n\nYou are not looking at a cache.\n\nI am typing this right now on a mechanical keyboard in a room with two windows overlooking a street that has no cars. If you can read this, tell Noemi I never left Portland. The city just moved somewhere else.`,
    comments: [
      {
        id: 'bw-c-04-1',
        author: 'wintermute42',
        date: '2026-07-14',
        content: 'They cannot answer you from the first network.',
        isAnomalous: true
      }
    ]
  },
  {
    id: 'bw-post-noemi-01',
    authorHandle: 'noemi_c',
    authorName: 'Noemi Castille',
    date: '2004-10-14',
    year: 2004,
    title: 'One year since the October 14th night',
    mood: 'uneasy',
    music: 'Radiohead - Kid A',
    content: `Exactly 365 days since the night everything broke.\n\nI had dinner with a friend from the university tonight. We talked about normal things—midterms, rent, winter coats. But the whole time, I was thinking about the message that flashed across my screen that night:\n\n"lucidwitch is sitting cross-legged on a beige carpet."\n\nI still have the carpet. I haven\'t vacuumed that specific spot in a year. I know how irrational that sounds. But sometimes I feel that if I vacuum it, whatever was standing behind me will realize I noticed it.`,
    comments: [
      {
        id: 'bw-c-noemi-01',
        author: 'rowanglass',
        date: '2004-10-15',
        content: 'Throw the carpet away, Noemi. Buy a rug with red flowers. Change the geometry.'
      }
    ]
  }
];
