import { useState } from "react";
import { 
  HelpCircle, Plus, Search, MapPin, Phone, 
  CheckCircle, X 
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Avatar } from "../components/ui/Avatar";
import { useApp } from "../context/AppContext";

export const LostFound = () => {
  const { profile, lostFound, addLostFoundItem, markLostFoundResolved } = useApp();

  const [filterType, setFilterType] = useState<"all" | "Lost" | "Found" | "resolved">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [formType, setFormType] = useState<"Lost" | "Found">("Lost");
  const [formTitle, setFormTitle] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formContact, setFormContact] = useState("");

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    addLostFoundItem({
      type: formType,
      title: formTitle.trim(),
      location: formLocation.trim() || "Campus Grounds",
      contact: formContact.trim() || "campus.student@kiit.ac.in"
    });

    setFormTitle("");
    setFormLocation("");
    setFormContact("");
    setShowAddModal(false);
  };

  const filteredItems = lostFound.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery.trim() ||
      item.title.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q);

    if (filterType === "resolved") return matchesSearch && item.resolved;
    if (filterType === "Lost" || filterType === "Found") return matchesSearch && item.type === filterType && !item.resolved;
    return matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="page-head" style={{ marginBottom: 0 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
            <Badge className="badge-gold">Campus Lost & Found Desk</Badge>
            <span className="text-charcoal-muted" style={{ fontSize: '0.8125rem' }}>• Central University Registry</span>
          </div>
          <h1>Lost & Found</h1>
          <p>Misplaced your ID card, charger, earbuds, or keys? Post a notice to recover your items quickly.</p>
        </div>

        <Button onClick={() => setShowAddModal(true)} className="gap-2 self-start md:self-auto">
          <Plus style={{ width: '1.125rem', height: '1.125rem' }} />
          Post Item Notice
        </Button>
      </div>

      {/* Filter Tabs & Search */}
      <Card style={{ padding: '1rem' }}>
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
            {[
              { label: "All Notices", value: "all" },
              { label: "Lost Items", value: "Lost" },
              { label: "Found Items", value: "Found" },
              { label: "Resolved", value: "resolved" }
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setFilterType(tab.value as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  filterType === tab.value ? 'bg-forest text-white' : 'bg-paper text-charcoal hover:bg-forest-tint'
                }`}
                style={{ padding: '0.375rem 0.875rem', borderRadius: '9999px', fontSize: '0.8125rem' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72 relative" style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: 'var(--charcoal-muted)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items, locations..."
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
        </div>
      </Card>

      {/* Item Notices Grid */}
      {filteredItems.length === 0 ? (
        <div className="empty-state">
          <HelpCircle style={{ width: '3rem', height: '3rem', margin: '0 auto 0.75rem', color: 'var(--charcoal-muted)' }} />
          <h3>No lost or found items in this category</h3>
          <p>Everything appears to be in its right place on campus!</p>
          <Button onClick={() => setShowAddModal(true)} style={{ marginTop: '1rem' }}>
            Post a Notice
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => {
            const isOwner = item.author === profile.name;

            return (
              <Card key={item.id} className="flex flex-col justify-between hover:border-forest transition">
                <div>
                  <div className="flex justify-between items-start" style={{ marginBottom: '0.75rem' }}>
                    <Badge className={item.type === "Lost" ? "badge-coral" : "badge-gold"}>
                      {item.type} Item
                    </Badge>

                    {item.resolved && (
                      <Badge className="badge-gray text-forest font-semibold">
                        <CheckCircle style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />
                        Resolved
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-charcoal-muted mb-2" style={{ marginBottom: '0.5rem' }}>
                    <MapPin style={{ width: '0.875rem', height: '0.875rem', color: 'var(--coral)' }} />
                    <span>Location: <b>{item.location}</b></span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-charcoal-muted mb-3" style={{ marginBottom: '0.75rem' }}>
                    <Phone style={{ width: '0.875rem', height: '0.875rem', color: 'var(--forest-light)' }} />
                    <span>Contact: <b>{item.contact}</b></span>
                  </div>
                </div>

                <div className="border-t pt-3 mt-3 flex items-center justify-between gap-3 text-xs text-charcoal-muted" style={{ borderTop: '1px solid var(--charcoal-border)', marginTop: '0.75rem', paddingTop: '0.75rem' }}>
                  <div className="flex items-center gap-1.5">
                    <Avatar initials={item.author.split(' ').map(n=>n[0]).slice(0,2).join('')} style={{ width: '1.25rem', height: '1.25rem', fontSize: '0.625rem' }} />
                    <span>By {item.author} {isOwner && "(You)"}</span>
                  </div>

                  {isOwner && !item.resolved ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => markLostFoundResolved(item.id)}
                    >
                      Mark Resolved
                    </Button>
                  ) : item.resolved ? (
                    <span className="text-forest font-semibold">Returned ✓</span>
                  ) : null}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add Lost/Found Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
              <h2 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.375rem' }}>
                Post Lost or Found Notice
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-charcoal-muted hover:text-charcoal">
                <X style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>

            <form onSubmit={handleCreateNotice} className="flex flex-col gap-4">
              <div className="form-grid">
                <div>
                  <label>Notice Type *</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                  >
                    <option value="Lost">I Lost Something</option>
                    <option value="Found">I Found Something</option>
                  </select>
                </div>
                <div>
                  <label>Item Name *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Blue Titan Smartwatch"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Location (Where was it lost/found?) *</label>
                <input
                  type="text"
                  required
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  placeholder="e.g. Central Library 2nd Floor, Table 14"
                />
              </div>

              <div className="form-group">
                <label>Contact Details (WhatsApp, Email, or Desk) *</label>
                <input
                  type="text"
                  required
                  value={formContact}
                  onChange={(e) => setFormContact(e.target.value)}
                  placeholder="e.g. 9876543210 or Library Reception"
                />
              </div>

              <div className="flex justify-end gap-3" style={{ marginTop: '0.5rem' }}>
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="default">
                  Publish Notice
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
