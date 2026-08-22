import React, { useRef, useState } from 'react';
import { useArchiveStore } from './state/useArchiveStore';
import { FoundationHeader } from './components/common/FoundationHeader';
import { FoundationSidebar } from './components/common/FoundationSidebar';
import { ForensicAnalyzerDrawer } from './components/common/ForensicAnalyzerDrawer';
import { SourceViewerModal } from './components/common/SourceViewerModal';
import { LoginGateModal } from './components/common/LoginGateModal';
import { PhoneDialerModal } from './components/common/PhoneDialerModal';
import { GuestbookSignModal } from './components/interactive/GuestbookSignModal';
import { FieldGuideWarningModal } from './components/common/FieldGuideWarningModal';
import { NotificationViewport } from './components/common/NotificationViewport';
import { ArchiveSettingsModal } from './components/common/ArchiveSettingsModal';

// Foundation Views
import { FoundationDashboard } from './components/foundation/FoundationDashboard';
import { SubstrateErrorView } from './components/common/SubstrateErrorView';
import { soundEngine } from './state/useAudioEngine';
import { AccessGate } from './components/common/AccessGate';
import { canAccessView } from './state/accessControl';

const lazyNamed = (loader: () => Promise<Record<string, unknown>>, exportName: string) =>
  React.lazy(async () => ({ default: (await loader())[exportName] as React.ComponentType<any> }));

const OmniboxSearchModal = lazyNamed(() => import('./components/common/OmniboxSearch'), 'OmniboxSearchModal');
const CollectionsView = lazyNamed(() => import('./components/foundation/CollectionsView'), 'CollectionsView');
const PeopleView = lazyNamed(() => import('./components/foundation/PeopleView'), 'PeopleView');
const CommunityView = lazyNamed(() => import('./components/foundation/CommunityView'), 'CommunityView');
const TimelineView = lazyNamed(() => import('./components/foundation/TimelineView'), 'TimelineView');
const ResearchPapersView = lazyNamed(() => import('./components/foundation/ResearchPapersView'), 'ResearchPapersView');
const CaseboardView = lazyNamed(() => import('./components/foundation/CaseboardView'), 'CaseboardView');
const NetworkGraphView = lazyNamed(() => import('./components/foundation/NetworkGraphView'), 'NetworkGraphView');
const WhoisLookupView = lazyNamed(() => import('./components/foundation/WhoisLookupView'), 'WhoisLookupView');
const RouteVisualizerView = lazyNamed(() => import('./components/foundation/RouteVisualizerView'), 'RouteVisualizerView');
const EmailArchiveView = lazyNamed(() => import('./components/foundation/EmailArchiveView'), 'EmailArchiveView');
const ChatArchiveView = lazyNamed(() => import('./components/foundation/ChatArchiveView'), 'ChatArchiveView');
const PhysicalDocsView = lazyNamed(() => import('./components/foundation/PhysicalDocsView'), 'PhysicalDocsView');
const StaffRosterView = lazyNamed(() => import('./components/foundation/StaffRosterView'), 'StaffRosterView');
const RestrictedVaultView = lazyNamed(() => import('./components/foundation/RestrictedVaultView'), 'RestrictedVaultView');
const LostWebQuizView = lazyNamed(() => import('./components/interactive/LostWebQuizView'), 'LostWebQuizView');
const FieldGuideView = lazyNamed(() => import('./components/foundation/FieldGuideView'), 'FieldGuideView');
const FieldNotebookView = lazyNamed(() => import('./components/interactive/FieldNotebookView'), 'FieldNotebookView');
const StationNullRadioTool = lazyNamed(() => import('./components/tools/StationNullRadioTool'), 'StationNullRadioTool');
const ApertureTerminalView = lazyNamed(() => import('./components/tools/ApertureTerminalView'), 'ApertureTerminalView');
const Room4MonitorView = lazyNamed(() => import('./components/interactive/Room4MonitorView'), 'Room4MonitorView');
const DirectMessagesView = lazyNamed(() => import('./components/interactive/DirectMessagesView'), 'DirectMessagesView');
const CarrierTunerTool = lazyNamed(() => import('./components/tools/CarrierTunerTool'), 'CarrierTunerTool');
const PacketTerminalView = lazyNamed(() => import('./components/tools/PacketTerminalView'), 'PacketTerminalView');
const MarrowNetSite = lazyNamed(() => import('./components/historical/MarrowNetSite'), 'MarrowNetSite');
const AfterHoursSite = lazyNamed(() => import('./components/historical/AfterHoursSite'), 'AfterHoursSite');
const CandleRoomSite = lazyNamed(() => import('./components/historical/CandleRoomSite'), 'CandleRoomSite');
const GreylineIspSite = lazyNamed(() => import('./components/historical/GreylineIspSite'), 'GreylineIspSite');
const BlueWindowSite = lazyNamed(() => import('./components/historical/BlueWindowSite'), 'BlueWindowSite');
const PalisadeSocialSite = lazyNamed(() => import('./components/historical/PalisadeSocialSite'), 'PalisadeSocialSite');
const Terminal21Site = lazyNamed(() => import('./components/historical/Terminal21Site'), 'Terminal21Site');
const WebringHubSite = lazyNamed(() => import('./components/historical/WebringHubSite'), 'WebringHubSite');
const TraceCommunityView = lazyNamed(() => import('./components/trace/TraceCommunityView'), 'TraceCommunityView');
const SecondInternetHub = lazyNamed(() => import('./components/secondInternet/SecondInternetHub'), 'SecondInternetHub');

export function App() {
  const store = useArchiveStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [isCrtActive, setIsCrtActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const mainContentRef = useRef<HTMLElement>(null);

  React.useEffect(() => {
    const originalAlert = window.alert;
    window.alert = (message?: unknown) => store.notify(String(message ?? ''), 'info');
    return () => { window.alert = originalAlert; };
  }, [store.notify]);

  const handleToggleCrt = () => {
    soundEngine.playCrtDegauss();
    setIsCrtActive(!isCrtActive);
  };

  React.useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.view) {
        store.restoreState(e.state.view, e.state.subId, e.state.url);
      } else {
        // Fallback to DASHBOARD on initial state (if no state was pushed)
        store.restoreState('DASHBOARD', undefined, 'https://nethistoryfoundation.org/');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  React.useEffect(() => {
    document.title = `${store.currentView.replace(/_/g, ' ')} — Net History Foundation`;
    mainContentRef.current?.focus({ preventScroll: true });
  }, [store.currentView, store.currentSubId]);

  const renderCurrentView = () => {
    if (store.currentView !== 'RESTRICTED_VAULT' && !canAccessView(store.currentView, store.clearanceLevel)) {
      return <AccessGate store={store} view={store.currentView} />;
    }
    switch (store.currentView) {
      case 'DASHBOARD': return <FoundationDashboard store={store} />;
      case 'COLLECTIONS': return <CollectionsView store={store} />;
      case 'PEOPLE': return <PeopleView store={store} />;
      case 'COMMUNITY': return <CommunityView store={store} />;
      case 'QUIZ': return <LostWebQuizView store={store} />;
      case 'FIELD_GUIDE': return <FieldGuideView store={store} />;
      case 'TIMELINE': return <TimelineView store={store} />;
      case 'RESEARCH': return <ResearchPapersView store={store} />;
      case 'CASEBOARD': return <CaseboardView store={store} />;
      case 'NETWORK_GRAPH': return <NetworkGraphView store={store} />;
      case 'WHOIS': return <WhoisLookupView store={store} />;
      case 'ROUTE_TRACE': return <RouteVisualizerView store={store} />;
      case 'TUNER': return <CarrierTunerTool store={store} />;
      case 'PACKET_TERMINAL': return <PacketTerminalView store={store} />;
      case 'NOTEBOOK': return <FieldNotebookView store={store} />;
      case 'RADIO_SPECTROGRAPH': return <StationNullRadioTool store={store} />;
      case 'APERTURE_TERMINAL': return <ApertureTerminalView store={store} />;
      case 'ROOM4_MONITOR': return <Room4MonitorView store={store} />;
      case 'DMS':
      case 'DIRECT_MESSAGES': return <DirectMessagesView store={store} />;
      case 'EMAILS': return <EmailArchiveView store={store} />;
      case 'CHATS': return <ChatArchiveView store={store} />;
      case 'PHYSICAL_DOCS': return <PhysicalDocsView store={store} />;
      case 'STAFF': return <StaffRosterView store={store} />;
      case 'RESTRICTED_VAULT': return <RestrictedVaultView store={store} />;
      case 'TRACE': return <TraceCommunityView store={store} />;
      
      // Historical Sites
      case 'SITE_MARROW': return <MarrowNetSite store={store} />;
      case 'SITE_AFTERHOURS': return <AfterHoursSite store={store} />;
      case 'SITE_CANDLEROOM': return <CandleRoomSite store={store} />;
      case 'SITE_GREYLINE': return <GreylineIspSite store={store} />;
      case 'SITE_BLUEWINDOW': return <BlueWindowSite store={store} />;
      case 'SITE_PALISADE': return <PalisadeSocialSite store={store} />;
      case 'SITE_TERMINAL21': return <Terminal21Site store={store} />;
      case 'SITE_WEBRING': return <WebringHubSite store={store} />;
      
      // Second Internet Hub
      case 'SECOND_NET': return <SecondInternetHub store={store} />;
      
      default: return <SubstrateErrorView store={store} attemptedUrl={store.activeUrl} onReset={() => store.navigate('DASHBOARD')} />;
    }
  };

  const isHistoricalOrSecondNet = store.currentView.startsWith('SITE_') || store.currentView === 'SECOND_NET';

  return (
    <div className={`app-shell ${store.theme === 'light' ? 'theme-light' : 'theme-dark'} ${store.useDeviceFont ? 'use-device-font' : ''} ${isCrtActive ? 'crt-active' : ''}`}>
      <a className="skip-link" href="#archive-main">Skip to archive content</a>
      <div className="app-container">
        {/* Institutional Top Header */}
        {!isHistoricalOrSecondNet && (
          <FoundationHeader 
            store={store} 
            onOpenSearch={() => setSearchOpen(true)}
            isCrtActive={isCrtActive}
            onToggleCrt={handleToggleCrt}
            mobileMenuOpen={mobileMenuOpen}
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        )}

        {/* Main Layout Container */}
        <div className="main-layout">
          {!isHistoricalOrSecondNet && (
            <FoundationSidebar 
              store={store} 
              mobileOpen={mobileMenuOpen}
              onCloseMobile={() => setMobileMenuOpen(false)}
              isCrtActive={isCrtActive}
              onToggleCrt={handleToggleCrt}
              onOpenSettings={() => setSettingsOpen(true)}
            />
          )}
          
          <main id="archive-main" ref={mainContentRef} className="main-content-area" style={{ padding: isHistoricalOrSecondNet ? '0' : undefined }} tabIndex={-1}>
            <React.Suspense fallback={<div className="route-loading" role="status"><span /> Reconstructing archive snapshot…</div>}>
              {renderCurrentView()}
            </React.Suspense>
          </main>
        </div>

        {/* Institutional Terminal Login Gateway Modal */}
        <LoginGateModal store={store} />

        {/* Bell Exchange #47 DTMF Phone Dialer Modal */}
        <PhoneDialerModal store={store} />

        {/* Interactive Guestbook Signer Modal */}
        <GuestbookSignModal store={store} />

        {/* Field Guide & Spoilers Confirmation Warning Modal */}
        <FieldGuideWarningModal 
          store={store}
          isOpen={store.isFieldGuideWarningOpen}
          onClose={store.closeFieldGuideWarning}
          onConfirm={store.confirmOpenFieldGuide}
        />

        {/* Forensic Drawer */}
        <ForensicAnalyzerDrawer
          metadata={store.activeForensicDrawer}
          onClose={() => store.setForensicDrawer(null)}
          onPin={(meta) => {
            store.pinToCaseboard({
              type: 'ANOMALY',
              title: `Forensic Audit: ${meta.objectId}`,
              preview: meta.anomaliesDescription || `Observed on ${meta.observedDate} (Confidence: ${meta.archiveConfidence}%)`,
              targetView: store.currentView,
              targetId: store.currentSubId,
              connectedTo: []
            });
            alert(`Pinned Forensic Audit ${meta.objectId} to Caseboard.`);
          }}
        />

        {/* Source Viewer Modal */}
        <SourceViewerModal
          data={store.activeSourceModal}
          onClose={() => store.setSourceModal(null)}
        />

        {/* Omnibox Global Search Modal */}
        {searchOpen && (
          <React.Suspense fallback={<div className="modal-backdrop"><div className="route-loading" role="status"><span /> Indexing archive records…</div></div>}>
            <OmniboxSearchModal
              store={store}
              onClose={() => setSearchOpen(false)}
            />
          </React.Suspense>
        )}
        <ArchiveSettingsModal store={store} open={settingsOpen} onClose={() => setSettingsOpen(false)} />
        <NotificationViewport store={store} />
      </div>
    </div>
  );
}

export default App;
