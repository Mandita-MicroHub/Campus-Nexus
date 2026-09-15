import { useState } from "react";
import { 
  BookOpen, Plus, Search, Star, Download, 
  FileText, X 
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useApp } from "../context/AppContext";

const RESOURCE_TYPES = [
  "All Types",
  "Notes",
  "Previous year paper",
  "Lab manual",
  "Assignment",
  "Slides"
];

export const ResourceHub = () => {
  const { resources, addResource, rateResource, bumpResourceDownload } = useApp();

  const [selectedSemester, setSelectedSemester] = useState<number | "all">("all");
  const [selectedType, setSelectedType] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formSemester, setFormSemester] = useState<number>(4);
  const [formType, setFormType] = useState("Notes");
  const [formLink, setFormLink] = useState("");
  const [formTags, setFormTags] = useState("");

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formSubject.trim()) return;

    addResource({
      title: formTitle.trim(),
      subject: formSubject.trim(),
      semester: Number(formSemester),
      type: formType,
      link: formLink.trim() || "https://drive.google.com/sample-file",
      tags: formTags.split(",").map(t => t.trim()).filter(Boolean)
    });

    setFormTitle("");
    setFormSubject("");
    setFormLink("");
    setFormTags("");
    setShowUploadModal(false);
  };

  const filteredResources = resources.filter(item => {
    const matchesSem = selectedSemester === "all" || item.semester === selectedSemester;
    const matchesType = selectedType === "All Types" || item.type.toLowerCase() === selectedType.toLowerCase();
    const matchesQuery = !searchQuery.trim() || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesSem && matchesType && matchesQuery;
  });

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="page-head" style={{ marginBottom: 0 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
            <Badge className="badge-gold">Peer-Reviewed Notes</Badge>
            <span className="text-charcoal-muted" style={{ fontSize: '0.8125rem' }}>• {resources.length} Academic Files Shared</span>
          </div>
          <h1>Campus Resource Hub</h1>
          <p>Access high-scoring subject notes, end-sem solved PYQs, lab manuals, and syllabus cheat sheets.</p>
        </div>

        <Button onClick={() => setShowUploadModal(true)} className="gap-2 self-start md:self-auto">
          <Plus style={{ width: '1.125rem', height: '1.125rem' }} />
          Upload Resource (+8 pts)
        </Button>
      </div>

      {/* Filters & Search */}
      <Card style={{ padding: '1rem' }}>
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="flex-1 relative" style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: 'var(--charcoal-muted)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by subject, topic (e.g. Normalization, OS Paging, DP Cheat Sheet)..."
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>

          {/* Semester Selector */}
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value === "all" ? "all" : Number(e.target.value))}
            style={{ width: 'auto', minWidth: '150px' }}
          >
            <option value="all">All Semesters</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
              <option key={s} value={s}>Semester {s}</option>
            ))}
          </select>

          {/* Type Selector */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{ width: 'auto', minWidth: '150px' }}
          >
            {RESOURCE_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Resource Items Grid */}
      {filteredResources.length === 0 ? (
        <div className="empty-state">
          <BookOpen style={{ width: '3rem', height: '3rem', margin: '0 auto 0.75rem', color: 'var(--charcoal-muted)' }} />
          <h3>No study resources found</h3>
          <p>Try searching for a different subject or upload your class notes to help your peers.</p>
          <Button onClick={() => setShowUploadModal(true)} style={{ marginTop: '1rem' }}>
            Upload First Resource
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredResources.map(res => {
            const avgRating = res.ratings.length > 0
              ? (res.ratings.reduce((a, b) => a + b, 0) / res.ratings.length).toFixed(1)
              : "5.0";

            return (
              <Card key={res.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-forest transition">
                <div className="flex items-start gap-4">
                  <div className="stat-icon-wrapper bg-forest-tint text-forest flex-shrink-0" style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem' }}>
                    <FileText style={{ width: '1.5rem', height: '1.5rem' }} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="badge-gray">{res.type}</Badge>
                      <Badge className="badge-gold">Sem {res.semester}</Badge>
                      <span className="text-xs text-charcoal-muted font-medium">{res.subject}</span>
                    </div>

                    <h3 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.125rem' }}>
                      {res.title}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-charcoal-muted">
                      <span>Uploaded by <b>{res.author}</b></span>
                      <span>•</span>
                      <span>{res.downloads} views & downloads</span>
                    </div>

                    {res.tags && res.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        {res.tags.map((tag, idx) => (
                          <span key={idx} className="bg-paper text-charcoal-muted px-2 py-0.5 rounded text-xs" style={{ padding: '0.15rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.6875rem' }}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Actions & Ratings */}
                <div className="flex md:flex-col items-end justify-between gap-3 border-t md:border-t-0 pt-3 md:pt-0" style={{ minWidth: '180px' }}>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    <div className="flex items-center text-gold">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => rateResource(res.id, star)}
                          title={`Rate ${star} stars`}
                          className="hover:scale-110 transition p-0.5"
                        >
                          <Star
                            style={{
                              width: '1rem',
                              height: '1rem',
                              color: 'var(--gold)',
                              fill: star <= Math.round(Number(avgRating)) ? 'var(--gold)' : 'none'
                            }}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-charcoal ml-1">({avgRating})</span>
                  </div>

                  {/* Open / Download Button */}
                  <a
                    href={res.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => bumpResourceDownload(res.id)}
                    className="btn btn-sm btn-primary gap-1.5"
                  >
                    <Download style={{ width: '0.875rem', height: '0.875rem' }} />
                    <span>Open Resource</span>
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Upload Resource Modal */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
              <h2 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.375rem' }}>
                Upload Study Resource
              </h2>
              <button onClick={() => setShowUploadModal(false)} className="text-charcoal-muted hover:text-charcoal">
                <X style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>

            <form onSubmit={handleUpload} className="flex flex-col gap-4">
              <div className="form-group">
                <label>Resource Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. DBMS Unit 4 - Normalization & Indexing Notes"
                />
              </div>

              <div className="form-grid">
                <div>
                  <label>Subject *</label>
                  <input
                    type="text"
                    required
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    placeholder="e.g. Database Management Systems"
                  />
                </div>
                <div>
                  <label>Semester *</label>
                  <select
                    value={formSemester}
                    onChange={(e) => setFormSemester(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Resource Type</label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                >
                  {RESOURCE_TYPES.filter(t => t !== "All Types").map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Google Drive / Cloud Link</label>
                <input
                  type="url"
                  value={formLink}
                  onChange={(e) => setFormLink(e.target.value)}
                  placeholder="https://drive.google.com/file/d/..."
                />
              </div>

              <div className="form-group">
                <label>Topic Tags (Comma separated)</label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="e.g. Normalization, 3NF, BCNF, SQL"
                />
              </div>

              <div className="flex justify-end gap-3" style={{ marginTop: '0.5rem' }}>
                <Button type="button" variant="outline" onClick={() => setShowUploadModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="default">
                  Share Resource (+8 pts)
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
