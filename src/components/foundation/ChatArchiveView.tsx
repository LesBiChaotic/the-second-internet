import React, { useState, useEffect } from 'react';
import { MessageSquare, ShieldAlert, BookmarkPlus, Hash, Radio, Play, ArrowLeft } from 'lucide-react';
import { chatLogsData } from '../../data/chatLogsData';
import { ChatLog } from '../../types';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const ChatArchiveView: React.FC<Props> = ({ store }) => {
  const { currentSubId, pinToCaseboard, discoverAnomaly } = store;
  const [selectedChatId, setSelectedChatId] = useState<string>(currentSubId || chatLogsData[0].id);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');

  useEffect(() => {
    if (currentSubId) {
      setViewMode('detail');
    }
  }, [currentSubId]);

  const selectedChat = chatLogsData.find(c => c.id === selectedChatId) || chatLogsData[0];

  const handleSelect = (chat: ChatLog) => {
    soundEngine.playClick(650);
    setSelectedChatId(chat.id);
    setViewMode('detail');
    if (chat.messages.some(message => message.isAnomalous)) {
      discoverAnomaly(`chat-${chat.id}`);
    }
  };

  const handlePin = () => {
    soundEngine.playClick(1000);
    pinToCaseboard({
      type: 'DOCUMENT',
      title: `IRC: ${selectedChat.channel} (${selectedChat.date})`,
      preview: selectedChat.description,
      targetView: 'CHATS',
      targetId: selectedChat.id,
      connectedTo: []
    });
    alert(`Pinned IRC log "${selectedChat.channel}" to Caseboard.`);
  };

  // Helper to get color based on nick
  const getNickColor = (nick: string) => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6'];
    let hash = 0;
    for (let i = 0; i < nick.length; i++) {
      hash = nick.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
      <style>{`
        .chat-app-container {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 20px;
          flex: 1;
        }
        
        .chat-list-pane {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: var(--nhf-bg-surface);
          border: 1px solid var(--nhf-border);
          border-radius: var(--radius-md);
          padding: 16px;
          max-height: 700px;
          overflow-y: auto;
          box-shadow: var(--shadow-subtle);
        }

        .chat-detail-pane {
          display: flex;
          flex-direction: column;
          background: #04070a;
          border: 1px solid var(--nhf-border);
          border-radius: var(--radius-md);
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
          overflow: hidden;
          position: relative;
        }
        
        .chat-bubble {
          max-width: 85%;
          padding: 10px 14px;
          border-radius: 18px;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .chat-bubble-received {
          background: #1e293b;
          color: #f1f5f9;
          border-bottom-left-radius: 4px;
        }

        .mobile-back-btn {
          display: none;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .chat-app-container {
            grid-template-columns: 1fr;
          }
          .chat-list-pane {
            display: var(--show-list, flex);
            max-height: none;
          }
          .chat-detail-pane {
            display: var(--show-detail, flex);
            min-height: 500px;
          }
          .mobile-back-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            color: #94a3b8;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            cursor: pointer;
            margin-right: 12px;
          }
        }
      `}</style>

      <div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '4px' }}>
          Recovered IRC Transcripts & Chat Spools
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--nhf-text-secondary)' }}>
          Preserved raw buffer transcripts from EFnet, Undernet, and private IRC daemons (1997–2004).
        </p>
      </div>

      <div 
        className="chat-app-container" 
        style={{ 
          minHeight: '600px',
          '--show-list': viewMode === 'list' ? 'flex' : 'none',
          '--show-detail': viewMode === 'detail' ? 'flex' : 'none'
        } as React.CSSProperties}
      >
        {/* Chat List Pane */}
        <div className="chat-list-pane">
          {chatLogsData.map((chat) => {
            const isSelected = chat.id === selectedChatId;
            return (
              <div
                key={chat.id}
                onClick={() => handleSelect(chat)}
                style={{
                  background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'var(--nhf-bg-card)',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--nhf-accent-blue)' : 'var(--nhf-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Hash size={16} color={isSelected ? 'var(--nhf-accent-blue)' : 'var(--nhf-text-muted)'} />
                    <span style={{ fontWeight: 600, fontSize: '0.95rem', color: isSelected ? 'var(--nhf-accent-blue)' : 'var(--nhf-text-primary)' }}>
                      {chat.channel}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {chat.date}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--nhf-text-secondary)', marginLeft: '24px' }}>
                  Server: {chat.server}
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Detail Pane */}
        <div className="chat-detail-pane">
          {/* Chat Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            background: '#0f172a',
            padding: '16px',
            borderBottom: '1px solid #1e293b'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button 
                className="mobile-back-btn"
                onClick={() => {
                  soundEngine.playClick(600);
                  setViewMode('list');
                }}
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Hash size={18} color="#38bdf8" />
                  {selectedChat.channel}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                  {selectedChat.server} • {selectedChat.date}
                </div>
              </div>
            </div>

            <button className="btn btn-secondary" onClick={handlePin} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#e2e8f0' }}>
              <BookmarkPlus size={14} />
              <span className="hide-on-mobile">Pin</span>
            </button>
          </div>

          {/* Chat Messages */}
          <div style={{
            flex: 1,
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            overflowY: 'auto',
            background: '#020617'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '16px', padding: '12px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '8px', fontSize: '0.8rem', color: '#64748b' }}>
              {selectedChat.description}
            </div>
            
            {selectedChat.messages.map((msg, idx) => {
              if (msg.isSystem) {
                return (
                  <div key={idx} style={{ 
                    textAlign: 'center', 
                    color: msg.isAnomalous ? '#ef4444' : '#64748b', 
                    fontSize: '0.8rem',
                    margin: '8px 0',
                    fontWeight: 500
                  }}>
                    {msg.text}
                  </div>
                );
              }
              
              const isAnomalous = msg.isAnomalous;
              const nickColor = getNickColor(msg.nick || '');
              
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: '12px', marginBottom: '4px', display: 'flex', gap: '8px' }}>
                    <span style={{ fontWeight: 600, color: nickColor }}>{msg.nick}</span>
                    <span>{msg.time}</span>
                  </div>
                  <div className="chat-bubble chat-bubble-received" style={{ 
                    border: isAnomalous ? '1px solid #7f1d1d' : 'none',
                    background: isAnomalous ? '#450a0a' : '#1e293b',
                    color: isAnomalous ? '#fca5a5' : '#f1f5f9'
                  }}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
