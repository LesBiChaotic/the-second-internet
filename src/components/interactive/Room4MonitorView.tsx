import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  MessageSquare, 
  FileText, 
  Send, 
  Sparkles, 
  Radio, 
  AlertTriangle, 
  BookmarkCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

interface IrcMessage {
  id: string;
  sender: string;
  time: string;
  text: string;
  isSpecial?: boolean;
}

export const Room4MonitorView: React.FC<Props> = ({ store }) => {
  const { discoverAnomaly, pinToCaseboard } = store;
  const [chatInput, setChatInput] = useState('');
  const [reflectionActive, setReflectionActive] = useState(false);
  const [clockTime, setClockTime] = useState('03:14:02');

  const [messages, setMessages] = useState<IrcMessage[]>([
    { id: '1', sender: 'nyxgirl', time: '03:13:40', text: 'alden are you still compiling the new patch?' },
    { id: '2', sender: 'janus', time: '03:13:55', text: 'yeah. but the dialup connection is pulling packets with negative ping.' },
    { id: '3', sender: 'd_miller', time: '03:14:00', text: 'thats impossible. check your router config.' },
    { id: '4', sender: 'janus', time: '03:14:02', text: 'the light on the screen is reflecting the other side of the room.', isSpecial: true },
    { id: '5', sender: 'nyxgirl', time: '03:14:15', text: 'what do you mean other side?' },
    { id: '6', sender: 'janus', time: '03:14:30', text: 'the room behind the monitor. someone is sitting there looking back at me.', isSpecial: true }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    soundEngine.playClick(750);
    const userMsg = chatInput.trim();
    const timeStr = '03:14:' + Math.floor(Math.random() * 40 + 20).toString().padStart(2, '0');

    const newMsgs = [
      ...messages,
      { id: `user-${Date.now()}`, sender: 'visitor_47', time: timeStr, text: userMsg }
    ];
    setMessages(newMsgs);
    setChatInput('');

    // Check for trigger keywords
    const lower = userMsg.toLowerCase();
    if (lower.includes('behind') || lower.includes('mirror') || lower.includes('light') || lower.includes('secondbus') || lower.includes('looking') || lower.includes('alden')) {
      setReflectionActive(true);
      soundEngine.playClearanceChime('LEVEL_NULL');
      discoverAnomaly('crt-room4-reflection');
      
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: `janus-resp-${Date.now()}`, sender: 'janus', time: '03:14:59', text: `to visitor: I can see you through the phosphor. Thank you for leaving the lamp on.`, isSpecial: true }
        ]);
      }, 1500);

      setTimeout(() => {
        setReflectionActive(false);
      }, 5000);
    } else {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: `nyx-resp-${Date.now()}`, sender: 'nyxgirl', time: '03:14:45', text: 'who just connected to the channel? alden did you invite someone?' }
        ]);
      }, 1200);
    }
  };

  const handlePinRoom4 = () => {
    soundEngine.playClick(850);
    pinToCaseboard({
      type: 'INCIDENT',
      title: 'Room 4 CRT Phosphor Simulation (Oct 14, 2003)',
      preview: 'Alden Corliss bedroom ViewSonic CRT monitor at 03:14:02 UTC during the negative latency phase transition.',
      targetView: 'ROOM4_MONITOR',
      connectedTo: []
    });
    alert('Pinned Room 4 Simulation to Caseboard.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '950px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div style={{
        background: 'var(--nhf-bg-surface)',
        border: '1px solid var(--nhf-border)',
        borderRadius: 'var(--radius-md)',
        padding: '24px 28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Tv size={20} color="var(--nhf-accent-blue)" />
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-accent-blue)', fontWeight: 700, textTransform: 'uppercase' }}>
              Historical Hardware Reenactment // Oct 14, 2003 03:14 UTC
            </span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '6px' }}>
            "Room 4" CRT Monitor Live Simulation (Alden Corliss Desk)
          </h1>
          <p style={{ fontSize: '0.86rem', color: 'var(--nhf-text-secondary)', maxWidth: '650px', lineHeight: 1.55 }}>
            An interactive simulation of Alden Corliss's ViewSonic CRT monitor during the 11-Minute Breach. Type into the BitchX IRC client to interact with the channel; notice how certain words reveal reflections in the phosphor layer.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={handlePinRoom4}>
            <BookmarkCheck size={15} color="var(--nhf-accent-blue)" />
            <span>Pin Incident</span>
          </button>
        </div>
      </div>

      {/* CRT Monitor Outer Chassis Frame */}
      <div style={{
        background: '#2b2a26',
        border: '12px solid #3d3b36',
        borderRadius: '24px',
        padding: '20px',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(0, 0, 0, 0.9)',
        position: 'relative'
      }}>
        {/* CRT Curved Bezel Screen */}
        <div style={{
          background: '#040d12',
          border: '4px solid #141f1a',
          borderRadius: '16px',
          padding: '20px',
          minHeight: '480px',
          boxShadow: 'inset 0 0 40px rgba(16, 185, 129, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle Phosphor Scanline Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
            backgroundSize: '100% 3px',
            pointerEvents: 'none',
            opacity: 0.65,
            zIndex: 10
          }} />

          {/* Ghostly Phosphor Reflection of Room 4 (Triggered by keywords) */}
          {reflectionActive && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.22) 0%, rgba(16, 185, 129, 0.12) 60%, transparent 80%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 15,
              animation: 'modalFadeIn 0.5s ease',
              pointerEvents: 'none'
            }}>
              <div style={{
                border: '2px dashed rgba(56, 189, 248, 0.6)',
                padding: '20px 30px',
                borderRadius: '12px',
                backgroundColor: 'rgba(4, 13, 18, 0.85)',
                textAlign: 'center',
                boxShadow: '0 0 30px rgba(56, 189, 248, 0.5)'
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#38bdf8', fontWeight: 800 }}>
                  ✦ PHOSPHOR SCREEN REFLECTION ✦
                </div>
                <div style={{ fontSize: '0.82rem', color: '#f8fafc', marginTop: '6px', fontStyle: 'italic' }}>
                  "I can see the room behind the screen. The light is warm. You are standing right there."
                </div>
                <div style={{ fontSize: '0.72rem', color: '#10b981', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                  SOCKET: 0.0.0.0:1014 // LATENCY: -4.102ms
                </div>
              </div>
            </div>
          )}

          {/* Windows 2000 Title Bar */}
          <div style={{
            background: 'linear-gradient(90deg, #0a246a, #a6caf0)',
            color: '#fff',
            padding: '4px 8px',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '2px',
            marginBottom: '12px',
            zIndex: 5,
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <span style={{ wordBreak: 'break-all' }}>BitchX-1.0c4 - [channel: #afterhours] [mode: +nt] [lag: -4ms]</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>{clockTime} UTC</span>
          </div>

          {/* IRC Chat Window Buffer */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            color: '#a7f3d0',
            overflowY: 'auto',
            paddingRight: '6px',
            zIndex: 5
          }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', gap: '8px', lineHeight: 1.45 }}>
                <span style={{ color: '#6ee7b7', opacity: 0.7, fontSize: '0.75rem' }}>[{msg.time}]</span>
                <span style={{ color: msg.sender === 'janus' ? '#38bdf8' : msg.sender === 'nyxgirl' ? '#f472b6' : '#f59e0b', fontWeight: 700 }}>
                  &lt;{msg.sender}&gt;
                </span>
                <span style={{ color: msg.isSpecial ? '#fef08a' : '#ecfdf5', fontWeight: msg.isSpecial ? 700 : 400 }}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* CRT Input Box */}
          <form
            onSubmit={handleSendMessage}
            style={{
              marginTop: '16px',
              borderTop: '1px solid #141f1a',
              paddingTop: '10px',
              display: 'flex',
              gap: '10px',
              zIndex: 5
            }}
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type message to #afterhours (try 'behind', 'mirror', 'light', 'secondbus')..."
              style={{
                flex: 1,
                background: '#02070a',
                border: '1px solid #10b981',
                padding: '8px 12px',
                color: '#a7f3d0',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.84rem',
                outline: 'none',
                borderRadius: '4px'
              }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ background: '#059669', borderColor: '#047857', padding: '6px 16px' }}
            >
              <Send size={14} />
              <span>Send</span>
            </button>
          </form>
        </div>

        {/* Physical Monitor Badges & Power LED */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '12px',
          padding: '0 8px'
        }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 800, color: '#8c887b', letterSpacing: '0.1em' }}>
            ViewSonic E70 // 58.4Hz FLYBACK
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#8c887b' }}>POWER</span>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
