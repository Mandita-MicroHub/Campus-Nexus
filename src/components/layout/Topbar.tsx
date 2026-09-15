import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, MessageSquare, ChevronDown, Sparkles, X, BookOpen, ShoppingBag, Calendar, CheckCircle2, Sun, Moon } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { useApp } from "../../context/AppContext";

export const Topbar = () => {
  const { profile, marketplace, resources, events, theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Search Results
  const matchingMarketplace = searchQuery.trim()
    ? marketplace.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.category.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
    : [];

  const matchingResources = searchQuery.trim()
    ? resources.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.subject.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
    : [];

  const matchingEvents = searchQuery.trim()
    ? events.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2)
    : [];

  const hasResults = matchingMarketplace.length > 0 || matchingResources.length > 0 || matchingEvents.length > 0;

  return (
    <>
      {/* Top News Ticker */}
      <div className="top-ticker">
        <div className="ticker-track">
          <span>🔥 <span className="ticker-highlight">Campus Nexus Sprint:</span> Annual Hackathon registrations close this Friday!</span>
          <span>⚡ <span className="ticker-highlight">{profile.name}</span> currently holds a {profile.streak}-day coding streak!</span>
          <span>📚 <span className="ticker-highlight">Resource Alert:</span> DBMS Unit 4 notes uploaded by Peer Top Contributors.</span>
          <span>💼 <span className="ticker-highlight">Placement Drive:</span> Google Summer SWE Intern applications live.</span>
          <span>🚲 <span className="ticker-highlight">Marketplace:</span> 3 new student listings verified on campus.</span>
        </div>
      </div>

      <header className="topbar">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="font-display font-bold text-white bg-forest rounded-xl flex items-center justify-center shadow-sm" style={{ width: '2.25rem', height: '2.25rem' }}>
            CN
          </div>
          <div>
            <div className="font-display font-bold text-charcoal" style={{ fontSize: '1.2rem', lineHeight: '1.2' }}>Campus Nexus</div>
            <div className="text-charcoal-muted" style={{ fontSize: '0.6875rem', letterSpacing: '0.04em' }}>KIIT CHAPTER</div>
          </div>
        </Link>

        {/* Global Search */}
        <div className="flex-1" style={{ maxWidth: '34rem', padding: '0 1.5rem', position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', width: '1.125rem', height: '1.125rem', color: 'var(--charcoal-muted)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              placeholder="Search campus notes, marketplace, events, hackathons..."
              style={{
                width: '100%',
                height: '2.625rem',
                paddingLeft: '2.75rem',
                paddingRight: searchQuery ? '2.5rem' : '1rem',
                backgroundColor: 'var(--paper)',
                borderRadius: '9999px',
                border: '1px solid var(--charcoal-border)',
                outline: 'none',
                fontSize: '0.875rem'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); setShowSearchDropdown(false); }}
                style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--charcoal-muted)' }}
              >
                <X style={{ width: '1rem', height: '1rem' }} />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {showSearchDropdown && searchQuery.trim().length > 0 && (
            <div
              className="card"
              style={{
                position: 'absolute',
                top: '3.25rem',
                left: '1.5rem',
                right: '1.5rem',
                zIndex: 60,
                maxHeight: '380px',
                overflowY: 'auto',
                padding: '1rem',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              {!hasResults ? (
                <div className="text-center text-charcoal-muted" style={{ padding: '1rem' }}>
                  No campus results found for "{searchQuery}". Try searching for "DBMS", "Calculator", or "Hackathon".
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {matchingResources.length > 0 && (
                    <div>
                      <div className="text-charcoal-muted font-bold" style={{ fontSize: '0.6875rem', textTransform: 'uppercase', marginBottom: '0.375rem' }}>Resource Hub</div>
                      {matchingResources.map(r => (
                        <div
                          key={r.id}
                          onClick={() => { navigate('/resources'); setShowSearchDropdown(false); }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-paper cursor-pointer"
                          style={{ padding: '0.5rem', borderRadius: '0.5rem' }}
                        >
                          <div className="flex items-center gap-2">
                            <BookOpen style={{ width: '1rem', height: '1rem', color: 'var(--forest-light)' }} />
                            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{r.title}</span>
                          </div>
                          <Badge className="badge-gray">Sem {r.semester}</Badge>
                        </div>
                      ))}
                    </div>
                  )}

                  {matchingMarketplace.length > 0 && (
                    <div>
                      <div className="text-charcoal-muted font-bold" style={{ fontSize: '0.6875rem', textTransform: 'uppercase', marginBottom: '0.375rem' }}>Marketplace</div>
                      {matchingMarketplace.map(m => (
                        <div
                          key={m.id}
                          onClick={() => { navigate('/marketplace'); setShowSearchDropdown(false); }}
                          className="flex items-center justify-between hover:bg-paper cursor-pointer"
                          style={{ padding: '0.5rem', borderRadius: '0.5rem' }}
                        >
                          <div className="flex items-center gap-2">
                            <ShoppingBag style={{ width: '1rem', height: '1rem', color: 'var(--gold-dark)' }} />
                            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{m.title}</span>
                          </div>
                          <span className="font-semibold text-forest" style={{ fontSize: '0.875rem' }}>₹{m.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {matchingEvents.length > 0 && (
                    <div>
                      <div className="text-charcoal-muted font-bold" style={{ fontSize: '0.6875rem', textTransform: 'uppercase', marginBottom: '0.375rem' }}>Campus Events</div>
                      {matchingEvents.map(e => (
                        <div
                          key={e.id}
                          onClick={() => { navigate('/events'); setShowSearchDropdown(false); }}
                          className="flex items-center justify-between hover:bg-paper cursor-pointer"
                          style={{ padding: '0.5rem', borderRadius: '0.5rem' }}
                        >
                          <div className="flex items-center gap-2">
                            <Calendar style={{ width: '1rem', height: '1rem', color: 'var(--coral)' }} />
                            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{e.title}</span>
                          </div>
                          <Badge className="badge-gold">{e.date}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Navigation & Profile */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-full hover:bg-paper border transition"
            style={{ width: '2.25rem', height: '2.25rem', border: '1px solid var(--charcoal-border)' }}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun style={{ width: '1.125rem', height: '1.125rem', color: 'var(--gold)' }} />
            ) : (
              <Moon style={{ width: '1.125rem', height: '1.125rem', color: 'var(--charcoal)' }} />
            )}
          </button>

          {/* Points Chip */}
          <Link to="/achievements" className="flex items-center gap-2 bg-gold-tint border rounded-full px-3 py-1 text-gold-dark font-semibold" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8125rem', border: '1px solid rgba(232,163,61,0.3)' }}>
            <Sparkles style={{ width: '0.9rem', height: '0.9rem' }} />
            <span>{profile.points.toLocaleString()} pts</span>
          </Link>

          {/* Notifications Button */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => { setShowNotifications(!showNotifications); setShowMessages(false); }}
              className="flex items-center justify-center rounded-full hover:bg-paper"
              style={{ width: '2.5rem', height: '2.5rem', position: 'relative' }}
              title="Notifications"
            >
              <Bell style={{ width: '1.25rem', height: '1.25rem', color: 'var(--charcoal)' }} />
              <span style={{ position: 'absolute', top: '0.45rem', right: '0.45rem', width: '0.5rem', height: '0.5rem', backgroundColor: 'var(--coral)', borderRadius: '50%' }}></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '3rem',
                  width: '320px',
                  zIndex: 80,
                  padding: '1rem',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <div className="flex justify-between items-center" style={{ marginBottom: '0.75rem' }}>
                  <h4 className="font-semibold text-charcoal" style={{ fontSize: '0.9375rem' }}>Campus Notifications</h4>
                  <Badge className="badge-gold">3 new</Badge>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="p-2 rounded bg-paper" style={{ padding: '0.625rem', borderRadius: '0.5rem' }}>
                    <p className="text-charcoal font-medium" style={{ fontSize: '0.8125rem' }}>🔥 Coding Streak Active</p>
                    <p className="text-charcoal-muted" style={{ fontSize: '0.75rem' }}>Solve today's linked list problem to reach day 15!</p>
                  </div>
                  <div className="p-2 rounded bg-paper" style={{ padding: '0.625rem', borderRadius: '0.5rem' }}>
                    <p className="text-charcoal font-medium" style={{ fontSize: '0.8125rem' }}>📚 Notes Download</p>
                    <p className="text-charcoal-muted" style={{ fontSize: '0.75rem' }}>Your DBMS Unit 3 notes reached 140+ student downloads.</p>
                  </div>
                  <div className="p-2 rounded bg-paper" style={{ padding: '0.625rem', borderRadius: '0.5rem' }}>
                    <p className="text-charcoal font-medium" style={{ fontSize: '0.8125rem' }}>🤝 Team Finder</p>
                    <p className="text-charcoal-muted" style={{ fontSize: '0.75rem' }}>Aryan Sengupta applied to join your Smart India Hackathon team.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Direct Messages Button */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => { setShowMessages(!showMessages); setShowNotifications(false); }}
              className="flex items-center justify-center rounded-full hover:bg-paper"
              style={{ width: '2.5rem', height: '2.5rem' }}
              title="Campus Messages"
            >
              <MessageSquare style={{ width: '1.25rem', height: '1.25rem', color: 'var(--charcoal)' }} />
            </button>

            {/* Messages Dropdown */}
            {showMessages && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '3rem',
                  width: '320px',
                  zIndex: 80,
                  padding: '1rem',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <div className="flex justify-between items-center" style={{ marginBottom: '0.75rem' }}>
                  <h4 className="font-semibold text-charcoal" style={{ fontSize: '0.9375rem' }}>Campus Messages</h4>
                  <Link to="/community" onClick={() => setShowMessages(false)} className="text-forest text-xs font-semibold hover:underline" style={{ fontSize: '0.75rem' }}>Community</Link>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 p-2 hover:bg-paper rounded-lg cursor-pointer" style={{ padding: '0.5rem', borderRadius: '0.5rem' }}>
                    <Avatar initials="RV" style={{ width: '2rem', height: '2rem', fontSize: '0.75rem' }} />
                    <div className="flex-1">
                      <p className="font-semibold text-charcoal" style={{ fontSize: '0.8125rem' }}>Rohan Verma (Calculator)</p>
                      <p className="text-charcoal-muted" style={{ fontSize: '0.75rem' }}>Available to meet at central library table.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-paper rounded-lg cursor-pointer" style={{ padding: '0.5rem', borderRadius: '0.5rem' }}>
                    <Avatar initials="AS" style={{ width: '2rem', height: '2rem', fontSize: '0.75rem' }} />
                    <div className="flex-1">
                      <p className="font-semibold text-charcoal" style={{ fontSize: '0.8125rem' }}>Aryan Sengupta</p>
                      <p className="text-charcoal-muted" style={{ fontSize: '0.75rem' }}>Sent GitHub profile for SIH ML role.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill Menu */}
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 border rounded-full hover:bg-paper cursor-pointer"
              style={{ padding: '0.25rem 0.75rem 0.25rem 0.35rem', border: '1px solid var(--charcoal-border)' }}
            >
              <Avatar initials={profile.avatar} style={{ width: '2rem', height: '2rem', fontSize: '0.8125rem' }} />
              <div className="flex items-center gap-1">
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{profile.name.split(' ')[0]}</span>
                <ChevronDown style={{ width: '0.875rem', height: '0.875rem', color: 'var(--charcoal-muted)' }} />
              </div>
            </div>

            {/* Profile Menu Dropdown */}
            {showProfileMenu && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '3.25rem',
                  width: '260px',
                  zIndex: 80,
                  padding: '1rem',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <div className="flex items-center gap-3" style={{ marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--charcoal-border)' }}>
                  <Avatar initials={profile.avatar} style={{ width: '2.5rem', height: '2.5rem' }} />
                  <div>
                    <h4 className="font-semibold text-charcoal" style={{ fontSize: '0.9375rem' }}>{profile.name}</h4>
                    <p className="text-charcoal-muted" style={{ fontSize: '0.75rem' }}>{profile.dept}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Link
                    to="/portfolio"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center justify-between p-2 rounded hover:bg-paper text-charcoal text-sm"
                    style={{ padding: '0.5rem', borderRadius: '0.375rem', fontSize: '0.875rem' }}
                  >
                    <span>Developer Portfolio</span>
                    <CheckCircle2 style={{ width: '1rem', height: '1rem', color: 'var(--forest-light)' }} />
                  </Link>
                  <Link
                    to="/achievements"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center justify-between p-2 rounded hover:bg-paper text-charcoal text-sm"
                    style={{ padding: '0.5rem', borderRadius: '0.375rem', fontSize: '0.875rem' }}
                  >
                    <span>Badges & Reputation</span>
                    <Badge className="badge-gold">{profile.points} pts</Badge>
                  </Link>
                  <Link
                    to="/skills"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center justify-between p-2 rounded hover:bg-paper text-charcoal text-sm"
                    style={{ padding: '0.5rem', borderRadius: '0.375rem', fontSize: '0.875rem' }}
                  >
                    <span>Skills Matrix</span>
                    <span className="text-charcoal-muted" style={{ fontSize: '0.75rem' }}>{profile.skills.length} skills</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
