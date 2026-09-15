import { useState } from "react";
import { 
  Flame, Play, CheckCircle2, Trophy, Clock, 
  ExternalLink, HelpCircle, Terminal 
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Avatar } from "../components/ui/Avatar";
import { useApp } from "../context/AppContext";

const UPCOMING_CONTESTS = [
  { name: "CodeForces Div 2 Round 960", platform: "Codeforces", date: "Jul 5, 2026 • 8:00 PM", link: "https://codeforces.com" },
  { name: "LeetCode Biweekly Contest 134", platform: "LeetCode", date: "Jul 6, 2026 • 8:00 PM", link: "https://leetcode.com" },
  { name: "Campus Nexus 24h Hack Sprint", platform: "Campus Nexus", date: "Jul 12, 2026 • 9:00 AM", link: "#" },
  { name: "CodeChef Starters 142", platform: "CodeChef", date: "Jul 15, 2026 • 8:00 PM", link: "https://codechef.com" },
  { name: "Google Kickstart-style Mock", platform: "Campus Nexus", date: "Jul 18, 2026 • 6:00 PM", link: "#" }
];

const COMPANY_QUESTION_BANKS = {
  "Product Giants (Google / Amazon / Microsoft)": [
    { title: "Sliding Window Maximum (Hard)", tag: "Deque / Monotonic Queue", hint: "Maintain decreasing monotonic queue storing indices." },
    { title: "Course Schedule II (Medium)", tag: "Topological Sort / Kahn's Algo", hint: "Compute in-degrees for all vertices and use BFS queue." },
    { title: "Word Break II with Memoization (Hard)", tag: "DP + Trie", hint: "Backtracking with hash map cache of subproblem results." }
  ],
  "High-Growth Startups (Razorpay / Zerodha / Uber)": [
    { title: "Design a Distributed Rate Limiter", tag: "System Design / Redis Token Bucket", hint: "Use sliding window log or token bucket algorithm in Redis." },
    { title: "Debounced Search Typeahead Component", tag: "React / Frontend Pairing", hint: "Use useRef for timer ID and clean up on component unmount." },
    { title: "LRU Cache Implementation with O(1) ops", tag: "Doubly Linked List + HashMap", hint: "Fast node removal from DLL while hash map holds pointer to node." }
  ],
  "Mass Recruitment / Consultancies (TCS / Infosys / Accenture)": [
    { title: "Check Balanced Parentheses in String", tag: "Stack / Aptitude Core", hint: "Push opening brackets to stack, pop on matching closing." },
    { title: "SQL 3NF Normalization & Joins", tag: "DBMS Core Round", hint: "Every non-prime attribute must depend non-transitively on primary key." },
    { title: "Find First Non-Repeating Character", tag: "Hashing / Frequency Array", hint: "Two-pass algorithm using frequency count array of size 256." }
  ]
};

export const CodingHub = () => {
  const { profile, solveDailyChallenge, isDailyChallengeSolvedToday } = useApp();

  const [codeLanguage, setCodeLanguage] = useState<"javascript" | "python" | "cpp">("javascript");
  const [userCode, setUserCode] = useState(`function reverseList(head) {
  let prev = null;
  let curr = head;
  
  while (curr !== null) {
    let nextNode = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
  }
  
  return prev;
}`);

  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<"problems" | "contests" | "companies" | "leaderboard">("problems");
  const [showInterviewAnswer, setShowInterviewAnswer] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setTestOutput(null);

    setTimeout(() => {
      setIsRunning(false);
      setTestOutput("✓ Test Case 1 Passed: [1,2,3,4,5] -> [5,4,3,2,1]\n✓ Test Case 2 Passed: [1,2] -> [2,1]\n✓ Test Case 3 Passed: [] -> []\n\nRuntime: 52 ms (faster than 94.2% of submissions)\nMemory: 43.8 MB (less than 88.5% of JavaScript submissions)");
    }, 700);
  };

  const handleSubmitDailyChallenge = () => {
    handleRunCode();
    setTimeout(() => {
      solveDailyChallenge();
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="page-head" style={{ marginBottom: 0 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
            <Badge className="badge-coral">
              <Flame style={{ width: '0.875rem', height: '0.875rem', marginRight: '0.25rem' }} />
              {profile.streak} Day Streak
            </Badge>
            <span className="text-charcoal-muted" style={{ fontSize: '0.8125rem' }}>• Campus Rank #1 in CSE</span>
          </div>
          <h1>Coding Hub</h1>
          <p>Sharpen problem-solving skills, prepare for technical rounds, and track competitive programming contests.</p>
        </div>

        <div className="flex items-center gap-3">
          <Card className="flex items-center gap-3 bg-gold-tint border" style={{ padding: '0.5rem 1rem', borderColor: 'rgba(232,163,61,0.4)' }}>
            <Trophy style={{ width: '1.5rem', height: '1.5rem', color: 'var(--gold-dark)' }} />
            <div>
              <div className="text-xs text-gold-dark font-semibold">Reputation</div>
              <div className="font-display font-bold text-charcoal">{profile.points} pts</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabbar">
        <button
          className={`tab-button ${activeTab === "problems" ? "active" : ""}`}
          onClick={() => setActiveTab("problems")}
        >
          Daily Challenge & Playground
        </button>
        <button
          className={`tab-button ${activeTab === "companies" ? "active" : ""}`}
          onClick={() => setActiveTab("companies")}
        >
          Company Question Bank
        </button>
        <button
          className={`tab-button ${activeTab === "contests" ? "active" : ""}`}
          onClick={() => setActiveTab("contests")}
        >
          Contests Radar
        </button>
        <button
          className={`tab-button ${activeTab === "leaderboard" ? "active" : ""}`}
          onClick={() => setActiveTab("leaderboard")}
        >
          Campus Leaderboard
        </button>
      </div>

      {/* Tab 1: Daily Problem & Playground */}
      {activeTab === "problems" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Problem Statement Card */}
          <div className="lg:col-span-1 flex flex-col gap-4" style={{ gridColumn: 'span 1' }}>
            <Card className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <Badge className="badge-coral">Problem of the Day</Badge>
                <span className="text-xs font-semibold text-forest">+10 PTS</span>
              </div>

              <h2 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.25rem' }}>
                Reverse Linked List
              </h2>

              <p className="text-charcoal-muted text-sm" style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                Given the <code>head</code> of a singly linked list, reverse the list, and return the reversed list.
              </p>

              <div className="bg-paper p-3 rounded-lg text-xs font-mono" style={{ padding: '0.75rem', borderRadius: '0.5rem' }}>
                <p><b>Input:</b> head = [1,2,3,4,5]</p>
                <p><b>Output:</b> [5,4,3,2,1]</p>
                <p className="text-charcoal-muted mt-2" style={{ marginTop: '0.5rem' }}>Follow up: Can you do it iteratively and recursively?</p>
              </div>

              <div className="border-t pt-3" style={{ borderTop: '1px solid var(--charcoal-border)', paddingTop: '0.75rem' }}>
                <h4 className="font-semibold text-charcoal text-xs mb-1" style={{ marginBottom: '0.25rem' }}>Constraints:</h4>
                <ul className="text-xs text-charcoal-muted list-disc pl-4" style={{ paddingLeft: '1rem' }}>
                  <li>Number of nodes is in range [0, 5000].</li>
                  <li>-5000 &lt;= Node.val &lt;= 5000</li>
                </ul>
              </div>

              <div className="mt-2">
                {isDailyChallengeSolvedToday ? (
                  <Button variant="marigold" disabled className="w-full">
                    <CheckCircle2 style={{ width: '1rem', height: '1rem' }} />
                    Solved for Today (+10 Pts Earned)
                  </Button>
                ) : (
                  <Button variant="default" onClick={handleSubmitDailyChallenge} className="w-full">
                    <Flame style={{ width: '1rem', height: '1rem' }} />
                    Submit & Log Streak (+10 pts)
                  </Button>
                )}
              </div>
            </Card>

            {/* Interview Question of the Day */}
            <Card>
              <div className="flex justify-between items-center mb-2" style={{ marginBottom: '0.5rem' }}>
                <span className="text-xs font-bold text-forest uppercase">Interview Question</span>
                <Badge className="badge-gray">OS & Concurrency</Badge>
              </div>
              <h3 className="font-semibold text-charcoal text-sm" style={{ marginBottom: '0.5rem' }}>
                What is the difference between a Process and a Thread?
              </h3>
              
              {showInterviewAnswer ? (
                <div className="p-3 bg-paper rounded-lg text-xs text-charcoal mt-2" style={{ padding: '0.75rem', marginTop: '0.5rem', lineHeight: '1.5' }}>
                  <b>Key difference:</b> A process is an independent executing program with its own dedicated virtual memory space, whereas threads share the memory space, file descriptors, and code of their parent process. Context switching between threads is significantly faster.
                </div>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setShowInterviewAnswer(true)} className="w-full mt-2">
                  <HelpCircle style={{ width: '0.875rem', height: '0.875rem' }} />
                  Reveal Answer & Key Points
                </Button>
              )}
            </Card>
          </div>

          {/* Interactive Code Playground */}
          <div className="lg:col-span-2 flex flex-col gap-4" style={{ gridColumn: 'span 2' }}>
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              {/* Code Playground Header */}
              <div className="flex items-center justify-between p-3 bg-charcoal text-white" style={{ padding: '0.75rem 1rem' }}>
                <div className="flex items-center gap-2">
                  <Terminal style={{ width: '1.125rem', height: '1.125rem', color: 'var(--gold)' }} />
                  <span className="font-mono text-xs font-bold">Solution.js</span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={codeLanguage}
                    onChange={(e) => setCodeLanguage(e.target.value as any)}
                    className="bg-forest text-white border-none text-xs rounded px-2 py-1"
                    style={{ padding: '0.25rem 0.5rem', borderRadius: '0.25rem', backgroundColor: 'var(--forest-light)' }}
                  >
                    <option value="javascript">JavaScript (Node v20)</option>
                    <option value="python">Python 3.11</option>
                    <option value="cpp">C++ 20 (GCC)</option>
                  </select>

                  <Button
                    size="sm"
                    variant="marigold"
                    disabled={isRunning}
                    onClick={handleRunCode}
                  >
                    <Play style={{ width: '0.875rem', height: '0.875rem' }} />
                    {isRunning ? "Running..." : "Run Tests"}
                  </Button>
                </div>
              </div>

              {/* Code Text Area */}
              <div style={{ backgroundColor: '#16261E', padding: '1rem' }}>
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  rows={14}
                  className="font-mono text-xs text-white bg-transparent border-none w-full"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#A7F3D0',
                    outline: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-mono)',
                    lineHeight: '1.6',
                    resize: 'none'
                  }}
                />
              </div>

              {/* Output Console */}
              <div className="border-t bg-paper p-4" style={{ borderTop: '1px solid var(--charcoal-border)', padding: '1rem' }}>
                <div className="text-xs font-bold text-charcoal-muted uppercase mb-1" style={{ marginBottom: '0.25rem' }}>
                  Execution Result:
                </div>
                {testOutput ? (
                  <pre className="font-mono text-xs text-forest bg-white p-3 rounded border whitespace-pre-wrap" style={{ padding: '0.75rem', borderRadius: '0.375rem' }}>
                    {testOutput}
                  </pre>
                ) : (
                  <div className="text-xs text-charcoal-muted italic">
                    Click "Run Tests" to execute your solution against test suites.
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Tab 2: Company Question Bank */}
      {activeTab === "companies" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(COMPANY_QUESTION_BANKS).map(([group, questions]) => (
            <Card key={group} className="flex flex-col gap-3">
              <h3 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.125rem' }}>
                {group}
              </h3>
              <div className="flex flex-col gap-3">
                {questions.map((q, idx) => (
                  <div key={idx} className="p-3 bg-paper rounded-lg border flex flex-col gap-1" style={{ padding: '0.75rem', borderRadius: '0.5rem' }}>
                    <div className="font-semibold text-charcoal text-xs">{q.title}</div>
                    <Badge className="badge-gray self-start" style={{ fontSize: '0.6875rem' }}>{q.tag}</Badge>
                    <p className="text-charcoal-muted text-xs mt-1" style={{ fontSize: '0.75rem' }}>
                      <b>Hint:</b> {q.hint}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab 3: Upcoming Contests Radar */}
      {activeTab === "contests" && (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div className="p-4 bg-paper border-b" style={{ padding: '1rem', borderBottom: '1px solid var(--charcoal-border)' }}>
            <h3 className="font-semibold text-charcoal">Global & Campus Competitive Programming Radar</h3>
            <p className="text-charcoal-muted text-xs">Synchronized with CodeForces, LeetCode, and Campus Nexus schedules.</p>
          </div>
          <div className="flex flex-col">
            {UPCOMING_CONTESTS.map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 hover:bg-paper border-b last:border-none"
                style={{ padding: '1rem', borderBottom: i < UPCOMING_CONTESTS.length - 1 ? '1px solid var(--charcoal-border)' : 'none' }}
              >
                <div>
                  <h4 className="font-semibold text-charcoal text-sm">{c.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-charcoal-muted mt-1">
                    <Clock style={{ width: '0.875rem', height: '0.875rem' }} />
                    <span>{c.date}</span>
                    <span>•</span>
                    <Badge className="badge-gray">{c.platform}</Badge>
                  </div>
                </div>

                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline gap-1"
                >
                  <span>Register</span>
                  <ExternalLink style={{ width: '0.75rem', height: '0.75rem' }} />
                </a>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 4: Leaderboard */}
      {activeTab === "leaderboard" && (
        <Card style={{ padding: '1.5rem' }}>
          <div className="flex justify-between items-center mb-4" style={{ marginBottom: '1rem' }}>
            <div>
              <h3 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.25rem' }}>Campus Coding Leaderboard</h3>
              <p className="text-charcoal-muted text-xs">Ranked by reputation points, daily problem streaks, and peer contributions.</p>
            </div>
            <Badge className="badge-gold">Updated Live</Badge>
          </div>

          <div className="flex flex-col gap-2">
            {[
              { name: profile.name, dept: profile.dept, streak: profile.streak, points: profile.points, rank: 1, isUser: true },
              { name: "Rahul Nair", dept: "CSE 4th Year", streak: 12, points: 1190, rank: 2, isUser: false },
              { name: "Aryan Sengupta", dept: "IT 3rd Year", streak: 9, points: 1040, rank: 3, isUser: false },
              { name: "Priya Das", dept: "CSE 3rd Year", streak: 8, points: 980, rank: 4, isUser: false },
              { name: "Tanmay Bansal", dept: "ECE 4th Year", streak: 5, points: 860, rank: 5, isUser: false }
            ].map((user) => (
              <div
                key={user.rank}
                className="flex items-center justify-between p-3 rounded-xl"
                style={{
                  padding: '0.875rem 1rem',
                  borderRadius: '0.75rem',
                  backgroundColor: user.isUser ? 'var(--gold-tint)' : 'var(--paper)',
                  border: user.isUser ? '1px solid rgba(232,163,61,0.4)' : '1px solid var(--charcoal-border)'
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-charcoal" style={{ width: '1.5rem', textAlign: 'center' }}>
                    {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : `#${user.rank}`}
                  </span>
                  <Avatar initials={user.name.split(' ').map(n=>n[0]).slice(0,2).join('')} style={{ width: '2rem', height: '2rem', fontSize: '0.75rem' }} />
                  <div>
                    <div className="font-semibold text-charcoal text-sm">{user.name} {user.isUser && "(You)"}</div>
                    <div className="text-charcoal-muted text-xs">{user.dept} • {user.streak} day streak 🔥</div>
                  </div>
                </div>

                <Badge className={user.isUser ? "badge-gold" : "badge-gray"}>
                  {user.points} pts
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
