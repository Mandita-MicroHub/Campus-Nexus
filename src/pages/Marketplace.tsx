import { useState } from "react";
import { 
  ShoppingBag, Plus, Star, AlertTriangle, ShieldCheck, 
  MessageCircle, Flag, CheckCircle, Sparkles, X 
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Avatar } from "../components/ui/Avatar";
import { useApp, type MarketplaceItem } from "../context/AppContext";

const CATEGORIES = [
  "All Categories",
  "Calculators",
  "Cycles",
  "Books",
  "Monitors",
  "Laptops",
  "Headphones",
  "Hostel Furniture",
  "Other"
];

export const Marketplace = () => {
  const { profile, marketplace, addMarketplaceItem, toggleWishlist, markItemSold, reportMarketplaceItem } = useApp();

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [filterView, setFilterView] = useState<"all" | "active" | "wishlist">("active");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeChatSellerItem, setActiveChatSellerItem] = useState<MarketplaceItem | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: "Seller", text: "Hey! Yes, the item is still available. You can inspect it in hostel 7 or meet at the central library cafeteria.", time: "2:15 PM" }
  ]);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Books");
  const [formPrice, setFormPrice] = useState("");
  const [formCondition, setFormCondition] = useState("Like New");
  const [formLocation, setFormLocation] = useState("Campus Hostels");
  const [formDescription, setFormDescription] = useState("");
  const [aiHelperKeyword, setAiHelperKeyword] = useState("");

  // Price Scam Alert Logic
  const getAveragePrice = (cat: string) => {
    const matching = marketplace.filter(m => m.category === cat && m.price > 0);
    if (matching.length === 0) return null;
    return Math.round(matching.reduce((acc, m) => acc + m.price, 0) / matching.length);
  };

  const currentAvg = getAveragePrice(formCategory);
  const inputPriceNum = parseFloat(formPrice);
  const isSuspiciousLow = currentAvg && inputPriceNum && inputPriceNum < currentAvg * 0.35;
  const isSuspiciousHigh = currentAvg && inputPriceNum && inputPriceNum > currentAvg * 2.5;

  // AI Description Generator
  const handleGenerateAiDescription = () => {
    const hint = aiHelperKeyword.trim() || formTitle.trim() || formCategory;
    const generated = `Well-maintained ${hint}. Gently used on campus, tested and fully functional. Includes all original cables/essentials. Ready for immediate on-campus pickup — contact for verification or photos.`;
    setFormDescription(generated);
  };

  // Submit Listing
  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formPrice) return;

    addMarketplaceItem({
      title: formTitle.trim(),
      category: formCategory,
      price: parseFloat(formPrice),
      description: formDescription.trim() || "Available for on-campus pickup.",
      condition: formCondition,
      location: formLocation
    });

    // Reset Form
    setFormTitle("");
    setFormPrice("");
    setFormDescription("");
    setAiHelperKeyword("");
    setShowAddModal(false);
  };

  // Filter items
  const filteredItems = marketplace.filter(item => {
    const matchesCat = selectedCategory === "All Categories" || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchQuery.trim() || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seller.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterView === "active") return matchesCat && matchesSearch && !item.sold;
    if (filterView === "wishlist") return matchesCat && matchesSearch && item.wishlist.includes(profile.name);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="page-head" style={{ marginBottom: 0 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
            <Badge className="badge-gold">Verified Campus Trade</Badge>
            <span className="text-charcoal-muted" style={{ fontSize: '0.8125rem' }}>• Zero Platform Fees</span>
          </div>
          <h1>Campus Marketplace</h1>
          <p>Buy, sell, and swap academic essentials, gadgets, and gear securely with peers on campus.</p>
        </div>

        <Button onClick={() => setShowAddModal(true)} className="gap-2 self-start md:self-auto">
          <Plus style={{ width: '1.125rem', height: '1.125rem' }} />
          List an Item (+5 pts)
        </Button>
      </div>

      {/* Category Pills & Filters */}
      <Card style={{ padding: '1rem' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{ maxWidth: '100%' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat ? 'bg-forest text-white' : 'bg-paper text-charcoal hover:bg-forest-tint'
                }`}
                style={{ padding: '0.375rem 0.875rem', borderRadius: '9999px', fontSize: '0.8125rem' }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items..."
              style={{ width: 'auto', minWidth: '130px', padding: '0.45rem 0.75rem', fontSize: '0.8125rem' }}
            />
            <select
              value={filterView}
              onChange={(e) => setFilterView(e.target.value as any)}
              className="bg-paper"
              style={{ width: 'auto', minWidth: '130px', padding: '0.45rem 0.75rem', fontSize: '0.8125rem' }}
            >
              <option value="active">Available Only</option>
              <option value="all">All Listings</option>
              <option value="wishlist">My Wishlist ({marketplace.filter(m => m.wishlist.includes(profile.name)).length})</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Listings Grid */}
      {filteredItems.length === 0 ? (
        <div className="empty-state">
          <ShoppingBag style={{ width: '3rem', height: '3rem', margin: '0 auto 0.75rem', color: 'var(--charcoal-muted)' }} />
          <h3>No marketplace listings found</h3>
          <p>Try switching categories or be the first to list an item for your peers.</p>
          <Button onClick={() => setShowAddModal(true)} className="mt-4" style={{ marginTop: '1rem' }}>
            List Your Item Now
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => {
            const isOwner = item.seller === profile.name;
            const isWishlisted = item.wishlist.includes(profile.name);

            return (
              <Card key={item.id} className="flex flex-col justify-between hover:-translate-y-1 transition duration-200">
                <div>
                  <div className="flex justify-between items-start" style={{ marginBottom: '0.75rem' }}>
                    <Badge className="badge-gray">{item.category}</Badge>
                    <div className="flex items-center gap-1">
                      {item.sold && <Badge className="badge-coral">Sold Out</Badge>}
                      {item.reports >= 3 && <Badge className="badge-coral">⚠️ Flagged</Badge>}
                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="p-1 rounded-full hover:bg-paper"
                        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Star
                          style={{
                            width: '1.25rem',
                            height: '1.25rem',
                            color: isWishlisted ? 'var(--gold)' : 'var(--charcoal-muted)',
                            fill: isWishlisted ? 'var(--gold)' : 'none'
                          }}
                        />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>
                    {item.title}
                  </h3>

                  <div className="font-display font-bold text-forest" style={{ fontSize: '1.375rem', marginBottom: '0.5rem' }}>
                    ₹{item.price.toLocaleString()}
                  </div>

                  <p className="text-charcoal-muted text-sm" style={{ fontSize: '0.8125rem', lineHeight: '1.4', marginBottom: '1rem' }}>
                    {item.description}
                  </p>

                  <div className="flex flex-col gap-1 text-xs text-charcoal-muted border-t pt-2" style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--charcoal-border)' }}>
                    <div className="flex justify-between">
                      <span>Condition: <b>{item.condition || "Used"}</b></span>
                      <span>Location: <b>{item.location || "Campus"}</b></span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar initials={item.seller.split(' ').map(n=>n[0]).slice(0,2).join('')} style={{ width: '1.25rem', height: '1.25rem', fontSize: '0.625rem' }} />
                      <span>Seller: {item.seller} {isOwner && "(You)"}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t" style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--charcoal-border)' }}>
                  {isOwner && !item.sold ? (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => markItemSold(item.id)}
                      className="w-full"
                    >
                      <CheckCircle style={{ width: '1rem', height: '1rem' }} />
                      Mark as Sold (+15 pts)
                    </Button>
                  ) : !isOwner ? (
                    <>
                      <Button
                        variant="default"
                        size="sm"
                        disabled={item.sold}
                        onClick={() => setActiveChatSellerItem(item)}
                        className="flex-1"
                      >
                        <MessageCircle style={{ width: '0.875rem', height: '0.875rem' }} />
                        Chat Seller
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => reportMarketplaceItem(item.id)}
                        className="text-coral hover:bg-coral-tint"
                        title="Report listing"
                      >
                        <Flag style={{ width: '0.875rem', height: '0.875rem' }} />
                      </Button>
                    </>
                  ) : (
                    <Badge className="badge-gray w-full justify-center">Item Sold ✓</Badge>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
              <h2 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.375rem' }}>
                List an Item on Campus
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-charcoal-muted hover:text-charcoal">
                <X style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="flex flex-col gap-4">
              <div className="form-group">
                <label>Item Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Casio FX-991CW Calculator, Hero Sprint Cycle"
                />
              </div>

              <div className="form-grid">
                <div>
                  <label>Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                  >
                    {CATEGORIES.filter(c => c !== "All Categories").map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Expected Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="e.g. 850"
                  />
                </div>
              </div>

              {/* Price Scam Warning Banner */}
              {isSuspiciousLow && (
                <div className="p-3 bg-coral-tint text-coral rounded-lg flex items-start gap-2 text-xs" style={{ padding: '0.75rem', borderRadius: '0.5rem' }}>
                  <AlertTriangle style={{ width: '1.25rem', height: '1.25rem', flexShrink: 0 }} />
                  <div>
                    <b>Unusually Low Price Alert:</b> Average campus price for {formCategory} is ₹{currentAvg}. Ensure students meet in safe campus spots like Central Library.
                  </div>
                </div>
              )}

              {isSuspiciousHigh && (
                <div className="p-3 bg-gold-tint text-gold-dark rounded-lg flex items-start gap-2 text-xs" style={{ padding: '0.75rem', borderRadius: '0.5rem' }}>
                  <ShieldCheck style={{ width: '1.25rem', height: '1.25rem', flexShrink: 0 }} />
                  <div>
                    <b>Pricing Tip:</b> This price is significantly above typical listings (avg ₹{currentAvg}). Pricing closer to market helps sell faster.
                  </div>
                </div>
              )}

              <div className="form-grid">
                <div>
                  <label>Item Condition</label>
                  <select value={formCondition} onChange={(e) => setFormCondition(e.target.value)}>
                    <option>Brand New</option>
                    <option>Like New</option>
                    <option>Gently Used</option>
                    <option>Well Used</option>
                  </select>
                </div>
                <div>
                  <label>Pickup Location</label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="e.g. Hostel 7, Library"
                  />
                </div>
              </div>

              {/* AI Generator Box */}
              <div className="p-3 bg-paper rounded-lg border" style={{ padding: '0.75rem', borderRadius: '0.5rem' }}>
                <div className="flex justify-between items-center" style={{ marginBottom: '0.375rem' }}>
                  <span className="font-semibold text-charcoal text-xs flex items-center gap-1">
                    <Sparkles style={{ width: '0.875rem', height: '0.875rem', color: 'var(--gold-dark)' }} />
                    AI Description Assistant
                  </span>
                  <Button type="button" size="sm" variant="marigold" onClick={handleGenerateAiDescription}>
                    Auto-Generate
                  </Button>
                </div>
                <input
                  type="text"
                  value={aiHelperKeyword}
                  onChange={(e) => setAiHelperKeyword(e.target.value)}
                  placeholder="Type a few keywords (e.g. 6 months old, scratchless, extra battery)"
                  style={{ fontSize: '0.75rem', padding: '0.4rem 0.6rem' }}
                />
              </div>

              <div className="form-group">
                <label>Detailed Description</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Provide details about condition, reason for selling, accessories included..."
                />
              </div>

              <div className="flex justify-end gap-3" style={{ marginTop: '0.5rem' }}>
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="default">
                  Publish Listing (+5 pts)
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Chat with Seller Modal */}
      {activeChatSellerItem && (
        <div className="modal-overlay" onClick={() => setActiveChatSellerItem(null)}>
          <div className="modal-content" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b pb-3" style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--charcoal-border)' }}>
              <div className="flex items-center gap-3">
                <Avatar initials={activeChatSellerItem.seller.split(' ').map(n=>n[0]).slice(0,2).join('')} />
                <div>
                  <h3 className="font-semibold text-charcoal" style={{ fontSize: '0.9375rem' }}>{activeChatSellerItem.seller}</h3>
                  <p className="text-charcoal-muted" style={{ fontSize: '0.75rem' }}>Re: {activeChatSellerItem.title} (₹{activeChatSellerItem.price})</p>
                </div>
              </div>
              <button onClick={() => setActiveChatSellerItem(null)} className="text-charcoal-muted hover:text-charcoal">
                <X style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>

            {/* Chat message bubbles */}
            <div className="flex flex-col gap-3 my-4 max-h-64 overflow-y-auto p-2 bg-paper rounded-lg" style={{ maxHeight: '240px', padding: '0.75rem', margin: '1rem 0' }}>
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl text-xs max-w-xs ${
                    msg.sender === "You" ? 'bg-forest text-white self-end' : 'bg-white text-charcoal border self-start'
                  }`}
                  style={{ padding: '0.625rem 0.875rem', borderRadius: '0.75rem' }}
                >
                  <p>{msg.text}</p>
                  <span className="block text-right mt-1 opacity-75" style={{ fontSize: '0.625rem' }}>{msg.time}</span>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!chatInput.trim()) return;
                setChatMessages(prev => [...prev, { sender: "You", text: chatInput.trim(), time: "Just now" }]);
                setChatInput("");
                setTimeout(() => {
                  setChatMessages(prev => [...prev, { sender: "Seller", text: "Sounds good! Let's meet tomorrow near the library entrance at 4 PM.", time: "Just now" }]);
                }, 800);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message to seller..."
                style={{ flex: 1 }}
              />
              <Button type="submit" variant="default" size="sm">
                Send
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
