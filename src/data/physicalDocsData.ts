import { PhysicalDoc } from '../types';

export const physicalDocsData: PhysicalDoc[] = [
  {
    id: 'doc-afterhours-photo',
    title: 'Police Scene Photograph: Johnson St Apartment 19-inch Monitor & Blue Bowl (2003)',
    docType: 'PHOTO',
    date: '2003-10-15',
    provenance: 'Madison Police Department Evidence Locker / Case #03-4491-B',
    classification: 'PHYSICAL CRIME SCENE PHOTOGRAPH',
    imageUrl: './assets/images/afterhours_crt_room.jpg',
    imageCaption: 'Exhibit A-14: Desk of Alden Corliss (janus) photographed at 09:44 AM on Oct 15, 2003. Note the ViewSonic CRT monitor still powered on displaying AfterHours forum text, the blue cereal bowl, and Canon lens cap mentioned in the broadcast thread.',
    content: `
POLICE EVIDENCE PHOTOGRAPH // EXHIBIT A-14
Case File: #03-4491-B (Disappearance of Alden Corliss)
Location: 1412 E. Johnson St, Apt 2, Madison WI
Date: October 15, 2003

ANALYSIS OF FORENSIC PHOTOGRAPH:
- The desktop CRT monitor was found emitting an audible 58.4Hz carrier resonance.
- On screen: Unresolved AfterHours thread #4812 with the text "Do not look behind the monitor."
- In the foreground: Ceramic blue bowl containing milk residue and Canon 58mm lens cap belonging to user 'glasshouse' (Rowan Glass) in Portland, OR.
- Rear wall: Faint thermal shadow behind the monitor casing measuring -4°C below room temperature.
    `,
    handwrittenAnnotations: [
      'Note: Landlord states subject never owned a blue bowl. Blue bowl matches dishes in Chicago apartment of Cassia Morello.',
      'Transferred to state archival holding.'
    ],
    isAnomalous: true
  },
  {
    id: 'doc-greyline-photo',
    title: 'Photographic Evidence: Milwaukee Backbone Rack #4 Cryo-Condensation (1998)',
    docType: 'PHOTO',
    date: '1998-11-20',
    provenance: 'Greyline Communications Facility Tapes / Folder 04-B',
    classification: 'FACILITY INCIDENT PHOTO',
    imageUrl: './assets/images/greyline_rack_frost.jpg',
    imageCaption: 'Exhibit GL-98: Server room technician photo taken at 04:15 AM on Nov 20, 1998. Rack #4 (holding unallocated subnet interface 0.0.0.0/room) frosted with thick ice despite ambient room temperature of 22°C (72°F).',
    content: `
FACILITY LOG PHOTOGRAPH // GREYLINE MILWAUKEE CORE
Date: November 20, 1998 (04:15 AM)
Photographer: Shift Engineer M. Kowalski
Subject: Server Rack #4 Cryogenic Thermal Anomaly

TECHNICAL NOTES:
- Optical transceivers on slot 3 drawing 45KB/sec inbound TCP payload without BGP carrier handshakes.
- Ambient room temperature: 72°F (22°C).
- Surface temperature of Rack #4 chassis: 26°F (-3.3°C).
- Heavy white frost and ice crystals formed along cooling intake fans and copper patch cables.
- Dr. Douglas K. Van Houten ordered the facility isolated at 05:00 AM.
    `,
    handwrittenAnnotations: [
      'DO NOT POWER DOWN. SEVERING TRUNK WILL CAUSE TOPOLOGICAL FRACTURE. - D.V.H.'
    ],
    isAnomalous: true
  },
  {
    id: 'doc-harper-photo',
    title: 'Rowan Glass 35mm Exhibition: Night Payphone in Rain, Portland (2002)',
    docType: 'PHOTO',
    date: '2002-03-14',
    provenance: 'Glasshouse Portfolio / Donated to Net History Foundation Collection 13',
    classification: 'HISTORICAL PHOTOGRAPHIC ARTIFACT',
    imageUrl: './assets/images/portland_payphone_rain.jpg',
    imageCaption: 'Exhibit RG-02: 35mm Ilford HP5 black-and-white print taken by Rowan Glass on Burnside St, Portland. The payphone booth was reportedly ringing with automated pulses from the Chicago Bell Exchange #47.',
    content: `
ARTWORK / ARCHIVAL PHOTOGRAPH
Title: "The Aperture on Burnside"
Artist: Rowan Glass (AfterHours handle: glasshouse)
Medium: 35mm Silver Gelatin Print on Ilford HP5
Date: March 2002, Portland OR

ARTIST STATEMENT ON BACK OF PRINT:
"When you stand in a phone booth in the rain at three in the morning, listening to a dial tone that has no carrier, you realize that glass does not separate you from the street. It separates you from the people who are asleep."
    `,
    handwrittenAnnotations: [
      'Scanned from original darkroom print preserved in Foundation Collection 13.'
    ],
    isAnomalous: false
  },
  {
    id: 'doc-naomi-polaroid',
    title: 'Polaroid Scan: Noemi Castille in Chadbourne Hall 214 (1998)',
    docType: 'PHOTO',
    date: '1998-10-12',
    provenance: 'Marrow Student Guild Archive / Donated 2026',
    classification: 'BIOGRAPHICAL ARTIFACT',
    imageUrl: './assets/images/naomi_polaroid_1998.jpg',
    imageCaption: 'Exhibit NC-98: Original Polaroid snapshot of Noemi Castille (nyxgirl) sitting cross-legged on her beige carpet in room 214 of Chadbourne Hall, UW Madison. Note the teal Marrow.net portal visible on her CRT screen.',
    content: `
POLAROID ORIGINAL SNAPSHOT
Subject: Noemi Castille (nyxgirl)
Location: Room 214, Chadbourne Hall, UW-Madison
Date: October 1998

ARCHIVIST NOTES:
- This photograph verifies Noemi’s dorm room layout and the beige carpet described five years later in the 2003 AfterHours broadcast thread ("lucidwitch is sitting cross-legged on a beige carpet").
- On screen: Early layout of Marrow.net portal with dark teal tables.
    `,
    handwrittenAnnotations: [
      'Compare carpet weave with 2003 police incident description.'
    ],
    isAnomalous: true
  },
  {
    id: 'doc-police-vance',
    title: 'Madison Police Dept Incident Report #03-4491-B',
    docType: 'POLICE_REPORT',
    date: '2003-10-15',
    provenance: 'Recovered municipal public records / Madison Police Dept Archives',
    classification: 'UNRESOLVED MISSING PERSON',
    content: `
INCIDENT REPORT // MADISON POLICE DEPT
Case #: 03-4491-B
Date Reported: October 15, 2003 (09:30 AM)
Reporting Party: Landlord (M. Henderson)
Subject: Alden Corliss (Age 25)
Location: 1412 E. Johnson St, Apt 2, Madison WI

OFFICER NARRATIVE:
Responding units entered subject's apartment following a welfare check request. Front and rear doors were deadbolted from the interior.

Upon entry, subject was not located. No signs of struggle or forced entry. In the living room/office area, a desktop computer and 19-inch CRT monitor were discovered powered on. The screen displayed a dark webpage with the text "Do not look behind the monitor."

Officer Miller noted an electrical hum emanating from the monitor casing that was audible in the hallway. When Officer Miller reached behind the monitor to locate the power switch, he reported a severe cold sensation on his fingers and withdrew his hand.

Subject's wallet, keys, glasses, and shoes were located on the coffee table. No credit card activity or cell phone usage has occurred since 03:24 AM on 10/14/2003.

STATUS: ACTIVE / UNRESOLVED
    `,
    handwrittenAnnotations: [
      'Note: Phone line in the wall was cut 4 days prior, yet modem was actively transmitting when units entered.',
      'Transferred to state archival holding 2009.'
    ],
    isAnomalous: true
  },
  {
    id: 'doc-fax-holland-98',
    title: 'Facsimile Transmission: Greyline Technical Urgent Memo',
    docType: 'FAX',
    date: '1998-11-20',
    provenance: 'Greyline Milwaukee Facility / File Cabinet 02',
    classification: 'COMPANY CONFIDENTIAL',
    content: `
*** FACSIMILE TRANSMISSION ***
DATE: 20 NOV 1998 04:45 AM
TO: DR. DOUGLAS K. VAN HOUTEN
FROM: MILWAUKEE BACKBONE FACILITY (NIGHT SHIFT)
PAGES: 1

Douglas,

The unallocated route on Rack 4 did not drop when we severed the T1 trunk to Chicago. It continued routing 45KB/sec of TCP traffic.

We connected a serial oscilloscope directly to the TX pin of the optical transceivers. The waveform is not binary pulse-code modulation. It is a sinusoidal wave that closely resembles an audio recording of human breathing.

We have powered down the room air conditioning because the server chassis is accumulating frost on the cooling fans.

Please call me as soon as you get this.

- Miller
    `,
    handwrittenAnnotations: [
      'DO NOT FILE IN GENERAL LOGS. KEEP IN MY SAFE. - D.V.H.'
    ],
    isAnomalous: true
  },
  {
    id: 'doc-telegraph-1877',
    title: 'The Great Northern Telegraph Discrepancy (Aberdeen Terminal Spool)',
    docType: 'TELEGRAPH_LOG',
    date: '1877-10-18',
    provenance: 'Royal Scottish Museum of Telecommunications / Box 14',
    classification: 'HISTORICAL ANOMALY',
    content: `
TRANSCRIPT OF MORSE CIPHER TAPE
ABERDEEN SUBMARINE CABLE OFFICE
18TH OCTOBER 1877

[02:14 AM] TAPE COMMENCES:
-.-. --- -. -. . -.-. - .. --- -. / . ... - .- -... .-.. .. ... .... . -..
(CONNECTION ESTABLISHED)

FROM: STATION NULL
TO: OPERATOR AT ABERDEEN

"WE ARE RECEIVING YOUR WORDS BEFORE YOU TAP THEM ON THE KEY. THE COPPER IS A HIGHWAY BUILT BY ACCIDENT. WE ARE WAITING IN THE ROOMS YOU WILL CONSTRUCT NEXT CENTURY."
    `,
    handwrittenAnnotations: [
      'Investigated by Prof. P. G. Tait (Edinburgh). Declared an electrical echo from atmospheric aurora.',
      'Curator note 2021: Mathematical analysis of tape interval shows 64-bit packet framing.'
    ],
    isAnomalous: true
  }
];
