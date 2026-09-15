import { useState } from "react";
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, 
  Clock 
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

const MONTH_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

const SCHEDULED_ITEMS: { [key: number]: { title: string; category: string; time: string; color: string }[] } = {
  5: [{ title: "CodeForces Div 2 Round", category: "Coding", time: "8:00 PM", color: "var(--coral)" }],
  6: [{ title: "LeetCode Biweekly Contest", category: "Coding", time: "8:00 PM", color: "var(--coral)" }],
  10: [
    { title: "GDSC Tech Summit", category: "Community", time: "5:00 PM", color: "var(--forest-light)" },
    { title: "DBMS Unit 4 Assignment Due", category: "Academics", time: "11:59 PM", color: "var(--gold-dark)" }
  ],
  12: [{ title: "Campus Nexus 24h Hackathon", category: "Hackathon", time: "9:00 AM", color: "var(--accent-purple)" }],
  13: [{ title: "Hackathon Project Demos", category: "Hackathon", time: "4:00 PM", color: "var(--accent-purple)" }],
  18: [{ title: "Senior Placement Mock Technical Interviews", category: "Placement", time: "2:00 PM", color: "var(--gold-dark)" }],
  22: [{ title: "Open Source Git & Cloud Workshop", category: "Workshop", time: "4:00 PM", color: "var(--forest-light)" }]
};

export const CalendarPage = () => {
  const [selectedDay, setSelectedDay] = useState(10);
  const activeDayEvents = SCHEDULED_ITEMS[selectedDay] || [];

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="page-head" style={{ marginBottom: 0 }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
          <Badge className="badge-gold">Unified Academic Schedule</Badge>
          <span className="text-charcoal-muted" style={{ fontSize: '0.8125rem' }}>• July 2026</span>
        </div>
        <h1>Campus Master Calendar</h1>
        <p>Stay ahead of assignment deadlines, coding contests, campus tech summits, and placement mock interviews.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <Card className="lg:col-span-2 flex flex-col gap-4" style={{ gridColumn: 'span 2', padding: '1.5rem' }}>
          <div className="flex items-center justify-between pb-3 border-b" style={{ borderBottom: '1px solid var(--charcoal-border)', paddingBottom: '0.75rem' }}>
            <h2 className="font-display font-semibold text-charcoal text-lg">
              July 2026
            </h2>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="p-1">
                <ChevronLeft style={{ width: '1rem', height: '1rem' }} />
              </Button>
              <Button size="sm" variant="outline" className="p-1">
                <ChevronRight style={{ width: '1rem', height: '1rem' }} />
              </Button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-charcoal-muted uppercase" style={{ marginBottom: '0.5rem' }}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
              <div key={d} style={{ padding: '0.5rem 0' }}>{d}</div>
            ))}
          </div>

          {/* Dates Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty offset days for July 1 (Wednesday start) */}
            <div className="p-2 opacity-0"></div>
            <div className="p-2 opacity-0"></div>
            <div className="p-2 opacity-0"></div>

            {MONTH_DAYS.map(day => {
              const eventsForDay = SCHEDULED_ITEMS[day];
              const isSelected = selectedDay === day;

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`p-2 rounded-xl flex flex-col justify-between cursor-pointer transition min-h-16 ${
                    isSelected ? 'bg-forest text-white shadow-md' : 'bg-paper text-charcoal hover:bg-forest-tint'
                  }`}
                  style={{ minHeight: '64px', padding: '0.5rem' }}
                >
                  <span className="font-bold text-xs">{day}</span>
                  {eventsForDay && (
                    <div className="flex gap-1 flex-wrap mt-1">
                      {eventsForDay.map((ev, idx) => (
                        <span
                          key={idx}
                          className="w-2 h-2 rounded-full"
                          style={{
                            width: '0.5rem',
                            height: '0.5rem',
                            borderRadius: '50%',
                            backgroundColor: isSelected ? 'var(--gold)' : ev.color
                          }}
                          title={ev.title}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Selected Day Agenda */}
        <Card className="flex flex-col gap-4" style={{ padding: '1.5rem' }}>
          <div className="flex items-center gap-2 border-b pb-3" style={{ borderBottom: '1px solid var(--charcoal-border)', paddingBottom: '0.75rem' }}>
            <CalendarIcon style={{ width: '1.25rem', height: '1.25rem', color: 'var(--forest-light)' }} />
            <h3 className="font-display font-semibold text-charcoal text-base">
              Agenda for July {selectedDay}, 2026
            </h3>
          </div>

          {activeDayEvents.length === 0 ? (
            <div className="p-6 text-center text-charcoal-muted text-xs bg-paper rounded-xl" style={{ padding: '2rem 1rem', borderRadius: '0.75rem' }}>
              No campus deadlines or events scheduled for this day. Free study session!
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {activeDayEvents.map((item, idx) => (
                <div key={idx} className="p-3 bg-paper rounded-xl border flex flex-col gap-1.5" style={{ padding: '0.875rem', borderRadius: '0.75rem' }}>
                  <div className="flex justify-between items-start">
                    <Badge className="badge-gray" style={{ fontSize: '0.6875rem' }}>{item.category}</Badge>
                    <span className="text-xs text-charcoal-muted flex items-center gap-1 font-medium">
                      <Clock style={{ width: '0.75rem', height: '0.75rem' }} />
                      {item.time}
                    </span>
                  </div>
                  <h4 className="font-semibold text-charcoal text-sm">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
