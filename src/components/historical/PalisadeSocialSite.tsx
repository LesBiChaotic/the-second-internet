import React, { useState } from 'react';
import { ArchiveWrapperBar } from '../common/ArchiveWrapperBar';
import { ArchiveState } from '../../state/useArchiveStore';
import { palisadeProfiles } from '../../data/palisadeData';
import { PalisadeProfile } from '../../types';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const PalisadeSocialSite: React.FC<Props> = ({ store }) => {
  const { currentSubId, discoverAnomaly } = store;
  const [selectedProfileId, setSelectedProfileId] = useState<string>(currentSubId || palisadeProfiles[0].id);

  const selectedProfile = palisadeProfiles.find(p => p.id === selectedProfileId) || palisadeProfiles[0];

  const forensicMeta = {
    objectId: 'PAL-2007-003418',
    collection: 'Collection 15: Palisade Early Social Graph',
    type: 'Early Web 2.0 Social Network Profile',
    author: 'Noemi Castille & Julian Frost',
    observedDate: '18 May 2007',
    archiveConfidence: 93,
    integrity: 'Conflicting' as const,
    knownCopies: 2,
    relatedObjects: 24,
    anomaliesCount: 2,
    anomaliesDescription: 'Julian Frost account continued posting barometric radar observations 400 days after confirmed fatal collision.'
  };

  const htmlSource = `<!-- PALISADE SOCIAL RAW HTML (2007) -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN">
<html>
<head><title>Palisade // Connect to your world (2007)</title></head>
<body>
<!-- USER ID: noemi.castille -->
<!-- USER ID: julian.frost (POST RECORDED: 400 DAYS POST-MORTEM) -->
</body>
</html>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ArchiveWrapperBar
        store={store}
        siteName="palisade-social.com"
        defaultSnapshotYear={2007}
        availableSnapshots={[2006, 2007, 2008, 2009]}
        forensicData={forensicMeta}
        htmlSource={htmlSource}
      />

      <div style={{ background: '#3b5998', minHeight: 'calc(100vh - var(--wrapper-bar-height))', padding: '24px 16px', color: '#1c1e21', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', background: '#fff', border: '1px solid #d3d3d3', borderRadius: '4px', overflow: 'hidden' }}>
          {/* Top Bar */}
          <div style={{ background: '#29487d', padding: '10px 20px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>palisade</div>
            <div style={{ fontSize: '0.8rem', display: 'flex', gap: '12px' }}>
              <span>Profile</span>
              <span>Friends ({selectedProfile.friendsCount})</span>
              <span>Inbox (2)</span>
            </div>
          </div>

          {/* Profile Switcher */}
          <div style={{ background: '#eceff5', padding: '8px 20px', borderBottom: '1px solid #d3d3d3', display: 'flex', gap: '8px' }}>
            {palisadeProfiles.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  soundEngine.playClick(600);
                  if (p.isAnomalous) discoverAnomaly('pal-frost-anomaly');
                  setSelectedProfileId(p.id);
                }}
                style={{
                  padding: '4px 10px',
                  fontSize: '0.78rem',
                  border: '1px solid #999',
                  background: selectedProfileId === p.id ? '#fff' : '#e0e0e0',
                  fontWeight: selectedProfileId === p.id ? 'bold' : 'normal',
                  cursor: 'pointer'
                }}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Profile Body */}
          <div className="responsive-grid-sidebar" style={{ padding: '24px', gap: '24px' }}>
            {/* Left Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ width: '100%', height: '180px', background: '#e2e8f0', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                [ Profile Photo ]
              </div>
              <div style={{ fontSize: '0.82rem', lineHeight: '1.6' }}>
                <div><strong>Location:</strong> {selectedProfile.location}</div>
                <div><strong>Joined:</strong> {selectedProfile.joinDate}</div>
                <div><strong>Status:</strong> {selectedProfile.relationshipStatus}</div>
              </div>
            </div>

            {/* Right Wall */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <h1 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1d2129', marginBottom: '4px' }}>
                  {selectedProfile.name}
                </h1>
                <div style={{ fontSize: '0.88rem', color: '#606770' }}>
                  {selectedProfile.headline}
                </div>
              </div>

              {/* Status Update */}
              <div style={{ background: '#f0f2f5', padding: '14px', borderRadius: '6px', border: '1px solid #ccd0d5' }}>
                <div style={{ fontSize: '0.75rem', color: '#606770', marginBottom: '4px' }}>
                  Recent Status Update • {selectedProfile.statusDate}
                </div>
                <div style={{ fontSize: '0.92rem', color: selectedProfile.isAnomalous ? '#b91c1c' : '#1c1e21', fontWeight: 500 }}>
                  "{selectedProfile.recentStatus}"
                </div>
              </div>

              {/* Wall Posts */}
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold', borderBottom: '1px solid #ccd0d5', paddingBottom: '6px', marginBottom: '12px' }}>
                  The Wall
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedProfile.wallPosts.map((wp) => (
                    <div key={wp.id} style={{ background: '#fafafa', padding: '12px', border: '1px solid #e5e5e5', borderRadius: '4px' }}>
                      <div style={{ fontSize: '0.78rem', color: '#365899', fontWeight: 'bold', marginBottom: '4px' }}>
                        {wp.author} <span style={{ color: '#90949c', fontWeight: 'normal' }}>wrote on {wp.date}:</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: wp.isAnomalous ? '#b91c1c' : '#1c1e21' }}>
                        {wp.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
