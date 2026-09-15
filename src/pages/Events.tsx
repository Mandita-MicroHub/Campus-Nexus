import { useState } from "react";
import { 
  Calendar, MapPin, Users, CheckCircle, 
  Sparkles 
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useApp } from "../context/AppContext";

const EVENT_CATEGORIES = ["All Events", "Coding", "Community", "Placement", "Workshop"];

export const Events = () => {
  const { events, toggleEventRegistration } = useApp();
  const [selectedCat, setSelectedCat] = useState("All Events");

  const filteredEvents = events.filter(ev => {
    if (selectedCat === "All Events") return true;
    return ev.category === selectedCat;
  });

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="page-head" style={{ marginBottom: 0 }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
          <Badge className="badge-gold">Campus Calendar</Badge>
          <span className="text-charcoal-muted" style={{ fontSize: '0.8125rem' }}>• Official University & Club Events</span>
        </div>
        <h1>Campus Events & Hackathons</h1>
        <p>Discover tech conferences, student society workshops, competitive sprints, and placement seminars.</p>
      </div>

      {/* Category Tabs */}
      <Card style={{ padding: '1rem' }}>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {EVENT_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedCat === cat ? 'bg-forest text-white' : 'bg-paper text-charcoal hover:bg-forest-tint'
              }`}
              style={{ padding: '0.375rem 0.875rem', borderRadius: '9999px', fontSize: '0.8125rem' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map(ev => (
          <Card key={ev.id} className="flex flex-col justify-between hover:border-forest transition">
            <div>
              <div className="flex justify-between items-start" style={{ marginBottom: '0.75rem' }}>
                <Badge className={
                  ev.category === "Coding" ? "badge-coral" :
                  ev.category === "Placement" ? "badge-gold" : "badge-gray"
                }>
                  {ev.category}
                </Badge>

                <span className="flex items-center gap-1 text-xs text-charcoal-muted">
                  <Users style={{ width: '0.875rem', height: '0.875rem' }} />
                  {ev.attendeesCount} Registered
                </span>
              </div>

              <h3 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.25rem', marginBottom: '0.375rem' }}>
                {ev.title}
              </h3>

              <div className="text-xs text-forest font-semibold" style={{ marginBottom: '0.75rem' }}>
                Organized by: {ev.organizer}
              </div>

              <div className="flex flex-col gap-1.5 text-xs text-charcoal-muted mb-3" style={{ marginBottom: '0.75rem' }}>
                <div className="flex items-center gap-2">
                  <Calendar style={{ width: '0.875rem', height: '0.875rem', color: 'var(--gold-dark)' }} />
                  <span>{ev.date} • {ev.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin style={{ width: '0.875rem', height: '0.875rem', color: 'var(--coral)' }} />
                  <span>{ev.location}</span>
                </div>
              </div>

              <p className="text-charcoal-muted text-xs" style={{ lineHeight: '1.5' }}>
                {ev.description}
              </p>
            </div>

            <div className="border-t pt-3 mt-4 flex justify-end" style={{ borderTop: '1px solid var(--charcoal-border)', marginTop: '1rem', paddingTop: '0.75rem' }}>
              <Button
                variant={ev.registered ? "outline" : "default"}
                onClick={() => toggleEventRegistration(ev.id)}
                size="sm"
                className="gap-2"
              >
                {ev.registered ? (
                  <>
                    <CheckCircle style={{ width: '0.875rem', height: '0.875rem', color: 'var(--forest-light)' }} />
                    <span>RSVP Confirmed (Click to Cancel)</span>
                  </>
                ) : (
                  <>
                    <Sparkles style={{ width: '0.875rem', height: '0.875rem' }} />
                    <span>Register for Event</span>
                  </>
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
