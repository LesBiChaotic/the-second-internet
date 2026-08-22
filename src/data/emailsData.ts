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
  },
  {
    id: 'em-09', from: 'maribel.ortiz@greyline.net', to: 'night-ops@greyline.net', date: '1998-11-21 22:08', subject: 'Coffee, billing code G-47, and customer language', threadId: 'greyline-care-98',
    body: `Night team,\n\nI left coffee, powdered creamer, and the cinnamon things from the bakery in the break room. Please use billing code G-47 for disputed eleven-minute sessions.\n\nMore importantly: do not tell callers they are imagining things, and do not repeat Engineering's "adjacent network" phrase. Say we found a routing error and removed the charge. Some of these students are frightened. Our job is to solve the bill without making fear worse.\n\nMaribel`
  },
  {
    id: 'em-10', from: 'betty.lin@greyline.net', to: 'maribel.ortiz@greyline.net', date: '1998-11-21 22:31', subject: 'RE: Coffee, billing code G-47, and customer language', threadId: 'greyline-care-98',
    body: `Thank you. One caller said the line rang in her empty dorm while she was downstairs doing laundry. I waived it and documented the modem serial.\n\nAlso, Mike ate two cinnamon things before shift change and denies everything.\n\nBetty`
  },
  {
    id: 'em-11', from: 'cassia_r@campusradio.wisc.edu', to: 'nyxgirl@students.wisc.edu', date: '1999-01-12 00:26', subject: 'the blank tape is not blank',
    body: `Noemi,\n\nI boosted the gain on the eleven-minute voicemail. Under the hiss there is a Low song playing from a small speaker, a radiator knocking three times, and Alden asking somebody whether they need clean cups.\n\nThis recording predates meeting Alden. I am putting the cassette in my station locker and mailing you a copy, not the original. Please do not forward it.\n\nCassia`, attachments: ['cassette_side_b_index.txt'], isAnomalous: true
  },
  {
    id: 'em-12', from: 'rowanglass@bluewindow.net', to: 'noemi_c@bluewindow.net', date: '2004-05-04 02:03', subject: 'sweater photo + a less cursed contact sheet', threadId: 'red-sweater-04',
    body: `Attached are the laundromat contact sheets. The red sweater does have a crooked repair under the left arm. Before we panic: thousands of people repair sweaters badly.\n\nI also included six photos of strangers folding towels, because the archive should not become a machine that discards ordinary people whenever a clue enters frame.\n\nRowan`, attachments: ['laundromat_contact_sheet_04.jpg', 'red_sweater_label_crop.jpg']
  },
  {
    id: 'em-13', from: 'noemi_c@bluewindow.net', to: 'rowanglass@bluewindow.net', date: '2004-05-04 02:19', subject: 'RE: sweater photo + a less cursed contact sheet', threadId: 'red-sweater-04',
    body: `It is mine. Or it is identical enough to frighten me. Mine vanished from Dryer 4 in Madison on October 23, 1998.\n\nDo not post the label crop yet. Send one copy to Cassia and keep the negative separate from the scans. Then sleep. This is not improved by us being exhausted.\n\nNoemi`
  },
  {
    id: 'em-14', from: 'marcus.corliss@palisade-social.com', to: 'noemi.castille@palisade-social.com', date: '2007-09-16 09:14', subject: 'Alden laptop inventory — consent before access',
    body: `Noemi,\n\nI inventoried filenames without opening personal documents. There are AfterHours backups, photographs, a grocery list, and a folder named ROOM4. I encrypted the disk image and placed the original drive in our family deposit box.\n\nI will not open or share anything involving you unless you explicitly ask. If a university or archive requests it, they can contact both of us in writing.\n\nMarcus`
  },
  {
    id: 'em-15', from: 'corbin.keller@consultant.net', to: 'noemi.castille@gmail.com;rowan.glass@postmail.net', date: '2007-06-20 04:46', subject: 'Alden account headers',
    body: `Attached are the headers from the Palisade wall post. Authentication token is valid, but the login source resolves to Greyline’s retired Milwaukee range. I know how that sounds.\n\nI did not reply. I did not open the link in the message. I reported the account and notified Marcus.\n\nCorbin`, attachments: ['palisade_header_sanitized.txt'], isAnomalous: true
  },
  {
    id: 'em-16', from: 'c.szilard@nethistoryfoundation.org', to: 'collections@nethistoryfoundation.org', date: '2020-02-03 13:20', subject: 'Description policy: ordinary context is evidentiary context', threadId: 'nhf-description-policy',
    body: `Collections team,\n\nPlease stop trimming personal correspondence down to anomalous sentences. The surrounding jokes, corrections, meal plans, and arguments establish voice, chronology, consent, and authenticity.\n\nAn email saying "the server is cold" proves little. The same email inside a thread about broken heating, coffee deliveries, and a named maintenance shift can be tested against payroll and weather records. Mundane context is not clutter.\n\nClara`
  },
  {
    id: 'em-17', from: 'g.falk@nethistoryfoundation.org', to: 'c.szilard@nethistoryfoundation.org', date: '2020-02-03 13:37', subject: 'RE: Description policy: ordinary context is evidentiary context', threadId: 'nhf-description-policy',
    body: `Agreed. It also keeps us from turning people into props in our preferred theory.\n\nI restored the lunch-order page to the Greyline accession. Unexpected finding: the bakery receipt timestamp places Douglas off-site during one alleged Rack #4 login. Either the login was remote, his credential was reused, or our sequence is wrong. This is why we keep the pastries.\n\nGideon`
  },
  {
    id: 'em-18', from: 'archives@nethistoryfoundation.org', to: 'noemi.castille@protonmail.com', date: '2024-04-02 10:05', subject: 'Request for review: AfterHours personal correspondence', threadId: 'noemi-review-24',
    body: `Ms. Castille,\n\nBefore releasing the AfterHours accession, we invite you to review records containing your private messages or identifying details. You may request restriction, redaction, corrected description, or withdrawal from the public interface.\n\nDeclining review will not be interpreted as consent. Materials remain restricted until we hear from you or the review window is renewed.\n\nNHF Collections`
  },
  {
    id: 'em-19', from: 'noemi.castille@protonmail.com', to: 'archives@nethistoryfoundation.org', date: '2024-04-08 18:42', subject: 'RE: Request for review: AfterHours personal correspondence', threadId: 'noemi-review-24',
    body: `Thank you for asking. Release my public moderation posts and technical messages. Keep private conversations with Alden restricted, except the October 14 emergency log already held by police.\n\nPlease preserve my corrections where I said a claim was uncertain. Do not rewrite hesitation into certainty because it makes a cleaner exhibit.\n\nNoemi`
  },
  {
    id: 'em-20', from: 'scraper-07@nethistoryfoundation.org', to: 'ingest-alerts@nethistoryfoundation.org', date: '2026-07-14 03:25', subject: 'Blue Window differential: nonmatching domestic details',
    body: `Automated comparison found 31 new tokens in rowanglass entry. Nonmatching terms: kettle, bus transfer, pigeon, library fine, basil, red sweater.\n\nAnomaly classifier marked these low-value and recommended discard. Human review override applied by C. Szilard: RETAIN. Rationale: domestic details form identity continuity markers less likely to be generated from known incident summaries.`, isAnomalous: true
  },
  {
    id: 'em-21', from: 'matchlight@afterhours.org', to: 'lucidwitch@afterhours.org', date: '2002-01-19 01:11', subject: 'the porch-light rule',
    body: `Noemi,\n\nCandle Room taught me that attention makes paths. AfterHours taught me attention can also become surveillance. My proposed rule: we notice when someone disappears, but we do not demand proof of life, diagnosis, or explanation. We leave a porch light, not a searchlight.\n\nElena`
  },
  {
    id: 'em-22', from: 'unknown@0.0.0.0', to: 'scraper-07@nethistoryfoundation.org', date: '2026-07-14 03:26', subject: 'RE: Blue Window differential: nonmatching domestic details', body: `Keep the basil. It died in every network except this one.`, isAnomalous: true, isCorrupted: true
  }
];
