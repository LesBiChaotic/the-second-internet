import React, { useState } from 'react';
import { ArchiveWrapperBar } from '../common/ArchiveWrapperBar';
import { ArchiveState } from '../../state/useArchiveStore';
import { webringSites, WebringSite } from '../../data/webringData';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const WebringHubSite: React.FC<Props> = ({ store }) => {
  const { currentSubId, discoverAnomaly, navigate } = store;
  const [currentSiteIndex, setCurrentSiteIndex] = useState<number>(0);

  const activeSite: WebringSite = webringSites[currentSiteIndex] || webringSites[0];

  const handleNext = () => {
    soundEngine.playClick(650);
    const nextIdx = (currentSiteIndex + 1) % webringSites.length;
    setCurrentSiteIndex(nextIdx);
    if (webringSites[nextIdx].isAnomalous) discoverAnomaly('webring-labyrinth');
  };

  const handlePrev = () => {
    soundEngine.playClick(650);
    const prevIdx = (currentSiteIndex - 1 + webringSites.length) % webringSites.length;
    setCurrentSiteIndex(prevIdx);
  };

  const handleRandom = () => {
    soundEngine.playClick(850);
    const rnd = Math.floor(Math.random() * webringSites.length);
    setCurrentSiteIndex(rnd);
    if (webringSites[rnd].isAnomalous) discoverAnomaly('webring-random-door');
  };

  const forensicMeta = {
    objectId: 'WR-1996-000088',
    collection: 'Collection 04: Early Webring Guilds',
    type: 'Interconnected Personal Hyperlink Ring',
    author: 'Vespera & The Other Side Guild',
    observedDate: '18 Oct 1996',
    archiveConfidence: 90,
    integrity: 'Recovered' as const,
    knownCopies: 2,
    relatedObjects: 16,
    anomaliesCount: 2,
    anomaliesDescription: 'Manifesto details symbolic threshold theory of communication networks predicting the Second Internet in 1996.'
  };

  const htmlSource = `<!-- THE OTHER SIDE OF THE SCREEN WEBRING (1996) -->
<html>
<head><title>${activeSite.title}</title></head>
<body bgcolor="${activeSite.themeColor}" text="#FFFFFF">
<!-- WEBRING HUB NODE #${currentSiteIndex + 1} OF ${webringSites.length} -->
<!-- "The structure is already older than the cables." -->
</body>
</html>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ArchiveWrapperBar
        store={store}
        siteName="webring.otherside.org"
        defaultSnapshotYear={1996}
        availableSnapshots={[1996, 1997, 1998]}
        forensicData={forensicMeta}
        htmlSource={htmlSource}
      />

      <div style={{
        background: activeSite.themeColor,
        color: '#f8fafc',
        minHeight: 'calc(100vh - var(--wrapper-bar-height))',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          maxWidth: '740px',
          width: '100%',
          background: 'rgba(0,0,0,0.6)',
          border: '2px ridge #888',
          padding: '30px',
          boxShadow: '0 0 20px rgba(0,0,0,0.8)'
        }}>
          {/* Render Site Content */}
          <div 
            dangerouslySetInnerHTML={{ __html: activeSite.content }}
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.tagName === 'A') {
                e.preventDefault();
                soundEngine.playClick(900);
                if (target.getAttribute('href') === '#door-unmarked') {
                  discoverAnomaly('webring-unmarked-door');
                  navigate('SECOND_NET', 'roomwithoutdoors.net');
                } else {
                  handleNext();
                }
              }
            }}
          />

          {/* Authentic 1996 Webring Navigation Widget */}
          <div style={{
            marginTop: '36px',
            borderTop: '2px dashed #666',
            paddingTop: '20px',
            textAlign: 'center',
            fontFamily: 'Times New Roman, serif'
          }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px', color: '#ffcc66' }}>
              ✦ [ The Other Side of the Screen Webring ] ✦
            </div>
            <div style={{ fontSize: '0.8rem', color: '#ccc', marginBottom: '12px' }}>
              This site is member #{currentSiteIndex + 1} in the nocturnal circle of digital wanderers.
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '0.9rem' }}>
              <span style={{ color: '#66ccff', textDecoration: 'underline', cursor: 'pointer' }} onClick={handlePrev}>
                &lt;&lt; Previous Site
              </span>
              <span style={{ color: '#ff9999', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleRandom}>
                Random Site ??
              </span>
              <span style={{ color: '#66ccff', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleNext}>
                Next Site &gt;&gt;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
