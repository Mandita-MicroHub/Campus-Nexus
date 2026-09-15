import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface UserProfile {
  name: string;
  avatar: string;
  dept: string;
  year: string;
  points: number;
  streak: number;
  lastStreakDate?: string;
  bio: string;
  skills: string[];
  github: string;
  resume: string;
  badges: string[];
  resourcesUploaded: number;
  itemsSold: number;
  projectsCompleted: number;
  placementReadiness: number;
  profileCompletion: number;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  seller: string;
  sellerAvatar?: string;
  ts: number;
  sold: boolean;
  wishlist: string[];
  reports: number;
  condition?: string;
  location?: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  subject: string;
  semester: number;
  type: string;
  link: string;
  author: string;
  authorAvatar?: string;
  ts: number;
  ratings: number[];
  downloads: number;
  tags?: string[];
}

export interface PlacementPost {
  id: string;
  type: "Internship opening" | "Placement drive" | "Interview experience" | "OA questions" | "Prep tip";
  company: string;
  role: string;
  salary?: string;
  details: string;
  author: string;
  ts: number;
  tags?: string[];
}

export interface TeamPost {
  id: string;
  project: string;
  role: string;
  details: string;
  contact: string;
  author: string;
  ts: number;
  applicants: string[];
  techStack?: string[];
}

export interface FeedComment {
  id: string;
  author: string;
  authorAvatar?: string;
  text: string;
  ts: number;
}

export interface FeedPost {
  id: string;
  author: string;
  authorDept?: string;
  authorAvatar?: string;
  text: string;
  ts: number;
  likes: string[];
  comments: FeedComment[];
  tag?: string;
}

export interface LostFoundItem {
  id: string;
  type: "Lost" | "Found";
  title: string;
  location: string;
  contact: string;
  author: string;
  ts: number;
  resolved: boolean;
  image?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  category?: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  category: "Coding" | "Community" | "Placement" | "Workshop" | "Cultural";
  registered: boolean;
  attendeesCount: number;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: string;
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type?: "info" | "success" | "points";
  points?: number;
}

interface AppContextType {
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addPoints: (amount: number, reason: string) => void;
  
  marketplace: MarketplaceItem[];
  addMarketplaceItem: (item: Omit<MarketplaceItem, "id" | "ts" | "sold" | "wishlist" | "reports" | "seller">) => void;
  toggleWishlist: (id: string) => void;
  markItemSold: (id: string) => void;
  reportMarketplaceItem: (id: string) => void;

  resources: ResourceItem[];
  addResource: (res: Omit<ResourceItem, "id" | "ts" | "ratings" | "downloads" | "author">) => void;
  rateResource: (id: string, stars: number) => void;
  bumpResourceDownload: (id: string) => void;

  placements: PlacementPost[];
  addPlacement: (post: Omit<PlacementPost, "id" | "ts" | "author">) => void;

  teams: TeamPost[];
  addTeamPost: (team: Omit<TeamPost, "id" | "ts" | "applicants" | "author">) => void;
  applyToTeam: (id: string) => void;

  feed: FeedPost[];
  addFeedPost: (text: string, tag?: string) => void;
  toggleFeedLike: (id: string) => void;
  addFeedComment: (postId: string, text: string) => void;

  lostFound: LostFoundItem[];
  addLostFoundItem: (item: Omit<LostFoundItem, "id" | "ts" | "resolved" | "author">) => void;
  markLostFoundResolved: (id: string) => void;

  tasks: TaskItem[];
  addTask: (task: Omit<TaskItem, "id">) => void;
  updateTaskStatus: (id: string, status: TaskItem["status"]) => void;
  deleteTask: (id: string) => void;

  events: CampusEvent[];
  toggleEventRegistration: (id: string) => void;

  chatMessages: ChatMessage[];
  sendAIMessage: (text: string) => void;

  toasts: ToastNotification[];
  removeToast: (id: string) => void;
  
  theme: "light" | "dark";
  toggleTheme: () => void;
  
  solveDailyChallenge: () => boolean;
  isDailyChallengeSolvedToday: boolean;
}

const INITIAL_PROFILE: UserProfile = {
  name: "Ananya Sharma",
  avatar: "AS",
  dept: "Computer Science & Engineering",
  year: "3rd Year (Batch '27)",
  points: 1240,
  streak: 14,
  lastStreakDate: "",
  bio: "Pre-final year CSE undergrad passionate about Distributed Systems, Full-stack dev, and Open Source. Currently prepping for product internships.",
  skills: ["React", "TypeScript", "Node.js", "Python", "Data Structures", "Docker", "PostgreSQL", "System Design"],
  github: "https://github.com/ananya-sharma",
  resume: "https://drive.google.com/sample-resume",
  badges: ["Top Contributor 🏆", "14-Day Streak 🔥", "Resource Champion 📚", "Problem Solver ⚡"],
  resourcesUploaded: 28,
  itemsSold: 6,
  projectsCompleted: 6,
  placementReadiness: 82,
  profileCompletion: 85
};

const INITIAL_MARKETPLACE: MarketplaceItem[] = [
  {
    id: "mp-1",
    title: "Casio FX-991CW Scientific Calculator",
    category: "Calculators",
    price: 850,
    description: "Mint condition, used for only one semester in Engineering Math. Box and warranty card included.",
    seller: "Rohan Verma",
    ts: Date.now() - 1000 * 60 * 60 * 3,
    sold: false,
    wishlist: ["Ananya Sharma"],
    reports: 0,
    condition: "Like New",
    location: "Hostel 7, Block B"
  },
  {
    id: "mp-2",
    title: "Hero Sprint 21-Speed Bicycle",
    category: "Cycles",
    price: 3200,
    description: "Great campus commuter bike with newly replaced front brake pads and comfortable gel seat cover.",
    seller: "Vikas Patel",
    ts: Date.now() - 1000 * 60 * 60 * 18,
    sold: false,
    wishlist: [],
    reports: 0,
    condition: "Good",
    location: "Campus Main Gate"
  },
  {
    id: "mp-3",
    title: "Database System Concepts (Silberschatz - 7th Ed)",
    category: "Books",
    price: 450,
    description: "Hardcover textbook for DBMS 4th/5th semester with handwritten marginal notes and exam highlights.",
    seller: "Priya Das",
    ts: Date.now() - 1000 * 60 * 60 * 36,
    sold: false,
    wishlist: ["Ananya Sharma"],
    reports: 0,
    condition: "Gently Used",
    location: "Central Library"
  },
  {
    id: "mp-4",
    title: "LG 24-inch Full HD IPS Monitor (75Hz)",
    category: "Monitors",
    price: 4999,
    description: "Dual HDMI ports, ultra-slim bezel, ideal for dorm room coding and dual monitor setup.",
    seller: "Aman Gupta",
    ts: Date.now() - 1000 * 60 * 60 * 72,
    sold: false,
    wishlist: [],
    reports: 0,
    condition: "Excellent",
    location: "Hostel 4"
  },
  {
    id: "mp-5",
    title: "Sony WH-CH520 Wireless Bluetooth Headphones",
    category: "Headphones",
    price: 1800,
    description: "50-hour battery life, lightweight, 6 months old. Upgrading to ANC headphones.",
    seller: "Sneha Sen",
    ts: Date.now() - 1000 * 60 * 60 * 96,
    sold: true,
    wishlist: [],
    reports: 0,
    condition: "Like New",
    location: "Girls Hostel 2"
  }
];

const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: "res-1",
    title: "DBMS Unit 3 & 4: Normalization & Query Optimization",
    subject: "Database Management Systems",
    semester: 4,
    type: "Notes",
    link: "https://drive.google.com/file/d/sample-dbms-notes",
    author: "Ananya Sharma",
    ts: Date.now() - 1000 * 60 * 60 * 24,
    ratings: [5, 5, 4, 5, 5],
    downloads: 142,
    tags: ["DBMS", "Normalization", "3NF", "BCNF", "SQL"]
  },
  {
    id: "res-2",
    title: "Operating Systems End-Sem PYQ (2020-2025 Solved)",
    subject: "Operating Systems",
    semester: 4,
    type: "Previous year paper",
    link: "https://drive.google.com/file/d/sample-os-pyq",
    author: "Rahul Nair",
    ts: Date.now() - 1000 * 60 * 60 * 48,
    ratings: [5, 5, 5, 4],
    downloads: 289,
    tags: ["OS", "PYQ", "Process Sync", "Deadlocks"]
  },
  {
    id: "res-3",
    title: "Computer Networks Complete Lab Manual with Packet Tracer",
    subject: "Computer Networks",
    semester: 5,
    type: "Lab manual",
    link: "https://drive.google.com/file/d/sample-cn-lab",
    author: "Kavya Menon",
    ts: Date.now() - 1000 * 60 * 60 * 120,
    ratings: [4, 5, 5],
    downloads: 98,
    tags: ["CN", "Wireshark", "Cisco", "Subnetting"]
  },
  {
    id: "res-4",
    title: "Design and Analysis of Algorithms - DP Cheat Sheet",
    subject: "Algorithms",
    semester: 3,
    type: "Notes",
    link: "https://drive.google.com/file/d/sample-daa-dp",
    author: "Aryan Sengupta",
    ts: Date.now() - 1000 * 60 * 60 * 180,
    ratings: [5, 5, 5, 5, 5],
    downloads: 412,
    tags: ["DAA", "Dynamic Programming", "Knapsack", "Graphs"]
  }
];

const INITIAL_PLACEMENTS: PlacementPost[] = [
  {
    id: "pl-1",
    type: "Internship opening",
    company: "Google",
    role: "Software Engineering Intern (Summer 2027)",
    salary: "₹1,15,000/mo",
    details: "Eligibility: 2027 Batch B.Tech/M.Tech. Online assessment scheduled for next month. Focus on Graphs, Trees, Dynamic Programming, and System fundamentals.",
    author: "Placement Cell Admin",
    ts: Date.now() - 1000 * 60 * 60 * 5,
    tags: ["SWE", "On-Campus", "FAANG"]
  },
  {
    id: "pl-2",
    type: "Interview experience",
    company: "Razorpay",
    role: "Frontend Engineering Intern",
    salary: "₹35,000/mo",
    details: "Round 1: Machine coding in React (built a Debounced Typeahead Search). Round 2: JS internals, Promises, Event Loop, React reconciliation & Virtual DOM. Round 3: Culture fit & past projects.",
    author: "Siddharth Rao",
    ts: Date.now() - 1000 * 60 * 60 * 22,
    tags: ["Frontend", "React", "Experience"]
  },
  {
    id: "pl-3",
    type: "OA questions",
    company: "Amazon",
    role: "SDE 1 Full-time 2026",
    salary: "₹28.5 LPA",
    details: "Online Assessment had 2 coding questions: 1. Minimum cost to connect all distribution hubs (Prim/Kruskal). 2. Substring matching with at most K distinct characters (Sliding Window). Time was 70 mins.",
    author: "Divya Joshi",
    ts: Date.now() - 1000 * 60 * 60 * 45,
    tags: ["Amazon", "OA", "DSA"]
  }
];

const INITIAL_TEAMS: TeamPost[] = [
  {
    id: "team-1",
    project: "Smart India Hackathon 2026 (Disaster Management AI)",
    role: "Computer Vision / ML Engineer & UI Designer",
    details: "We are building an edge-AI drone video analysis system for post-flood rescue coordination. We have 3 members (2 Backend/Cloud, 1 Hardware) and need 1 ML engineer and 1 React Native designer.",
    contact: "ananya.sharma@kiit.ac.in",
    author: "Ananya Sharma",
    ts: Date.now() - 1000 * 60 * 60 * 12,
    applicants: ["Aryan Sengupta", "Nikhil Raj"],
    techStack: ["PyTorch", "YOLOv9", "React Native", "FastAPI"]
  },
  {
    id: "team-2",
    project: "Web3 Campus Micro-economy DApp",
    role: "Solidity / Smart Contract Developer",
    details: "Developing decentralized peer-to-peer campus marketplace on Polygon with zero gas fees for verified university students.",
    contact: "vikram.web3@student.org",
    author: "Vikram Malhotra",
    ts: Date.now() - 1000 * 60 * 60 * 30,
    applicants: [],
    techStack: ["Solidity", "Hardhat", "Ethers.js", "Next.js"]
  }
];

const INITIAL_FEED: FeedPost[] = [
  {
    id: "feed-1",
    author: "Tanmay Bansal",
    authorDept: "CSE 3rd Year",
    text: "Has anyone taken Professor Sen's Advanced Distributed Systems elective? Looking for reviews regarding grading policy and project workload.",
    ts: Date.now() - 1000 * 60 * 60 * 2,
    likes: ["Ananya Sharma", "Kavya Menon", "Rohan Verma"],
    comments: [
      {
        id: "c-1",
        author: "Priya Das",
        text: "The labs are intense (Raft consensus in Go), but grading is very fair if you demonstrate working test cases.",
        ts: Date.now() - 1000 * 60 * 45
      }
    ],
    tag: "Academics"
  },
  {
    id: "feed-2",
    author: "Campus Coding Society",
    authorDept: "Official Club",
    text: "🚀 The Annual Nexus Hack Sprint is going live this weekend! Over ₹1,00,000 in cash prizes, direct interview fast-tracks with top startups. Register your teams by Friday!",
    ts: Date.now() - 1000 * 60 * 60 * 8,
    likes: ["Ananya Sharma", "Aryan Sengupta", "Siddharth Rao", "Divya Joshi", "Vikram Malhotra"],
    comments: [],
    tag: "Hackathon"
  }
];

const INITIAL_LOST_FOUND: LostFoundItem[] = [
  {
    id: "lf-1",
    type: "Lost",
    title: "Titan Black Leather Smartwatch",
    location: "Campus Central Cafeteria, Table near Coffee Machine",
    contact: "9876543210 (WhatsApp)",
    author: "Nikhil Raj",
    ts: Date.now() - 1000 * 60 * 60 * 4,
    resolved: false
  },
  {
    id: "lf-2",
    type: "Found",
    title: "Set of 3 Room Keys with Blue KIIT Lanyard",
    location: "Library 2nd Floor Silent Zone, Table 14",
    contact: "Handed over to Library Reception Desk",
    author: "Ananya Sharma",
    ts: Date.now() - 1000 * 60 * 60 * 14,
    resolved: false
  },
  {
    id: "lf-3",
    type: "Lost",
    title: "MacBook 67W USB-C Power Adapter",
    location: "Audi 3, Row G",
    contact: "rohan.v@student.kiit.ac.in",
    author: "Rohan Verma",
    ts: Date.now() - 1000 * 60 * 60 * 50,
    resolved: true
  }
];

const INITIAL_TASKS: TaskItem[] = [
  {
    id: "task-1",
    title: "Submit DBMS Unit 4 Assignment on Normalization",
    description: "Solve questions 1 through 8 in textbook, submit PDF on Moodle before 11:59 PM.",
    status: "in_progress",
    priority: "high",
    dueDate: "Tomorrow",
    category: "Academics"
  },
  {
    id: "task-2",
    title: "Solve Daily LeetCode Challenge (Graph DFS/BFS)",
    description: "Maintain 14-day streak for Campus Leaderboard bonus points.",
    status: "todo",
    priority: "medium",
    dueDate: "Today",
    category: "Coding"
  },
  {
    id: "task-3",
    title: "Revise Operating Systems Virtual Memory & Paging",
    description: "Prepare short notes for mock technical interview on Friday.",
    status: "todo",
    priority: "medium",
    dueDate: "Jul 8",
    category: "Placement"
  },
  {
    id: "task-4",
    title: "Update GitHub Profile Readme & Link Live Demos",
    description: "Add deployed URL for Nexus microservice project.",
    status: "done",
    priority: "low",
    dueDate: "Yesterday",
    category: "Profile"
  }
];

const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: "ev-1",
    title: "Google Developer Student Club Annual Tech Summit",
    organizer: "GDSC Campus Chapter",
    date: "Jul 10, 2026",
    time: "5:00 PM - 8:30 PM",
    location: "Main Auditorium & Hybrid Stream",
    category: "Community",
    registered: true,
    attendeesCount: 240,
    description: "Keynote talks by Google engineers on Cloud Native Architectures, GenAI APIs, and career roadmaps."
  },
  {
    id: "ev-2",
    title: "Campus Nexus 24h Hackathon 2026",
    organizer: "Coding Society",
    date: "Jul 12-13, 2026",
    time: "9:00 AM Kickoff",
    location: "Tech Innovation Hub (Lab 4 & 5)",
    category: "Coding",
    registered: true,
    attendeesCount: 180,
    description: "Build groundbreaking campus & edtech software tools. Mentors from Microsoft & Razorpay available on site."
  },
  {
    id: "ev-3",
    title: "Senior Placement Insights & Mock Technical Interviews",
    organizer: "Placement Cell & Alumni Network",
    date: "Jul 18, 2026",
    time: "2:00 PM - 6:00 PM",
    location: "Conference Hall B",
    category: "Placement",
    registered: false,
    attendeesCount: 95,
    description: "1-on-1 resume reviews and simulated coding rounds with seniors placed at Google, Uber, and Atlassian."
  },
  {
    id: "ev-4",
    title: "Open Source Git & Cloud Workshop for Beginners",
    organizer: "FOSS Student Club",
    date: "Jul 22, 2026",
    time: "4:00 PM - 7:00 PM",
    location: "Computing Centre Lab 2",
    category: "Workshop",
    registered: false,
    attendeesCount: 65,
    description: "Learn Git branching, pull requests, CI/CD with GitHub Actions, and containerization with Docker."
  }
];

const INITIAL_AI_CHAT: ChatMessage[] = [
  {
    id: "chat-0",
    role: "bot",
    text: "Hello Ananya! 👋 I am your Campus Nexus AI Assistant. I have live access to campus notes, contest schedules, placement updates, and teammate listings. Ask me anything!",
    timestamp: "Just now"
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(`campus_nexus_${key}`);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(`campus_nexus_${key}`, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to save ${key} to localStorage`, err);
  }
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>(() => loadFromStorage("profile", INITIAL_PROFILE));
  const [marketplace, setMarketplace] = useState<MarketplaceItem[]>(() => loadFromStorage("marketplace", INITIAL_MARKETPLACE));
  const [resources, setResources] = useState<ResourceItem[]>(() => loadFromStorage("resources", INITIAL_RESOURCES));
  const [placements, setPlacements] = useState<PlacementPost[]>(() => loadFromStorage("placements", INITIAL_PLACEMENTS));
  const [teams, setTeams] = useState<TeamPost[]>(() => loadFromStorage("teams", INITIAL_TEAMS));
  const [feed, setFeed] = useState<FeedPost[]>(() => loadFromStorage("feed", INITIAL_FEED));
  const [lostFound, setLostFound] = useState<LostFoundItem[]>(() => loadFromStorage("lostfound", INITIAL_LOST_FOUND));
  const [tasks, setTasks] = useState<TaskItem[]>(() => loadFromStorage("tasks", INITIAL_TASKS));
  const [events, setEvents] = useState<CampusEvent[]>(() => loadFromStorage("events", INITIAL_EVENTS));
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => loadFromStorage("chat", INITIAL_AI_CHAT));
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">(() => loadFromStorage("theme", "light"));

  const todayStr = new Date().toISOString().slice(0, 10);
  const isDailyChallengeSolvedToday = profile.lastStreakDate === todayStr;

  useEffect(() => {
    saveToStorage("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => { saveToStorage("profile", profile); }, [profile]);
  useEffect(() => { saveToStorage("marketplace", marketplace); }, [marketplace]);
  useEffect(() => { saveToStorage("resources", resources); }, [resources]);
  useEffect(() => { saveToStorage("placements", placements); }, [placements]);
  useEffect(() => { saveToStorage("teams", teams); }, [teams]);
  useEffect(() => { saveToStorage("feed", feed); }, [feed]);
  useEffect(() => { saveToStorage("lostfound", lostFound); }, [lostFound]);
  useEffect(() => { saveToStorage("tasks", tasks); }, [tasks]);
  useEffect(() => { saveToStorage("events", events); }, [events]);
  useEffect(() => { saveToStorage("chat", chatMessages); }, [chatMessages]);

  const addToast = (toast: Omit<ToastNotification, "id">) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addPoints = (amount: number, reason: string) => {
    setProfile(prev => ({ ...prev, points: prev.points + amount }));
    addToast({
      title: `+${amount} Reputation Points!`,
      message: `Earned for ${reason}`,
      type: "points",
      points: amount
    });
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
    addToast({
      title: "Profile Updated",
      message: "Your campus portfolio changes have been saved.",
      type: "success"
    });
  };

  const addMarketplaceItem = (item: Omit<MarketplaceItem, "id" | "ts" | "sold" | "wishlist" | "reports" | "seller">) => {
    const newItem: MarketplaceItem = {
      ...item,
      id: `mp-${Date.now()}`,
      seller: profile.name,
      sellerAvatar: profile.avatar,
      ts: Date.now(),
      sold: false,
      wishlist: [],
      reports: 0
    };
    setMarketplace(prev => [newItem, ...prev]);
    addPoints(5, "listing a campus item");
  };

  const toggleWishlist = (id: string) => {
    setMarketplace(prev =>
      prev.map(item => {
        if (item.id === id) {
          const hasWishlisted = item.wishlist.includes(profile.name);
          const newWishlist = hasWishlisted
            ? item.wishlist.filter(n => n !== profile.name)
            : [...item.wishlist, profile.name];
          return { ...item, wishlist: newWishlist };
        }
        return item;
      })
    );
  };

  const markItemSold = (id: string) => {
    setMarketplace(prev =>
      prev.map(item => (item.id === id ? { ...item, sold: true } : item))
    );
    setProfile(prev => ({ ...prev, itemsSold: (prev.itemsSold || 0) + 1 }));
    addPoints(15, "completing a verified campus sale");
  };

  const reportMarketplaceItem = (id: string) => {
    setMarketplace(prev =>
      prev.map(item => (item.id === id ? { ...item, reports: (item.reports || 0) + 1 } : item))
    );
    addToast({
      title: "Item Reported",
      message: "Our campus moderation team has been alerted for review.",
      type: "info"
    });
  };

  const addResource = (res: Omit<ResourceItem, "id" | "ts" | "ratings" | "downloads" | "author">) => {
    const newRes: ResourceItem = {
      ...res,
      id: `res-${Date.now()}`,
      author: profile.name,
      authorAvatar: profile.avatar,
      ts: Date.now(),
      ratings: [5],
      downloads: 1
    };
    setResources(prev => [newRes, ...prev]);
    setProfile(prev => ({ ...prev, resourcesUploaded: (prev.resourcesUploaded || 0) + 1 }));
    addPoints(8, "sharing valuable campus academic notes");
  };

  const rateResource = (id: string, stars: number) => {
    setResources(prev =>
      prev.map(item => (item.id === id ? { ...item, ratings: [...item.ratings, stars] } : item))
    );
    addToast({
      title: "Rating Submitted",
      message: `You rated this resource ${stars} stars. Thanks for peer feedback!`,
      type: "success"
    });
  };

  const bumpResourceDownload = (id: string) => {
    setResources(prev =>
      prev.map(item => (item.id === id ? { ...item, downloads: item.downloads + 1 } : item))
    );
  };

  const addPlacement = (post: Omit<PlacementPost, "id" | "ts" | "author">) => {
    const newPl: PlacementPost = {
      ...post,
      id: `pl-${Date.now()}`,
      author: profile.name,
      ts: Date.now()
    };
    setPlacements(prev => [newPl, ...prev]);
    addPoints(6, "sharing a placement or interview insight");
  };

  const addTeamPost = (team: Omit<TeamPost, "id" | "ts" | "applicants" | "author">) => {
    const newTeam: TeamPost = {
      ...team,
      id: `team-${Date.now()}`,
      author: profile.name,
      ts: Date.now(),
      applicants: []
    };
    setTeams(prev => [newTeam, ...prev]);
    addPoints(4, "posting a hackathon team listing");
  };

  const applyToTeam = (id: string) => {
    setTeams(prev =>
      prev.map(team => {
        if (team.id === id && !team.applicants.includes(profile.name)) {
          return { ...team, applicants: [...team.applicants, profile.name] };
        }
        return team;
      })
    );
    addToast({
      title: "Application Sent!",
      message: "The team organizer has received your portfolio & contact info.",
      type: "success"
    });
  };

  const addFeedPost = (text: string, tag: string = "Discussion") => {
    const newFeed: FeedPost = {
      id: `feed-${Date.now()}`,
      author: profile.name,
      authorDept: profile.dept,
      authorAvatar: profile.avatar,
      text,
      ts: Date.now(),
      likes: [],
      comments: [],
      tag
    };
    setFeed(prev => [newFeed, ...prev]);
    addPoints(2, "participating in campus discussions");
  };

  const toggleFeedLike = (id: string) => {
    setFeed(prev =>
      prev.map(post => {
        if (post.id === id) {
          const hasLiked = post.likes.includes(profile.name);
          return {
            ...post,
            likes: hasLiked
              ? post.likes.filter(u => u !== profile.name)
              : [...post.likes, profile.name]
          };
        }
        return post;
      })
    );
  };

  const addFeedComment = (postId: string, text: string) => {
    const newComment: FeedComment = {
      id: `comment-${Date.now()}`,
      author: profile.name,
      authorAvatar: profile.avatar,
      text,
      ts: Date.now()
    };
    setFeed(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  const addLostFoundItem = (item: Omit<LostFoundItem, "id" | "ts" | "resolved" | "author">) => {
    const newItem: LostFoundItem = {
      ...item,
      id: `lf-${Date.now()}`,
      author: profile.name,
      ts: Date.now(),
      resolved: false
    };
    setLostFound(prev => [newItem, ...prev]);
    addToast({
      title: "Item Notice Published",
      message: "Campus community notified for this lost/found entry.",
      type: "info"
    });
  };

  const markLostFoundResolved = (id: string) => {
    setLostFound(prev =>
      prev.map(item => (item.id === id ? { ...item, resolved: true } : item))
    );
    addToast({
      title: "Marked as Resolved",
      message: "Great news! Glad the item was returned.",
      type: "success"
    });
  };

  const addTask = (task: Omit<TaskItem, "id">) => {
    const newTask: TaskItem = {
      ...task,
      id: `task-${Date.now()}`
    };
    setTasks(prev => [newTask, ...prev]);
    addToast({
      title: "Task Added",
      message: `"${task.title}" added to your study tracker.`,
      type: "info"
    });
  };

  const updateTaskStatus = (id: string, status: TaskItem["status"]) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === id) {
          if (status === "done" && task.status !== "done") {
            addPoints(5, `completing task: ${task.title}`);
          }
          return { ...task, status };
        }
        return task;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleEventRegistration = (id: string) => {
    setEvents(prev =>
      prev.map(ev => {
        if (ev.id === id) {
          const isReg = !ev.registered;
          addToast({
            title: isReg ? "Registered for Event! 🎉" : "Registration Cancelled",
            message: isReg ? `You're all set for ${ev.title}. Added to calendar.` : `Removed ${ev.title}.`,
            type: isReg ? "success" : "info"
          });
          return {
            ...ev,
            registered: isReg,
            attendeesCount: isReg ? ev.attendeesCount + 1 : ev.attendeesCount - 1
          };
        }
        return ev;
      })
    );
  };

  const solveDailyChallenge = () => {
    const today = new Date().toISOString().slice(0, 10);
    if (profile.lastStreakDate === today) return false;

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const newStreak = profile.lastStreakDate === yesterday ? profile.streak + 1 : 1;

    setProfile(prev => ({
      ...prev,
      streak: newStreak,
      lastStreakDate: today,
      points: prev.points + 10
    }));

    addToast({
      title: "Challenge Solved! 🔥",
      message: `Streak updated to ${newStreak} days! +10 Points earned.`,
      type: "points",
      points: 10
    });
    return true;
  };

  const sendAIMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      text,
      timestamp: "Just now"
    };

    setChatMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const q = text.toLowerCase();
      let botReply = "";

      if (q.includes("contest") || q.includes("codeforces") || q.includes("leetcode")) {
        botReply = "🏆 Upcoming contests for you: \n• CodeForces Div 2 Round (Jul 5, 2026)\n• LeetCode Weekly Contest (Jul 6, 2026)\n• Campus Nexus 24h Hack Sprint (Jul 12, 2026)\n\nHead over to the Coding Hub tab to log your daily challenge solutions!";
      } else if (q.includes("dbms") || q.includes("notes") || q.includes("os") || q.includes("paper") || q.includes("study")) {
        const found = resources.filter(r =>
          q.split(" ").some(w => w.length > 2 && (r.title.toLowerCase().includes(w) || r.subject.toLowerCase().includes(w)))
        );
        if (found.length > 0) {
          botReply = `📚 Found ${found.length} peer-reviewed resources on campus:\n` +
            found.slice(0, 3).map(r => `• ${r.title} (${r.subject}, Sem ${r.semester}) - Rated ${r.ratings.reduce((a,b)=>a+b,0)/r.ratings.length}⭐`).join("\n") +
            "\n\nYou can view and download them in the Resource Hub.";
        } else {
          botReply = "📚 We have notes on DBMS, Operating Systems, Computer Networks, and DAA in the Resource Hub. Would you like to check Semester 3 or 4?";
        }
      } else if (q.includes("intern") || q.includes("placement") || q.includes("salary") || q.includes("job")) {
        const latest = placements[0];
        botReply = `💼 Latest opportunity on campus:\nCompany: ${latest?.company || "Google"}\nRole: ${latest?.role || "SWE Intern"}\nStipend/Package: ${latest?.salary || "Competitive"}\n\nDetails: ${latest?.details || "Check Placement Hub for full interview rounds and tips."}`;
      } else if (q.includes("team") || q.includes("hackathon") || q.includes("partner") || q.includes("collaborat")) {
        const latestTeam = teams[0];
        botReply = `🤝 Active Team Finder Listing:\nProject: "${latestTeam?.project || "SIH Hackathon"}"\nLooking for: ${latestTeam?.role || "React / ML Developers"}\nContact: ${latestTeam?.contact || "Reach out directly in Team Finder!"}`;
      } else if (q.includes("market") || q.includes("buy") || q.includes("sell") || q.includes("calculator") || q.includes("cycle")) {
        botReply = `🛒 In the Campus Marketplace, there are currently ${marketplace.filter(m => !m.sold).length} active student listings (Scientific Calculators, Cycles, DBMS Books, Monitors). All transactions can be inspected directly on campus!`;
      } else {
        botReply = `I'm here to help! You can ask me:\n• "Show me DBMS notes & past papers"\n• "When is the next coding contest?"\n• "Are there any internship drives currently active?"\n• "Who is looking for teammates for hackathons?"\n• "Give me a checklist for frontend interview prep."`;
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "bot",
        text: botReply,
        timestamp: "Just now"
      };

      setChatMessages(prev => [...prev, botMsg]);
    }, 450);
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        addPoints,
        marketplace,
        addMarketplaceItem,
        toggleWishlist,
        markItemSold,
        reportMarketplaceItem,
        resources,
        addResource,
        rateResource,
        bumpResourceDownload,
        placements,
        addPlacement,
        teams,
        addTeamPost,
        applyToTeam,
        feed,
        addFeedPost,
        toggleFeedLike,
        addFeedComment,
        lostFound,
        addLostFoundItem,
        markLostFoundResolved,
        tasks,
        addTask,
        updateTaskStatus,
        deleteTask,
        events,
        toggleEventRegistration,
        chatMessages,
        sendAIMessage,
        toasts,
        removeToast,
        theme,
        toggleTheme,
        solveDailyChallenge,
        isDailyChallengeSolvedToday
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
