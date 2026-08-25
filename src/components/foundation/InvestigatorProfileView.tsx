import React, { useMemo, useState } from 'react';
import { Check, LockKeyhole, Pencil, Save, Shirt, Sparkles, Trophy } from 'lucide-react';
import { cosmeticsCatalog, CosmeticCategory, xpForRank } from '../../data/cosmeticsData';
import { ArchiveState } from '../../state/useArchiveStore';

const categories: CosmeticCategory[] = ['AVATAR','FRAME','BADGE','NAMEPLATE','PALETTE','STAMP','SIDEBAR','OMNIBOX','CURSOR','TRANSITION','NOTIFICATION','PINSET','IDCARD','SIGNATURE','TERMINAL','AMBIENT','BACKGROUND','EFFECT','HAUNTED'];

export const InvestigatorProfileView: React.FC<{ store: ArchiveState }> = ({ store }) => {
  const [activeCategory, setActiveCategory] = useState<CosmeticCategory>('AVATAR');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ handle: store.investigatorProfile.handle, displayName: store.investigatorProfile.displayName, pronouns: store.investigatorProfile.pronouns, status: store.investigatorProfile.status });
  const equipped = (category: CosmeticCategory) => cosmeticsCatalog.find(item => item.id === store.investigatorProfile.equipped[category]);
  const avatar = equipped('AVATAR'); const frame = equipped('FRAME'); const badge = equipped('BADGE'); const nameplate = equipped('NAMEPLATE'); const background = equipped('BACKGROUND'); const stamp = equipped('STAMP');
  const filtered = useMemo(() => cosmeticsCatalog.filter(item => item.category === activeCategory), [activeCategory]);
  const nextRankXp = store.archiveRank < 10 ? xpForRank(store.archiveRank + 1) : store.archiveXp;
  const progress = store.archiveRank >= 10 ? 100 : Math.max(0, Math.min(100, ((store.archiveXp - xpForRank(store.archiveRank)) / 350) * 100));

  const saveProfile = () => {
    const safeHandle = draft.handle.trim().replace(/[^a-zA-Z0-9_.-]/g, '').slice(0, 24) || 'visitor_01';
    store.updateInvestigatorProfile({ ...draft, handle: safeHandle, displayName: draft.displayName.trim().slice(0, 40), pronouns: draft.pronouns.trim().slice(0, 24), status: draft.status.trim().slice(0, 120) });
    setEditing(false); store.notify('Investigator profile updated.', 'success');
  };

  return <div className="profile-workspace human-archive-route investigator-accession-route">
    <section className="profile-hero" style={{ '--profile-a': background?.colors[0], '--profile-b': background?.colors[1] } as React.CSSProperties}>
      <div className="profile-card-preview" data-haunted-stage={store.investigationChapter}>
        {stamp && <span className="profile-dossier-stamp" style={{ '--stamp-a': stamp.colors[0] } as React.CSSProperties}>{stamp.glyph} {stamp.name}</span>}
        <div className="profile-avatar" style={{ '--frame-a': frame?.colors[0], '--frame-b': frame?.colors[1] } as React.CSSProperties}><span>{avatar?.glyph || '◉'}</span></div>
        <div className="profile-identity">
          <span className="profile-nameplate" style={{ borderColor: nameplate?.colors[0], color: nameplate?.colors[0] }}>{nameplate?.name}</span>
          <h1>{store.investigatorProfile.displayName || `@${store.investigatorProfile.handle}`}</h1>
          {store.investigatorProfile.displayName && <p className="profile-handle">@{store.investigatorProfile.handle}</p>}
          <p>{store.investigatorProfile.pronouns || 'Pronouns not listed'} · {store.userArchetype || 'Archetype unassigned'}</p>
          <p className="profile-status">“{store.investigatorProfile.status}”</p>
          <span className="equipped-badge" style={{ '--badge-a': badge?.colors[0], '--badge-b': badge?.colors[1] } as React.CSSProperties}>{badge?.glyph} {badge?.name}</span>
        </div>
        <button className="btn btn-secondary profile-edit" onClick={() => setEditing(value => !value)}><Pencil size={15} /> Edit profile</button>
      </div>
      <div className="rank-panel">
        <div><span>ARCHIVE RANK {store.archiveRank}</span><strong>{store.archiveRankTitle}</strong></div>
        <div className="rank-progress"><span style={{ width: `${progress}%` }} /></div>
        <small>{store.archiveRank >= 10 ? 'Maximum rank attained' : `${store.archiveXp} / ${nextRankXp} curated XP`}</small>
        <p>Cosmetic title only · Clearance remains <strong>{store.clearanceLevel}</strong></p>
      </div>
    </section>

    {editing && <section className="profile-editor">
      <label>Investigator handle<input value={draft.handle} maxLength={24} onChange={e => setDraft({ ...draft, handle: e.target.value })} /></label>
      <label>Display name<input value={draft.displayName} maxLength={40} onChange={e => setDraft({ ...draft, displayName: e.target.value })} /></label>
      <label>Pronouns<input value={draft.pronouns} maxLength={24} onChange={e => setDraft({ ...draft, pronouns: e.target.value })} /></label>
      <label className="status-field">Status message<input value={draft.status} maxLength={120} onChange={e => setDraft({ ...draft, status: e.target.value })} /></label>
      <button className="btn btn-primary" onClick={saveProfile}><Save size={15} /> Save profile</button>
    </section>}

    <section className="wardrobe-section">
      <div className="wardrobe-heading"><div><span className="investigation-kicker">CHECKPOINT 9 // COSMETIC AVALANCHE</span><h2><Shirt size={22} /> Investigator Wardrobe</h2></div><span>{store.unlockedCosmeticIds.length} / {cosmeticsCatalog.length} unlocked</span></div>
      <div className="cosmetic-tabs" role="tablist" aria-label="Cosmetic categories">{categories.map(category => <button role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? 'active' : ''} key={category} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
      <div className="cosmetic-grid">{filtered.map(item => {
        const unlocked = store.unlockedCosmeticIds.includes(item.id); const isEquipped = store.investigatorProfile.equipped[item.category] === item.id;
        return <button key={item.id} className={`cosmetic-card ${isEquipped ? 'equipped' : ''} ${unlocked ? '' : 'locked'}`} onClick={() => store.equipCosmetic(item.category, item.id)} disabled={!unlocked}>
          <span className="cosmetic-swatch" style={{ background: `linear-gradient(135deg, ${item.colors[0]}, ${item.colors[1]})` }}>{unlocked ? item.glyph : <LockKeyhole size={18} />}</span>
          <span className="cosmetic-copy"><strong>{item.name}</strong><small>{unlocked ? item.description : `Unlocks at Archive Rank ${item.rank}`}</small></span>
          {isEquipped ? <span className="cosmetic-state"><Check size={13} /> Equipped</span> : unlocked ? <span className="cosmetic-state">Equip</span> : null}
        </button>;
      })}</div>
    </section>

    <section className="xp-explainer"><Trophy size={22} /><div><h3>Rank without click-farming</h3><p>XP comes from chapter completion, named evidence, the archetype quiz, side cases, and caseboard connections. Random anomaly clicks do not generate cosmetic rank.</p></div><Sparkles size={22} /></section>
  </div>;
};
