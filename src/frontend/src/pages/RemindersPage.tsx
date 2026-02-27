import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Reminder } from "../backend.d";
import {
  useAddReminder,
  useDeleteReminder,
  useGetReminders,
  useToggleReminderComplete,
} from "../hooks/useQueries";

function formatDueDate(dueDate: bigint): string {
  const ms = Number(dueDate) / 1_000_000;
  const date = new Date(ms);
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getReminderStatus(
  dueDate: bigint,
  completed: boolean,
): "completed" | "overdue" | "today" | "upcoming" {
  if (completed) return "completed";
  const ms = Number(dueDate) / 1_000_000;
  const now = Date.now();
  const today = new Date();
  const due = new Date(ms);

  if (ms < now) return "overdue";
  if (
    due.getDate() === today.getDate() &&
    due.getMonth() === today.getMonth() &&
    due.getFullYear() === today.getFullYear()
  )
    return "today";
  return "upcoming";
}

function sortReminders(reminders: Reminder[]): Reminder[] {
  return [...reminders].sort((a, b) => {
    const sa = getReminderStatus(a.dueDate, a.completed);
    const sb = getReminderStatus(b.dueDate, b.completed);

    // Incomplete first
    if (a.completed !== b.completed) return a.completed ? 1 : -1;

    // Then sort by: overdue, today, upcoming
    const order = { overdue: 0, today: 1, upcoming: 2, completed: 3 };
    if (sa !== sb) return order[sa] - order[sb];

    // Then by due date
    return Number(a.dueDate) - Number(b.dueDate);
  });
}

export function RemindersPage() {
  const { data: reminders, isLoading } = useGetReminders();
  const addReminder = useAddReminder();
  const deleteReminder = useDeleteReminder();
  const toggleComplete = useToggleReminderComplete();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title for the reminder.");
      return;
    }
    if (!dueDate) {
      toast.error("Please select a due date and time.");
      return;
    }

    const dueDateMs = new Date(dueDate).getTime();
    if (Number.isNaN(dueDateMs)) {
      toast.error("Invalid date. Please pick again.");
      return;
    }

    const dueDateNs = BigInt(Math.floor(dueDateMs)) * BigInt(1_000_000);

    try {
      await addReminder.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDateNs,
      });
      toast.success("Reminder added!");
      setTitle("");
      setDescription("");
      setDueDate("");
      setShowForm(false);
    } catch {
      toast.error("Failed to add reminder. Try again.");
    }
  };

  const handleDelete = async (reminderTitle: string) => {
    try {
      await deleteReminder.mutateAsync(reminderTitle);
      toast.success("Reminder deleted.");
    } catch {
      toast.error("Failed to delete reminder.");
    }
  };

  const handleToggle = async (reminderTitle: string) => {
    try {
      await toggleComplete.mutateAsync(reminderTitle);
    } catch {
      toast.error("Failed to update reminder.");
    }
  };

  const sorted = sortReminders(reminders ?? []);
  const overdueCount = sorted.filter(
    (r) =>
      !r.completed && getReminderStatus(r.dueDate, r.completed) === "overdue",
  ).length;

  const statusConfig = {
    overdue: {
      label: "Overdue",
      className: "border-red-400/40 bg-red-50 dark:bg-red-950/20",
      badgeClass:
        "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
      icon: AlertCircle,
      iconClass: "text-red-500",
    },
    today: {
      label: "Due Today",
      className: "border-amber-400/40 bg-amber-50 dark:bg-amber-950/20",
      badgeClass:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
      icon: Clock,
      iconClass: "text-amber-500",
    },
    upcoming: {
      label: "Upcoming",
      className: "border-border bg-card",
      badgeClass: "bg-primary/10 text-primary",
      icon: Calendar,
      iconClass: "text-primary",
    },
    completed: {
      label: "Done",
      className: "border-border bg-muted/30 opacity-60",
      badgeClass:
        "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
      icon: CheckCircle2,
      iconClass: "text-green-500",
    },
  };

  // Min datetime for the input (now)
  const nowLocal = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-display font-black flex items-center gap-3">
              <Bell className="w-7 h-7 text-primary" />
              Reminders
              {overdueCount > 0 && (
                <Badge className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {overdueCount} overdue
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground font-ui text-sm mt-1">
              Stay on top of assignments, deadlines, and goals
            </p>
          </div>
          <Button
            onClick={() => setShowForm((v) => !v)}
            className="font-display font-bold"
          >
            {showForm ? (
              <X className="w-4 h-4 mr-2" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            {showForm ? "Cancel" : "Add Reminder"}
          </Button>
        </motion.div>

        {/* Add Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="border-primary/30 shadow-glow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="font-display text-base flex items-center gap-2">
                    <Plus className="w-4 h-4 text-primary" /> New Reminder
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="reminder-title"
                      className="font-ui text-sm font-semibold"
                    >
                      Title <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="reminder-title"
                      placeholder="e.g. Submit Math Assignment"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                      className="font-ui"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="reminder-desc"
                      className="font-ui text-sm font-semibold"
                    >
                      Description (optional)
                    </Label>
                    <Textarea
                      id="reminder-desc"
                      placeholder="Add any extra details..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={2}
                      className="font-ui resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="reminder-date"
                      className="font-ui text-sm font-semibold"
                    >
                      Due Date & Time{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="reminder-date"
                      type="datetime-local"
                      value={dueDate}
                      min={nowLocal}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="font-ui"
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Button
                      onClick={handleAdd}
                      disabled={addReminder.isPending}
                      className="font-display font-bold flex-1"
                    >
                      {addReminder.isPending ? "Saving..." : "Save Reminder"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="font-ui"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reminder List */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((k) => (
              <Skeleton key={k} className="h-24 rounded-xl" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Bell className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="font-display font-bold text-lg">No reminders yet</p>
              <p className="text-muted-foreground text-sm font-ui mt-1">
                Add your first reminder to stay on top of deadlines!
              </p>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="font-display font-bold"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Reminder
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {sorted.map((reminder) => {
                const status = getReminderStatus(
                  reminder.dueDate,
                  reminder.completed,
                );
                const config = statusConfig[status];
                const Icon = config.icon;

                return (
                  <motion.div
                    key={reminder.title}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      className={`border ${config.className} transition-all`}
                    >
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className="pt-0.5">
                          <Checkbox
                            checked={reminder.completed}
                            onCheckedChange={() => handleToggle(reminder.title)}
                            className="w-5 h-5"
                            aria-label={`Mark ${reminder.title} as ${reminder.completed ? "incomplete" : "complete"}`}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <p
                              className={`font-ui font-semibold text-sm leading-tight ${
                                reminder.completed
                                  ? "line-through text-muted-foreground"
                                  : ""
                              }`}
                            >
                              {reminder.title}
                            </p>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-ui font-semibold flex-shrink-0 ${config.badgeClass}`}
                            >
                              {config.label}
                            </span>
                          </div>

                          {reminder.description && (
                            <p className="text-xs text-muted-foreground font-ui mt-1 leading-relaxed">
                              {reminder.description}
                            </p>
                          )}

                          <div className="flex items-center gap-1.5 mt-2">
                            <Icon
                              className={`w-3.5 h-3.5 ${config.iconClass}`}
                            />
                            <span className="text-xs font-ui text-muted-foreground">
                              {formatDueDate(reminder.dueDate)}
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 text-muted-foreground hover:text-destructive flex-shrink-0"
                          onClick={() => handleDelete(reminder.title)}
                          disabled={deleteReminder.isPending}
                          aria-label={`Delete ${reminder.title}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
