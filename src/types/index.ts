export type ClearanceLevel = 'VISITOR' | 'CONTRIBUTOR' | 'RESEARCHER' | 'ARCHIVIST' | 'LEVEL_NULL' | 'LEVEL_OMEGA';

export const TOTAL_ANOMALIES_COUNT = 42;

export type NetworkStatus = 
  | 'INTERNET' 
  | 'FIRST INTERNET' 
  | 'FIRST INTERNET / LOCAL' 
  | 'OUTSIDE' 
  | 'HOME';

export interface ForensicMetadata {
  objectId: string;
  collection: string;
  type: string;
  author: string;
  observedDate: string;
  archiveConfidence: number; // 0-100%
  integrity: 'Complete' | 'Partial' | 'Recovered' | 'Damaged' | 'Conflicting' | 'Unverified' | 'Impossible';
  knownCopies: number;
  relatedObjects: number;
  anomaliesCount: number;
  anomaliesDescription?: string;
  rawSourceSnippet?: string;
}

export interface CharacterIdentity {
  id: string;
  canonicalName: string;
  tier: 1 | 2 | 3;
  aliases: {
    platform: string;
    handle: string;
    era: string;
  }[];
  firstSeen: string;
  lastSeen: string;
  biography: string;
  status: 'Active' | 'Disappeared' | 'Deceased' | 'Contradictory' | 'Impossible';
  contradictions: string[];
  anomalousEvidenceIds: string[];
  avatarUrl?: string;
}

export interface ForumPost {
  id: string;
  authorHandle: string;
  authorTitle?: string;
  authorAvatar?: string;
  authorJoinDate?: string;
  authorPostCount?: number;
  timestamp: string;
  content: string;
  isDeleted?: boolean;
  restoredContent?: string;
  isAnomalous?: boolean;
  anomalyNote?: string;
  quote?: {
    author: string;
    text: string;
  };
}

export interface ForumThread {
  id: string;
  siteId: string;
  title: string;
  category: string;
  createdDate: string;
  authorHandle: string;
  replyCount: number;
  viewCount: number;
  isLocked?: boolean;
  isPinned?: boolean;
  isAnomalous?: boolean;
  posts: ForumPost[];
}

export interface BlogPost {
  id: string;
  authorHandle: string;
  authorName: string;
  date: string;
  year: number;
  title: string;
  mood?: string;
  music?: string;
  content: string;
  imageUrl?: string;
  imageCaption?: string;
  comments: {
    id: string;
    author: string;
    date: string;
    content: string;
    isAnomalous?: boolean;
  }[];
  isImpossibleDate?: boolean;
}

export interface FoundationArticle {
  id: string;
  title: string;
  category: 'Blog' | 'Research' | 'Announcement' | 'Exhibit' | 'Restricted';
  author: string;
  date: string;
  summary: string;
  content: string;
  imageUrl?: string;
  imageCaption?: string;
  requiredClearance?: ClearanceLevel;
  relatedArtifacts?: string[];
  isAnomalous?: boolean;
}

export interface TracePost {
  id: string;
  author: string;
  tag: 'DISCOVERY' | 'QUESTION' | 'TECHNICAL' | 'DEBUNKED' | 'ARCHIVE FIND' | 'SPECULATION' | 'FOUNDATION RESPONSE' | 'ANOMALOUS';
  timestamp: string;
  upvotes: number;
  title: string;
  content: string;
  imageUrl?: string;
  comments: {
    id: string;
    author: string;
    timestamp: string;
    content: string;
    upvotes: number;
    replies?: {
      id: string;
      author: string;
      timestamp: string;
      content: string;
      upvotes: number;
    }[];
  }[];
}

export interface EmailRecord {
  id: string;
  from: string;
  to: string;
  date: string;
  subject: string;
  body: string;
  threadId?: string;
  isCorrupted?: boolean;
  isAnomalous?: boolean;
  attachments?: string[];
}

export interface ChatMessage {
  time: string;
  nick: string;
  text: string;
  isSystem?: boolean;
  isAction?: boolean;
  isAnomalous?: boolean;
}

export interface ChatLog {
  id: string;
  channel: string;
  server: string;
  date: string;
  description: string;
  messages: ChatMessage[];
}

export interface PhysicalDoc {
  id: string;
  title: string;
  docType: 'PHOTO' | 'FAX' | 'POLICE_REPORT' | 'SERVER_MAINTENANCE' | 'MAGAZINE' | 'HANDWRITTEN_NOTE' | 'INVOICE' | 'TELEGRAPH_LOG';
  date: string;
  provenance: string;
  classification: string;
  content: string;
  imageUrl?: string;
  imageCaption?: string;
  handwrittenAnnotations?: string[];
  isAnomalous?: boolean;
}

export interface WhoisRecord {
  domain: string;
  registrar: string;
  creationDate: string;
  expirationDate: string;
  registrant: string;
  nameservers: string[];
  status: string;
  lastResolved: string;
  isAnomalous: boolean;
  notes?: string;
}

export interface RouteTraceStep {
  hop: number;
  ip: string;
  nodeName: string;
  location: string;
  latency: string;
  status: 'NORMAL' | 'ANOMALOUS' | 'IMPOSSIBLE';
  comment?: string;
}

export interface RouteRecord {
  domain: string;
  destinationIp: string;
  steps: RouteTraceStep[];
  isAnomalous: boolean;
  summary: string;
}

export interface TimelineEvent {
  id: string;
  year: number;
  dateStr: string;
  era: 'Pre-Web' | 'Early Web (1994-1999)' | 'Consolidation (2000-2005)' | 'Social Web (2006-2012)' | 'Modern Archive (2013-Present)' | 'Future Horizon';
  title: string;
  category: 'FOUNDATION' | 'INCIDENT' | 'HISTORICAL_SITE' | 'TECHNICAL' | 'PRE_INTERNET' | 'FUTURE';
  summary: string;
  details: string;
  imageUrl?: string;
  isAnomalous: boolean;
  relatedArtifactId?: string;
}

export interface CaseboardPin {
  id: string;
  type: 'PERSON' | 'SITE' | 'DOCUMENT' | 'INCIDENT' | 'TECH' | 'ANOMALY';
  title: string;
  preview: string;
  targetView: string;
  targetId?: string;
  timestamp: string;
  connectedTo: string[]; // Pin IDs
  userNotes?: string;
}

export interface SearchResultItem {
  id: string;
  title: string;
  type: 'WEB_PAGE' | 'PERSON' | 'POST' | 'DOMAIN' | 'DOCUMENT' | 'EMAIL' | 'CHAT' | 'TECH_RECORD' | 'RESTRICTED';
  collection: string;
  date: string;
  snippet: string;
  targetView: string;
  targetId?: string;
  isAnomalous?: boolean;
  requiredClearance?: ClearanceLevel;
}

export interface CommunityMember {
  id: string;
  handle: string;
  displayName: string;
  category: 'INVESTIGATOR' | 'SKEPTIC' | 'FOUNDATION' | 'HISTORICAL' | 'ANOMALOUS';
  role: string;
  reputation: number;
  joinDate: string;
  status: 'ONLINE' | 'RESEARCHING' | 'OFFLINE' | 'UNRECOGNIZED_NETWORK' | 'AUTOMATED';
  statusText: string;
  badges: {
    label: string;
    color: 'blue' | 'amber' | 'red' | 'green' | 'gray';
  }[];
  avatarUrl?: string;
  bio: string;
  notableFindings: string[];
}

export interface PalisadeProfile {
  id: string;
  handle: string;
  name: string;
  headline: string;
  location: string;
  joinDate: string;
  relationshipStatus: string;
  avatarUrl: string;
  friendsCount: number;
  wallPosts: {
    id: string;
    author: string;
    authorAvatar: string;
    date: string;
    content: string;
    isAnomalous?: boolean;
  }[];
  recentStatus: string;
  statusDate: string;
  isAnomalous?: boolean;
}

