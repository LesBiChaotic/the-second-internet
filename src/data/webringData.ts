export interface WebringSite {
  id: string;
  title: string;
  author: string;
  year: number;
  url: string;
  themeColor: string;
  content: string;
  isAnomalous?: boolean;
}

export const webringSites: WebringSite[] = [
  {
    id: 'webring-01',
    title: 'The Labyrinth of Glass',
    author: 'Vespera',
    year: 1996,
    url: 'archive/webring/glass',
    themeColor: '#1a2332',
    content: `
      <h2>THE LABYRINTH OF GLASS</h2>
      <p><em>"A screen is not a wall. It is an aperture through which light flows both ways."</em></p>
      <hr/>
      <p>When you sit alone in a dark room at night, typing characters into a terminal, where do the words go while they travel along the wire? Between the keyboard and the phosphor screen across the ocean, there is an expanse of unlit copper. We believe that thoughts left in the copper do not dissolve.</p>
      <p>They wait for someone with the proper address to summon them.</p>
    `
  },
  {
    id: 'webring-02',
    title: 'Nocturnal Frequency Lab',
    author: 'ModemWatcher',
    year: 1996,
    url: 'archive/webring/frequencies',
    themeColor: '#0a1912',
    content: `
      <h2>NOCTURNAL FREQUENCY LAB</h2>
      <p>Listening to 14.4k and 28.8k dialup handshakes sampled at 44.1kHz.</p>
      <p>Did you know? If you notch-filter the carrier tone at 2100Hz, you can isolate background harmonics that match the natural resonant frequency of the Midwestern telephone grid (58.4Hz).</p>
      <p>In certain exchanges, the carrier contains an echo of a voice reciting four-digit coordinates.</p>
    `
  },
  {
    id: 'webring-03',
    title: 'The Topology of Pure Connection (Manifesto)',
    author: 'Anonymous 1996',
    year: 1996,
    url: 'archive/webring/topology',
    themeColor: '#201020',
    isAnomalous: true,
    content: `
      <h2>THE TOPOLOGY OF PURE CONNECTION</h2>
      <p>Human communication networks obey a law of symbolic critical mass.</p>
      <ul>
        <li>Roads create crossroads where travellers see nonexistent shadows.</li>
        <li>Telegraphs create phantom taps where dead operators respond.</li>
        <li>Telephone exchanges route calls to rooms that were never built.</li>
        <li>The World Wide Web will create a Second Internet.</li>
      </ul>
      <p>You cannot prevent it. The structure is already older than the cables.</p>
    `
  },
  {
    id: 'webring-04',
    title: 'ROOM 04: The Clickable Labyrinth',
    author: 'The Architect',
    year: 1996,
    url: 'archive/webring/room04',
    themeColor: '#000000',
    isAnomalous: true,
    content: `
      <h2>YOU HAVE ENTERED ROOM 04</h2>
      <p>There are four doors in front of you.</p>
      <div style="margin: 20px 0; display: flex; flex-direction: column; gap: 8px;">
        <a href="#door-north" class="retro-link">[1] Door North: The Old Exchange (1933)</a>
        <a href="#door-east" class="retro-link">[2] Door East: Greyline Switch Rack #4 (1998)</a>
        <a href="#door-south" class="retro-link">[3] Door South: The Bedroom in Madison (2003)</a>
        <a href="#door-unmarked" class="retro-link" style="color: #ffaa55;">[4] The Unmarked Door: /~room/ (Second Architecture)</a>
      </div>
      <p><em>"Choose wisely. Not every door returns to the First Internet."</em></p>
    `
  },
  {
    id: 'webring-05', title: 'Mara’s Midnight Recipe Cabinet', author: 'MaraMoth', year: 1996, url: 'archive/webring/recipes', themeColor: '#2b1728',
    content: `
      <h2>MARA'S MIDNIGHT RECIPE CABINET</h2>
      <p>Food for insomniacs, sysops, students, and anyone whose kitchen light is the only square awake on the block.</p>
      <ul><li>Three-ingredient cinnamon toast</li><li>Emergency tomato noodles</li><li>Tea strong enough to survive a 28.8k download</li></ul>
      <p><strong>Guest note:</strong> ModemWatcher says a kettle changes the carrier spectrum. I say everything changes when you add a kettle.</p>
    `
  },
  {
    id: 'webring-06', title: '404 Quilt Project', author: 'pixelpunk', year: 1997, url: 'archive/webring/404quilt', themeColor: '#10233d',
    content: `
      <h2>THE 404 QUILT</h2>
      <p>I save tiny pieces of websites before they disappear: divider GIFs, under-construction signs, guestbook doodles, bad poetry, and buttons made by somebody's older sister.</p>
      <p>Each square below came from a page that returned 404 within one year. Hovering the blank square produces a tooltip reading <em>still occupied</em>, but there is no title attribute in my source.</p>
      <p>Send fragments, but include the creator's name when you know it. Preservation without credit is just prettier theft.</p>
    `
  },
  {
    id: 'webring-07', title: 'Dial Tone Field Notes', author: 'Cassia_R', year: 1997, url: 'archive/webring/dialtone', themeColor: '#14251f',
    content: `
      <h2>DIAL TONE FIELD NOTES</h2>
      <p>Recordings from payphones, campus radio lines, answering machines, and telephone museum demonstrations.</p>
      <p>Normal findings: transformer hum, local AM bleed, touch-tone harmonics, people breathing because they forgot recording started.</p>
      <p>Unresolved: Exchange #47 produces 58.4Hz beneath every recording, including one made while the museum display was physically disconnected.</p>
    `
  },
  {
    id: 'webring-08', title: 'Socks of the Early Internet', author: 'laundrydaemon', year: 1997, url: 'archive/webring/socks', themeColor: '#3b2742',
    content: `
      <h2>SOCKS OF THE EARLY INTERNET</h2>
      <p>A completely serious archive of socks lost in university laundries between 1994 and 1997.</p>
      <p>Current count: 83 single socks, 4 gloves, one red sweater, and a knitted star mailed from an anonymous dorm.</p>
      <p>UPDATE: the red sweater appears in photographs from Madison, Milwaukee, and Portland on the same evening. This is probably a timestamp problem. It is a very comfortable timestamp problem.</p>
    `
  },
  {
    id: 'webring-09', title: 'The Ethical Ghost Hunter’s FAQ', author: 'ModemWatcher', year: 1998, url: 'archive/webring/ethics', themeColor: '#222017',
    content: `
      <h2>THE ETHICAL GHOST HUNTER'S FAQ</h2>
      <p><strong>May I contact a missing person's family?</strong> No.</p>
      <p><strong>May I publish a home address found in WHOIS?</strong> Also no.</p>
      <p><strong>What if the mystery is important?</strong> Then document it carefully enough that you do not need to harm somebody to make it interesting.</p>
      <p><strong>What should I preserve?</strong> Context, corrections, ordinary posts, and the names people chose to be remembered by.</p>
    `
  },
  {
    id: 'webring-10', title: 'Weather for Unmapped Places', author: 'weatherboy', year: 1998, url: 'archive/webring/weather', themeColor: '#17243a', isAnomalous: true,
    content: `
      <h2>WEATHER FOR UNMAPPED PLACES</h2>
      <p>Forecasts generated from barometric readings attached to invalid network coordinates.</p>
      <ul><li>0.0.0.0/room — clear, no sunrise, 42°F</li><li>second-bus://mendota — lake effect snow indoors</li><li>Exchange #47 — pressure falling for sixty-five years</li></ul>
      <p>Visitor counter reports tomorrow's total before you arrive. Do not refresh more than eleven times.</p>
    `
  }
];
