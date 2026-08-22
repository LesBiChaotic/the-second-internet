import React, { useState } from 'react';
import { FileSearch, ShieldAlert, BookmarkPlus, Hash, FileText, Image as ImageIcon, ZoomIn, X, BookOpen, Filter } from 'lucide-react';
import { physicalDocsData } from '../../data/physicalDocsData';
import { PhysicalDoc } from '../../types';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const PhysicalDocsView: React.FC<Props> = ({ store }) => {
  const { pinToCaseboard, discoverAnomaly } = store;
  const [selectedType, setSelectedType] = useState<string>('All');
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const docTypes = ['All', ...Array.from(new Set(physicalDocsData.map(d => d.docType)))];
  
  const filteredDocs = selectedType === 'All' 
    ? physicalDocsData 
    : physicalDocsData.filter(d => d.docType === selectedType);

  const handlePin = (doc: PhysicalDoc) => {
    soundEngine.playClick(1000);
    pinToCaseboard({
      type: 'DOCUMENT',
      title: `Physical Scan: ${doc.title}`,
      preview: `Provenance: ${doc.provenance} | Classification: ${doc.classification}`,
      targetView: 'PHYSICAL_DOCS',
      targetId: doc.id,
      connectedTo: []
    });
    alert(`Pinned physical scan "${doc.title}" to Caseboard.`);
  };

  return (
    <div className="human-archive-route conservation-table-route" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '4px' }}>
            Physical Artifacts, Scanned Photographs & Police Records
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--nhf-text-secondary)' }}>
            High-resolution optical digitizations of real-world physical evidence: 1990s server room photographs, crime scene documentation, urgent faxes, and paper telegraph spools.
          </p>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => {
            soundEngine.playClick(750);
            store.navigate('NOTEBOOK');
          }}
          style={{
            borderColor: '#f59e0b',
            color: 'var(--nhf-accent-amber)',
            background: 'rgba(245, 158, 11, 0.08)',
            padding: '8px 16px'
          }}
        >
          <BookOpen size={16} />
          <span>Open Dr. Van Houten's Field Journal</span>
        </button>
      </div>

      {/* Subcategory Dropdown Filter */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        background: 'var(--nhf-bg-surface)', 
        padding: '16px', 
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--nhf-border)',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <Filter size={18} color="var(--nhf-text-muted)" />
        <select
          value={selectedType}
          onChange={(e) => {
            soundEngine.playClick(600);
            setSelectedType(e.target.value);
          }}
          style={{
            flex: 1,
            padding: '10px 14px',
            background: 'var(--nhf-bg-primary)',
            color: 'var(--nhf-text-primary)',
            border: '1px solid var(--nhf-border)',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          {docTypes.map(type => (
            <option key={type} value={type}>
              {type === 'All' ? 'All Document Types' : type}
            </option>
          ))}
        </select>
      </div>

      {/* Vertical Feed of Physical Documents */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {filteredDocs.map((doc) => {
          return (
            <article className="physical-record-sheet"
              key={doc.id}
              onClick={() => {
                if (doc.isAnomalous) {
                  discoverAnomaly(`phys-doc-${doc.id}`);
                }
              }}
              style={{
                background: '#e8e2d5',
                color: '#1a1a1a',
                borderRadius: 'var(--radius-md)',
                padding: '32px 36px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
                border: '1px solid #c4b9a3',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #222', paddingBotw_=ÚÚ$z{-®éÜj×[™ÈÜˆ[Y\Ý[\Y]Y]HÙ\È›ÝX]Ú\ÚXØ[™X[]Y\Ë‚ˆÜÜ[‚ˆÙ]‚ˆ
_BˆØ\XÛO‚ˆ
NÂˆJ_BˆÙš[\™YØÜË›[™ÝOOH	‰ˆ
ˆ]ˆÝ[O^ÞÈY[™Îˆ	Í	Ë^[YÛŽˆ	ØÙ[\‰ËÛÛÜŽˆ	Ý˜\ŠK[š‹]^[]]Y
IÈ_O‚ˆ›ÈØÝ[Y[È›Ý[™[ˆ\ÈØ]YÛÜžK‚ˆÙ]‚ˆ
_BˆÙ]‚‚ˆËÊˆ[ØÜ™Y[ˆ[XYÙH›ÛÛH[Ù[
‹ßBˆÞ›ÛÛYY[XYÙH	‰ˆ
ˆ]ˆÛ\ÜÓ˜[YOH›[Ù[X˜XÚÙ›ÜˆÛÛXÚÏ^Ê
HOˆÙ]›ÛÛYY[XYÙJ[
_O‚ˆ]ˆÝ[O^ÞÈÜÚ][ÛŽˆ	Ü™[]]™IËX^ÚYˆ	ÎLÉËX^ZYÚˆ	ÎLš	È_HÛÛXÚÏ^ÊJHOˆKœÝÜ›ÜYØ][ÛŠ
_O‚ˆ]Û‚ˆÛÛXÚÏ^Ê
HOˆÙ]›ÛÛYY[XYÙJ[
_BˆÝ[O^ÞÂˆÜÚ][ÛŽˆ	ØXœÛÛ]IËˆÜˆ	ËLÍœ	ËˆšYÚˆ	Ì	Ëˆ˜XÚÙÜ›Ý[™ˆ	Ü™Ø˜JMKMKMKŒŠIËˆ›Ü™\Žˆ	Û›Û™IËˆÛÛÜŽˆ	ÈÙ™™‰ËˆY[™Îˆ	Íœ	Ëˆ›Ü™\”˜Y]\Îˆ	ÍL	IËˆÝ\œÛÜŽˆ	ÜÚ[\‰Ëˆ\Ü^Nˆ	Ù›^	Ëˆ[YÛ’][\Îˆ	ØÙ[\‰Ëˆ\ÝYžPÛÛ[ˆ	ØÙ[\‰Âˆ_Bˆ‚ˆÚ^™O^ÌŒHÏ‚ˆØ]Û‚ˆ[YÈˆÜ˜Ï^Þ›ÛÛYY[XYÙ_Hˆ[H–›ÛÛYY]šY[˜ÙHˆˆÝ[O^ÞÈˆX^ÚYˆ	ÌL	IËˆX^ZYÚˆ	Î]š	ËˆØš™XÝš]ˆ	ØÛÛZ[‰Ëˆ›Ü™\”˜Y]\Îˆ	Í	Ëˆ›ÞÚYÝÎˆ	ÌL™Ø˜JŽ
IËˆ›Ü™\Žˆ	Ì\ÛÛYÍ	Âˆ_HˆÏ‚ˆÙ]‚ˆÙ]‚ˆ
_BˆÙ]‚ˆ
NÂŸNÂ