import { Link, useNavigate } from "react-router-dom";
import { 
  Award, Flame, BookCopy, FolderKanban, GraduationCap, 
  ArrowUpRight, Calendar, Clock, Sparkles, Users, ShoppingBag
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Avatar } from "../components/ui/Avatar";
import { Badge } from "../components/ui/Badge";
import { useApp } from "../context/AppContext";

export const Dashboard = () => {
  const { profile, marketplace, resources, feed, events, placements, isDailyChallengeSolvedToday, solveDailyChallenge } = useApp();
  const navigate = useNavigate();

  const activeMarketplaceCount = marketplace.filter(m => !m.sold).length;

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Hero Banner Section */}
      <section className="hero-section shadow-sm">
        <div className="hero-bg-1"></div>
        <div className="hero-bg-2"></div>
        
        <div className="hero-content">
          <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
            <Badge className="badge-gold">
              <Sparkles style={{ width: '0.875rem', height: '0.875rem', marginRight: '0.25rem' }} />
              {profile.dept}
            </Badge>
            <span className="text-charcoal-muted" style={{ fontSize: '0.8125rem' }}>• {profile.year}</span>
          </div>

          <h1 className="font-display font-semibold text-charcoal" style={{ fontSize: '2.125rem', lineHeight: '2.5rem', marginBottom: '0.5rem' }}>
            Welcome back, {profile.name.split(' ')[0]} 👋
          </h1>
          <p className="text-charcoal-muted" style={{ fontSize: '1rem', maxWidth: '32rem' }}>
            Here is your live campus pulse. Connect, share notes, trade gear, and accelerate your placement prep.
          </p>
        </div>
        
        <div className="hero-profile-card">
          <div className="flex-1">
            <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
              <span className="font-semibold text-charcoal" style={{ fontSize: '0.875rem' }}>Profile {profile.profileCompletion}% complete</span>
              <span className="text-forest font-bold" style={{ fontSize: '0.8125rem' }}>{profile.points} pts</span>
            </div>
            <div className="progress-track">
              <div className="progress-bar" style={{ width: `${profile.profileCompletion}%` }}></div>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={() => navigate('/portfolio')}>
            Edit Portfolio
          </Button>
        </div>
      </section>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Button
          variant="outline"
          onClick={() => navigate('/marketplace')}
          className="justify-start gap-3 p-4 h-auto hover:border-forest"
          style={{ padding: '0.875rem 1rem' }}
        >
          <div className="bg-gold-tint text-gold-dark p-2 rounded-lg" style={{ padding: '0.5rem', borderRadius: '0.5rem' }}>
            <ShoppingBag style={{ width: '1.25rem', height: '1.25rem' }} />
          </div>
          <div className="text-left">
            <div className="text-charcoal font-semibold" style={{ fontSize: '0.875rem' }}>List Marketplace Item</div>
            <div className="text-charcoal-muted" style={{ fontSize: '0.75rem' }}>+5 reputation points</div>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate('/coding')}
          className="justify-start gap-3 p-4 h-auto hover:border-forest"
          style={{ padding: '0.875rem 1rem' }}
        >
          <div className="bg-coral-tint text-coral p-2 rounded-lg" style={{ padding: '0.5rem', borderRadius: '0.5rem' }}>
            <Flame style={{ width: '1.25rem', height: '1.25rem' }} />
          </div>
          <div className="text-left">
            <div className="text-charcoal font-semibold" style={{ fontSize: '0.875rem' }}>Solve Daily Problem</div>
            <div className="text-charcoal-muted" style={{ fontSize: '0.75rem' }}>Streak: {profile.streak} days 🔥</div>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate('/resources')}
          className="justify-start gap-3 p-4 h-auto hover:border-forest"
          style={{ padding: '0.875rem 1rem' }}
        >
          <div className="bg-forest-tint text-forest p-2 rounded-lg" style={{ padding: '0.5rem', borderRadius: '0.5rem' }}>
            <BookCopy style={{ width: '1.25rem', height: '1.25rem' }} />
          </div>
          <div className="text-left">
            <div className="text-charcoal font-semibold" style={{ fontSize: '0.875rem' }}>Upload Study Notes</div>
            <div className="text-charcoal-muted" style={{ fontSize: '0.75rem' }}>+8 reputation points</div>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate('/teams')}
          className="justify-start gap-3 p-4 h-auto hover:border-forest"
          style={{ padding: '0.875rem 1rem' }}
        >
          <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(124, 58, 237, 0.1)', color: 'var(--accent-purple)', padding: '0.5rem', borderRadius: '0.5rem' }}>
            <Users style={{ width: '1.25rem', height: '1.25rem' }} />
          </div>
          <div className="text-left">
            <div className="text-charcoal font-semibold" style={{ fontSize: '0.875rem' }}>Find Hackathon Team</div>
            <div className="text-charcoal-muted" style={{ fontSize: '0.75rem' }}>SIH & Nexus Sprints</div>
          </div>
        </Button>
      </div>

      {/* 5-Column Stats Section */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Campus Reputation", value: profile.points.toLocaleString(), sub: "Rank #1 in Dept", icon: Award, color: "text-gold-dark" },
          { label: "Coding Streak", value: `${profile.streak} Days 🔥`, sub: isDailyChallengeSolvedToday ? "Solved today ✓" : "Solve today for +10", icon: Flame, color: "text-coral" },
          { label: "Shared Resources", value: profile.resourcesUploaded, sub: `${resources.length} campus papers`, icon: BookCopy, color: "text-forest-light" },
          { label: "Marketplace Sales", value: profile.itemsSold, sub: `${activeMarketplaceCount} active listings`, icon: FolderKanban, color: "text-accent-blue" },
          { label: "Placement Readiness", value: `${profile.placementReadiness}%`, sub: "4 mock tests cleared", icon: GraduationCap, color: "text-accent-purple" }
        ].map((stat, idx) => (
          <Card key={idx} className="group hover:-translate-y-1">
            <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
              <div className="stat-icon-wrapper">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{stat.value}</h4>
              <p className="font-semibold text-charcoal uppercase" style={{ fontSize: '0.6875rem', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{stat.label}</p>
              <p className="text-charcoal-muted" style={{ fontSize: '0.75rem' }}>{stat.sub}</p>
            </div>
          </Card>
        ))}
      </section>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Campus Activity & Coding Challenge */}
        <div className="lg:col-span-2 flex flex-col gap-6" style={{ gridColumn: 'span 2' }}>
          
          {/* Daily Challenge Spotlight Card */}
          <Card style={{ background: 'linear-gradient(135deg, #16261E, #134A3D)', color: '#fff', border: 'none' }}>
            <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
              <div className="flex items-center gap-2">
                <div className="bg-gold-tint text-charcoal p-1 rounded-md" style={{ padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontWeight: 700, fontSize: '0.75rem' }}>
                  DAILY CHALLENGE
                </div>
                <span style={{ fontSize: '0.8125rem', opacity: 0.8 }}>Topic: Linked Lists & Pointers</span>
              </div>
              <Badge className="badge-gold">+{10} PTS</Badge>
            </div>

            <h3 className="font-display text-white" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              Reverse a Singly Linked List in-place in O(1) Extra Space
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#D9DED6', marginBottom: '1.25rem' }}>
              Given the head of a singly linked list, reverse the list and return its new head without allocating additional memory nodes.
            </p>

            <div className="flex items-center gap-3">
              {isDailyChallengeSolvedToday ? (
                <Button variant="marigold" disabled size="sm">
                  Logged for Today ✓
                </Button>
              ) : (
                <Button variant="marigold" size="sm" onClick={() => solveDailyChallenge()}>
                  Mark as Solved (+10 pts)
                </Button>
              )}
              <Button variant="outline" size="sm" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'transparent' }} onClick={() => navigate('/coding')}>
                Open Playground & Hints
              </Button>
            </div>
          </Card>

          {/* Campus Community Feed Preview */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.25rem' }}>Latest Campus Buzz</h2>
              <Link to="/community" className="text-forest text-sm font-semibold hover:underline">View all posts →</Link>
            </div>
            
            <div className="activity-list">
              {feed.slice(0, 3).map((item) => (
                <Card key={item.id} className="flex items-start gap-4" style={{ padding: '1.125rem' }}>
                  <Avatar initials={item.author.split(' ').map(n=>n[0]).slice(0,2).join('')} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between" style={{ marginBottom: '0.25rem' }}>
                      <span className="font-semibold text-charcoal" style={{ fontSize: '0.875rem' }}>{item.author}</span>
                      <span className="text-charcoal-muted" style={{ fontSize: '0.75rem' }}>{item.tag && <Badge className="badge-gray" style={{ marginRight: '0.5rem' }}>{item.tag}</Badge>}</span>
                    </div>
                    <p className="text-charcoal" style={{ fontSize: '0.875rem', lineHeight: '1.4' }}>
                      {item.text}
                    </p>
                    <div className="flex items-center gap-4 text-charcoal-muted" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
                      <span>❤️ {item.likes.length} likes</span>
                      <span>💬 {item.comments.length} comments</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/community')} style={{ padding: '0', width: '2rem', height: '2rem', borderRadius: '50%' }}>
                    <ArrowUpRight style={{ width: '1rem', height: '1rem' }} />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Events & Placement Radar */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.25rem' }}>Upcoming Events</h2>
            <Link to="/events" className="text-forest text-sm font-semibold hover:underline">All events</Link>
          </div>
          
          <Card className="bg-white" style={{ padding: 0, overflow: 'hidden' }}>
            {events.slice(0, 3).map((event) => (
              <div
                key={event.id}
                onClick={() => navigate('/events')}
                className="event-list-item"
              >
                <div className="event-icon-box">
                  <Calendar style={{ width: '1.25rem', height: '1.25rem' }} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-charcoal" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>{event.title}</h4>
                  <div className="flex items-center gap-2 text-charcoal-muted" style={{ fontSize: '0.75rem' }}>
                    <Clock style={{ width: '0.75rem', height: '0.75rem' }} />
                    <span>{event.date}</span>
                    <span style={{ width: '0.25rem', height: '0.25rem', borderRadius: '50%', backgroundColor: 'var(--charcoal-border)' }}></span>
                    <span className="font-medium text-forest">{event.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </Card>

          {/* Placement Radar */}
          <div className="flex items-center justify-between" style={{ marginTop: '0.5rem' }}>
            <h2 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.25rem' }}>Placement Drives</h2>
            <Link to="/placements" className="text-forest text-sm font-semibold hover:underline">View Hub</Link>
          </div>

          <div className="flex flex-col gap-3">
            {placements.slice(0, 2).map((opp) => (
              <Card key={opp.id} className="group cursor-pointer hover:border-forest" onClick={() => navigate('/placements')} style={{ padding: '1rem' }}>
                <div className="flex justify-between items-start" style={{ marginBottom: '0.375rem' }}>
                  <div>
                    <h3 className="font-semibold text-charcoal" style={{ fontSize: '0.9375rem' }}>{opp.role}</h3>
                    <p className="text-charcoal-muted" style={{ fontSize: '0.8125rem' }}>{opp.company}</p>
                  </div>
                  <Badge className="badge-gold">
                    {opp.salary || "Competitive"}
                  </Badge>
                </div>
                <p className="text-charcoal-muted line-clamp-2" style={{ fontSize: '0.75rem', margin: '0.375rem 0 0.75rem' }}>
                  {opp.details}
                </p>
                <div className="flex justify-between items-center text-charcoal-muted" style={{ fontSize: '0.75rem' }}>
                  <span>By {opp.author}</span>
                  <span className="text-forest font-semibold">View Experience →</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Campus Leaderboard Top 3 */}
          <Card style={{ padding: '1.25rem' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
              <h3 className="font-semibold text-charcoal" style={{ fontSize: '0.9375rem' }}>🏆 Campus Leaderboard</h3>
              <Link to="/achievements" className="text-forest text-xs font-semibold hover:underline">Full board</Link>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { name: profile.name, dept: profile.dept, pts: profile.points, rank: 1 },
                { name: "Rahul Nair", dept: "CSE 4th Year", pts: 1190, rank: 2 },
                { name: "Aryan Sengupta", dept: "IT 3rd Year", pts: 1040, rank: 3 }
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded" style={{ padding: '0.5rem', backgroundColor: i === 0 ? 'var(--gold-tint)' : 'transparent', borderRadius: '0.5rem' }}>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-charcoal" style={{ width: '1.25rem', textAlign: 'center', fontSize: '0.8125rem' }}>#{row.rank}</span>
                    <div>
                      <div className="font-semibold text-charcoal" style={{ fontSize: '0.8125rem' }}>{row.name}</div>
                      <div className="text-charcoal-muted" style={{ fontSize: '0.6875rem' }}>{row.dept}</div>
                    </div>
                  </div>
                  <Badge className={i === 0 ? "badge-gold" : "badge-gray"}>{row.pts} pts</Badge>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};
