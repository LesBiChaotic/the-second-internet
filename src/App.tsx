import React, { useState } from 'react';
import { useArchiveStore } from './state/useArchiveStore';
import { FoundationHeader } from './components/common/FoundationHeader';
import { FoundationSidebar } from './components/common/FoundationSidebar';
import { ForensicAnalyzerDrawer } from './components/common/ForensicAnalyzerDrawer';
import { SourceViewerModal } from './components/common/SourceViewerModal';
import { OmniboxSearchModal } from './components/common/OmniboxSearch';
import { LoginGateModal } from './components/common/LoginGateModal';
import { PhoneDialerModal } from './components/common/PhoneDialerModal';
import { GuestbookSignModal } from './components/interactive/GuestbookSignModal';
import { FieldGuideWarningModal } from './components/common/FieldGuideWarningModal';

// Foundation Views
import { FoundationDashboard } from './components/foundation/FoundationDashboard';
import { CollectionsView } from './components/foundation/CollectionsView';
import { PeopleView } from './components/foundation/PeopleView';
import { CommunityView } from './components/foundation/CommunityView';
import { TimelineView } from './components/foundation/TimelineView';
import { ResearchPapersView } from './components/foundation/ResearchPapersView';
import { CaseboardView } from './components/foundation/CaseboardView';
import { NetworkGraphView } from './components/foundation/NetworkGraphView';
import { WhoisLookupView } from './components/foundation/WhoisLookupView';
import { RouteVisualizerView } from './components/foundation/RouteVisualizerView';
import { EmailArchiveView } from './components/foundation/EmailArchiveView';
import { ChatArchiveView } from './components/foundation/ChatArchiveView';
import { PhysicalDocsView } from './components/foundation/PhysicalDocsView';
import { StaffRosterView } from './components/foundation/StaffRosterView';
import { RestrictedVaultView } from './components/foundation/RestrictedVaultView';

// Interactive Tools & Diagnostics
import { LostWebQuizView } from './components/interactive/LostWebQuizView';
import { FieldGuideView } from './components/foundation/FieldGuideView';
import { FieldNotebookView } from './components/interactive/FieldNotebookView';
import { StationNullRadioTool } from './components/tools/StationNullRadioTool';
import { ApertureTerminalView } from './components/tools/ApertureTerminalView';
import { Room4MonitorView } from './components/interactive/Room4MonitorView';
import { DirectMessagesView } from './components/interactive/DirectMessagesView';
import { CarrierTunerTool } from './components/tools/CarrierTunerTool';
import { PacketTerminalView } from './components/tools/PacketTerminalView';

// Reconstructed Historical Sites
import { MarrowNetSite } from './components/historical/MarrowNetSite';
import { AfterHoursSite } from './components/historical/AfterHoursSite';
import { CandleRoomSite } from './components/historical/CandleRoomSite';
import { GreylineIspSite } from './components/historical/GreylineIspSite';
import { BlueWindowSite } from './components/historical/BlueWindowSite';
import { PalisadeSocialSite } from './components/historical/PalisadeSocialSite';
import { Terminal21Site } from './components/historical/Terminal21Site';
import { WebringHubSite } from './components/historical/WebringHubSite';

// TRACE Community & Second Internet
import { TraceCommunityView } from './components/trace/TraceCommunityView';
import { SecondInternetHub } from './components/secondInternet/SecondInternetHub';
import { SubstrateErrorView } from './components/common/SubstrateErrorView';
import { soundEngine } from './state/useAudioEngine';

export function App() {
  const store = useArchiveStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [isCrtActive, setIsCrtActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleCrt = () => {
    soundEngine.playCrtDegauss();
    setIsCrtActive(!isCrtActive);
  };

  const renderCurrentView = () => {
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
            />
          )}
          
          <main className="main-content-area" style={{ padding: isHistoricalOrSecondNet ? '0' : undefined }}>
            {renderCurrentView()}
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
          <OmniboxSearchModal
            store={store}
            onClose={() => setSearchOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
