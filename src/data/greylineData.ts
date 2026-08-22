export interface GreylineLog {
  id: string;
  timestamp: string;
  serverNode: string;
  severity: 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL' | 'ANOMALOUS';
  message: string;
  sourceIp: string;
  destIp: string;
  protocol: string;
}

export const greylineServerLogs: GreylineLog[] = [
  {
    id: 'gl-log-01',
    timestamp: '1998-11-19 02:44:12',
    serverNode: 'MKE-CORE-04 (Milwaukee Backbone)',
    severity: 'WARN',
    message: 'BGP Route discovery: Peer advertised non-standard subnet mask /room',
    sourceIp: '198.51.100.22',
    destIp: '0.0.0.0/room',
    protocol: 'BGP-4'
  },
  {
    id: 'gl-log-02',
    timestamp: '1998-11-19 02:44:18',
    serverNode: 'MKE-CORE-04 (Milwaukee Backbone)',
    severity: 'ANOMALOUS',
    message: 'Outbound TCP connection established to 0.0.0.0/room. Return packet payload header contains natural language ASCII string: "WELCOME TO THE SECOND BUS"',
    sourceIp: '198.51.100.22',
    destIp: '0.0.0.0/room',
    protocol: 'TCP/80'
  },
  {
    id: 'gl-log-03',
    timestamp: '1998-11-19 03:01:05',
    serverNode: 'MSN-POP-02 (Madison Dial-in Pool)',
    severity: 'ERROR',
    message: 'Modem bank 07 line 14: Client authenticated as "nyxgirl" but remote carrier reports dual-polarity duplex carrier on dead pair.',
    sourceIp: '209.142.68.14',
    destIp: '198.51.100.1',
    protocol: 'PPP'
  },
  {
    id: 'gl-log-04',
    timestamp: '2003-10-14 03:14:02',
    serverNode: 'ALL_REGIONAL_NODES',
    severity: 'CRITICAL',
    message: 'SYSTEM MASTER CLOCK SYNCHRONIZATION OVERRIDDEN BY EXTERNAL PEER "STATION_NULL". System clock stepped forward 4,749,021,800 milliseconds.',
    sourceIp: '184.0.NULL.7',
    destIp: '255.255.255.255',
    protocol: 'NTP'
  },
  {
    id: 'gl-log-05',
    timestamp: '2003-10-14 03:19:40',
    serverNode: 'CHI-GW-01 (Chicago Gateway)',
    severity: 'ANOMALOUS',
    message: 'Packet loop detected: Outbound packet from user "glasshouse" (Portland proxy) addressed to afterhours.org routed through 17 hops. Destination IP rewritten to SOURCE.',
    sourceIp: '216.239.38.10',
    destIp: 'SOURCE (SELF)',
    protocol: 'HTTP/1.1'
  },
  {
    id: 'gl-log-06', timestamp: '1998-11-27 03:14:00', serverNode: 'MSN-PBX-BRIDGE', severity: 'WARN', message: 'Eleven-minute voice sessions initiated from 14 campus extensions without off-hook signal.', sourceIp: 'VOICE/PBX', destIp: 'EXCHANGE-47', protocol: 'V.90/VOICE'
  },
  {
    id: 'gl-log-07', timestamp: '1998-11-27 03:25:00', serverNode: 'MKE-CORE-04', severity: 'ANOMALOUS', message: 'Remote peer terminated all voice sessions with ASCII payload: THE CALL IS INCOMING FROM 2003.', sourceIp: '0.0.0.0/room', destIp: 'MSN-PBX-BRIDGE', protocol: 'UNKNOWN'
  },
  {
    id: 'gl-log-08', timestamp: '1998-11-21 22:32:08', serverNode: 'MKE-BILLING-02', severity: 'INFO', message: 'Customer adjustment code G-47 created by M. Ortiz. Fourteen disputed sessions waived; no customer fault assigned.', sourceIp: 'INTERNAL/CARE', destIp: 'BILLING_DB', protocol: 'SQLNET'
  },
  {
    id: 'gl-log-09', timestamp: '1998-11-22 02:22:14', serverNode: 'MKE-CORE-04', severity: 'ANOMALOUS', message: 'Interactive login accepted for user vanhouten_d while badge controller records user 6.2 km off-site at bakery register.', sourceIp: 'LOCAL_CONSOLE', destIp: 'MKE-CORE-04', protocol: 'TELNET'
  },
  {
    id: 'gl-log-10', timestamp: '1999-01-12 00:25:59', serverNode: 'MSN-PBX-BRIDGE', severity: 'WARN', message: 'Campus radio voicemail replay requested. Analog buffer contains eleven-minute carrier segment predating account activation.', sourceIp: 'EXCHANGE-47', destIp: 'WISC-RADIO-VM', protocol: 'VOICE'
  },
  {
    id: 'gl-log-11', timestamp: '2002-12-01 23:48:00', serverNode: 'LAB-PORTMASTER-03', severity: 'ERROR', message: 'Diskless access server emitted historical EFnet payload with capture date 1998-11-19. Replay source not present on isolated segment.', sourceIp: 'PORTMASTER/ROM', destIp: 'LAB-CAPTURE', protocol: 'ETHERNET'
  },
  {
    id: 'gl-log-12', timestamp: '2003-09-28 22:11:00', serverNode: 'MKE-CORE-04', severity: 'WARN', message: 'Nonstandard BGP peer hold time set to 660 seconds. Configuration checksum unchanged; operator source unresolved.', sourceIp: '0.0.0.0/room', destIp: 'MKE-CORE-04', protocol: 'BGP-4'
  },
  {
    id: 'gl-log-13', timestamp: '2007-06-20 04:41:00', serverNode: 'MKE-ARCHIVE-GW', severity: 'ANOMALOUS', message: 'Retired dialup address authenticated to external social platform with valid credential assigned to deceased user Alden Corliss.', sourceIp: '209.142.68.14', destIp: 'PALISADE-SOCIAL', protocol: 'HTTPS'
  },
  {
    id: 'gl-log-14', timestamp: '2018-10-14 03:14:00', serverNode: 'NHF-INGEST-BW', severity: 'ANOMALOUS', message: 'Blue Window feed contains new entry referencing object RED_SWEATER. Hosting provider confirms all original disks destroyed in 2008.', sourceIp: '0.0.0.0/rowan', destIp: 'NHF-INGEST-BW', protocol: 'RSS/2.0'
  },
  {
    id: 'gl-log-15', timestamp: '2026-07-14 03:25:11', serverNode: 'NHF-SCRAPER-07', severity: 'ANOMALOUS', message: 'Inbound chat token received after socket quarantine: THE BASIL IS FLOWERING. No connected remote peer.', sourceIp: 'UNKNOWN', destIp: 'NHF-INGEST-REVIEW', protocol: 'IRC/LOCAL'
  }
];

export const greylineMemos = [
  {
    id: 'gl-memo-98',
    title: 'INTERNAL MEMO: Anomalous Subnet Propagation in Milwaukee Core',
    date: '1998-11-22',
    author: 'Dr. Douglas K. Van Houten, Senior Systems Architect',
    to: 'Greyline Operations & Engineering Group',
    content: `Classification: CONFIDENTIAL / INTERNAL ONLY\n\nOver the past seventy-two hours, our Milwaukee core router (MKE-CORE-04) has repeatedly accepted routing table updates for addresses that do not conform to RFC 791 IPv4 specifications.\n\nMost alarming is the behavior of packet streams routed into these addresses. When we trace a packet sent toward "0.0.0.0/room", the latency returns as negative four milliseconds (-4ms). The packet appears to be acknowledged at the destination before our interface physically initiates the TCP SYN handshake.\n\nI conducted a manual terminal session with the interface at 03:00 AM this morning. The remote endpoint sent back an HTTP header identifying itself as "Apache/1.3.1 (Second Architecture) OS/Unknown".\n\nIt is behaving like we are connected to another network that believes *we* are the invalid address.\n\nUnder no circumstances should any engineer attempt to bridge customer dialup pools directly to these unmapped subnets without my explicit presence.`,
    isAnomalous: true
  },
  {
    id: 'gl-memo-03',
    title: 'POST-INCIDENT PRELIMINARY REPORT: October 14 Telecom Event',
    date: '2003-10-18',
    author: 'Dr. Douglas K. Van Houten',
    to: 'Board of Directors, Greyline Communications',
    content: `Summary of Tuesday morning outage:\n\n1. At 03:14 AM, our primary BGP session with Sprint dropped.\n2. Inbound traffic was automatically redirected through a peering route discovered in our routing table under the identifier "EXCHANGE-47".\n3. For 11 minutes, customer web requests did not hit physical origin servers. Instead, they hit mirrored pages containing real-time surveillance of user locations.\n4. Seventeen active customer modem connections in Wisconsin and Illinois dropped simultaneously at 03:25 AM. We have been unable to establish telephone contact with nine of those account holders.\n5. We are recommending the immediate destruction of Milwaukee switch rack #4 and total dissolution of our regional dialup leasing agreements.`,
    isAnomalous: true
  },
  {
    id: 'gl-memo-customer-care',
    title: 'CUSTOMER CARE BULLETIN: Late-Night Campus Billing Complaints',
    date: '1998-11-30',
    author: 'Maribel Ortiz, Customer Operations Supervisor',
    to: 'Madison Dialup Support & Billing',
    content: `Please stop forwarding every disputed eleven-minute call to Engineering without first checking the ordinary causes. We have students frightened that their roommates are using the phones, parents accusing them of calling strangers, and one residence adviser asking whether our modems can dial while nobody is home.\n\nUse billing code G-47 to waive the charge. Do not tell customers the destination field reads "ADJACENT NETWORK." Engineering has requested that phrase remain internal until they determine which vendor inserted it.\n\nAlso: whoever left three coffees outside Rack #4, thank you. Night operations has been living on vending-machine crackers.`,
    isAnomalous: false
  },
  {
    id: 'gl-memo-night-shift', title: 'NIGHT OPERATIONS HANDOFF: Heat, Food, and Rack Access', date: '1998-11-23', author: 'Betty Lin, Network Operations', to: 'Weekend NOC Rotation',
    content: `1. Building heat is unreliable after midnight. Bring a sweater, but do not place clothing on equipment.\n2. Rack #4 is cold enough to condense moisture. Observe from the marked line unless Douglas is present.\n3. Customer Care left coffee. Mike has been formally accused of stealing the cinnamon pastries.\n4. If console user vanhouten_d appears while Douglas is visibly elsewhere, photograph the screen and disconnect the keyboard only. Do not type into the session.\n5. Call Maribel before escalating frightened customers to Engineering.`,
    isAnomalous: false
  },
  {
    id: 'gl-memo-preservation', title: 'LEGAL HOLD: Preserve Customer Context With Technical Records', date: '2003-10-20', author: 'Maribel Ortiz, Customer Operations Supervisor', to: 'Greyline Legal, Billing, and Engineering',
    content: `Do not purge the disputed-call notes when preserving telecom logs. Engineering has requested timestamps, but the customer narratives establish whether rooms were occupied, whether phones were off-hook, and what background sounds callers heard.\n\nRedact names and residence numbers in any research copy. Retain originals under legal hold. Nobody outside the response team may contact customers for follow-up without written approval. These people called us to fix a bill, not to volunteer for an investigation.`,
    isAnomalous: false
  },
  {
    id: 'gl-memo-decommission', title: 'DECOMMISSION CHECKLIST: Milwaukee Core Rack #4', date: '2004-01-12', author: 'Betty Lin, Security & Infrastructure', to: 'Greyline Facilities',
    content: `Planned work:\n- Photograph cabling before removal.\n- Hash and image configuration EEPROM.\n- Disconnect power at panel MKE-C before touching chassis.\n- Preserve frost residue sample if present.\n- Two-person rule at all times.\n\nUnplanned result: after panel MKE-C was opened, facilities found no breaker labeled Rack #4. Chassis remained powered. Decommission suspended at 11:14. Lunch order canceled except Maribel's soup, which had already arrived.`,
    isAnomalous: true
  },
  {
    id: 'gl-memo-social-auth', title: 'ARCHIVE NOTICE: Retired Address Used in Palisade Authentication', date: '2007-06-21', author: 'Corbin Keller, Contract Systems Consultant', to: 'Greyline Records Custodian',
    content: `A Palisade account associated with Alden Corliss authenticated from 209.142.68.14, formerly assigned to the Madison dial-in pool. The block has not been routed publicly since 2004.\n\nI have preserved sanitized headers and notified the Corliss family. Do not attempt login, password reset, or outbound contact from the retired range. Treat the event as account abuse unless independently demonstrated otherwise.`,
    isAnomalous: true
  },
  {
    id: 'gl-memo-bakery', title: 'EVIDENCE ADDENDUM: Bakery Receipt and Duplicate Login', date: '2020-02-04', author: 'Dr. Gideon Falk, NHF Collections', to: 'Collection 09 Description File',
    content: `A receipt from East Line Bakery places Douglas Van Houten, Rackrat, and two night operators off-site at 02:22 on 22 November 1998. Terminal 21 chat and the Greyline authentication log show vanhouten_d signing into Rack #4 at the same minute.\n\nThe receipt was previously excluded as nontechnical ephemera. It now narrows the possibilities to credential replay, remote automation, timestamp error, or a duplicate session. Preserve the full order. The cinnamon pastry assigned to Customer Care corroborates Maribel Ortiz's email.`,
    isAnomalous: true
  }
];
