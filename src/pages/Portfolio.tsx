import { useState } from "react";
import { 
  FileText, Sparkles, Edit3, 
  ExternalLink, Code2, Save 
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useApp } from "../context/AppContext";

export const Portfolio = () => {
  const { profile, updateProfile } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [bioInput, setBioInput] = useState(profile.bio);
  const [skillsInput, setSkillsInput] = useState(profile.skills.join(", "));
  const [githubInput, setGithubInput] = useState(profile.github);
  const [resumeInput, setResumeInput] = useState(profile.resume);
  const [nameInput, setNameInput] = useState(profile.name);
  const [deptInput, setDeptInput] = useState(profile.dept);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: nameInput.trim() || profile.name,
      dept: deptInput.trim() || profile.dept,
      bio: bioInput.trim(),
      skills: skillsInput.split(",").map(s => s.trim()).filter(Boolean),
      github: githubInput.trim(),
      resume: resumeInput.trim()
    });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="page-head" style={{ marginBottom: 0 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
            <Badge className="badge-gold">Verified Student Portfolio</Badge>
            <span className="text-charcoal-muted" style={{ fontSize: '0.8125rem' }}>• Public Campus Profile</span>
          </div>
          <h1>Developer Portfolio & Profile</h1>
          <p>This is your official university developer profile visible to recruiters, peers, and project leads.</p>
        </div>

        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
          className="gap-2 self-start md:self-auto"
        >
          <Edit3 style={{ width: '1rem', height: '1rem' }} />
          {isEditing ? "Cancel Editing" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Card */}
        <div className="flex flex-col gap-6">
          <Card className="flex flex-col items-center text-center p-6" style={{ padding: '2rem 1.5rem' }}>
            <div
              className="avatar shadow-md"
              style={{
                width: '5rem',
                height: '5rem',
                fontSize: '1.75rem',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, var(--forest-light), var(--charcoal))'
              }}
            >
              {profile.avatar}
            </div>

            <h2 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
              {profile.name}
            </h2>

            <div className="text-sm font-medium text-forest" style={{ marginBottom: '0.25rem' }}>
              {profile.dept}
            </div>

            <div className="text-xs text-charcoal-muted" style={{ marginBottom: '1.25rem' }}>
              {profile.year} • KIIT University
            </div>

            <div className="flex items-center gap-2 mb-4" style={{ marginBottom: '1rem' }}>
              <Badge className="badge-gold">
                <Sparkles style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />
                {profile.points} Reputation Pts
              </Badge>
              <Badge className="badge-coral">
                {profile.streak} Day Streak 🔥
              </Badge>
            </div>

            <p className="text-charcoal-muted text-sm border-t pt-4 w-full" style={{ borderTop: '1px solid var(--charcoal-border)', paddingTop: '1rem', lineHeight: '1.5' }}>
              {profile.bio || "Student developer actively building full-stack software and prepping for SWE roles."}
            </p>

            <div className="flex items-center gap-3 mt-4 w-full pt-2" style={{ marginTop: '1rem' }}>
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline flex-1 gap-1"
                >
                  <Code2 style={{ width: '1rem', height: '1rem' }} />
                  <span>GitHub</span>
                </a>
              )}

              {profile.resume && (
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-primary flex-1 gap-1"
                >
                  <FileText style={{ width: '1rem', height: '1rem' }} />
                  <span>Resume</span>
                </a>
              )}
            </div>
          </Card>

          {/* Badges Preview */}
          <Card>
            <h3 className="font-semibold text-charcoal text-sm mb-3" style={{ marginBottom: '0.75rem' }}>
              Unlocked Badges ({profile.badges.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.badges.map((badge, idx) => (
                <Badge key={idx} className="badge-gold" style={{ padding: '0.35rem 0.75rem' }}>
                  {badge}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Projects & Edit Form */}
        <div className="lg:col-span-2 flex flex-col gap-6" style={{ gridColumn: 'span 2' }}>
          {isEditing ? (
            <Card style={{ padding: '1.75rem' }}>
              <h3 className="font-display font-semibold text-charcoal text-lg mb-4" style={{ marginBottom: '1rem' }}>
                Edit Campus Developer Profile
              </h3>

              <form onSubmit={handleSave} className="flex flex-col gap-4">
                <div className="form-grid">
                  <div>
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Department & Specialization</label>
                    <input
                      type="text"
                      value={deptInput}
                      onChange={(e) => setDeptInput(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Bio & Headline</label>
                  <textarea
                    rows={3}
                    value={bioInput}
                    onChange={(e) => setBioInput(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Skills & Technologies (Comma separated)</label>
                  <input
                    type="text"
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                  />
                </div>

                <div className="form-grid">
                  <div>
                    <label>GitHub Profile URL</label>
                    <input
                      type="url"
                      value={githubInput}
                      onChange={(e) => setGithubInput(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Resume Drive Link</label>
                    <input
                      type="url"
                      value={resumeInput}
                      onChange={(e) => setResumeInput(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-2" style={{ marginTop: '0.5rem' }}>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="default">
                    <Save style={{ width: '1rem', height: '1rem' }} />
                    Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          ) : null}

          {/* Technical Skills Showcase */}
          <Card>
            <h3 className="font-display font-semibold text-charcoal text-base mb-3" style={{ marginBottom: '0.75rem' }}>
              Technical Stack & Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-forest-tint text-forest font-semibold px-3 py-1.5 rounded-lg text-xs"
                  style={{ padding: '0.375rem 0.75rem', borderRadius: '0.5rem' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          {/* Featured Projects Showcase */}
          <Card className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-charcoal text-lg">
              Featured Projects & Open Source
            </h3>

            <div className="flex flex-col gap-4">
              {[
                {
                  name: "Campus Nexus Collaboration Platform",
                  desc: "React & TypeScript campus resource, marketplace, and coding hub with real-time peer state management and AI assistant engine.",
                  tech: ["React", "TypeScript", "Vite", "LocalStorage", "CSS3"],
                  github: "https://github.com/ananya-sharma/campus-nexus"
                },
                {
                  name: "Smart India Hackathon Edge-AI Drone Vision",
                  desc: "Real-time edge video inference model using PyTorch and YOLOv9 for automated flood victim rescue coordinates detection.",
                  tech: ["Python", "PyTorch", "OpenCV", "FastAPI", "Docker"],
                  github: "https://github.com/ananya-sharma/sih-edge-vision"
                },
                {
                  name: "Distributed Raft Consensus in Go",
                  desc: "High-throughput fault-tolerant leader election and replicated state log implementation based on the Raft consensus paper.",
                  tech: ["Go", "gRPC", "Protobuf", "Distributed Systems"],
                  github: "https://github.com/ananya-sharma/raft-consensus-go"
                }
              ].map((proj, i) => (
                <div key={i} className="p-4 bg-paper rounded-xl border flex flex-col gap-2" style={{ padding: '1rem', borderRadius: '0.75rem' }}>
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-charcoal text-sm">{proj.name}</h4>
                    <a href={proj.github} target="_blank" rel="noreferrer" className="text-forest hover:underline text-xs flex items-center gap-1 font-semibold">
                      <span>Code</span>
                      <ExternalLink style={{ width: '0.75rem', height: '0.75rem' }} />
                    </a>
                  </div>
                  <p className="text-charcoal-muted text-xs" style={{ lineHeight: '1.4' }}>{proj.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {proj.tech.map((t, idx) => (
                      <span key={idx} className="bg-white border text-charcoal px-2 py-0.5 rounded text-xs font-mono" style={{ padding: '0.15rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.6875rem' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
