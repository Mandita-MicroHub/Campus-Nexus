import { useState } from "react";
import { 
  Plus, Trash2, CheckCircle2, Clock, 
  X, ArrowLeft 
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useApp, type TaskItem } from "../context/AppContext";

export const Tasks = () => {
  const { tasks, addTask, updateTaskStatus, deleteTask } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formCategory, setFormCategory] = useState("Academics");
  const [formPriority, setFormPriority] = useState<"low" | "medium" | "high">("medium");
  const [formDueDate, setFormDueDate] = useState("Tomorrow");

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    addTask({
      title: formTitle.trim(),
      description: formDesc.trim(),
      status: "todo",
      priority: formPriority,
      category: formCategory,
      dueDate: formDueDate
    });

    setFormTitle("");
    setFormDesc("");
    setShowAddModal(false);
  };

  const todoTasks = tasks.filter(t => t.status === "todo");
  const inProgressTasks = tasks.filter(t => t.status === "in_progress");
  const doneTasks = tasks.filter(t => t.status === "done");

  const renderColumn = (title: string, items: TaskItem[], status: TaskItem["status"], badgeClass: string) => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between p-2 bg-paper rounded-lg" style={{ padding: '0.625rem 0.875rem', borderRadius: '0.75rem' }}>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-charcoal text-sm">{title}</h3>
          <Badge className={badgeClass}>{items.length}</Badge>
        </div>
        {status === "todo" && (
          <button
            onClick={() => setShowAddModal(true)}
            className="text-forest hover:bg-forest-tint p-1 rounded-full"
            title="Add task"
          >
            <Plus style={{ width: '1rem', height: '1rem' }} />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 min-h-64" style={{ minHeight: '320px' }}>
        {items.length === 0 ? (
          <div className="p-6 text-center text-charcoal-muted text-xs border border-dashed rounded-xl bg-white" style={{ padding: '1.5rem 1rem', borderRadius: '0.75rem' }}>
            No tasks in this stage
          </div>
        ) : (
          items.map(task => (
            <Card key={task.id} className="flex flex-col gap-2 hover:border-forest transition" style={{ padding: '1rem' }}>
              <div className="flex items-start justify-between gap-2">
                <Badge className={
                  task.priority === "high" ? "badge-coral" :
                  task.priority === "medium" ? "badge-gold" : "badge-gray"
                } style={{ fontSize: '0.6875rem' }}>
                  {task.priority.toUpperCase()} PRIORITY
                </Badge>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-charcoal-muted hover:text-coral p-1"
                  title="Delete task"
                >
                  <Trash2 style={{ width: '0.875rem', height: '0.875rem' }} />
                </button>
              </div>

              <h4 className="font-semibold text-charcoal text-sm">
                {task.title}
              </h4>

              {task.description && (
                <p className="text-charcoal-muted text-xs line-clamp-2" style={{ lineHeight: '1.4' }}>
                  {task.description}
                </p>
              )}

              <div className="flex items-center justify-between border-t pt-2 mt-1 text-xs text-charcoal-muted" style={{ borderTop: '1px solid var(--charcoal-border)', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
                <span className="flex items-center gap-1">
                  <Clock style={{ width: '0.75rem', height: '0.75rem' }} />
                  {task.dueDate || "No deadline"}
                </span>

                {/* State transition triggers */}
                <div className="flex items-center gap-1">
                  {status === "todo" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateTaskStatus(task.id, "in_progress")}
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.6875rem' }}
                    >
                      Start →
                    </Button>
                  )}

                  {status === "in_progress" && (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateTaskStatus(task.id, "todo")}
                        style={{ padding: '0.2rem 0.4rem', fontSize: '0.6875rem' }}
                        title="Back to todo"
                      >
                        <ArrowLeft style={{ width: '0.75rem', height: '0.75rem' }} />
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => updateTaskStatus(task.id, "done")}
                        style={{ padding: '0.2rem 0.5rem', fontSize: '0.6875rem' }}
                      >
                        Done ✓ (+5 pts)
                      </Button>
                    </>
                  )}

                  {status === "done" && (
                    <span className="text-forest font-bold text-xs flex items-center gap-1">
                      <CheckCircle2 style={{ width: '0.875rem', height: '0.875rem' }} />
                      Completed
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="page-head" style={{ marginBottom: 0 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
            <Badge className="badge-gold">Student Study Planner</Badge>
            <span className="text-charcoal-muted" style={{ fontSize: '0.8125rem' }}>• Earn +5 pts for completed assignments</span>
          </div>
          <h1>My Tasks & Study Kanban</h1>
          <p>Organize homework, coding goals, and interview prep deadlines with progress milestones.</p>
        </div>

        <Button onClick={() => setShowAddModal(true)} className="gap-2 self-start md:self-auto">
          <Plus style={{ width: '1.125rem', height: '1.125rem' }} />
          Add Study Task
        </Button>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderColumn("To Do", todoTasks, "todo", "badge-gray")}
        {renderColumn("In Progress", inProgressTasks, "in_progress", "badge-gold")}
        {renderColumn("Completed", doneTasks, "done", "badge-forest")}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
              <h2 className="font-display font-semibold text-charcoal" style={{ fontSize: '1.375rem' }}>
                Create Study Task
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-charcoal-muted hover:text-charcoal">
                <X style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
              <div className="form-group">
                <label>Task Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Complete DBMS Assignment 4 on 3NF"
                />
              </div>

              <div className="form-grid">
                <div>
                  <label>Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                  >
                    <option>Academics</option>
                    <option>Coding</option>
                    <option>Placement Prep</option>
                    <option>Project Work</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label>Priority</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as any)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Due Date / Target Time</label>
                <input
                  type="text"
                  value={formDueDate}
                  onChange={(e) => setFormDueDate(e.target.value)}
                  placeholder="e.g. Today 11:59 PM, Jul 10"
                />
              </div>

              <div className="form-group">
                <label>Notes & Checklist</label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Additional details, questions to solve, or submission links..."
                />
              </div>

              <div className="flex justify-end gap-3" style={{ marginTop: '0.5rem' }}>
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="default">
                  Save Task
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
