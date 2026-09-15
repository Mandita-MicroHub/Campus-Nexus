import { useState } from "react";
import { 
  Plus, Search, Building2, X 
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Avatar } from "../components/ui/Avatar";
import { useApp } from "../context/AppContext";

const POST_TYPES = [
  "All Updates",
  "Internship opening",
  "Placement drive",
  "Interview experience",
  "OA questions",
  "Prep tip"
];

export const PlacementHub = () => {
  const { placements, addPlacement } = useApp();

  const [selectedType, setSelectedType] = useState("All Updates");
  const [searchCompany, setSearchCompany] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [formType, setFormType] = useState<any>("Internship opening");
  const [formCompany, setFormCompany] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formSalary, setFormSalary] = useState("");
  const [formDetails, setFormDetails] = useState("");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCompany.trim()) return;

    addPlacement({
      type: formType,
      company: formCompany.trim(),
      role: formRole.trim() || "Software Engineer",
      salary: formSalary.trim() || "Competitive",
      details: formDetails.trim()
    });

    setFormCompany("");
    setFormRole("");
    setFormSalary("");
    setFormDetails("");
    setShowAddModal(false);
  };

  const filteredPlacements = placements.filter(item => {
    const matchesType = selectedType === "All Updates" || item.type === selectedType;
    const matchesCompany = !searchCompany.trim() || 
      item.company.toLowerCase().includes(searchCompany.toLowerCase()) ||
      item.role.toLowerCase().includes(searchCompany.toLowerCase()) ||
      item.details.toLowerCase().includes(searchCompany.toLowerCase());

    return matchesType && matchesCompany;
  });

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="page-head" style={{ marginBottom: 0 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
            <Badge className="badge-gold">Campus Placement Network</Badge>
            <span className="text-charcoal-muted" style={{ fontSize: '0.8125rem' }}>• On-Campus & Off-Campus Radar</span>
          </div>
          <h1>Placement & Internship Hub</h1>
          <p>Real interview debriefs, Online Assessment patterns, salary insights, and senior tips.</p>
        </div>

        <Button onClick={() => setShowAddModal(true)} className="gap-2 self-start md:self-auto">
          <Plus style={{ width: '1.125rem', height: '1.125rem' }} />
          Share Update (+6 pts)
        </Button>
      </div>

      {/* Filter Tabs & Search */}
      <Card style={{ padding: '1rem' }}>
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
            {POST_TYPES.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedType === type ? 'bg-forest text-white' : 'bg-paper text-charcoal hover:bg-forest-tint'
                }`}
                style={{ padding: '0.375rem 0.875rem', borderRadius: '9999px', fontSize: '0.8125rem' }}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72 relative" style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: 'var(--charcoal-muted)' }} />
            <input
              type="text"
              value={searchCompany}
              onChange={(e) => setSearchCompany(e.target.value)}
              placeholder="Filter by company (e.g. Google, Razorpay)..."
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
        </div>
      </Card>

      {/* Placement List */}
      {filteredPlacements.length === 0 ? (
        <div className="empty-state">
          <Building2 style={{ width: '3rem', height: '3rem', margin: '0 auto 0.75rem', color: 'var(--charcoal-muted)' }} />
          <h3>No placement records found</h3>
          <p>Be the first to share an interview experience or internship opening with your peers.</p>
          <Button onClick={() => setShowAddModal(true)} style={{ marginTop: '1rem' }}>
            Share First Placement Update
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPlacements.map(post => (
            <Card key={post.id} className="flex flex-col justify-between hover:border-forest transition">
              <div>
                <div className="flex justify-between items-start" style={{ marginBottom: '0.75rem' }}>
                  <Badge className={
                    post.type === "Internship opening" ? "badge-gold" :
                    post.type === "Interview experience" ? "badge-gray" : "badge-coral"
                  }>
                    {post.type}
                  </Badge>

                  {post.salary && (
                    <span className="font-display font-bold text-forest text-sm bg-forest-tint px-2.5 py-1 rounded-full" style={{ padding: '0.25rem 0.625rem', borderRadius: '9999px' }}>
                      {post.salary}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-1" style={{ marginBottom: '0.25rem' }}>
                  <Building2 style={{ width: '1.25rem', height: '1.25rem', color: 'var(--forest-light)' }} />
                  <h3 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.25rem' }}>
                    {post.company}
                  </h3>
                </div>

                <div className="text-sm font-medium text-charcoal" style={{ marginBottom: '0.75rem' }}>
                  Role: <span className="text-forest font-semibold">{post.role}</span>
                </div>

                <div className="p-3 bg-paper rounded-lg text-xs text-charcoal font-sans" style={{ padding: '0.75rem', borderRadius: '0.5rem', lineHeight: '1.5' }}>
                  {post.details}
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-3 mt-4 text-xs text-charcoal-muted" style={{ borderTop: '1px solid var(--charcoal-border)', marginTop: '1rem', paddingTop: '0.75rem' }}>
                <div className="flex items-center gap-2">
                  <Avatar initials={post.author.split(' ').map(n=>n[0]).slice(0,2).join('')} style={{ width: '1.25rem', height: '1.25rem', fontSize: '0.625rem' }} />
                  <span>Shared by <b>{post.author}</b></span>
                </div>
                <span>Verified Senior Post</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Share Update Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
              <h2 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.375rem' }}>
                Share Placement / Interview Update
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-charcoal-muted hover:text-charcoal">
                <X style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="flex flex-col gap-4">
              <div className="form-grid">
                <div>
                  <label>Update Type *</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                  >
                    {POST_TYPES.filter(t => t !== "All Updates").map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    placeholder="e.g. Google, Atlassian, Razorpay"
                  />
                </div>
              </div>

              <div className="form-grid">
                <div>
                  <label>Role</label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="e.g. SDE Intern, Backend Engineer"
                  />
                </div>
                <div>
                  <label>Stipend / Package (Optional)</label>
                  <input
                    type="text"
                    value={formSalary}
                    onChange={(e) => setFormSalary(e.target.value)}
                    placeholder="e.g. ₹45,000/mo or 24 LPA"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Interview Rounds & Experience Breakdown</label>
                <textarea
                  rows={4}
                  required
                  value={formDetails}
                  onChange={(e) => setFormDetails(e.target.value)}
                  placeholder="Describe OA questions asked, technical round topics, system design questions, and prep recommendations..."
                />
              </div>

              <div className="flex justify-end gap-3" style={{ marginTop: '0.5rem' }}>
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="default">
                  Publish Update (+6 pts)
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
