import { Award, Flame, BookOpen, ShoppingBag, Sparkles, Lock } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { useApp } from "../context/AppContext";

const MILESTONES = [
  {
    id: "m-1",
    title: "14-Day Streak Legend 🔥",
    desc: "Maintain a daily problem-solving streak for 14 continuous days.",
    unlocked: true,
    progress: 100,
    icon: Flame,
    color: "var(--coral)",
    reward: "+50 Pts"
  },
  {
    id: "m-2",
    title: "Top Resource Contributor 📚",
    desc: "Share 20+ peer-reviewed academic notes and solved PYQs.",
    unlocked: true,
    progress: 100,
    icon: BookOpen,
    color: "var(--forest-light)",
    reward: "+100 Pts"
  },
  {
    id: "m-3",
    title: "Marketplace Master 🛒",
    desc: "Complete 10 verified student item sales on campus.",
    unlocked: false,
    progress: 60,
    icon: ShoppingBag,
    color: "var(--gold-dark)",
    reward: "+75 Pts"
  },
  {
    id: "m-4",
    title: "Hackathon Champion 🏆",
    desc: "Form a verified hackathon team and submit a working project.",
    unlocked: true,
    progress: 100,
    icon: Award,
    color: "var(--accent-purple)",
    reward: "+150 Pts"
  },
  {
    id: "m-5",
    title: "Century Problem Solver ⚡",
    desc: "Solve 200 coding problems across DSA and algorithms.",
    unlocked: false,
    progress: 93,
    icon: Sparkles,
    color: "var(--accent-blue)",
    reward: "+200 Pts"
  }
];

export const Achievements = () => {
  const { profile } = useApp();

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="page-head" style={{ marginBottom: 0 }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
          <Badge className="badge-gold">Reputation & Honors</Badge>
          <span className="text-charcoal-muted" style={{ fontSize: '0.8125rem' }}>• Level 4 Senior Contributor</span>
        </div>
        <h1>Achievements & Badges</h1>
        <p>Unlock university badges, earn reputation points, and climb the campus engineering leaderboard.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gold-tint border" style={{ borderColor: 'rgba(232,163,61,0.4)', padding: '1.5rem' }}>
          <div className="flex items-center gap-3 mb-2" style={{ marginBottom: '0.5rem' }}>
            <Award style={{ width: '2rem', height: '2rem', color: 'var(--gold-dark)' }} />
            <div>
              <div className="text-xs text-gold-dark font-bold uppercase">Total Points</div>
              <div className="font-display font-bold text-charcoal text-2xl">{profile.points.toLocaleString()} pts</div>
            </div>
          </div>
          <p className="text-charcoal-muted text-xs">Top 1% in CSE department.</p>
        </Card>

        <Card className="bg-coral-tint border" style={{ borderColor: 'rgba(211,84,42,0.3)', padding: '1.5rem' }}>
          <div className="flex items-center gap-3 mb-2" style={{ marginBottom: '0.5rem' }}>
            <Flame style={{ width: '2rem', height: '2rem', color: 'var(--coral)' }} />
            <div>
              <div className="text-xs text-coral font-bold uppercase">Current Streak</div>
              <div className="font-display font-bold text-charcoal text-2xl">{profile.streak} Days 🔥</div>
            </div>
          </div>
          <p className="text-charcoal-muted text-xs">Maintain streak for weekly bonus points.</p>
        </Card>

        <Card className="bg-forest-tint border" style={{ borderColor: 'rgba(31,111,92,0.3)', padding: '1.5rem' }}>
          <div className="flex items-center gap-3 mb-2" style={{ marginBottom: '0.5rem' }}>
            <Sparkles style={{ width: '2rem', height: '2rem', color: 'var(--forest-light)' }} />
            <div>
              <div className="text-xs text-forest font-bold uppercase">Badges Unlocked</div>
              <div className="font-display font-bold text-charcoal text-2xl">{profile.badges.length} / 8</div>
            </div>
          </div>
          <p className="text-charcoal-muted text-xs">3 milestones close to unlocking!</p>
        </Card>
      </div>

      {/* Badges & Milestones Grid */}
      <Card style={{ padding: '1.5rem' }}>
        <h2 className="font-display font-semibold text-charcoal text-lg mb-4" style={{ marginBottom: '1rem' }}>
          Campus Milestones & Badges
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MILESTONES.map(item => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border flex flex-col justify-between ${
                item.unlocked ? 'bg-white border-forest' : 'bg-paper opacity-85'
              }`}
              style={{ padding: '1.25rem', borderRadius: '0.75rem' }}
            >
              <div>
                <div className="flex justify-between items-start mb-2" style={{ marginBottom: '0.5rem' }}>
                  <div className="flex items-center gap-2">
                    <item.icon style={{ width: '1.25rem', height: '1.25rem', color: item.color }} />
                    <h3 className="font-semibold text-charcoal text-sm">{item.title}</h3>
                  </div>

                  <Badge className={item.unlocked ? "badge-gold" : "badge-gray"}>
                    {item.unlocked ? "Unlocked ✓" : <><Lock style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} /> Locked</>}
                  </Badge>
                </div>

                <p className="text-charcoal-muted text-xs mb-3" style={{ lineHeight: '1.4', marginBottom: '0.75rem' }}>
                  {item.desc}
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-charcoal-muted mb-1" style={{ marginBottom: '0.25rem' }}>
                  <span>Progress: {item.progress}%</span>
                  <span className="text-forest">{item.reward}</span>
                </div>
                <div className="progress-track" style={{ height: '0.375rem' }}>
                  <div
                    className="progress-bar"
                    style={{
                      width: `${item.progress}%`,
                      backgroundColor: item.unlocked ? 'var(--forest-light)' : 'var(--gold)'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
