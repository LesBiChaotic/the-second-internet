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
import { TracePost } from '../../types';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';
import { UserAvatar } from '../common/UserAvatar';

interface Props {
  store: ArchiveState;
}

export const TraceCommunityView: React.FC<Props> = ({ store }) => {
  const { currentSubId, pinToCaseboard, discoverAnomaly } = store;
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [posts, setPosts] = useState<TracePost[]>(tracePosts);
  const [newCommentText, setNewCommentText] = useState<{ [key: string]: string }>({});
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [uncensoredSections, setUncensoredSections] = useState<{ [key: string]: boolean }>({});
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [hasCommentedBefore, setHasCommentedBefore] = useState<boolean>(false);

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

    // Trigger the 3 Live Typing Responses in sequence
    // Step 1: @patchnotes typing...
    setTimeout(() => {
      setTypingUser('@patchnotes');
      soundEngine.playClick(600);
    }, 1200);

    // Step 1 Finish: @patchnotes posts
    setTimeout(() => {
      setTypingUser(null);
      soundEngine.playClick(750);
      setPosts(prev => prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [
              ...p.comments,
              {
                id: `comm-live-patchnotes-${Date.now()}`,
                author: 'patchnotes',
                timestamp: 'Just now',
                upvotes: 4,
                content: `Wait @you, are you trying to revive the 2003 routing claim? We literally audited the BGP packet checksums three months ago. Unless you have uncompressed frame dumps from Milwaukee, that discrepancy is standard clock skew.`
              }
            ]
          };
        }
        return p;
      }));

      // Step 2: @analogghost typing...
      setTimeout(() => {
        setTypingUser('@analogghost');
        soundEngine.playClick(600);
      }, 1400);

      // Step 2 Finish: @analogghost posts
      setTimeout(() => {
        setTypingUser(null);
        soundEngine.playClick(850);
        setPosts(prev => prev.map(p => {
          if (p.id === postId) {
            return {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: `comm-live-analogghost-${Date.now()}`,
                  author: 'analogghost',
                  timestamp: 'Just now',
                  upvotes: 7,
                  content: `@patchnotes It's NOT just clock skew! Look at the physical tape I scanned in Exhibit GL-98. The surface temperature dropped 46 degrees while the router was accepting packets. Clock skew doesn't create frost on circuit boards.`
                }
              ]
            };
          }
          return p;
        }));

        // Step 3: @wintermute_42 typing... (The Eerie Live Drop)
        setTimeout(() => {
          setTypingUser('@wintermute_42');
          soundEngine.playDialupChirp();
        }, 1800);

        // Step 3 Finish: @wintermute_42 drops anomalous response
        setTimeout(() => {
          setTypingUser(null);
          soundEngine.playDialupChirp();
          discoverAnomaly('wintermute-live-reply');
          setPosts(prev => prev.map(p => {
            if (p.id === postId) {
              return {
                ...p,
                comments: [
                  ...p.comments,
                  {
                    id: `comm-live-wintermute-${Date.now()}`,
                    author: 'wintermute_42',
                    timestamp: 'Just now',
                    upvotes: 19,
                    content: `You just transmitted another packet across the second bus. We noticed you typing. The aperture has been open since 1877. Don't look behind the monitor.`
                  }
                ]
              };
            }
            return p;
          }));
        }, 4200);

      }, 3500);

    }, 2800);
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
    <div className="trace-container">
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
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
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

      {/* Posts Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredPosts.map((post) => {
          const hasCensored = post.content.includes('[CENSORED_SECTION_START]');
          const isUncensored = uncensoredSections[post.id];

          return (
            <div key={post.id} className="trace-post-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="trace-post-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                    style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }}
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
