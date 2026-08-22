import React from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface State {
  error: Error | null;
}

export class ArchiveErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Archive render failure', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="archive-crash-screen" role="alert" aria-labelledby="archive-crash-title">
        <div className="archive-crash-card">
          <AlertTriangle size={34} aria-hidden="true" />
          <p className="investigation-kicker">ARCHIVE RENDER INTERRUPTED</p>
          <h1 id="archive-crash-title">This snapshot failed to reconstruct.</h1>
          <p>Your saved investigation is still intact. Reload the archive, or return to its front desk.</p>
          <div className="archive-crash-actions">
            <button className="btn btn-primary" type="button" onClick={() => window.location.reload()}>
              <RefreshCw size={16} /> Reload archive
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => window.location.assign('./')}>
              <Home size={16} /> Return to dashboard
            </button>
          </div>
          <details>
            <summary>Technical record</summary>
            <code>{this.state.error.message}</code>
          </details>
        </div>
      </main>
    );
  }
}
