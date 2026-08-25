import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  MessageSquare, 
  ArrowUp, 
  ShieldAlert, 
  Sparkles, 
  Filter, 
  BookmarkPlus, 
  Lock, 
  Eye, 
  EyeOff, 
  ZoomIn, 
  X,
  Send
} from 'lucide-react';
import { tracePosts } from '../../data/traceFeedData';
import { ambientTracePosts } from '../../data/worldPopulationData';
import { TracePost } from '../../types';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';
import { usePersistentState } from '../../state/usePersistentState';
import { UserAvatar } from '../common/UserAvatar';

interface Props {
  store: ArchiveState;
}

type LiveResponse = { author: string; content: string; upvotes: number; anomaly?: boolean };
const DEFAULT_LIVE_RESPONSES: LiveResponse[] = [
  { author: 'patchnotes', upvotes: 4, content: 'Do you have a source timestamp or physical capture for that? I am willing to check it, but TRACE has enough claims that cannot be reproduced.' },
  { author: 'analogghost', upvotes: 7, content: '@patchnotes Let them finish. Ordinary context has solved more archive discrepancies than another checksum lecture.' },
  { author: 'wintermute_42', upvotes: 19, anomaly: true, content: 'Your comment crossed the second bus before it appeared here. We read it while you were still typing.' }
];
const LIVE_RESPONSE_SETS: Record<string, LiveResponse[]> = {
  'trace-p-13-dead-bbs': [
    { author: 'switchboard_saint', upvotes: 6, content: 'I just checked the chassis. USRobotics Courier V.Everything, original power brick, no line cable, RTC battery dead since at least 2011. Uploading photographs now.' },
    { author: 'archive_moth', upvotes: 11, content: 'The volunteer roster names the overnight computer-room attendant: Mara Bell. She used the handle NURSE_6.' },
    { author: 'wintermute_42', upvotes: 23, anomaly: true, content: 'Room 19 was never discharged. It was disconnected. Those are different conditions.' }
  ],
  'trace-p-14-ordinary': [
    { author: 'investigator_kai', upvotes: 8, content: 'Please keep posting files like this. The archive needs evidence that these people laughed, ate, argued, and procrastinated before they became case numbers.' },
    { author: 'mara_net', upvotes: 10, content: 'I found Noemi’s response: “Coffee is not a spice, Alden.” The ban lasted three days.' },
    { author: 'wintermute_42', upvotes: 17, anomaly: true, content: 'The soup is still warm on this side.' }
  ],
  'trace-p-15-payphone': [
    { author: 'mod_overseer', upvotes: 9, content: 'Documenting this thread for the test lead. Discussion is welcome; instructions to bypass protocol are not.' },
    { author: 'candle_keeper', upvotes: 13, content: 'Fair. I will not answer it. I am adding a second recorder and a written log so silence is still evidence.' },
    { author: 'wintermute_42', upvotes: 26, anomaly: true, content: 'You already answered. The version of you beside the booth lifted the receiver tomorrow.' }
  ],
  'trace-p-16-last-seen': [
    { author: 'patchnotes', upvotes: 12, content: 'I reran it with raw UTC offsets. The loop remains. I dislike this result but the method is sound.' },
    { author: 'packetmason', upvotes: 15, content: 'That eliminates my easiest explanation. Next test is separating physical survivors from reconstructed hosts.' },
    { author: 'wintermute_42', upvotes: 29, anomaly: true, content: 'A dead network is only a network whose living users stopped checking.' }
  ]
};
const POPULATED_TRACE_POSTS = [...tracePosts, ...ambientTracePosts];

export const TraceCommunityView: React.FC<Props> = ({ store }) => {
  const { currentSubId, pinToCaseboard, discoverAnomaly } = store;
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [posts, setPosts] = usePersistentState<TracePost[]>('nhf_trace_posts', POPULATED_TRACE_POSTS);
  const [newCommentText, setNewCommentText] = useState<{ [key: string]: string }>({});
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [uncensoredSections, setUncensoredSections] = usePersistentState<{ [key: string]: boolean }>('nhf_trace_uncensored', {});
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [hasCommentedBefore, setHasCommentedBefore] = useState<boolean>(false);

  useEffect(() => {
    setPosts(previous => {
      const missing = POPULATED_TRACE_POSTS.filter(base => !previous.some(post => post.id === base.id));
      return missing.length ? [...missing, ...previous] : previous;
    });
  }, [setPosts]);

  const tags = ['ALL', 'DISCOVERY', 'QUESTION', 'TECHNICAL', 'DEBUNKED', 'ARCHIVE FIND', 'SPECULATION', 'FOUNDATION RESPONSE', 'ANOMALOUS'];

  const filteredPosts = posts.filter((p) => {
    if (selectedTag === 'ALL') return true;
    return p.tag === selectedTag;
  });

  const handleUpvote = (postId: string) => {
    soundEngine.playClick(900);
    setPosts(prev => prev.map(p => {
      if (p.id === postId) return { ...p, upvotes: p.upvotes + 1 };
      return p;
    }));
  };

  const handleToggleCensor = (sectionKey: string) => {
    soundEngine.playClick(850);
    discoverAnomaly('trace-uncensored-read');
    setUncensoredSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Live typing simulation sequence when user comments
  const handleAddComment = (postId: string) => {
    const text = newCommentText[postId]?.trim();
    if (!text) return;
    
    soundEngine.playClick(800);

    // 1. Add user's comment immediately
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [
            ...p.comments,
            {
              id: `comm-user-${Date.now()}`,
              author: 'you (anonymous_researcher)',
              timestamp: 'Just now',
              upvotes: 1,
              content: text
            }
          ]
        };
      }
      return p;
    }));

    setNewCommentText(prev => ({ ...prev, [postId]: '' }));
    discoverAnomaly('trace-user-commented');

    const responses = LIVE_RESPONSE_SETS[postId] || DEFAULT_LIVE_RESPONSES;
    responses.forEach((response, index) => {
      const typingAt = 1100 + index * 2400;
      window.setTimeout(() => { setTypingUser(`@${response.author}`); soundEngine.playClick(600); }, typingAt);
      window.setTimeout(() => {
        setTypingUser(null);
        response.anomaly ? soundEngine.playDialupChirp() : soundEngine.playClick(780);
        if (response.anomaly) discoverAnomaly('wintermute-live-reply');
        setPosts(previous => previous.map(post => post.id === postId ? { ...post, comments: [...post.comments, { id: `comm-live-${response.author}-${Date.now()}-${index}`, author: response.author, timestamp: 'Just now', upvotes: response.upvotes, content: response.content }] } : post));
      }, typingAt + 1200);
    });
  };

  const handlePin = (post: TracePost) => {
    soundEngine.playClick(1000);
    pinToCaseboard({
      type: 'PERSON',
      title: `TRACE: ${post.title}`,
      preview: post.content.slice(0, 160) + '...',
      targetView: 'TRACE',
      targetId: post.id,
      connectedTo: []
    });
    alert(`Pinned TRACE post to Caseboard.`);
  };

  return (
    <div className="trace-container human-archive-route trace-dispatch-route">
      {/* Hero Header */}
      <div className="trace-hero-header">
        <div className="trace-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Radio size={20} color="#38bdf8" />
            <h1 style={{ margin: 0 }}>TRACE // Live Digital Archaeology Forum</h1>
          </div>
          <p>
            Real-time research discussion board. Independent investigators, skeptics, and foundation fellows discussing anomalous telecommunications, decommissioned ISP tapes, and physical evidence.
          </p>
        </div>

        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
          <div>8,421 Researchers Connected</div>
          <div style={{ color: '#34d399' }}>● Live Ingest Feed Active</div>
        </div>
      </div>

      {/* Tag Filters */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%', minWidth: 0 }}>
        {tags.map((tag) => (
          <button
            key={tag}
            className="btn btn-secondary"
            style={{
              padding: '4px 10px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              borderColor: selectedTag === tag ? 'var(--nhf-accent-blue)' : 'var(--nhf-border)',
              color: selectedTag === tag ? '#60a5fa' : 'var(--nhf-text-muted)',
              background: selectedTag === tag ? 'rgba(59, 130, 246, 0.15)' : 'var(--nhf-bg-surface)',
              whiteSpace: 'nowrap'
            }}
            onClick={() => {
              soundEngine.playClick(600);
              setSelectedTag(tag);
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Split Layout */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredPosts.map((post) => {
          const hasCensored = post.content.includes('[CENSORED_SECTION_START]');
          const isUncensored = uncensoredSections[post.id];

          return (
            <div key={post.id} className="trace-post-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div className="trace-post-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <UserAvatar handleOrName={post.author} size={26} isSpecial={post.author.includes('wintermute')} />
                  <span className="trace-author-handle">u/{post.author}</span>
                  <span>•</span>
                  <span>{post.timestamp}</span>
                  <span className={`badge ${post.tag === 'FOUNDATION RESPONSE' ? 'badge-blue' : post.tag === 'DISCOVERY' ? 'badge-amber' : post.tag === 'TECHNICAL' ? 'badge-gray' : 'badge-red'}`}>
                    {post.tag}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    className="btn btn-secondary"
                    style={{ padding: '3px 8px', fontSize: '0.75rem' }}
                    onClick={() => handleUpvote(post.id)}
                  >
                    <ArrowUp size={13} color="#38bdf8" />
                    <span>{post.upvotes}</span>
                  </button>

                  <button
                    className="btn btn-secondary"
                    style={{ padding: '3px 6px' }}
                    onClick={() => handlePin(post)}
                    title="Pin to Caseboard"
                  >
                    <BookmarkPlus size={13} />
                  </button>
                </div>
              </div>

              <div className="trace-post-title">{post.title}</div>

              {/* Photographic Attachment if Present */}
              {post.imageUrl && (
                <div 
                  style={{
                    position: 'relative',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: '1px solid var(--nhf-border)',
                    maxHeight: '280px',
                    cursor: 'pointer',
                    background: '#090d14'
                  }}
                  onClick={() => setZoomedImage(post.imageUrl || null)}
                >
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    style={{ width: '100%', height: 'auto', maxHeight: '260px', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    background: 'rgba(0,0,0,0.8)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '0.72rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <ZoomIn size={12} />
                    <span>Click to Enlarge Scan</span>
                  </div>
                </div>
              )}

              {/* Post Body (with interactive censor reveal if present) */}
              {hasCensored ? (
                <div className="trace-post-body">
                  <div>
                    {post.content.split('[CENSORED_SECTION_START]')[0]}
                  </div>

                  <div style={{ margin: '10px 0' }}>
                    {isUncensored ? (
                      <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px dashed #ef4444', padding: '12px', borderRadius: '4px', color: '#fca5a5' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#f87171', marginBottom: '4px' }}>
                          <span>[RESTORED ARCHIVIST LOG]</span>
                          <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handleToggleCensor(post.id)}>Re-censor</span>
                        </div>
                        {post.content.split('[CENSORED_SECTION_START]')[1].split('[CENSORED_SECTION_END]')[0]}
                      </div>
                    ) : (
                      <div 
                        style={{ background: 'var(--nhf-bg-card)', border: '1px dashed var(--nhf-border)', padding: '10px 14px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                        onClick={() => handleToggleCensor(post.id)}
                      >
                        <span style={{ color: '#f87171', fontSize: '0.8rem', fontWeight: 600 }}>
                          ⚠ [CONTENT CENSORED BY MODERATION DAEMON]
                        </span>
                        <button className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '0.72rem' }}>
                          <Eye size={12} />
                          <span>RESTORE TEXT</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    {post.content.split('[CENSORED_SECTION_END]')[1]}
                  </div>
                </div>
              ) : (
                <div className="trace-post-body">{post.content}</div>
              )}

              {/* Comments Tree */}
              <div className="trace-comments-container">
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
                  LIVE RESEARCH RESPONSES ({post.comments.length})
                </div>

                {post.comments.map((c) => {
                  const isWintermute = c.author.includes('wintermute');
                  return (
                    <div 
                      key={c.id} 
                      className="trace-comment-item"
                      style={{
                        borderColor: isWintermute ? 'rgba(239, 68, 68, 0.4)' : undefined,
                        background: isWintermute ? 'rgba(239, 68, 68, 0.08)' : undefined
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--nhf-text-muted)', marginBottom: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <UserAvatar handleOrName={c.author} size={20} isSpecial={isWintermute} />
                          <span style={{ color: isWintermute ? '#ef4444' : '#38bdf8', fontWeight: 700 }}>
                            u/{c.author} {isWintermute && '⚠ [ANOMALY]'}
                          </span>
                        </div>
                        <span>{c.timestamp} • {c.upvotes} pts</span>
                      </div>
                      <div style={{ color: isWintermute ? '#fca5a5' : 'var(--nhf-text-primary)', lineHeight: '1.5' }}>
                        {c.content}
                      </div>

                      {/* Nested Replies */}
                      {c.replies && c.replies.length > 0 && (
                        <div className="trace-comment-replies">
                          {c.replies.map((r) => (
                            <div key={r.id} className="trace-reply-item">
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--nhf-text-muted)', marginBottom: '2px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <UserAvatar handleOrName={r.author} size={18} />
                                  <span style={{ color: '#93c5fd', fontWeight: 600 }}>u/{r.author}</span>
                                </div>
                                <span>{r.timestamp}</span>
                              </div>
                              <div style={{ fontSize: '0.82rem', color: 'var(--nhf-text-secondary)' }}>
                                {r.content}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Live Typing Indicator */}
                {typingUser && (
                  <div className="typing-indicator">
                    <span>💬 {typingUser} is typing</span>
                    <span className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </div>
                )}

                {/* Comment Input */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <input
                    type="text"
                    placeholder="Contribute finding or question (triggers live responses)..."
                    value={newCommentText[post.id] || ''}
                    onChange={(e) => setNewCommentText({ ...newCommentText, [post.id]: e.target.value })}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      background: 'var(--nhf-bg-card)',
                      border: '1px solid var(--nhf-border)',
                      borderRadius: '6px',
                      color: 'var(--nhf-text-primary)',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                  />
                  <button 
                    className="btn btn-primary" 
                    style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                    onClick={() => handleAddComment(post.id)}
                  >
                    <Send size={13} />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enlarged Photo Modal */}
      {zoomedImage && (
        <div className="modal-backdrop" onClick={() => setZoomedImage(null)}>
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomedImage(null)}
              style={{
                position: 'absolute',
                top: '-36px',
                right: '0',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#fff',
                padding: '6px',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
            <img
              src={zoomedImage}
              alt="Enlarged Exhibit"
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                borderRadius: '8px',
                boxShadow: '0 0 30px rgba(0,0,0,0.9)',
                border: '1px solid #444',
                display: 'block'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
