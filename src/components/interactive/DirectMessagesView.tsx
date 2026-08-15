import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Lock, 
  Radio, 
  CheckCheck, 
  Zap, 
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { ArchiveState, DMThread } from '../../state/useArchiveStore';
import { UserAvatar } from '../common/UserAvatar';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const DirectMessagesView: React.FC<Props> = ({ store }) => {
  const { 
    dmThreads, 
    activeDmThreadId, 
    setActiveDmThreadId, 
    sendDmReply, 
    markDmThreadRead,
    discoverAnomaly,
    getSuggestedQuestion
  } = store;

  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const activeThread = dmThreads.find(t => t.id === activeDmThreadId) || dmThreads[0];
  const suggestedQuestion = getSuggestedQuestion(activeThread.id);

  const handleSelectThread = (thread: DMThread) => {
    soundEngine.playClick(650);
    setActiveDmThreadId(thread.id);
    markDmThreadRead(thread.id);
    if (thread.isAnomalous) {
      discoverAnomaly(`dm-${thread.id}`);
    }
  };

  const handleSend = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = (customText || inputMsg).trim();
    if (!textToSend || isTyping) return;

    soundEngine.playClick(850);
    setInputMsg('');
    sendDmReply(activeThread.id, textToSend);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      soundEngine.playClick(950);
    }, 1100);
  };

  const handleAskSuggested = () => {
    handleSend(undefined, suggestedQuestion);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      {/* Header Banner */}
      <div style={{
        background: 'var(--nhf-bg-surface)',
        border: '1px solid var(--nhf-border)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            flexShrink: 0
          }}>
            <MessageSquare size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#a78bfa', fontWeight: 700, textTransform: 'uppercase' }}>
              Investigator Workbench // Private Comms Channel
            </div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--nhf-text-primary)', margin: 0 }}>
              Direct Messages & Terminal PMs
            </h1>
          </div>
        </div>

        <div style={{ fontSize: '0.74rem', color: 'var(--nhf-text-secondary)', fontFamily: 'var(--font-mono)' }}>
          PROTOCOL: ENCRYPTED-MESH-V2 // SOCKET: ACTIVE
        </div>
      </div>

      {/* Main Dual-Panel Chat Workspace */}
      <div className="dm-layout-grid">
        {/* Left Sidebar: Threads List */}
        <div className="dm-thread-sidebar">
          <div style={{
            padding: '12px 14px',
            borderBottom: '1px solid var(--nhf-border)',
            fontWeight: 700,
            fontSize: '0.8rem',
            color: 'var(--nhf-text-primary)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Conversations</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
              {dmThreads.length} active
            </span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {dmThreads.map((thread) => {
              const isSelected = thread.id === activeThread.id;
              const lastMsg = thread.messages[thread.messages.length - 1];

              return (
                <div
                  key={thread.id}
                  onClick={() => handleSelectThread(thread)}
                  style={{
                    padding: '12px 14px',
                    borderBottom: '1px solid var(--nhf-border)',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? 'var(--nhf-bg-card)' : 'transparent',
                    borderLeft: isSelected ? '3px solid var(--nhf-accent-purple, #a78bfa)' : '3px solid transparent',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-start'
                  }}
                >
                  <UserAvatar handleOrName={thread.partnerHandle} size={32} isSpecial={thread.isAnomalous} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--nhf-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {thread.partnerName}
                      </div>
                      <span style={{ fontSize: '0.66rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {lastMsg ? lastMsg.time : ''}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.68rem', color: thread.isAnomalous ? '#38bdf8' : 'var(--nhf-text-muted)', marginBottom: '2px' }}>
                      {thread.partnerRole}
                    </div>

                    <div style={{
                      fontSize: '0.72rem',
                      color: thread.unread ? 'var(--nhf-text-primary)' : 'var(--nhf-text-secondary)',
                      fontWeight: thread.unread ? 600 : 400,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      lineHeight: 1.3
                    }}>
                      {lastMsg ? lastMsg.content : 'No messages'}
                    </div>
                  </div>

                  {thread.unread && (
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#38bdf8', marginTop: '4px', flexShrink: 0 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Conversation Stream */}
        <div className="dm-chat-pane">
          {/* Thread Header */}
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid var(--nhf-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--nhf-bg-card)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <UserAvatar handleOrName={activeThread.partnerHandle} size={30} isSpecial={activeThread.isAnomalous} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--nhf-text-primary)' }}>
                  {activeThread.partnerName}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--nhf-text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  @{activeThread.partnerHandle} • {activeThread.partnerRole}
                </div>
              </div>
            </div>

            {activeThread.isAnomalous && (
              <span className="badge badge-blue" style={{ fontSize: '0.66rem', padding: '2px 6px' }}>
                ✦ ANOMALOUS MESH NODE
              </span>
            )}
          </div>

          {/* Messages Stream */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {activeThread.messages.map((msg) => {
              const isMe = msg.isFromUser;

              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: isMe ? 'row-reverse' : 'row',
                    alignItems: 'flex-end',
                    gap: '8px'
                  }}
                >
                  <UserAvatar handleOrName={isMe ? 'you' : msg.sender} size={26} />

                  <div style={{
                    maxWidth: '75%',
                    background: isMe ? 'linear-gradient(135deg, #2563eb, #3b82f6)' : 'var(--nhf-bg-card)',
                    color: isMe ? '#ffffff' : 'var(--nhf-text-primary)',
                    border: isMe ? 'none' : '1px solid var(--nhf-border)',
                    borderRadius: isMe ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    padding: '8px 12px',
                    boxShadow: 'var(--shadow-subtle)'
                  }}>
                    <div style={{ fontSize: '0.80rem', lineHeight: 1.48 }}>
                      {msg.content}
                    </div>

                    <div style={{
                      fontSize: '0.64rem',
                      color: isMe ? 'rgba(255, 255, 255, 0.75)' : 'var(--nhf-text-muted)',
                      fontFamily: 'var(--font-mono)',
                      marginTop: '3px',
                      textAlign: 'right'
                    }}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--nhf-text-muted)', fontSize: '0.74rem', fontStyle: 'italic' }}>
                <UserAvatar handleOrName={activeThread.partnerHandle} size={20} />
                <span>{activeThread.partnerName} is transmitting...</span>
              </div>
            )}
          </div>

          {/* ONE Single Clean Suggested Question Button */}
          <div style={{
            padding: '8px 14px',
            borderTop: '1px solid var(--nhf-border)',
            background: 'var(--nhf-bg-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
              <HelpCircle size={13} color="#a78bfa" />
              <span>RECOMMENDED INQUIRY:</span>
            </div>

            <button
              className="btn btn-secondary"
              style={{
                fontSize: '0.75rem',
                padding: '4px 12px',
                borderColor: 'var(--nhf-accent-purple, #a78bfa)',
                color: 'var(--nhf-text-primary)',
                background: 'rgba(167, 139, 250, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                textAlign: 'left'
              }}
              onClick={handleAskSuggested}
              disabled={isTyping}
              title="Click to send this progressive investigation question"
            >
              <span>"{suggestedQuestion}"</span>
              <ArrowRight size={13} color="#a78bfa" />
            </button>
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={(e) => handleSend(e)}
            style={{
              padding: '12px 14px',
              borderTop: '1px solid var(--nhf-border)',
              display: 'flex',
              gap: '8px',
              background: 'var(--nhf-bg-surface)'
            }}
          >
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder={`Type message to ${activeThread.partnerName}...`}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: 'var(--nhf-bg-primary)',
                border: '1px solid var(--nhf-border)',
                borderRadius: '6px',
                color: 'var(--nhf-text-primary)',
                fontSize: '0.81rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isTyping || !inputMsg.trim()}
              style={{ padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}
            >
              <Send size={13} />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
