import React, { useState } from 'react';
import { MessageSquare, ShieldAlert, BookmarkPlus, Hash, Radio, Play } from 'lucide-react';
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

  const selectedChat = chatLogsData.find(c => c.id === selectedChatId) || chatLogsData[0];

  const handleSelect = (chat: ChatLog) => {
    soundEngine.playClick(650);
    setSelectedChatId(chat.id);
    if (chat.id === 'chat-afterhours-03') {
      discoverAnomaly('chat-oct14-irc');
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '4px' }}>
          Recovered IRC Transcripts & Chat Spools
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--nhf-text-secondary)' }}>
          Preserved raw buffer transcripts from EFnet, Undernet, and private IRC daemons (1997–2004).
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', minHeight: '600px' }}>
        {/* Chat Log Selector */}
        <div style={{
          background: 'var(--nhf-bg-surface)',
          border: '1px solid var(--nhf-border)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: 'var(--shadow-subtle)'
        }}>
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
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: isSelected ? 'var(--nhf-accent-blue)' : 'var(--nhf-text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {chat.channel}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {chat.date}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--nhf-text-secondary)' }}>
                  Server: {chat.server}
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Terminal Window */}
        <div style={{
          background: '#04070a',
          border: '1px solid var(--nhf-border)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8' }}>
                {selectedChat.channel} on {selectedChat.server}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                {selectedChat.description}
              </div>
            </div>

            <button className="btn btn-secondary" onClick={handlePin}>
              <BookmarkPlus size={14} />
              <span>Pin Transcript</span>
            </button>
          </div>

          {/* Terminal Output */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            lineHeight: '1.6',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            {selectedChat.messages.map((msg, idx) => {
              if (msg.isSystem) {
                return (
                  <div key={idx} style={{ color: msg.isAnomalous ? '#f87171' : '#94a3b8', fontStyle: 'italic' }}>
                    [{msg.time}] {msg.text}
                  </div>
                );
              }
              return (
                <div key={idx} style={{ color: msg.isAnomalous ? '#f87171' : '#f1f5f9' }}>
                  <span style={{ color: '#64748b' }}>[{msg.time}] </span>
                  <span style={{ color: '#38bdf8', fontWeight: 600 }}>&lt;{msg.nick}&gt; </span>
                  <span>{msg.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
