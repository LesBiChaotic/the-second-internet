import { ForumThread } from '../types';

export const terminal21Threads: ForumThread[] = [
  {
    id: 't21-th-01',
    siteId: 'terminal21',
    title: 'FreeBSD kernel panic on custom raw socket bind to 0.0.0.0/0:room',
    category: 'Kernel & Driver Development',
    createdDate: '2002-11-04',
    authorHandle: 'dk_holland',
    replyCount: 8,
    viewCount: 1980,
    posts: [
      {
        id: 't21-p-01-1',
        authorHandle: 'dk_holland',
        authorTitle: 'Senior Systems Architect',
        timestamp: '2002-11-04 14:12',
        content: `I am testing an in-house kernel module on FreeBSD 4.7-RELEASE designed to capture promiscuous packets on our ATM backbone cards.\n\nWhen we bind a raw AF_INET socket to a custom sockaddr struct where sin_addr.s_addr is set to 0x00000000 with a custom 16-bit extension field, the kernel does not return EINVAL.\n\nInstead, the CPU registers in the core dump show the instruction pointer jumped into unmapped physical memory space (0xFFFFFFFF80000000) where a non-x86 microcode routine begins executing. Has anyone working on BGP border routers seen this microcode signature before?`
      },
      {
        id: 't21-p-01-2',
        authorHandle: 'koren_v',
        authorTitle: 'Telecom Senior Fellow',
        timestamp: '2002-11-04 16:45',
        isAnomalous: true,
        content: `David: Stop executing that instruction immediately.\n\nIn 1974 at Akademgorodok, we observed the exact same microcode jump when testing the BESM-6 computer network linked to the Moscow telemetry ring. If you allow the socket to remain open for more than 400 milliseconds, the routing hardware will begin treating the incoming packet stream as a clock pulse.\n\nYou are not observing a kernel bug. You are observing the substrate.`
      }
    ]
  },
  {
    id: 't21-th-02',
    siteId: 'terminal21',
    title: 'Anomalous DNS Zone Records resolving to domain "roomwithoutdoors.net"',
    category: 'DNS & BGP Routing',
    createdDate: '2004-06-18',
    authorHandle: 'root_overflow',
    replyCount: 6,
    viewCount: 3410,
    isAnomalous: true,
    posts: [
      {
        id: 't21-p-02-1',
        authorHandle: 'root_overflow',
        authorTitle: 'DNS Admin',
        timestamp: '2004-06-18 21:03',
        content: 'While auditing root BIND zone transfers, our secondary nameserver cached an A-record for "roomwithoutdoors.net" pointing to 0.0.0.0. When querying the SOA record, the primary nameserver is listed as "ns1.second-bus.net". Who registered this domain? It is not in the InterNIC registry.'
      },
      {
        id: 't21-p-02-2',
        authorHandle: 'w1ntermute',
        authorTitle: 'Anonymous Peer',
        timestamp: '2004-06-18 23:44',
        isAnomalous: true,
        content: 'It was registered before InterNIC was chartered. It will remain resolved after your root zone is empty.'
      }
    ]
  },
  {
    id: 't21-th-03', siteId: 'terminal21', title: 'OT: best all-night food near a colo facility?', category: 'Off Topic', createdDate: '2002-11-09', authorHandle: 'rackrat', replyCount: 14, viewCount: 622,
    posts: [
      { id: 't21-p-03-1', authorHandle: 'rackrat', authorTitle: 'Junior NOC Tech', timestamp: '2002-11-09 01:08', content: 'Third overnight migration this month. The vending machine has crackers, raisins, and one sandwich whose sell-by date is a philosophical suggestion. What does everyone eat when the maintenance window becomes breakfast?' },
      { id: 't21-p-03-2', authorHandle: 'root_overflow', authorTitle: 'DNS Admin', timestamp: '2002-11-09 01:22', content: 'Cold sesame noodles. They survive both fluorescent lighting and management. Label them or someone from telecom will eat half and leave the empty carton in the refrigerator.' },
      { id: 't21-p-03-3', authorHandle: 'dk_holland', authorTitle: 'Senior Systems Architect', timestamp: '2002-11-09 02:03', content: 'There is a twenty-four-hour bakery six blocks east of the Milwaukee facility. Tell Maribel at customer care you are going; she has been covering the eleven-minute billing calls and deserves something with cinnamon.' }
    ]
  },
  {
    id: 't21-th-04', siteId: 'terminal21', title: 'Packet capture contains IRC fragments from five years ago', category: 'Packet Analysis', createdDate: '2002-12-01', authorHandle: 'bitrot_betty', replyCount: 11, viewCount: 1441, isAnomalous: true,
    posts: [
      { id: 't21-p-04-1', authorHandle: 'bitrot_betty', authorTitle: 'Security Analyst', timestamp: '2002-12-01 23:48', content: 'I captured traffic from a retired Livingston PortMaster during a lab test. Payload is plain text from an EFnet channel dated 1998-11-19. It includes nyxgirl asking about lag and a user called pixelpunk answering. The PortMaster was manufactured in 2000. Before anyone says stale disk sectors: this unit has no disk.' },
      { id: 't21-p-04-2', authorHandle: 'packetmason', authorTitle: 'Network Engineer', timestamp: '2002-12-02 00:17', content: 'Could be replay from your span port. Check switch mirror config and whether someone is running an old log through netcat for a prank.' },
      { id: 't21-p-04-3', authorHandle: 'bitrot_betty', authorTitle: 'Security Analyst', timestamp: '2002-12-02 00:41', content: 'Span disabled. Lab isolated. The next packet says: "Betty will call this a replay at 00:41." I am posting from a different machine now.', isAnomalous: true }
    ]
  },
  {
    id: 't21-th-05', siteId: 'terminal21', title: 'Please stop using production hostnames in signatures', category: 'Board Administration', createdDate: '2003-02-16', authorHandle: 'mod_sable', replyCount: 19, viewCount: 903,
    posts: [
      { id: 't21-p-05-1', authorHandle: 'mod_sable', authorTitle: 'Forum Moderator', timestamp: '2003-02-16 18:09', content: 'Gentle reminder: scrub customer IPs, hostnames, pager numbers, and real employee names before posting logs. Technical curiosity is not permission to expose somebody else’s workplace or dialup history.' },
      { id: 't21-p-05-2', authorHandle: 'rackrat', authorTitle: 'Junior NOC Tech', timestamp: '2003-02-16 18:24', content: 'Can we add this to the posting form instead of relying on everyone to remember at 4 AM? A red box saying SANITIZE YOUR DUMP would save us all embarrassment.' },
      { id: 't21-p-05-3', authorHandle: 'koren_v', authorTitle: 'Telecom Senior Fellow', timestamp: '2003-02-16 19:02', content: 'Also remove names of the disappeared. Their families search the web too.' }
    ]
  },
  {
    id: 't21-th-06', siteId: 'terminal21', title: 'Eleven-minute calls mapped to BGP keepalive intervals', category: 'DNS & BGP Routing', createdDate: '2003-09-28', authorHandle: 'corbin_k', replyCount: 23, viewCount: 2898, isAnomalous: true,
    posts: [
      { id: 't21-p-06-1', authorHandle: 'corbin_k', authorTitle: 'Graduate Researcher', timestamp: '2003-09-28 22:11', content: 'Greyline’s disputed campus phone sessions are exactly 660 seconds. Rack #4 also maintains impossible peers for eleven minutes before withdrawing /room. I think voice calls and BGP sessions are using the same timeout because the remote endpoint does not distinguish speech from packets.' },
      { id: 't21-p-06-2', authorHandle: 'janus', authorTitle: 'AfterHours Administrator', timestamp: '2003-09-28 23:06', content: 'My board has sessions that remain authenticated after users disconnect. Same duration. Send me your timestamps privately; do not post residence phone numbers here.' },
      { id: 't21-p-06-3', authorHandle: 'dk_holland', authorTitle: 'Senior Systems Architect', timestamp: '2003-09-29 00:03', content: 'Both of you: stop testing this against live customer infrastructure. October harmonics are already rising. Use captures only.' }
    ]
  },
  {
    id: 't21-th-07', siteId: 'terminal21', title: 'Found: beige 3.5-inch disk labeled “WINTER MIX”', category: 'Off Topic', createdDate: '2004-01-07', authorHandle: 'rackrat', replyCount: 7, viewCount: 1194,
    posts: [
      { id: 't21-p-07-1', authorHandle: 'rackrat', authorTitle: 'Junior NOC Tech', timestamp: '2004-01-07 12:16', content: 'Found during office cleanout behind the terminal shelf. Handwriting looks like Alden’s. Disk has playlists, a half-finished grocery list, and a text file of modem numbers. If family wants it, contact me. I am not uploading private files.' },
      { id: 't21-p-07-2', authorHandle: 'noemi_c', authorTitle: 'Former AfterHours Moderator', timestamp: '2004-01-07 14:42', content: 'Please give it to Marcus. The grocery list is probably his; Alden always forgot coffee filters and wrote them down three times.' },
      { id: 't21-p-07-3', authorHandle: 'w1ntermute', authorTitle: 'Anonymous Peer', timestamp: '2004-01-07 14:43', content: 'He remembered the filters where he went.', isAnomalous: true }
    ]
  },
  {
    id: 't21-th-08', siteId: 'terminal21', title: 'Board mirror closing — preserve context, not just exploits', category: 'Board Administration', createdDate: '2005-08-30', authorHandle: 'mod_sable', replyCount: 32, viewCount: 4001,
    posts: [
      { id: 't21-p-08-1', authorHandle: 'mod_sable', authorTitle: 'Forum Moderator', timestamp: '2005-08-30 10:00', content: 'Terminal 21 moves read-only Friday. Mirrors may copy technical threads, but please retain corrections, safety warnings, and mundane replies. A scary packet dump without the five people patiently ruling out broken cables is not a record; it is folklore.' },
      { id: 't21-p-08-2', authorHandle: 'bitrot_betty', authorTitle: 'Security Analyst', timestamp: '2005-08-30 10:38', content: 'I am archiving the recipes thread too. Future historians deserve to know that root_overflow’s “five-minute noodles” took forty minutes and three pans.' },
      { id: 't21-p-08-3', authorHandle: 'root_overflow', authorTitle: 'DNS Admin', timestamp: '2005-08-30 10:44', content: 'Objection entered into the permanent record.' }
    ]
  }
];
