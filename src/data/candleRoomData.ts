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
  }
];
