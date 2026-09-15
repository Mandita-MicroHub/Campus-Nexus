import type { ReactNode } from "react";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import { useApp } from "../../context/AppContext";
import { Sparkles, CheckCircle, Info, X } from "lucide-react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="app-container">
      <Topbar />
      <div className="app-content">
        <Sidebar />
        <main className="app-main">
          <div className="app-main-inner">
            {children}
          </div>
        </main>
      </div>

      {/* Floating Toast Notification Stack */}
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map((toast) => (
            <div key={toast.id} className="toast-card">
              {toast.type === "points" ? (
                <div className="toast-points-badge">
                  <Sparkles style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.25rem' }} />
                  +{toast.points}
                </div>
              ) : toast.type === "success" ? (
                <CheckCircle style={{ width: '1.5rem', height: '1.5rem', color: 'var(--forest-light)', flexShrink: 0 }} />
              ) : (
                <Info style={{ width: '1.5rem', height: '1.5rem', color: 'var(--gold-dark)', flexShrink: 0 }} />
              )}

              <div className="flex-1">
                <h5 className="font-semibold text-charcoal" style={{ fontSize: '0.875rem' }}>{toast.title}</h5>
                <p className="text-charcoal-muted" style={{ fontSize: '0.75rem' }}>{toast.message}</p>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-charcoal-muted hover:text-charcoal"
                style={{ padding: '0.25rem' }}
              >
                <X style={{ width: '1rem', height: '1rem' }} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
