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
  }
];
