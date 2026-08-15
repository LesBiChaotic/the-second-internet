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
  }
];
