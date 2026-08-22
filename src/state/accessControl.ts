import { ClearanceLevel } from '../types';

export const CLEARANCE_RANK: Record<ClearanceLevel, number> = {
  VISITOR: 0,
  CONTRIBUTOR: 1,
  RESEARCHER: 2,
  ARCHIVIST: 3,
  LEVEL_NULL: 4,
  LEVEL_OMEGA: 5
};

export const VIEW_CLEARANCE: Record<string, ClearanceLevel> = {
  PACKET_TERMINAL: 'CONTRIBUTOR',
  DMS: 'CONTRIBUTOR',
  DIRECT_MESSAGES: 'CONTRIBUTOR',
  NOTEBOOK: 'RESEARCHER',
  RADIO_SPECTROGRAPH: 'RESEARCHER',
  EMAILS: 'RESEARCHER',
  CHATS: 'RESEARCHER',
  PHYSICAL_DOCS: 'RESEARCHER',
  APERTURE_TERMINAL: 'ARCHIVIST',
  ROOM4_MONITOR: 'ARCHIVIST',
  RESTRICTED_VAULT: 'ARCHIVIST'
};

export const requiredClearanceFor = (view: string) => VIEW_CLEARANCE[view];
export const canAccessView = (view: string, clearance: ClearanceLevel) => {
  const required = requiredClearanceFor(view);
  return !required || CLEARANCE_RANK[clearance] >= CLEARANCE_RANK[required];
};
