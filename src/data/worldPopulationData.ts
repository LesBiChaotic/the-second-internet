import { CommunityMember, ForumThread, TracePost } from '../types';

type ForumSeed = [string, string, string, string, string, string, string];

const makeThread = (siteId: string, index: number, seed: ForumSeed): ForumThread => {
  const [title, category, author, date, opening, replyOne, replyTwo] = seed;
  return {
    id: `pop-${siteId}-${String(index + 1).padStart(2, '0')}`,
    siteId,
    title,
    category,
    createdDate: date.slice(0, 10),
    authorHandle: author,
    replyCount: 3,
    viewCount: 140 + index * 97,
    posts: [
      { id: `pop-${siteId}-${index + 1}-a`, authorHandle: author, authorTitle: 'Member', timestamp: date, content: opening },
      { id: `pop-${siteId}-${index + 1}-b`, authorHandle: index % 2 ? 'mothsignal' : 'teacup_sysop', authorTitle: 'Member', timestamp: `${date.slice(0, 10)} 22:18`, content: replyOne },
      { id: `pop-${siteId}-${index + 1}-c`, authorHandle: index % 2 ? 'teacup_sysop' : 'mothsignal', authorTitle: 'Member', timestamp: `${date.slice(0, 10)} 23:06`, content: replyTwo },
      { id: `pop-${siteId}-${index + 1}-d`, authorHandle: author, authorTitle: 'Member', timestamp: `${date.slice(0, 10)} 23:41`, content: 'Update recorded. This is exactly why I asked people instead of trusting the first search result. Thank you, strange little internet.' }
    ]
  };
};

const marrowSeeds: ForumSeed[] = [
  ['Best place to print twenty pages after midnight?', 'Campus Life', 'paperjam', '1998-02-03 21:44', 'The library printer ate six dollars and produced one page with a black stripe. Where can a desperate student print a seminar paper tonight?', 'The geology lab stays open late if nobody is running maps. Bring your own paper and do not touch the enormous green button.', 'Union copy center opens at seven. I can print ten pages in the dorm if you tolerate an inkjet that screams.'],
  ['Trade: homemade bread for help installing a sound card', 'Classifieds', 'crumb_cache', '1998-03-12 20:10', 'I have rosemary bread and a Sound Blaster that Windows insists is a decorative brick. Seeking one patient person with a screwdriver.', 'Bread is acceptable currency. Check the IRQ jumper before reinstalling everything.', 'I volunteer to supervise the bread while someone else handles the dangerous electricity.'],
  ['Campus cats directory needs corrections', 'Campus Life', 'catpacket', '1998-04-08 18:32', 'I made a page listing twelve campus cats, their territories, and whether they accept strangers. Please submit corrections responsibly.', 'Orange cat behind humanities is called Chairman Meow by three unrelated departments.', 'The black library cat is not unfriendly. She simply has office hours.'],
  ['Your most embarrassing homepage MIDI', 'Web Design', 'blinktag', '1998-05-19 22:06', 'Confession thread. Mine autoplays the X-Files theme and cannot be stopped without closing Netscape.', 'Mine plays My Heart Will Go On through a soundfont that makes the flute resemble a fax.', 'I embedded four MIDIs by accident. They fight for dominance like wet raccoons.'],
  ['Anybody want to start a terrible movie club?', 'Campus Life', 'videodrome_uw', '1998-07-02 19:11', 'The rule is simple: every movie must have rubber monsters or an explosion visible through miniature windows.', 'Can we include educational films with deeply suspicious puppets?', 'Only if somebody reserves the basement room and brings popcorn without setting off the alarm again.'],
  ['Found: silver ring near the vending machines', 'Classifieds', 'lampblack', '1998-09-16 17:54', 'Small silver ring, blue stone, found beneath the cola machine. Describe the engraving and I will return it.', 'Boosting. Lost objects deserve better than becoming vending-machine tribute.', 'If nobody claims it, campus security has a real lost-and-found box now.'],
  ['How do you keep a pothos alive in a dorm?', 'Campus Life', 'rootbound', '1998-10-04 15:28', 'Mine has one brave leaf and the emotional atmosphere of a Victorian orphan. Window faces north.', 'Water less. Everybody loves plants to death and then blames the window.', 'Put the pot on pebbles and stop apologizing to it. Plants can smell fear.'],
  ['Webring etiquette: how many animated badges is too many?', 'Web Design', 'gif_fairy', '1998-11-08 20:47', 'My links page has eleven ring fragments and now takes four minutes to load. Is consolidation betrayal?', 'Anything above three is a cry for help, but a historically important cry for help.', 'Keep one glittering skeleton. The rest can become tasteful text links.']
];

const afterHoursSeeds: ForumSeed[] = [
  ['Songs that sound better through one bad speaker', 'Low Frequencies', 'softstatic', '2002-05-02 01:07', 'My left speaker died and somehow every song feels lonelier. What recordings benefit from accidental mono?', 'Old field recordings. Rain does not need stereo to know where you live.', 'Anything with too much production becomes honest when played through damaged plastic.'],
  ['What is everyone eating at 2 AM?', 'The Night Country', 'bluebowl', '2002-06-14 02:03', 'Cereal directly from a mixing bowl. No dignity remains. Report your nocturnal cuisine.', 'Cold rice, fried egg, chili sauce. A complete civilization on one plate.', 'Toast over the sink because plates become morally complicated after midnight.'],
  ['Photographing empty laundromats without being creepy', 'The Night Country', 'silverhalide', '2002-08-21 00:44', 'I love fluorescent laundromats at night but do not want customers to feel watched. How do you ask permission without ruining the quiet?', 'Talk to the attendant first and never photograph faces without consent.', 'Go near closing, photograph reflections and machines, and leave people out of the composition.'],
  ['Winamp skin exchange: ugly editions only', 'CRT & Hardware Lounge', 'skinwalker_mp3', '2002-10-09 23:10', 'Posting my wood-grain stereo skin with chrome dolphins. It is catastrophic and I am proud.', 'I have one shaped like a translucent toaster. The buttons are impossible to locate.', 'Please package screenshots. Some of us need to know the danger before installation.'],
  ['Small victories thread', 'The Night Country', 'northwindow', '2003-01-18 02:29', 'I washed every cup in my apartment and answered one overdue email. Your turn.', 'Changed my sheets before they developed legal personhood.', 'Called my sister. We talked about nothing important for forty minutes. It helped.'],
  ['Recommend a book for a six-hour bus ride', 'The Night Country', 'marginghost', '2003-03-27 01:31', 'Night bus, no sleep, weak overhead light. I need something absorbing but not so frightening I distrust the passengers.', 'A short-story collection so arrival cannot interrupt the best chapter.', 'Bring a tiny book light. The bus lamp always dies exactly when someone opens a cellar door.'],
  ['Apartment radiator knocking in rhythm', 'Static & Interference', 'thirdfloor', '2003-07-07 03:02', 'Not paranormal, probably plumbing. Three knocks, pause, two knocks, all night. What do I tell maintenance?', 'Record it and note when the boiler cycles. Evidence defeats the phrase “could not reproduce.”', 'Bleed the radiator only if your landlord says it is safe. Haunted steam is still steam.'],
  ['Post one ordinary thing you want remembered', 'The Night Country', 'lucidwitch', '2003-10-01 02:14', 'I want somebody to remember the yellow mug Alden hates and uses every morning anyway.', 'The corner shop owner gives truckers free coffee refills when snow closes the highway.', 'My neighbor sings badly while watering plants. The plants appear supportive.']
];

const terminalSeeds: ForumSeed[] = [
  ['Label makers: procurement miracle or plastic tyranny?', 'Off Topic', 'cablewitch', '2002-10-11 18:40', 'Management bought a label maker. Every cable now has three labels and nobody can find the label maker.', 'Label the label maker location. I have solved enterprise operations.', 'We did that. Somebody moved the sign with the label maker.'],
  ['NOC chair recommendations for people with spines', 'Off Topic', 'pagerbat', '2002-11-21 00:13', 'Twelve-hour shifts in a chair designed by an enemy. What survives coffee, static, and budget approval?', 'Used office-furniture warehouse. Expensive chairs become affordable after one merger.', 'Avoid mesh with exposed metal near racks unless you enjoy becoming a grounding strap.'],
  ['Document your fixes, even the embarrassing ones', 'Board Administration', 'mod_sable', '2003-01-06 14:22', 'Please write the actual cause in resolved tickets. “Network issue fixed” teaches nobody and insults the next exhausted technician.', 'Adding “plugged cable into correct port after forty minutes” to my ticket now.', 'That sentence will save a stranger forty-one minutes next year.'],
  ['Best terminal color scheme for overnight work', 'Off Topic', 'phosphor_amber', '2003-03-03 22:50', 'Green feels traditional; amber feels warmer; white text feels like being interrogated by a spreadsheet.', 'Amber on black. Low brightness. Your future headache sends thanks.', 'Blue belongs on status LEDs where it can ruin sleep from across the building.'],
  ['Server-room sweater exchange', 'Off Topic', 'coldboot', '2003-05-12 17:08', 'The colo is refrigerated and I left my sweater on the train. Is there a communal emergency cardigan?', 'Rack B, top drawer. Grey, enormous, clean as of Monday. Return it before winter.', 'Do not take the red one behind Rack 4. It belongs to nobody and keeps returning.'],
  ['How long do you keep boring packet captures?', 'Packet Analysis', 'checksum_sue', '2003-06-29 11:32', 'Storage wants ninety days; legal wants forever; I want enough disk space to work. What is your sane retention policy?', 'Keep incident windows, hashes, metadata, and documented sampling. Boredom is not a retention schedule.', 'Also preserve the negative results. Future people need to know what was ruled out.'],
  ['Pager codes nobody admits using', 'Off Topic', 'rackrat', '2004-02-18 02:26', 'We have 911 for urgent, 411 for information, and 143 apparently means somebody loves the database administrator.', 'Do not send 911 for a printer jam. I will place the printer in your bed.', '143 was for the bakery order. The database administrator may keep believing otherwise.'],
  ['Farewell thread for the beige UPS', 'Off Topic', 'bitrot_betty', '2005-07-22 16:04', 'After nine years, four battery swaps, and one small fire, UPS-03 has retired. Say something respectful.', 'It screamed continuously during the 2001 outage and was technically correct.', 'May its replacement have a silence button that is not behind six screws.']
];

export const ambientMarrowThreads = marrowSeeds.map((seed, index) => makeThread('marrow', index, seed));
export const ambientAfterHoursThreads = afterHoursSeeds.map((seed, index) => makeThread('afterhours', index, seed));
export const ambientTerminalThreads = terminalSeeds.map((seed, index) => makeThread('terminal21', index, seed));

const profileSeeds = [
  ['tapehiss', 'Priya Nanduri', 'Audio Preservation Volunteer', 'Digitizing a box labeled LOCAL RADIO / DO NOT ERASE', 'Preserves community radio cassettes and documents the ordinary voices between broadcasts.'],
  ['packetmason', 'Eli Mercer', 'Network Engineer', 'Rebuilding a period-correct dialup lab', 'Reproduces historical network conditions and insists that every anomaly survive a control test.'],
  ['mothsignal', 'Lena Ortiz', 'Web Ephemera Cataloger', 'Indexing abandoned fan shrines and recipe pages', 'Catalogs small personal sites that institutional collections usually overlook.'],
  ['teacup_sysop', 'Mei Tan', 'Former BBS Operator', 'Looking for backups of the Starling BBS', 'Ran a neighborhood bulletin board from 1993 to 2001 and remembers every modem regular.'],
  ['paperjam', 'Jonah Feld', 'Print Archive Technician', 'Removing tractor-feed paper from a very angry scanner', 'Specializes in dot-matrix records, fax thermograms, and handwritten marginalia.'],
  ['softstatic', 'Noura Haddad', 'Field Recording Researcher', 'Cleaning hum without erasing the room around it', 'Studies domestic noise and the ethics of preserving private acoustic spaces.'],
  ['catpacket', 'Dani Flores', 'Community Historian', 'Confirming the names of six campus cats', 'Builds social histories from newsletters, guestbooks, flyers, and extremely serious cat directories.'],
  ['checksum_sue', 'Susan Okafor', 'Digital Forensics Analyst', 'Hashing three identical disks that disagree', 'Validates disk images and keeps meticulous records of failed explanations.'],
  ['lampblack', 'Owen Park', 'Darkroom Archivist', 'Dating a contact sheet by bus advertisements', 'Identifies vanished streets and businesses through amateur night photography.'],
  ['marginghost', 'Inez Silva', 'Zine Collection Fellow', 'Cataloging margin notes that became correspondence', 'Preserves photocopied zines, mail art, and reader annotations as living conversations.'],
  ['pagerbat', 'Ravi Banerjee', 'Telecom Operations Veteran', 'Trying to remember who assigned pager code 143', 'Worked overnight carrier operations and provides context for otherwise alarming maintenance logs.'],
  ['bluebowl', 'Tasha Green', 'Domestic Web Researcher', 'Reconstructing a 2002 recipe forum', 'Studies the mundane online rituals through which strangers kept one another fed.'],
  ['silverhalide', 'Minh Le', 'Photographic Conservator', 'Humidity-testing a box of Portland negatives', 'Conserves community photography and refuses to turn uncertainty into spectacle.'],
  ['rootbound', 'Asha Williams', 'Personal Homepage Curator', 'Repairing twelve dead plant-blog image maps', 'Archives diary pages, hobby sites, and tiny web communities built outside commercial platforms.'],
  ['phosphor_amber', 'Tomas Varga', 'Display Hardware Restorer', 'Calibrating an amber terminal without waking its burn-in', 'Restores CRT displays and documents how hardware shaped the texture of early online life.'],
  ['cablewitch', 'Farah Kassem', 'Infrastructure Mapper', 'Untangling mislabeled campus fiber routes', 'Maps the physical cables beneath digital communities and marks every uncertain junction.'],
  ['crumb_cache', 'Mara Jensen', 'Mutual-Aid Archive Volunteer', 'Transcribing a neighborhood computer-help ledger', 'Records informal exchanges of food, repairs, rides, and technical help.'],
  ['videodrome_uw', 'Caleb Monroe', 'Media Club Archivist', 'Finding the title of a rubber-monster movie', 'Preserves campus screening calendars and the arguments scribbled on their backs.'],
  ['coldboot', 'Beatriz Lin', 'Data Center Oral Historian', 'Interviewing the people who carried emergency sweaters', 'Collects workplace stories omitted from technical incident reports.'],
  ['northwindow', 'Kira Adeyemi', 'Online Diary Researcher', 'Tagging a thousand posts about very small victories', 'Studies how anonymous communities practiced care before platforms named it engagement.'],
  ['blinktag', 'Haruto Sato', 'Legacy Web Designer', 'Recovering a homepage with forty-seven animated GIFs', 'Repairs table layouts while preserving every historically indefensible design decision.'],
  ['thirdfloor', 'Mila Petrov', 'Building Systems Researcher', 'Comparing radiator knocks with server timestamps', 'Separates ordinary building noise from signals that deserve a second measurement.'],
  ['gif_fairy', 'Jo Bell', 'Webring Reconstruction Lead', 'Replacing a missing NEXT arrow by hand', 'Rebuilds the social paths between personal sites without pretending broken links were empty.'],
  ['skinwalker_mp3', 'Andre Costa', 'Interface Folklore Collector', 'Cataloging Winamp skins shaped like appliances', 'Preserves user-made interfaces, desktop rituals, and the affectionate ugliness of customization.']
] as const;

export const ambientCommunityMembers: CommunityMember[] = profileSeeds.map((seed, index) => ({
  id: `mem-pop-${String(index + 1).padStart(2, '0')}`,
  handle: seed[0], displayName: seed[1], category: index % 5 === 1 ? 'SKEPTIC' : 'INVESTIGATOR', role: seed[2],
  reputation: 620 + index * 347, joinDate: `${['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'][index % 6]} 202${3 + (index % 4)}`,
  status: index % 4 === 0 ? 'ONLINE' : index % 4 === 1 ? 'RESEARCHING' : 'OFFLINE', statusText: seed[3],
  badges: [{ label: index % 3 === 0 ? 'COMMUNITY MEMORY' : index % 3 === 1 ? 'CONTROL TESTER' : 'EPHEMERA KEEPER', color: index % 3 === 1 ? 'gray' : 'blue' }],
  bio: seed[4], notableFindings: [`Contributed ${3 + index} verified context notes to public archive records.`, 'Preserved ordinary-life material alongside incident evidence.']
}));

const traceSeeds = [
  ['tapehiss', 'ARCHIVE FIND', 'Mystery jingle identified after fourteen years', 'The “numbers station interval” on Tape 22 is a grocery-store jingle played backward by a damaged deck. Posting the clean comparison because debunking belongs in the archive too.'],
  ['catpacket', 'QUESTION', 'Who was the black cat in the 1998 library webcam?', 'Six guestbooks call her Hex, three call her Printer, and one insists she was faculty. Does anybody have a dated campus paper mentioning her?'],
  ['paperjam', 'TECHNICAL', 'Dot-matrix ribbon dating notes for non-specialists', 'Ink chemistry gives ranges, not magical exact dates. Here is the control sheet we use before anyone declares a printout temporally impossible.'],
  ['bluebowl', 'ARCHIVE FIND', 'Recovered: 2001 all-night recipe exchange', 'Nothing supernatural here—just thirty-seven people teaching a homesick student how to make soup over IRC. This is why we preserve the boring logs.'],
  ['phosphor_amber', 'DEBUNKED', 'The face in the CRT reflection was a desk lamp', 'Matched the reflection geometry with a period ViewSonic shell. The spooky oval is conclusively a lamp shade, and I have never been happier to ruin a ghost.'],
  ['gif_fairy', 'DISCOVERY', 'Twenty-three dead webring links now have names again', 'Archive mirrors and handwritten bookmark exports let us restore the people behind twenty-three “404” nodes. Routes updated; no anomaly required.'],
  ['thirdfloor', 'QUESTION', 'Could radiator harmonics contaminate modem recordings?', 'Comparing building heat cycles against several late-night audio captures. I need raw recordings, room dimensions, and permission—not edited spooky compilations.'],
  ['softstatic', 'TECHNICAL', 'Please preserve room tone before noise reduction', 'Aggressive cleanup removes clocks, traffic, appliances, and the evidence that a recording happened in a lived space. Archive the raw track first.'],
  ['marginghost', 'ARCHIVE FIND', 'Two strangers corresponded through library-book margins', 'The notes continue across five borrowed books from 1996 to 1999. We contacted both writers; they approved a transcript and are apparently still friends.'],
  ['cablewitch', 'DEBUNKED', 'The “impossible” campus route was a mislabeled conduit', 'Facilities drawings swapped east and west risers in 1989. The cable is real, boring, and exactly where a retired electrician remembered it.'],
  ['skinwalker_mp3', 'QUESTION', 'Help identify this translucent toaster Winamp skin', 'Screenshot recovered from a dorm backup. No download survives. I am asking for provenance, although I will also accept apologies from its designer.'],
  ['northwindow', 'FOUNDATION RESPONSE', 'Ordinary-life preservation week begins Monday', 'Bring diaries, forum exports, club pages, recipes, playlists, and screenshots—with consent. Cat pages receive no special priority, despite sustained lobbying.']
] as const;

export const ambientTracePosts: TracePost[] = traceSeeds.map((seed, index) => ({
  id: `trace-pop-${String(index + 1).padStart(2, '0')}`, author: seed[0], tag: seed[1], timestamp: `${index + 1} day${index ? 's' : ''} ago`, upvotes: 48 + index * 19, title: seed[2], content: seed[3],
  comments: [
    { id: `trace-pop-${index + 1}-c1`, author: 'patchnotes', timestamp: 'recently', upvotes: 12 + index, content: 'Thank you for including the method and the negative result. This is what responsible community investigation looks like.' },
    { id: `trace-pop-${index + 1}-c2`, author: 'mothsignal', timestamp: 'recently', upvotes: 9 + index, content: 'Saved to the context index. The ordinary explanation is still part of the history.' },
    { id: `trace-pop-${index + 1}-c3`, author: 'teacup_sysop', timestamp: 'recently', upvotes: 7 + index, content: 'I may have a related backup. I will check consent and provenance before uploading anything.' },
    { id: `trace-pop-${index + 1}-c4`, author: seed[0], timestamp: 'recently', upvotes: 14 + index, content: 'Perfect. Please send the catalog number rather than the file itself so we keep the chain of custody intact.' }
  ]
}));
