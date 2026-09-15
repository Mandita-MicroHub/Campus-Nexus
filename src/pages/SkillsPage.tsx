import { useState } from "react";
import { 
  Plus, ThumbsUp, Layers, Terminal, Database, Server, X 
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useApp } from "../context/AppContext";

interface SkillEntry {
  name: string;
  category: "Frontend" | "Backend" | "Data & Systems" | "DevOps / Tools";
  level: "Proficient" | "Intermediate" | "Exploring";
  endorsements: number;
}

const INITIAL_SKILL_MATRIX: SkillEntry[] = [
  { name: "React.js", category: "Frontend", level: "Proficient", endorsements: 24 },
  { name: "TypeScript", category: "Frontend", level: "Proficient", endorsements: 19 },
  { name: "Node.js & Express", category: "Backend", level: "Proficient", endorsements: 15 },
  { name: "Python & PyTorch", category: "Data & Systems", level: "Intermediate", endorsements: 12 },
  { name: "PostgreSQL & SQL", category: "Data & Systems", level: "Proficient", endorsements: 18 },
  { name: "Docker & Containers", category: "DevOps / Tools", level: "Intermediate", endorsements: 8 },
  { name: "Data Structures & Algorithms", category: "Data & Systems", level: "Proficient", endorsements: 31 },
  { name: "Distributed Systems (Raft/Paxos)", category: "Backend", level: "Intermediate", endorsements: 7 }
];

export const SkillsPage = () => {
  const { profile, updateProfile } = useApp();
  const [skillsList, setSkillsList] = useState<SkillEntry[]>(INITIAL_SKILL_MATRIX);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState<SkillEntry["category"]>("Frontend");
  const [formLevel, setFormLevel] = useState<SkillEntry["level"]>("Proficient");

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newSkill: SkillEntry = {
      name: formName.trim(),
      category: formCategory,
      level: formLevel,
      endorsements: 1
    };

    setSkillsList(prev => [...prev, newSkill]);
    if (!profile.skills.includes(formName.trim())) {
      updateProfile({ skills: [...profile.skills, formName.trim()] });
    }

    setFormName("");
    setShowAddModal(false);
  };

  const handleEndorse = (skillName: string) => {
    setSkillsList(prev =>
      prev.map(s => s.name === skillName ? { ...s, endorsements: s.endorsements + 1 } : s)
    );
  };

  const categories = ["Frontend", "Backend", "Data & Systems", "DevOps / Tools"] as const;

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="page-head" style={{ marginBottom: 0 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
            <Badge className="badge-gold">Skill Radar & Peer Endorsements</Badge>
            <span className="text-charcoal-muted" style={{ fontSize: '0.8125rem' }}>• Industry Alignment Matrix</span>
          </div>
          <h1>Technical Skills & Endorsements</h1>
          <p>Highlight your core competencies, software engineering stack, and peer-validated skills.</p>
        </div>

        <Button onClick={() => setShowAddModal(true)} className="gap-2 self-start md:self-auto">
          <Plus style={{ width: '1.125rem', height: '1.125rem' }} />
          Add New Skill
        </Button>
      </div>

      {/* Categorized Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(cat => {
          const categorySkills = skillsList.filter(s => s.category === cat);

          return (
            <Card key={cat} className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b pb-3" style={{ borderBottom: '1px solid var(--charcoal-border)', paddingBottom: '0.75rem' }}>
                <div className="flex items-center gap-2">
                  {cat === "Frontend" && <Layers style={{ width: '1.25rem', height: '1.25rem', color: 'var(--forest-light)' }} />}
                  {cat === "Backend" && <Server style={{ width: '1.25rem', height: '1.25rem', color: 'var(--accent-purple)' }} />}
                  {cat === "Data & Systems" && <Database style={{ width: '1.25rem', height: '1.25rem', color: 'var(--gold-dark)' }} />}
                  {cat === "DevOps / Tools" && <Terminal style={{ width: '1.25rem', height: '1.25rem', color: 'var(--coral)' }} />}
                  <h3 className="font-display font-semibold text-charcoal text-base">{cat}</h3>
                </div>
                <Badge className="badge-gray">{categorySkills.length} Skills</Badge>
              </div>

              <div className="flex flex-col gap-3">
                {categorySkills.map(skill => (
                  <div
                    key={skill.name}
                    className="p-3 bg-paper rounded-xl flex items-center justify-between gap-3 hover:border-forest transition border"
                    style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem' }}
                  >
                    <div>
                      <div className="font-semibold text-charcoal text-sm">{skill.name}</div>
                      <Badge className={
                        skill.level === "Proficient" ? "badge-gold" : "badge-gray"
                      } style={{ fontSize: '0.6875rem', marginTop: '0.25rem' }}>
                        {skill.level}
                      </Badge>
                    </div>

                    <button
                      onClick={() => handleEndorse(skill.name)}
                      className="btn btn-sm btn-outline gap-1.5 hover:bg-forest-tint text-charcoal text-xs"
                      title="Endorse this skill"
                    >
                      <ThumbsUp style={{ width: '0.875rem', height: '0.875rem', color: 'var(--forest-light)' }} />
                      <span>{skill.endorsements}</span>
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
              <h2 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.375rem' }}>
                Add Technical Skill
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-charcoal-muted hover:text-charcoal">
                <X style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>

            <form onSubmit={handleAddSkill} className="flex flex-col gap-4">
              <div className="form-group">
                <label>Skill / Technology Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Next.js, Rust, Kubernetes, Redis"
                />
              </div>

              <div className="form-grid">
                <div>
                  <label>Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Self-Assessed Proficiency</label>
                  <select
                    value={formLevel}
                    onChange={(e) => setFormLevel(e.target.value as any)}
                  >
                    <option value="Proficient">Proficient / Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Exploring">Exploring / Beginner</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3" style={{ marginTop: '0.5rem' }}>
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="default">
                  Save Skill
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
