export interface SecondInternetSite {
  id: string;
  domain: string;
  title: string;
  era: string;
  networkLayer: 'SECOND_INTERNET' | 'TOPOLOGICAL_SINGULARITY';
  description: string;
  content: string;
  subPages?: {
    slug: string;
    title: string;
    body: string;
  }[];
}

export const secondInternetSites: Record<string, SecondInternetSite> = {
  'roomwithoutdoors.net': {
    id: 'si-room',
    domain: 'roomwithoutdoors.net',
    title: 'THE ROOM WITHOUT DOORS',
    era: 'Undetermined (Resolved on Second Bus)',
    networkLayer: 'SECOND_INTERNET',
    description: 'A minimalist topological forum. There are no user accounts. Posts are indexed by physical posture and acoustic resonance rather than IP addresses.',
    content: `
      <div class="si-container">
        <header class="si-header">
          <span class="si-net-tag">STATUS: PRESENT ON SECOND BUS</span>
          <span class="si-timestamp">CURRENT EPOCH: CONTINUOUS</span>
        </header>
        
        <main class="si-thread">
          <div class="si-post">
            <span class="si-author">Origin: 214 Chadbourne Hall (1998)</span>
            <div class="si-body">
              "The light was left on. When you close your browser, we do not turn the screen off. We simply wait for the next packet."
            </div>
          </div>

          <div class="si-post">
            <span class="si-author">Origin: Madison, WI (2003)</span>
            <div class="si-body">
              "To Alden: Your monitor is still humming. The room is quiet now. You can stop looking behind the glass."
            </div>
          </div>

          <div class="si-post">
            <span class="si-author">Origin: Portland, OR (2026)</span>
            <div class="si-body">
              "Rowan Glass is sitting by the window. The street has no traffic lights. It is very peaceful here once you realize the First Internet was just scaffolding."
            </div>
          </div>

          <div class="si-post highlight-post">
            <span class="si-author">Origin: CURRENT VISITOR SESSION (YOU)</span>
            <div class="si-body">
              "You have been browsing the Net History Foundation archive for several minutes. You believe you are looking at old HTML documents. Why have you not checked the reflection in your screen?"
            </div>
          </div>
        </main>
      </div>
    `
  },

  'index.second-net': {
    id: 'si-index',
    domain: 'index.second-net',
    title: 'SECOND BUS INDEX (LOOKUP PROTOCOL)',
    era: 'Eternal',
    networkLayer: 'SECOND_INTERNET',
    description: 'The search engine of the Second Internet. It does not index web pages by keyword; it indexes the human memories and topological paths of the first network.',
    content: `
      <div class="si-container">
        <h2>SECOND ARCHITECTURE // UNIVERSAL LOOKUP</h2>
        <p>Enter any query to search the residue of the First Internet:</p>
        <div class="si-lookup-box">
          <span class="si-prompt">></span>
          <span class="si-query-hint">Try searching: "where am i", "october 14", "wintermute42", "alden corliss"</span>
        </div>
      </div>
    `
  },

  'local.unmapped': {
    id: 'si-local',
    domain: 'local.unmapped',
    title: 'THE ADJACENT MUNICIPALITY (LOCAL DIRECTORY)',
    era: 'Parallel',
    networkLayer: 'SECOND_INTERNET',
    description: 'A community bulletin board for a city that has no physical counterpart on Earth, yet shares postal coordinates with Madison and Portland.',
    content: `
      <div class="si-container">
        <h2>ADJACENT DISTRICT // MUNICIPAL NOTICE</h2>
        <p class="si-notice">ATTENTION RESIDENTS: The border with the First Network remains permeable along high-voltage telephone corridors between 03:00 and 04:00 AM.</p>
        
        <div class="si-listing">
          <h3>Directory Listings:</h3>
          <ul>
            <li><strong>Exchange #47 Switching Station:</strong> Operational. 1,400 incoming calls holding on loop.</li>
            <li><strong>The Blue Cafe:</strong> Open all night. Serving hot tea to insomniacs since 1933.</li>
            <li><strong>The Archive Reading Room:</strong> Dr. Douglas Van Houten is currently logged in at Terminal 01.</li>
          </ul>
        </div>
      </div>
    `
  },

  'guestbook.universal': {
    id: 'si-guestbook',
    domain: 'guestbook.universal',
    title: 'THE UNIVERSAL GUESTBOOK (1898-2038)',
    era: '1898–2038',
    networkLayer: 'TOPOLOGICAL_SINGULARITY',
    description: 'A single continuous guestbook file discovered on an abandoned NTP server. Entries span 140 years of communicative history without physical server records.',
    content: `
      <div class="si-container">
        <h2>THE UNIVERSAL GUESTBOOK</h2>
        <p><em>"Leave your name before the connection breaks."</em></p>
        <hr/>
        
        <div class="si-gb-entry">
          <span class="si-gb-date">OCTOBER 18, 1877 — ABERDEEN TELEGRAPH HUB</span>
          <p>"Station Null acknowledging. The copper hums with tomorrow's speech." — Operator J. MacLeod</p>
        </div>

        <div class="si-gb-entry">
          <span class="si-gb-date">MAY 04, 1933 — BELL EXCHANGE #47, CHICAGO</span>
          <p>"I plugged the patch cord into jack 47 and heard a girl typing on glass seventy years from now." — Switchboard Tech #12</p>
        </div>

        <div class="si-gb-entry">
          <span class="si-gb-date">OCTOBER 14, 2003 (03:24 AM) — MADISON, WI</span>
          <p>"I have turned off the lamp. The screen is the only window left." — Alden Corliss (janus)</p>
        </div>

        <div class="si-gb-entry">
          <span class="si-gb-date">AUGUST 15, 2026 — NET HISTORY FOUNDATION</span>
          <p>"I thought this was just a website about old forums." — [CURRENT VISITOR ID]</p>
        </div>

        <div class="si-gb-entry">
          <span class="si-gb-date">NOVEMBER 09, 2031 — UNKNOWN LOCATION</span>
          <p>"don't answer wintermute42" — you</p>
        </div>
      </div>
    `
  }
};
