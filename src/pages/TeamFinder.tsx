import { useState } from "react";
import { 
  Users, Plus, Search, CheckCircle, 
  Send, X, UserCheck 
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Avatar } from "../components/ui/Avatar";
import { useApp } from "../context/AppContext";

export const TeamFinder = () => {
  const { profile, teams, addTeamPost, applyToTeam } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [formProject, setFormProject] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formDetails, setFormDetails] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formTechStack, setFormTechStack] = useState("");

  const handlePostTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProject.trim() || !formRole.trim()) return;

    addTeamPost({
      project: formProject.trim(),
      role: formRole.trim(),
      details: formDetails.trim(),
      contact: formContact.trim() || "campus.student@kiit.ac.in",
      techStack: formTechStack.split(",").map(t => t.trim()).filter(Boolean)
    });

    setFormProject("");
    setFormRole("");
    setFormDetails("");
    setFormContact("");
    setFormTechStack("");
    setShowAddModal(false);
  };

  const filteredTeams = teams.filter(item => {
    const q = searchQuery.toLowerCase();
    return !searchQuery.trim() ||
      item.project.toLowerCase().includes(q) ||
      item.role.toLowerCase().includes(q) ||
      item.details.toLowerCase().includes(q) ||
      (item.techStack && item.techStack.some(t => t.toLowerCase().includes(q)));
  });

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="page-head" style={{ marginBottom: 0 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
            <Badge className="badge-gold">Hackathon & Project Matchmaker</Badge>
            <span className="text-charcoal-muted" style={{ fontSize: '0.8125rem' }}>• Smart India Hackathon, SIH, Capstones</span>
          </div>
          <h1>Team Finder</h1>
          <p>Find co-builders, hackathon teammates, and designers for your next big campus project.</p>
        </div>

        <Button onClick={() => setShowAddModal(true)} className="gap-2 self-start md:self-auto">
          <Plus style={{ width: '1.125rem', height: '1.125rem' }} />
          Post Listing (+4 pts)
        </Button>
      </div>

      {/* Search Filter */}
      <Card style={{ padding: '1rem' }}>
        <div className="relative" style={{ position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: 'var(--charcoal-muted)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by hackathon, skill (e.g. PyTorch, React, Smart India Hackathon)..."
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
      </Card>

      {/* Team Listings */}
      {filteredTeams.length === 0 ? (
        <div className="empty-state">
          <Users style={{ width: '3rem', height: '3rem', margin: '0 auto 0.75rem', color: 'var(--charcoal-muted)' }} />
          <h3>No open team listings found</h3>
          <p>Post what skills you need for your project and let other students apply.</p>
          <Button onClick={() => setShowAddModal(true)} style={{ marginTop: '1rem' }}>
            Post a Team Requirement
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTeams.map(team => {
            const isOwner = team.author === profile.name;
            const hasApplied = team.applicants.includes(profile.name);

            return (
              <Card key={team.id} className="flex flex-col justify-between hover:border-forest transition">
                <div>
                  <div className="flex justify-between items-start" style={{ marginBottom: '0.75rem' }}>
                    <Badge className="badge-gold">
                      {team.applicants.length} Applicant{team.applicants.length !== 1 && 's'}
                    </Badge>

                    {hasApplied && (
                      <Badge className="badge-gray text-forest">
                        <CheckCircle style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />
                        Applied
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.25rem', marginBottom: '0.375rem' }}>
                    {team.project}
                  </h3>

                  <div className="text-sm font-semibold text-forest" style={{ marginBottom: '0.75rem' }}>
                    Looking for: <span className="text-charcoal font-medium">{team.role}</span>
                  </div>

                  <p className="text-charcoal-muted text-sm" style={{ fontSize: '0.8125rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                    {team.details}
                  </p>

                  {team.techStack && team.techStack.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap mb-3" style={{ marginBottom: '0.75rem' }}>
                      {team.techStack.map((tech, idx) => (
                        <span key={idx} className="bg-paper text-charcoal px-2 py-0.5 rounded text-xs font-mono" style={{ padding: '0.15rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.6875rem' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t pt-3 mt-3 flex items-center justify-between gap-3" style={{ borderTop: '1px solid var(--charcoal-border)', marginTop: '0.75rem', paddingTop: '0.75rem' }}>
                  <div className="flex items-center gap-2 text-xs text-charcoal-muted">
                    <Avatar initials={team.author.split(' ').map(n=>n[0]).slice(0,2).join('')} style={{ width: '1.5rem', height: '1.5rem', fontSize: '0.6875rem' }} />
                    <span>Lead: <b>{team.author}</b> {isOwner && "(You)"}</span>
                  </div>

                  {isOwner ? (
                    <Badge className="badge-gray">Your Listing</Badge>
                  ) : hasApplied ? (
                    <Button variant="outline" size="sm" disabled>
                      <UserCheck style={{ width: '0.875rem', height: '0.875rem' }} />
                      Application Sent
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => applyToTeam(team.id)}
                    >
                      <Send style={{ width: '0.875rem', height: '0.875rem' }} />
                      Apply to Join
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Post Team Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
              <h2 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.375rem' }}>
                Post Team Recruitment
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-charcoal-muted hover:text-charcoal">
                <X style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>

            <form onSubmit={handlePostTeam} className="flex flex-col gap-4">
              <div className="form-group">
                <label>Project / Hackathon Title *</label>
                <input
                  type="text"
                  required
                  value={formProject}
                  onChange={(e) => setFormProject(e.target.value)}
                  placeholder="e.g. Smart India Hackathon 2026 AI Project"
                />
              </div>

              <div className="form-group">
                <label>Role / Specialization Needed *</label>
                <input
                  type="text"
                  required
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  placeholder="e.g. React Native Developer, Computer Vision Specialist"
                />
              </div>

              <div className="form-group">
                <label>Project Details & Scope</label>
                <textarea
                  rows={3}
                  required
                  value={formDetails}
                  onChange={(e) => setFormDetails(e.target.value)}
                  placeholder="Describe what you are building, team timeline, and required commitment..."
                />
              </div>

              <div className="form-grid">
                <div>
                  <label>Tech Stack Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={formTechStack}
                    onChange={(e) => setFormTechStack(e.target.value)}
                    placeholder="e.g. PyTorch, React, Node.js"
                  />
                </div>
                <div>
                  <label>Contact Email / Phone</label>
                  <input
                    type="text"
                    value={formContact}
                    onChange={(e) => setFormContact(e.target.value)}
                    placeholder="student@kiit.ac.in or WhatsApp"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3" style={{ marginTop: '0.5rem' }}>
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="default">
                  Publish Team Listing (+4 pts)
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
