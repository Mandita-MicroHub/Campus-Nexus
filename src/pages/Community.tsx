import { useState } from "react";
import { 
  Heart, Send, MessageSquare 
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Avatar } from "../components/ui/Avatar";
import { useApp } from "../context/AppContext";

const TOPIC_TAGS = ["All Topics", "Academics", "Hackathon", "Hostel & Campus", "Placements", "General"];

export const Community = () => {
  const { profile, feed, addFeedPost, toggleFeedLike, addFeedComment } = useApp();

  const [selectedTag, setSelectedTag] = useState("All Topics");
  const [postText, setPostText] = useState("");
  const [postTag, setPostTag] = useState("Academics");
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

    addFeedPost(postText.trim(), postTag);
    setPostText("");
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    addFeedComment(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: "" }));
  };

  const filteredFeed = feed.filter(post => {
    if (selectedTag === "All Topics") return true;
    return post.tag?.toLowerCase() === selectedTag.toLowerCase();
  });

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="page-head" style={{ marginBottom: 0 }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
          <Badge className="badge-gold">Campus Public Square</Badge>
          <span className="text-charcoal-muted" style={{ fontSize: '0.8125rem' }}>• Student Discussions & Announcements</span>
        </div>
        <h1>Community Feed</h1>
        <p>Ask course doubts, discuss university events, and engage with verified students across departments.</p>
      </div>

      {/* New Post Creator */}
      <Card style={{ padding: '1.25rem' }}>
        <form onSubmit={handleCreatePost} className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <Avatar initials={profile.avatar} />
            <textarea
              rows={3}
              required
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder={`Share what's on your mind with the campus, ${profile.name.split(' ')[0]}...`}
              style={{ flex: 1 }}
            />
          </div>

          <div className="flex items-center justify-between border-t pt-3" style={{ borderTop: '1px solid var(--charcoal-border)', paddingTop: '0.75rem' }}>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-charcoal-muted">Topic:</span>
              <select
                value={postTag}
                onChange={(e) => setPostTag(e.target.value)}
                style={{ width: 'auto', padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
              >
                {TOPIC_TAGS.filter(t => t !== "All Topics").map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <Button type="submit" variant="primary" size="sm">
              <Send style={{ width: '0.875rem', height: '0.875rem' }} />
              Post to Campus (+2 pts)
            </Button>
          </div>
        </form>
      </Card>

      {/* Topic Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {TOPIC_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              selectedTag === tag ? 'bg-forest text-white' : 'bg-white text-charcoal border hover:bg-forest-tint'
            }`}
            style={{ padding: '0.375rem 0.875rem', borderRadius: '9999px', fontSize: '0.8125rem' }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Feed List */}
      <div className="flex flex-col gap-4">
        {filteredFeed.map(post => {
          const hasLiked = post.likes.includes(profile.name);

          return (
            <Card key={post.id} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar initials={post.author.split(' ').map(n=>n[0]).slice(0,2).join('')} />
                  <div>
                    <h4 className="font-semibold text-charcoal text-sm">{post.author}</h4>
                    <p className="text-charcoal-muted text-xs">{post.authorDept || "KIIT Undergrad"}</p>
                  </div>
                </div>

                {post.tag && <Badge className="badge-gray">{post.tag}</Badge>}
              </div>

              <p className="text-charcoal text-sm" style={{ fontSize: '0.9375rem', lineHeight: '1.5' }}>
                {post.text}
              </p>

              {/* Action Bar */}
              <div className="flex items-center gap-4 border-t border-b py-2" style={{ borderTop: '1px solid var(--charcoal-border)', borderBottom: '1px solid var(--charcoal-border)', padding: '0.5rem 0' }}>
                <button
                  onClick={() => toggleFeedLike(post.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded hover:bg-paper transition ${
                    hasLiked ? 'text-coral' : 'text-charcoal-muted'
                  }`}
                  style={{ padding: '0.25rem 0.5rem' }}
                >
                  <Heart
                    style={{
                      width: '1rem',
                      height: '1rem',
                      fill: hasLiked ? 'var(--coral)' : 'none',
                      color: hasLiked ? 'var(--coral)' : 'currentColor'
                    }}
                  />
                  <span>{post.likes.length} Likes</span>
                </button>

                <button
                  onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-charcoal-muted px-2 py-1 rounded hover:bg-paper"
                  style={{ padding: '0.25rem 0.5rem' }}
                >
                  <MessageSquare style={{ width: '1rem', height: '1rem' }} />
                  <span>{post.comments.length} Comments</span>
                </button>
              </div>

              {/* Comments Thread */}
              <div className="flex flex-col gap-2 pt-1">
                {post.comments.map(c => (
                  <div key={c.id} className="p-2.5 bg-paper rounded-lg text-xs flex flex-col gap-1" style={{ padding: '0.625rem 0.75rem', borderRadius: '0.5rem' }}>
                    <div className="flex justify-between font-semibold text-charcoal">
                      <span>{c.author}</span>
                      <span className="text-charcoal-muted font-normal text-xs">Reply</span>
                    </div>
                    <p className="text-charcoal">{c.text}</p>
                  </div>
                ))}

                {/* Reply Input */}
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={commentInputs[post.id] || ""}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(post.id); }}
                    placeholder="Write a peer response..."
                    style={{ flex: 1, padding: '0.4rem 0.75rem', fontSize: '0.8125rem' }}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddComment(post.id)}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
