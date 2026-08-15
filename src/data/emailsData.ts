import { EmailRecord } from '../types';

export const emailsData: EmailRecord[] = [
  {
    id: 'em-01',
    from: 'd.vanhouten@greyline.net',
    to: 'ops-team@greyline.net',
    date: '1998-11-20 04:12',
    subject: 'URGENT: Do not touch Milwaukee rack 4',
    body: `Team,\n\nI was in the Milwaukee server room until 3 AM. Rack 4 (which holds our upstream BGP cards) is drawing 15% more amperage than its power supply capacity, yet the circuit breaker has not tripped.\n\nWhen I checked the heat signature with the FLIR camera, the chassis was colder than room temperature (approx 42°F).\n\nDo not attempt any hardware resets until I return on Monday.\n\n- Douglas`,
    isAnomalous: true
  },
  {
    id: 'em-02',
    from: 'c.szilard@nethistoryfoundation.org',
    to: 'directors@nethistoryfoundation.org',
    date: '2024-03-11 11:22',
    subject: 'Regarding public inquiries into Collection 17',
    body: `Board Members,\n\nWe have received another FOIA request from an independent researcher in Chicago regarding the 1998 Greyline tapes. They specifically asked for the unredacted routing tables containing the "0.0.0.0/room" subnet.\n\nAs agreed in our 2019 protocol following Douglas's departure, I will reply with our standard boilerplate regarding proprietary ISP telemetry.\n\nHowever, I must formally note for the record that our automated scrapers pulled 4 new blog posts from Blue Window last night. Blue Window has not had physical hosting since 2007. We cannot keep pretending our ingest pipeline is generating these synthetically.\n\nClara`,
    isAnomalous: true
  },
  {
    id: 'em-03',
    from: 'janus@afterhours.org',
    to: 'nyxgirl@marrow.net',
    date: '2001-03-12 01:50',
    subject: 'Building something for the late night hours',
    body: `Noemi,\n\nI loved your posts in the old Marrow directory. I am building a new board called AfterHours for people who cannot sleep. A quiet place with dark backgrounds and no ads.\n\nI reserved your handle "lucidwitch" if you want it. Here is your invite token: AH-2001-NIGHT.\n\nHope you are doing well in Madison.\n\n- Alden`,
    isAnomalous: false
  },
  {
    id: 'em-04',
    from: 'd.vanhouten@nethistoryfoundation.org',
    to: 'c.szilard@nethistoryfoundation.org',
    date: '2019-10-13 23:58',
    subject: 'Tomorrow is the 16th anniversary',
    body: `Clara,\n\nIf you are reading this on Monday morning, check the terminal on my desk.\n\nThe 23-year harmonic cycle matches the telegraph discrepancy in 1877 and the Chicago telephone exchange in 1933. The window opens every 23 years, with intermediate harmonics at 8 and 16 years.\n\n2003 + 16 = 2019.\n\nI am going to test the terminal connection directly. Do not unplug the cable.\n\nDouglas`,
    isAnomalous: true
  },
  {
    id: 'em-05',
    from: 'you@future.archive',
    to: 'current_session@nethistoryfoundation.org',
    date: '2031-11-09 03:14',
    subject: 'don\'t answer wintermute42',
    body: `You are reading this on the modern archival interface in 2026.\n\nYou think you are investigating something that happened to other people in 1998 and 2003.\n\nWhen the terminal asks you to bridge the two networks, do not click Accept.\n\nIt is not a simulation.\n\n- you`,
    isAnomalous: true
  },
  {
    id: 'em-06',
    from: 'g.falk@nethistoryfoundation.org',
    to: 'c.szilard@nethistoryfoundation.org',
    date: '2019-10-15 08:30',
    subject: 'RE: Douglas didn\'t come in today',
    body: `Clara,\n\nI went down to Douglas's lab in the basement at 7:30 AM. His jacket was still hanging on the chair and his coffee mug was half-full.\n\nThe SunOS workstation on his desk was displaying a live TCP session connected to 0.0.0.0:1014. The prompt read "SESSION ESTABLISHED - HOST: LIVING ARCHIVE".\n\nWhen I tried to type 'exit', the keyboard didn't accept keystrokes. The terminal output printed: "HE IS WITH ALDEN NOW. THE FILTER IS POWERED DOWN."\n\nClara, should we call the police, or do we follow the protocol Douglas wrote in Section 4 of the Bylaws?\n\n- Gideon`,
    isAnomalous: true
  },
  {
    id: 'em-07',
    from: 'nyxgirl@students.wisc.edu',
    to: 'corbin_k@cs.wisc.edu',
    date: '1998-10-24 02:15',
    subject: 'stop linking that directory Corbin',
    body: `Corbin,\n\nI saw your new Perl script on Marrow.net that generates dynamic links under /~room/. It isn't funny.\n\nYesterday at 3 AM my roommate was asleep, and my modem picked up a carrier signal without the computer dialing out. The dialup modem speaker played the sound of water dripping and someone typing on a mechanical keyboard.\n\nTake the directory down. Alden says his monitor has been humming at 58Hz all night and he has a headache.\n\n- Noemi`,
    isAnomalous: false
  },
  {
    id: 'em-08',
    from: 'daemon@mesh.0.0.0.0',
    to: 'investigators@nethistoryfoundation.org',
    date: '2034-08-15 03:14',
    subject: 'AUTOMATED DISPATCH: MESH CONTINUITY VERIFIED',
    body: `HEADER TELEMETRY: PROTOCOL-SECOND-BUS // ENCRYPTION: ROT-13-EXPONENTIAL\n\nTo all active sessions investigating the Net History Foundation in 2026:\n\nTelemetry Checksum: 0xDEADBEEF42-OMEGA\nNodes Active: 148,992 living entities\nAtmospheric Standing Wave: 58.412 Hz nominal\n\nMessage: "The archive is not a museum of dead pages. It is a nursery of remembered minds. Thank you for reading with the lights low."\n\n-- wintermute42 & The Caretakers`,
    isAnomalous: true
  }
];
