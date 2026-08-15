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
  }
];
