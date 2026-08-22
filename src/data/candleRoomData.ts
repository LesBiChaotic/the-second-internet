export interface CandleArticle {
  id: string;
  title: string;
  category: 'GHOST_SERVERS' | 'NUMBERS_STATIONS' | 'SECOND_NET' | 'HAUNTED_IRC' | 'UNINDEXED_PAGES';
  dateAdded: string;
  author: string;
  content: string;
  visitorComments: {
    user: string;
    date: string;
    comment: string;
    isAnomalous?: boolean;
  }[];
  isAnomalous?: boolean;
}

export const candleRoomArticles: CandleArticle[] = [
  {
    id: 'cr-art-01',
    title: 'THE SECOND INTERNET: What Lies Behind The 404 Wall',
    category: 'SECOND_NET',
    dateAdded: '1998-02-02',
    author: 'witch_candle (Elena Rostova)',
    content: `Welcome to the most important page on Candle Room.\n\nEveryone thinks the World Wide Web is just computers connected by phone lines and fiber cables. But if you spend enough time searching through dead FTP directories and broken CGI scripts, you will find references to "The Second Internet" (Второй Интернет).\n\nIt is not a secret government military intranet. It is not an encrypted BBS. It is an echo network that formed in the negative space between web servers. Whenever a website is deleted, where do the bytes go? Where do the millions of thoughts typed into search engines travel?\n\nThey don't disappear. They settle into the Second Internet. And if your browser gets the timing just right, you can load pages that were written by people who never owned a computer.`,
    isAnomalous: true,
    visitorComments: [
      {
        user: 'NeoHacker_99',
        date: '1998-03-11',
        comment: 'Cool sci-fi story! Sounds like something from William Gibson.'
      },
      {
        user: 'd_vanhouten',
        date: '1998-05-18',
        comment: 'Elena, where did you find the Russian term "Второй Интернет"? Please email me at d.vanhouten@greyline.net.',
        isAnomalous: true
      },
      {
        user: 'wintermute42',
        date: '1998-08-04',
        comment: 'The door does not lock from the inside.',
        isAnomalous: true
      }
    ]
  },
  {
    id: 'cr-art-02',
    title: 'The Lincolnshire Poacher & The Web Echo Station',
    category: 'NUMBERS_STATIONS',
    dateAdded: '1998-04-19',
    author: 'witch_candle',
    content: `For decades, shortwave radio hobbyists have tuned into "numbers stations"—creepy mechanical female voices reading string after string of five-digit numbers over static. Most people assume they are MI6 or CIA spy broadcasts.\n\nLast month, I connected to an open streaming audio server at 194.109.137.4:8000. It wasn't streaming music. It was streaming a numbers station. But between the spoken digits, you could hear a keyboard typing in real time. When I checked the server\'s WHOIS data, the server was registered to an address in London that burned down in 1940.`,
    visitorComments: [
      {
        user: 'RadioFreeRadio',
        date: '1998-05-02',
        comment: 'I tuned in at 03:00 UTC and heard my own name read among the numbers. I pulled the power cord.'
      }
    ]
  },
  {
    id: 'cr-art-03',
    title: 'The Ghost Server in the Lake (Wisconsin Submerged Node)',
    category: 'GHOST_SERVERS',
    dateAdded: '1998-09-30',
    author: 'witch_candle',
    content: `Rumor has it that during the construction of a fiber-optic conduit under Lake Mendota in Madison, an unmapped switching cabinet was sealed inside a concrete caisson. Engineers claim the box was never hooked up to power.\n\nYet every Sunday at midnight, pings to 10.44.18.99 return with an average latency of 0.01ms—faster than light can travel through copper.`,
    visitorComments: [
      {
        user: 'nyxgirl',
        date: '1998-10-12',
        comment: 'Elena, this sounds a lot like what we are seeing on the Marrow network lately...'
      }
    ]
  },
  {
    id: 'cr-art-04', title: 'Reader Mail: The Most Boring Explanations We Found', category: 'UNINDEXED_PAGES', dateAdded: '1998-10-18', author: 'witch_candle',
    content: `Before anyone declares a ghost server, please check the boring things. Cached DNS. Shared proxies. Wrong clocks. Neighbors borrowing your telephone line. A cat sleeping on the warm reset button.\n\nThis page collects explanations that disappointed us and therefore made the remaining cases stronger. The Ohio “dead webmaster” was alive under a new surname. The singing modem was a local radio station leaking into cheap speakers. The haunted university printer was two students and a cron job.\n\nBeing wrong is not humiliation. Refusing to correct yourself is.`,
    visitorComments: [
      { user: 'packetmason', date: '1998-10-19', comment: 'Thank you. Mystery improves when someone bothers to test the cable.' },
      { user: 'NeoHacker_99', date: '1998-10-20', comment: 'Fine, but the cat theory is still supernatural. Cats know root.' }
    ]
  },
  {
    id: 'cr-art-05', title: 'Guestbook of Places That No Longer Exist', category: 'UNINDEXED_PAGES', dateAdded: '1999-01-03', author: 'witch_candle',
    content: `Send me one ordinary place the web forgot. Not a haunted house. Not a murder site. A diner with terrible coffee. A laundromat where the dryers ran too hot. A computer lab that smelled like wet coats.\n\nIf disappearance feeds the Second Internet, then ordinary places must make up most of it. Perhaps the impossible network is not built from secrets. Perhaps it is built from everything nobody thought important enough to preserve.`,
    visitorComments: [
      { user: 'nyxgirl', date: '1999-01-05', comment: 'The student union basement before renovation. Orange chairs, one broken vending machine, and a radiator that knocked three times.' },
      { user: 'glasshouse', date: '1999-01-08', comment: 'A Portland photo booth beside the bus station. It printed everyone slightly to the left of themselves.' },
      { user: 'wintermute42', date: '1999-01-08', comment: 'They are all still open here.', isAnomalous: true }
    ], isAnomalous: true
  },
  {
    id: 'cr-art-06', title: 'Do Not Contact the Families', category: 'GHOST_SERVERS', dateAdded: '1999-03-22', author: 'witch_candle',
    content: `Someone used this directory to find the mother of a missing sysop and ask whether her son had “crossed into the network.” Do not do this. A public username is not an invitation to turn grief into entertainment.\n\nArchive pages. Compare timestamps. Share technical evidence with consent. Do not call homes, publish addresses, or tell frightened people that their dead relatives are typing to you. Candle Room will remove links from anyone who ignores this.`,
    visitorComments: [
      { user: 'ModemWatcher', date: '1999-03-22', comment: 'Adding the same rule to the webring.' },
      { user: 'd_vanhouten', date: '1999-03-23', comment: 'Agreed. Evidence is not ownership.' }
    ]
  },
  {
    id: 'cr-art-07', title: 'The Eleven-Minute Payphone Story', category: 'HAUNTED_IRC', dateAdded: '2000-02-14', author: 'witch_candle',
    content: `Three readers in three cities reported payphones ringing at 03:14. Each answered and heard a room tone: computer fan, distant radiator, keys. Calls ended after exactly eleven minutes.\n\nOne caller asked, “What year is it there?” A young man answered, “Not the same one.” Another heard somebody making tea and apologizing for having no clean cups.\n\nThe mundane sounds matter. Hoaxes imitate threats. They rarely remember dirty dishes.`,
    visitorComments: [
      { user: 'cassia_r', date: '2000-02-16', comment: 'Campus radio received a blank eleven-minute voicemail with a Low song bleeding through it.' },
      { user: 'janus', date: '2001-03-14', comment: 'If it rings again, record the background. Do not give the voice your full name.' }
    ], isAnomalous: true
  },
  {
    id: 'cr-art-08', title: 'Last Candle Before Hiatus', category: 'SECOND_NET', dateAdded: '2001-08-30', author: 'witch_candle',
    content: `Graduate school, rent, and ordinary exhaustion have won. Candle Room will remain online, but updates are pausing.\n\nI no longer believe deleted pages simply fall into another network. I think attention creates paths, and care keeps them stable. That makes preservation a responsibility rather than a hunt. Save context. Save corrections. Save the joke replies. A directory containing only monsters teaches the future that nobody laughed.\n\nPlease keep the porch light on for one another.`,
    visitorComments: [
      { user: 'nyxgirl', date: '2001-08-31', comment: 'Thank you for making the weird web feel less lonely.' },
      { user: 'janus', date: '2001-09-01', comment: 'AfterHours has room whenever you cannot sleep.' },
      { user: 'witch_candle', date: '2001-09-02', comment: 'I registered an account. I chose “matchlight.” See you after midnight.' }
    ]
  }
];
