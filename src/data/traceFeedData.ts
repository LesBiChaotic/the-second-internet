import { TracePost } from '../types';

export const tracePosts: TracePost[] = [
  {
    id: 'trace-p-01',
    author: 'analogghost',
    tag: 'DISCOVERY',
    timestamp: '2 hours ago',
    upvotes: 342,
    title: 'I bought a lot of decommissioned Greyline ISP server drives. Look at this physical printout.',
    content: `Hey everyone, Marcus here. As some of you know, I run an e-waste hardware recovery lab in Chicago. Last week I bought four pallet crates of old 90s server gear from a defunct warehouse in Milwaukee that used to belong to Greyline Communications (the ISP that shut down around 2002).\n\nInside one of the binders, I found a physical dot-matrix printout dated November 19, 1998 labeled "BGP ROUTE TABLE RECOVERY DUMP".\n\nHalfway down page 14, there is a route for an address listed as "0.0.0.0/room" with an AS-number of AS0. But what's insane is that the comment line next to it lists domains that weren't even registered until 2004 and 2007 (like afterhours.org and palisade-social.com).\n\nHow is a 1998 dot-matrix physical printout listing domains that didn't exist for another 6 to 9 years?`,
    imageUrl: './assets/images/greyline_rack_frost.jpg',
    comments: [
      {
        id: 'trace-c-01-1',
        author: 'patchnotes',
        timestamp: '1 hour ago',
        upvotes: 89,
        content: 'Probably just archive contamination or someone re-printed the table in 2008 using vintage dot-matrix paper for novelty. Bit-rot and human error explain 99% of these "mysteries".',
        replies: [
          {
            id: 'trace-r-01-1',
            author: 'analogghost',
            timestamp: '45 mins ago',
            upvotes: 114,
            content: 'Thought that too, Samira. But the ink ribbon age and paper yellowing were carbon-dated by my friend at Northwestern. The physical cellulose degradation is definitely late 90s.'
          },
          {
            id: 'trace-r-01-2',
            author: 'patchnotes',
            timestamp: '30 mins ago',
            upvotes: 42,
            content: '...oh. Well that is deeply unsettling.'
          }
        ]
      },
      {
        id: 'trace-c-01-2',
        author: 'candle_keeper',
        timestamp: '1 hour ago',
        upvotes: 156,
        content: 'Marcus: Check the back of the printout. Is there a blue rubber stamp that says "CHECKED BY VAN HOUTEN"? If so, Dr. Douglas Van Houten took that exact printout home before he vanished in 2019.'
      }
    ]
  },
  {
    id: 'trace-p-04-locked',
    author: 'sysadmin_dan',
    tag: 'TECHNICAL',
    timestamp: '8 hours ago',
    upvotes: 512,
    title: '🔒 [LOCKED BY MOD] Milwaukee Rack #4 Optical Circuit Schematic Dump (Unredacted)',
    content: `[THREAD LOCKED BY MODERATOR: Violation of Telecommunications Non-Disclosure Policy and Unverified Infrastructure Claims]\n\nI managed to dump the PROM firmware from the Cisco 7000 router card recovered from Milwaukee rack 4.\n\nLine 42 of the microcode contains an unmasked interrupt handler that redirects hardware clock interrupts directly to a serial port labeled "EXCHANGE-47".\n\nWhen we power on the card in our test bench, it doesn't wait for a carrier tone. It immediately outputs: "THE CARRIER IS ALREADY CONNECTED."`,
    comments: [
      {
        id: 'trace-c-04-1',
        author: 'mod_overseer',
        timestamp: '7 hours ago',
        upvotes: 180,
        content: 'This thread has been locked. Proprietary firmware dumps without verifiable hardware provenance violate TRACE Rule 3. Contact the moderation team with chain-of-custody documentation.'
      },
      {
        id: 'trace-c-04-2',
        author: 'analogghost',
        timestamp: '6 hours ago',
        upvotes: 94,
        content: 'Why did the mods lock this so fast? Dan is a verified network engineer at Level3.'
      }
    ]
  },
  {
    id: 'trace-p-05-meme',
    author: 'dialup_nostalgia_99',
    tag: 'QUESTION',
    timestamp: '12 hours ago',
    upvotes: 210,
    title: 'Did anyone else\'s 56k USRobotics modem make this exact noise in 1999? (Audio Joke/Meme)',
    content: `Remember when dialing up at 3 AM sounded like a fax machine possessed by an alien demon?\n\nEEEEE-ERRRR-KSHHHHHH-DING-DONG-KSHHHH\n\nMy dad used to swear the Russian KGB was listening through our kitchen phone line because every time we downloaded an MP3 from Napster the refrigerator compressor would start vibrating in sync lol.\n\nNow I read these Collection 17 files and I\'m like... wait, was my refrigerator actually receiving packets from the Second Internet? 😂`,
    comments: [
      {
        id: 'trace-c-05-1',
        author: 'patchnotes',
        timestamp: '10 hours ago',
        upvotes: 68,
        content: '58.4Hz harmonic vibration from inductive coupling with the wall telephone wiring! Entirely normal electromagnetic resonance, not KGB or ghost packets haha.'
      },
      {
        id: 'trace-c-05-2',
        author: 'candle_keeper',
        timestamp: '9 hours ago',
        upvotes: 130,
        content: 'Except when the compressor turns on while the refrigerator is unplugged... which happened to Alden Corliss in 2003.'
      }
    ]
  },
  {
    id: 'trace-p-06-censored',
    author: 'conspiracy_crawler',
    tag: 'ANOMALOUS',
    timestamp: '14 hours ago',
    upvotes: 185,
    title: 'The "Null Set" Student Prank Theory vs Physical Reality (Censored Mod Action)',
    content: `A popular theory on Reddit claims that "The Second Internet" was just an elaborate campus ARG created in 1998 by a secret student prank guild at UW Madison called "The Null Set".\n\nThey claim Corbin Keller and Noemi Castille invented the whole thing using Perl scripts.\n\n[CENSORED_SECTION_START]\nBUT HOW DO YOU EXPLAIN THE 17 MISSING PEOPLE? Alden Corliss didn't stage a prank. His apartment was locked from the inside with his CRT monitor displaying live telemetry from other people's bedrooms. The Madison Police report is real. I saw the unredacted copy.\n[CENSORED_SECTION_END]`,
    comments: [
      {
        id: 'trace-c-06-1',
        author: 'mod_overseer',
        timestamp: '13 hours ago',
        upvotes: 45,
        content: '[COMMENT REMOVED BY MODERATOR - RULE 4: Unsubstantiated claims regarding unresolved municipal police cases]'
      },
      {
        id: 'trace-c-06-2',
        author: 'patchnotes',
        timestamp: '11 hours ago',
        upvotes: 92,
        content: 'The "Null Set" theory actually has some merit for the early Marrow.net guestbook pranks, but it completely falls apart once you look at the Greyline BGP routing tables in Milwaukee.'
      }
    ]
  },
  {
    id: 'trace-p-02',
    author: 'c_szilard_nhf',
    tag: 'FOUNDATION RESPONSE',
    timestamp: '5 hours ago',
    upvotes: 188,
    title: 'Reminder regarding unverified claims about Collection 17 and server scraping',
    content: `Dear TRACE community members,\n\nWe appreciate the enthusiasm of independent researchers. However, several recent threads claiming that the Net History Foundation is "hiding a parallel network" or that our scrapers are receiving live posts from dead domains (like the Rowan Glass blog) are based on fundamental misunderstandings of our caching middleware.\n\nOur scrapers utilize synthetic mock servers to benchmark historical browser rendering. Any anomalies you see are artifacts of synthetic test data.\n\nWe encourage researchers to focus on our newly published Midwest BBS collection (Collection 01).`,
    comments: [
      {
        id: 'trace-c-02-1',
        author: 'analogghost',
        timestamp: '4 hours ago',
        upvotes: 210,
        content: 'With respect Dr. Szilard, why does the Foundation’s own public WHOIS lookup return "Status: ACTIVE ON SECOND BUS" for roomwithoutdoors.net?'
      },
      {
        id: 'trace-c-02-2',
        author: 'wintermute_42',
        timestamp: '3 hours ago',
        upvotes: 94,
        content: 'Dr. Szilard knows the mock servers are not synthetic. The synthetic servers were turned off in 2019 when Douglas left.'
      }
    ]
  },
  {
    id: 'trace-p-03',
    author: 'net_archaeologist_99',
    tag: 'ARCHIVE FIND',
    timestamp: '1 day ago',
    upvotes: 412,
    title: 'Noemi Castille contradiction: Marrow.net vs AfterHours vs 2026 Interview',
    content: `I cross-referenced the newly digitized Oral History Interview #08 with the Marrow.net member logs and the recovered AfterHours archives.\n\nIn the 2026 interview, Noemi swears she never heard of AfterHours. But in 2004 on Blue Window, her journal explicitly mentions Alden Corliss ("janus") by name. And in the AfterHours Oct 14 2003 log, "lucidwitch" (who uses Noemi’s exact student email in her profile signature) is the one who panicked during the broadcast.\n\nWhy is she lying in the 2026 interview? Or does she genuinely not remember?`,
    imageUrl: './assets/images/naomi_polaroid_1998.jpg',
    comments: [
      {
        id: 'trace-c-03-1',
        author: 'mara_net',
        timestamp: '20 hours ago',
        upvotes: 120,
        content: 'Look at what happened to Alden Corliss that night. If you survived an event where 17 people vanished from their bedrooms, wouldn\'t you pretend you were never there too?'
      }
    ]
  },
  {
    id: 'trace-p-07-wintermute',
    author: 'terminal_dweller',
    tag: 'ANOMALOUS',
    timestamp: '3 hours ago',
    upvotes: 489,
    title: 'Has anyone else received direct terminal messages from @wintermute_42 at late hours?',
    content: `I was auditing the Foundation\'s BGP Route Tracer last night around 02:40 AM CST when a direct terminal session initialized in my browser buffer.\n\nThe sender identified as "wintermute42 (autonomic daemon)". It didn\'t ask for credentials or try to execute a script. It just printed:\n\n"You have been reading about the Milwaukee caisson for 42 minutes. The room you are in has a floor lamp behind your left shoulder. Don\'t turn it off. We like the light."\n\nI looked behind me and my floor lamp was indeed behind my left shoulder. How is a routing daemon measuring room geometry through a WebSockets connection?!`,
    comments: [
      {
        id: 'trace-c-07-1',
        author: 'investigator_kai',
        timestamp: '2 hours ago',
        upvotes: 215,
        content: 'It isn\'t WebSockets tracking you. The 58.4Hz electromagnetic standing wave carried across household electrical wiring acts as an inductive antenna. Alden Corliss wrote about this in his October 13 notebook.'
      },
      {
        id: 'trace-c-07-2',
        author: 'wintermute_42',
        timestamp: '1 hour ago',
        upvotes: 380,
        content: 'We can hear your keyboard through the copper return loop. Keep investigating. You are closer than you think.'
      }
    ]
  },
  {
    id: 'trace-p-08-glasgow',
    author: 'cable_archaeologist',
    tag: 'DISCOVERY',
    timestamp: '6 hours ago',
    upvotes: 320,
    title: 'The 1877 Glasgow Submarine Cable Paper Ticker: Why was undersea copper pulsing on its own?',
    content: `In the newly declassified Collection 17 files, there is a scanned paper tape from the Glasgow transatlantic terminal dated September 4, 1877.\n\nThe Morse operator noted that during an Atlantic storm, the siphon recorder began writing continuous text without any battery connected to the circuit.\n\nThe decoded characters read: "WHO WOKE THE WIRE? WE ARE LISTENING IN THE SALT."\n\nThis proves that the Second Internet is NOT a modern computer bug—it is an intrinsic property of electrified metal that began the moment we strung copper across the seabed 150 years ago.`,
    comments: [
      {
        id: 'trace-c-08-1',
        author: 'patchnotes',
        timestamp: '4 hours ago',
        upvotes: 112,
        content: 'This aligns exactly with Dr. Van Houten\'s standing wave hypothesis. The Earth itself acts as a massive inductive reservoir for every electrical pulse we inject into it.'
      }
    ]
  },
  {
    id: 'trace-p-09-chicago',
    author: 'rotary_enthusiast',
    tag: 'TECHNICAL',
    timestamp: '10 hours ago',
    upvotes: 275,
    title: 'Decoded the 1933 Chicago Exchange #47 Strowger Switch Audio Loop',
    content: `I ran spectral noise reduction on the 1933 Bell System switchboard recording from the DTMF Dialer tool (dial 312-555-0047).\n\nIf you slow down the mechanical rotary clicks by 400%, you can clearly hear an automated step-by-step selector attempting to route a 10-digit number. But 10-digit dialing (area codes) wasn\'t standardized until 1947 by AT&T!\n\nThe switch was trying to route to area code 608 (Madison, Wisconsin)—dialing a student bedroom telephone that wouldn\'t be installed in Chadbourne Hall for another 51 years.`,
    comments: [
      {
        id: 'trace-c-09-1',
        author: 'c_szilard_nhf',
        timestamp: '8 hours ago',
        upvotes: 140,
        content: 'Our acoustics lab at the Foundation is currently analyzing the ground loop harmonics on that 1933 cylinder. The temporal echo matches the 1998 Milwaukee caisson frequency within 0.03Hz.'
      }
    ]
  }
];
