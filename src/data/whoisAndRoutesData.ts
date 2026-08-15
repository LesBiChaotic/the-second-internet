import { WhoisRecord, RouteRecord } from '../types';

export const whoisDatabase: Record<string, WhoisRecord> = {
  'marrow.net': {
    domain: 'marrow.net',
    registrar: 'Network Solutions, Inc. (Legacy InterNIC)',
    creationDate: '1997-10-12',
    expirationDate: '2001-10-12 (Decommissioned)',
    registrant: 'Marrow Student Web Guild / Corbin Keller (Madison, WI)',
    nameservers: ['ns1.marrow.net', 'ns2.greyline.net'],
    status: 'ARCHIVED / DECOMMISSIONED',
    lastResolved: '1999-12-31',
    isAnomalous: false,
    notes: 'Preserved under Foundation Collection 04.'
  },
  'afterhours.org': {
    domain: 'afterhours.org',
    registrar: 'Tucows Domains Inc.',
    creationDate: '2001-02-14',
    expirationDate: '2005-02-14 (Abandoned)',
    registrant: 'Alden Corliss (1412 E. Johnson St, Madison WI)',
    nameservers: ['ns1.afterhours.org', 'ns2.speakeasy.net'],
    status: 'SUSPENDED / UNRESOLVED',
    lastResolved: '2003-10-14 03:25:19 UTC',
    isAnomalous: true,
    notes: 'Domain dropped offline abruptly during the Oct 14 routing event.'
  },
  'candle-room.com': {
    domain: 'candle-room.com',
    registrar: 'Domain Discover',
    creationDate: '1998-01-08',
    expirationDate: '2001-01-08',
    registrant: 'Elena Rostova (Private Listing)',
    nameservers: ['ns1.candleroom.com', 'ns1.novosibirsk-telecom.ru'],
    status: 'ARCHIVED',
    lastResolved: '2001-04-12',
    isAnomalous: false,
    notes: 'Preserved under Foundation Collection 07.'
  },
  'greyline.net': {
    domain: 'greyline.net',
    registrar: 'InterNIC',
    creationDate: '1995-05-18',
    expirationDate: '2002-08-30 (Liquidated)',
    registrant: 'Greyline Communications Corp. (Milwaukee, WI)',
    nameservers: ['ns1.greyline.net', 'ns2.greyline.net'],
    status: 'DISSOLVED',
    lastResolved: '2002-08-30',
    isAnomalous: false,
    notes: 'Hardware assets acquired by private auction in 2003.'
  },
  'bluewindow.net': {
    domain: 'bluewindow.net',
    registrar: 'GoDaddy / Namecheap Historical',
    creationDate: '2003-09-01',
    expirationDate: '2007-12-15 (Closed)',
    registrant: 'Blue Window Interactive Media LLC (Seattle, WA)',
    nameservers: ['ns1.bluewindow.net', 'ns2.bluewindow.net'],
    status: 'HARDWARE DECOMMISSIONED / SCRAPING ANOMALY ACTIVE',
    lastResolved: 'LIVE TODAY (Resolving via unroutable loopback)',
    isAnomalous: true,
    notes: 'Scraper logs receive new daily updates from unhosted domain.'
  },
  'roomwithoutdoors.net': {
    domain: 'roomwithoutdoors.net',
    registrar: 'NEVER REGISTERED / PRE-INTERNET ENTITY',
    creationDate: '0000-00-00',
    expirationDate: 'PERMANENT',
    registrant: 'SELF (THE SECOND BUS)',
    nameservers: ['ns1.second-bus.net', 'station-null.root'],
    status: 'ACTIVE ON SECOND INTERNET',
    lastResolved: 'RIGHT NOW',
    isAnomalous: true,
    notes: 'Resolves with 0ms latency across all known gateway routers.'
  },
  'nethistoryfoundation.org': {
    domain: 'nethistoryfoundation.org',
    registrar: 'Public Interest Registry (PIR)',
    creationDate: '2017-06-04',
    expirationDate: '2030-06-04',
    registrant: 'Net History Foundation (Madison / Chicago Research HQ)',
    nameservers: ['ns1.nethistoryfoundation.org', 'ns2.nethistoryfoundation.org', 'ns-quarantine.internal'],
    status: 'ACTIVE / PRODUCTION ARCHIVE',
    lastResolved: 'TODAY',
    isAnomalous: false,
    notes: 'Public research and digital preservation repository.'
  }
};

export const routeTraceRecords: Record<string, RouteRecord> = {
  'marrow.net': {
    domain: 'marrow.net',
    destinationIp: '198.51.100.22',
    isAnomalous: false,
    summary: 'Standard 1998 dialup routing path through Midwest regional backbones to Madison campus server.',
    steps: [
      { hop: 1, ip: '192.168.1.1', nodeName: 'local.gateway', location: 'Client Network', latency: '1 ms', status: 'NORMAL' },
      { hop: 2, ip: '209.142.68.1', nodeName: 'msn-dialup-02.greyline.net', location: 'Madison, WI', latency: '28 ms', status: 'NORMAL' },
      { hop: 3, ip: '198.51.100.1', nodeName: 'mke-core-04.greyline.net', location: 'Milwaukee, WI', latency: '34 ms', status: 'NORMAL' },
      { hop: 4, ip: '198.51.100.22', nodeName: 'web.marrow.net', location: 'CS Lab Basement, Madison WI', latency: '38 ms', status: 'NORMAL' }
    ]
  },
  'roomwithoutdoors.net': {
    domain: 'roomwithoutdoors.net',
    destinationIp: '0.0.0.0/room',
    isAnomalous: true,
    summary: 'Anomalous packet stream terminating at unallocated topological singularity with negative latency.',
    steps: [
      { hop: 1, ip: '192.168.1.1', nodeName: 'local.gateway', location: 'Client Network', latency: '1 ms', status: 'NORMAL' },
      { hop: 2, ip: '198.51.100.1', nodeName: 'mke-core-04.greyline.net', location: 'Milwaukee, WI', latency: '14 ms', status: 'NORMAL' },
      { hop: 3, ip: '184.0.NULL.7', nodeName: 'exchange-47.bridge', location: 'CHICAGO VIRTUAL STEP', latency: '2 ms', status: 'ANOMALOUS', comment: 'Interface responds without physical clock pulse' },
      { hop: 4, ip: '0.0.0.0/room', nodeName: 'SOURCE (SELF)', location: 'THE SECOND BUS', latency: '-4 ms', status: 'IMPOSSIBLE', comment: 'Destination IP rewritten to request source; packet acknowledged before transmission' }
    ]
  },
  'bluewindow.net': {
    domain: 'bluewindow.net',
    destinationIp: '127.0.0.1:harper',
    isAnomalous: true,
    summary: 'Scraper route demonstrating non-local persistence across decommissioned Seattle server addresses.',
    steps: [
      { hop: 1, ip: '192.168.1.1', nodeName: 'local.gateway', location: 'Client Network', latency: '1 ms', status: 'NORMAL' },
      { hop: 2, ip: '64.12.168.1', nodeName: 'sea-backbone-01.level3.net', location: 'Seattle, WA', latency: '48 ms', status: 'NORMAL' },
      { hop: 3, ip: '0.0.0.0/harper', nodeName: 'closed-host.second-net', location: 'Portland Residual Corridor', latency: '0.02 ms', status: 'ANOMALOUS', comment: 'Host hardware turned off in 2007; response generated from topological residue' }
    ]
  }
};
