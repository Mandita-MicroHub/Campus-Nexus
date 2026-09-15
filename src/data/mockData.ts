export const MOCK_USER = {
  name: "Ananya Sharma",
  avatar: "AS",
  reputation: 1240,
  reputationTrend: "+12 this week",
  streak: 14,
  resourcesShared: 28,
  projectsCompleted: 6,
  placementReadiness: 82,
  profileCompletion: 78
};

export const CAMPUS_ACTIVITY = [
  { id: 1, user: "Rahul", action: "shared", target: "\"DBMS Interview Notes\"", time: "2h ago", avatar: "R" },
  { id: 2, user: "Aryan", action: "completed", target: "a 30-day coding challenge", time: "5h ago", avatar: "A" },
  { id: 3, user: "Priya", action: "uploaded", target: "\"Operating Systems Cheat Sheet\"", time: "1d ago", avatar: "P" },
  { id: 4, user: "Campus Coding Club", action: "announced", target: "a new contest", time: "1d ago", avatar: "CC" }
];

export const UPCOMING_EVENTS = [
  { id: 1, title: "Google Developer Student Club Meetup", date: "Today, 5:00 PM", category: "Community" },
  { id: 2, title: "DSA Coding Contest", date: "Tomorrow, 10:00 AM", category: "Coding" },
  { id: 3, title: "Resume Review Session", date: "Friday, 4:00 PM", category: "Placement" },
];

export const CODING_STATS = {
  solved: 186,
  easy: 92,
  medium: 71,
  hard: 23,
  rank: 42
};

export const RECOMMENDED_OPPORTUNITIES = [
  { id: 1, role: "Software Engineering Intern", company: "Google", location: "Bangalore", deadline: "Aug 30" },
  { id: 2, role: "Frontend Developer Intern", company: "Razorpay", location: "Remote", deadline: "Sep 5" }
];

export const READINESS_SCORES = [
  { category: "DSA", score: 78 },
  { category: "Development", score: 84 },
  { category: "Resume", score: 90 },
  { category: "Interview", score: 65 }
];
