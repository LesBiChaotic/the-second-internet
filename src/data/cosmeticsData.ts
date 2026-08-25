export type CosmeticCategory = 'AVATAR' | 'FRAME' | 'BADGE' | 'NAMEPLATE' | 'PALETTE' | 'TERMINAL' | 'BACKGROUND' | 'EFFECT' | 'STAMP' | 'SIDEBAR' | 'OMNIBOX' | 'CURSOR' | 'TRANSITION' | 'NOTIFICATION' | 'PINSET' | 'IDCARD' | 'SIGNATURE' | 'AMBIENT' | 'HAUNTED';
export interface CosmeticItem { id: string; name: string; category: CosmeticCategory; rank: number; description: string; glyph?: string; colors: [string, string]; }

const make = (category: CosmeticCategory, names: string[], maxRank: number, glyphs: string[]) => names.map((name, index): CosmeticItem => ({
  id: `${category.toLowerCase()}-${index + 1}`,
  name,
  category,
  rank: Math.min(maxRank, 1 + Math.floor(index * maxRank / names.length)),
  description: `${name} // recovered cosmetic object ${String(index + 1).padStart(2, '0')}`,
  glyph: glyphs[index % glyphs.length],
  colors: [[['#38bdf8','#1d4ed8'],['#f59e0b','#b45309'],['#a78bfa','#6d28d9'],['#10b981','#047857'],['#f43f5e','#9f1239']][index % 5][0], [['#38bdf8','#1d4ed8'],['#f59e0b','#b45309'],['#a78bfa','#6d28d9'],['#10b981','#047857'],['#f43f5e','#9f1239']][index % 5][1]] as [string,string]
}));

export const cosmeticsCatalog: CosmeticItem[] = [
  ...make('AVATAR', ['Public Terminal','Archive Seal','Dial-Up Moth','CRT Witness','Magnetic Tape','Telephone Operator','Frosted Router','Candle Keeper','Midnight Cartographer','Signal Diver','Notepad Angel','Packet Familiar','Static Cat','Unmarked Door','Room Without Doors','Living Index'], 10, ['◉','🦭','◆','▣','◫','☎','❄','✦']),
  ...make('FRAME', ['Plain Registry','Blue Filing Tab','Amber Evidence Tape','Marrow Teal','AfterHours Glow','Candle Wax','Greyline Frost','Palisade Chrome','Terminal Green','Webring Stars','Portland Rain','Magnetic Spool','Redacted Corners','Negative Latency','Exchange 47','Eleven Minute Loop','Second Bus','Living Archive'], 10, ['□']),
  ...make('BADGE', ['First Login','Made With Notepad','Guestbook Signer','Ordinary Memory','Cross-Contaminated','Ethical Ghost Hunter','Packet Mason','Candle Room Regular','Webring Wanderer','Static Listener','Frost on Rack 4','Eleven Minutes Missing','The Screen Is Warm','Weather for Unmapped Places','Route Refused','Unmarked Door Survivor','Definitely Not Wintermute42','Archive Seal of Questionable Authority','Standing Wave Witness','Kept the Porch Light On'], 10, ['✦','★','●','Ψ','⚡']),
  ...make('NAMEPLATE', ['VISITOR_01','Night Shift','Lost Page Curator','Dial Tone Naturalist','Context Preserver','Friendly Skeptic','Signal Listener','Route Cartographer','Evidence Keeper','Mesh Correspondent','Unindexed Witness','Human Memory Only','Still Occupied','Porch Light On'], 10, ['▰']),
  ...make('PALETTE', ['Foundation Standard','Blue Phosphor','Amber Terminal','Marrow Teal','Candle Room','Portland Rain','Greyline Winter','Palisade 2007','Burgundy Evidence','Station Null','Second Bus','Living Archive'], 10, ['◐']),
  ...make('TERMINAL', ['Green Phosphor','Amber VT100','Blue Room 4','Paperwhite Console','Greyline Frost','Candle Smoke','Station Null','Omega Residue'], 10, ['>_']),
  ...make('BACKGROUND', ['Catalog Grid','Quiet Stacks','Dial-Up Stars','Tape Cabinet','Rainy Payphone','Frozen Caisson','Candle Archive','Unmapped Weather'], 10, ['▦']),
  ...make('EFFECT', ['None','Cursor Echo','Dust Motes','Soft Scanlines','Signal Snow','Phosphor Bloom'], 10, ['≈']),
  ...make('STAMP', ['Public Accession','Context Preserved','Oral History Verified','Do Not Deaccession','Collection 17 Hold','Living Record'], 10, ['◉','✓','✦','▣','⚠','∞']),
  ...make('SIDEBAR', ['Registry Paper','Marrow Teal Rail','AfterHours Midnight','Greyline Frost Tabs','Candle Wax Index','Second Bus Conduit'], 10, ['▤']),
  ...make('OMNIBOX', ['Plain Search Glass','Card Catalog Brass','Blue Phosphor Finder','Redacted Query Frame','Exchange 47 Dial','Unindexed Aperture'], 10, ['⌕']),
  ...make('CURSOR', ['Standard Pointer','Archivist Crosshair','Amber Terminal Block','Signal Needle','Candle Spark','Adjacent Hand'], 10, ['↖']),
  ...make('TRANSITION', ['Clean Cut','Catalog Flick','Phosphor Wake','Tape Splice','Negative Latency','Room-to-Room'], 10, ['⇥']),
  ...make('NOTIFICATION', ['Foundation Memo','Blue Ingest Slip','Amber Incident Flag','Palisade Bubble','Candle Margin Note','Second Bus Dispatch'], 10, ['!']),
  ...make('PINSET', ['Red Pushpins','Blue Map Tacks','Brass Evidence Studs','Polaroid Clips','Frosted Nodes','Thread Without End'], 10, ['●']),
  ...make('IDCARD', ['Visitor Laminate','Reading Room Pass','Field Research Card','Night Shift Credential','Null-Safe Identity','Living Archive Folio'], 10, ['▣']),
  ...make('SIGNATURE', ['No Signature','— context preserved','// sent from the night shift','[ordinary memory matters]','keep the porch light on','the archive remembers'], 10, ['⌁']),
  ...make('AMBIENT', ['Quiet Workstation','Reading Room Fluorescence','Tape Cabinet Drone','Rain on Payphone Glass','58.4Hz Phosphor Hum','Adjacent Carrier Choir'], 10, ['♫']),
  ...make('HAUNTED', ['Dormant Object','Misfiled Shadow','Warm Screen','Returning Red Sweater','Office 304 Key','The Card Knows Your Route'], 10, ['◌','◔','◑','◕','●','◉'])
];

export const ARCHIVE_RANKS = ['Unregistered Visitor','Archive Wanderer','Catalog Assistant','Signal Listener','Evidence Keeper','Route Cartographer','Midnight Researcher','Mesh Correspondent','Living Archivist','Unindexed Witness'] as const;
export const xpForRank = (rank: number) => rank <= 1 ? 0 : (rank - 1) * 350;
export const rankForXp = (xp: number) => Math.min(10, 1 + Math.floor(xp / 350));
