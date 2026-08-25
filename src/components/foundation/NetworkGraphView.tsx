import React, { useRef, useEffect, useState } from 'react';
import { Share2, ZoomIn, ZoomOut, RotateCcw, ShieldAlert, Layers } from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Node {
  id: string;
  name: string;
  type: 'PERSON' | 'DOMAIN' | 'INCIDENT' | 'ORGANIZATION' | 'SECOND_NET';
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isAnomalous?: boolean;
}

interface Edge {
  source: string;
  target: string;
  label: string;
  isAnomalous?: boolean;
}

interface Props {
  store: ArchiveState;
}

export const NetworkGraphView: React.FC<Props> = ({ store }) => {
  const { navigate, discoverAnomaly } = store;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showSecondLayer, setShowSecondLayer] = useState<boolean>(store.discoveredAnomalies.includes('graph-reveal-second-net'));

  const initialNodes: Node[] = [
    { id: 'nhf', name: 'Net History Foundation', type: 'ORGANIZATION', x: 400, y: 150, vx: 0, vy: 0, radius: 14, color: '#3b82f6' },
    { id: 'marrow', name: 'marrow.net (1997)', type: 'DOMAIN', x: 220, y: 240, vx: 0, vy: 0, radius: 11, color: '#2dd4bf' },
    { id: 'afterhours', name: 'afterhours.org (2001)', type: 'DOMAIN', x: 380, y: 320, vx: 0, vy: 0, radius: 11, color: '#60a5fa' },
    { id: 'greyline', name: 'Greyline ISP (1995)', type: 'ORGANIZATION', x: 550, y: 220, vx: 0, vy: 0, radius: 12, color: '#cbd5e1' },
    { id: 'bluewindow', name: 'bluewindow.net (2004)', type: 'DOMAIN', x: 250, y: 390, vx: 0, vy: 0, radius: 10, color: '#f472b6' },
    { id: 'candleroom', name: 'candle-room.com (1998)', type: 'DOMAIN', x: 620, y: 340, vx: 0, vy: 0, radius: 10, color: '#fb923c' },
    { id: 'noemi', name: 'Noemi Castille (nyxgirl / lucidwitch)', type: 'PERSON', x: 280, y: 280, vx: 0, vy: 0, radius: 9, color: '#a78bfa' },
    { id: 'vanhouten', name: 'Dr. Douglas K. Van Houten (Missing 2019)', type: 'PERSON', x: 480, y: 200, vx: 0, vy: 0, radius: 9, color: '#f87171', isAnomalous: true },
    { id: 'janus', name: 'Alden Corliss (janus)', type: 'PERSON', x: 430, y: 380, vx: 0, vy: 0, radius: 9, color: '#fbbf24' },
    { id: 'rowan', name: 'Rowan Glass (rowanglass)', type: 'PERSON', x: 200, y: 340, vx: 0, vy: 0, radius: 9, color: '#e879f9' },
    { id: 'event2003', name: 'Oct 14 2003 Routing Event', type: 'INCIDENT', x: 460, y: 280, vx: 0, vy: 0, radius: 13, color: '#ef4444', isAnomalous: true },
    { id: 'wintermute', name: 'wintermute42 (1998-2031)', type: 'PERSON', x: 520, y: 440, vx: 0, vy: 0, radius: 10, color: '#ef4444', isAnomalous: true },
    
    // Second Internet Layer Nodes
    { id: 'roomdoors', name: 'roomwithoutdoors.net', type: 'SECOND_NET', x: 480, y: 530, vx: 0, vy: 0, radius: 13, color: '#38bdf8', isAnomalous: true },
    { id: 'secondbus', name: 'The Second Bus (0.0.0.0/room)', type: 'SECOND_NET', x: 360, y: 510, vx: 0, vy: 0, radius: 14, color: '#38bdf8', isAnomalous: true }
  ];

  const edges: Edge[] = [
    { source: 'nhf', target: 'marrow', label: 'Archived Collection 04' },
    { source: 'nhf', target: 'afterhours', label: 'Archived Collection 11' },
    { source: 'nhf', target: 'greyline', label: 'Archived Tapes' },
    { source: 'nhf', target: 'vanhouten', label: 'Co-Founder' },
    { source: 'greyline', target: 'vanhouten', label: 'Lead Architect' },
    { source: 'marrow', target: 'noemi', label: 'nyxgirl (Member)' },
    { source: 'afterhours', target: 'noemi', label: 'lucidwitch (Member)' },
    { source: 'bluewindow', target: 'noemi', label: 'noemi_c (Journal)' },
    { source: 'afterhours', target: 'janus', label: 'Lead Admin' },
    { source: 'afterhours', target: 'rowan', label: 'glasshouse (Member)' },
    { source: 'bluewindow', target: 'rowan', label: 'rowanglass (Continuous Blog)' },
    { source: 'afterhours', target: 'event2003', label: 'Broadcast Anomaly' },
    { source: 'greyline', target: 'event2003', label: 'Telecom Bridge' },
    { source: 'candleroom', target: 'secondbus', label: 'Coined Second Net', isAnomalous: true },
    { source: 'event2003', target: 'secondbus', label: '11-Minute Breach', isAnomalous: true },
    { source: 'wintermute', target: 'marrow', label: '1998 Post' },
    { source: 'wintermute', target: 'afterhours', label: '2004 Post' },
    { source: 'wintermute', target: 'roomdoors', label: 'Second Bus Resident', isAnomalous: true },
    { source: 'secondbus', target: 'roomdoors', label: 'Topological Host', isAnomalous: true }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background subtle grid
      ctx.strokeStyle = '#1e2430';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Edges
      edges.forEach((edge) => {
        const s = initialNodes.find(n => n.id === edge.source);
        const t = initialNodes.find(n => n.id === edge.target);
        if (!s || !t) return;

        if (!showSecondLayer && (s.type === 'SECOND_NET' || t.type === 'SECOND_NET')) {
          return; // Skip hidden second layer
        }

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);
        ctx.strokeStyle = edge.isAnomalous ? '#f87171' : 'rgba(100, 116, 139, 0.4)';
        ctx.lineWidth = edge.isAnomalous ? 1.5 : 1;
        ctx.setLineDash(edge.isAnomalous ? [4, 4] : []);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw Nodes
      initialNodes.forEach((node) => {
        if (!showSecondLayer && node.type === 'SECOND_NET') return;

        const isSelected = selectedNode?.id === node.id;

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + (isSelected ? 6 : 2), 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? 'rgba(56, 189, 248, 0.3)' : 'rgba(15, 23, 42, 0.6)';
        ctx.fill();

        // Node Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        ctx.strokeStyle = isSelected ? '#38bdf8' : '#0f172a';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Label
        ctx.fillStyle = node.isAnomalous ? '#fca5a5' : '#e2e8f0';
        ctx.font = isSelected ? 'bold 12px monospace' : '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y + node.radius + 14);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [selectedNode, showSecondLayer]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clicked = initialNodes.find((n) => {
      if (!showSecondLayer && n.type === 'SECOND_NET') return false;
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= n.radius + 8;
    });

    soundEngine.playClick(clicked ? 850 : 500);
    setSelectedNode(clicked || null);
    if (clicked?.isAnomalous) {
      discoverAnomaly(`graph-node-${clicked.id}`);
    }
  };

  return (
    <div className="forensic-route topology-table-route" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="forensic-route-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '4px' }}>
            Cross-Network Topology Graph
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--nhf-text-secondary)' }}>
            Interactive node-link mapping of people, archived platforms, infrastructural events, and unindexed subnets.
          </p>
        </div>

        <button
          className="btn btn-secondary"
          style={{
            borderColor: showSecondLayer ? 'var(--nhf-accent-blue)' : undefined,
            color: showSecondLayer ? 'var(--nhf-accent-blue)' : undefined
          }}
          onClick={() => {
            soundEngine.playClick(950);
            setShowSecondLayer(!showSecondLayer);
            if (!showSecondLayer) discoverAnomaly('graph-reveal-second-net');
          }}
        >
          <Layers size={16} />
          <span>{showSecondLayer ? 'Hide Unresolved Substrate' : 'Reveal Second Network Substrate'}</span>
        </button>
      </div>

      {/* Canvas container */}
      <div className="mobile-node-browser" aria-label="Network entities">
        <label htmlFor="network-node-select">Inspect an entity or archive</label>
        <select id="network-node-select" value={selectedNode?.id || ''} onChange={event => {
          const node = initialNodes.find(item => item.id === event.target.value) || null;
          setSelectedNode(node);
          if (node?.isAnomalous) discoverAnomaly(`graph-node-${node.id}`);
        }}>
          <option value="">Choose a network node…</option>
          {initialNodes.filter(node => showSecondLayer || node.type !== 'SECOND_NET').map(node => <option key={node.id} value={node.id}>{node.name}</option>)}
        </select>
        {selectedNode && <div className="mobile-node-detail"><strong>{selectedNode.name}</strong><span>{selectedNode.type}{selectedNode.isAnomalous ? ' // ANOMALOUS' : ''}</span><p>{edges.filter(edge => edge.source === selectedNode.id || edge.target === selectedNode.id).map(edge => edge.label).join(' · ') || 'No indexed relationships.'}</p></div>}
      </div>
      <div className="graph-canvas-container" style={{ boxShadow: 'var(--shadow-subtle)', overflowX: 'auto', position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={900}
          height={600}
          style={{ width: '900px', height: '600px', minWidth: '900px', display: 'block', maxWidth: 'none' }}
          className="graph-canvas"
          onClick={handleCanvasClick}
        />

        {/* Selected Node Details Box Overlay */}
        {selectedNode && (
          <div className="graph-node-detail-overlay" style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            background: 'rgba(18, 20, 23, 0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--nhf-border)',
            borderRadius: '8px',
            padding: '16px',
            maxWidth: '300px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)'
          }}>
            <div style={{ fontSize: '0.7rem', color: selectedNode.color, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              {selectedNode.type}
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#f8fafc', margin: '4px 0 8px 0' }}>
              {selectedNode.name}
            </div>
            {selectedNode.isAnomalous && (
              <div className="badge badge-red" style={{ marginBottom: '8px' }}>
                <ShieldAlert size={10} /> ANOMALOUS NODE
              </div>
            )}
            <div style={{ fontSize: '0.75rem', color: 'var(--nhf-text-muted)', lineHeight: '1.4' }}>
              Click surrounding connected links or navigate to the entity profile to audit cross-corpus logs.
            </div>
          </div>
        )}

        <div className="graph-overlay-controls">
          <span>Click any node to inspect entity metadata</span>
        </div>
      </div>
    </div>
  );
};
