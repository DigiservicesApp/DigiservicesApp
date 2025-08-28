'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDashboardData } from '@/lib/hooks/useDashboardData';
import RandomSparkline from '@/components/ui/RandomSparkline';
import { prioritizeTasksOpenAI } from '@/lib/aiClient';
import { useToast } from '@/components/ui/ToastContext';

type Task = {
  id: string;
  title: string;
  progress: number;
  dueInDays?: number;
  assignee?: string;
  tags?: string[];
};

function formatDue(d?: number) {
  if (typeof d !== 'number') return '—';
  if (d < 0) return `${Math.abs(d)}d late`;
  if (d === 0) return 'today';
  return `${d}d`;
}

function TaskCard({
  t,
  index,
  onChange,
  selected,
  onToggleSelect,
  onDelete,
}: {
  t: Task;
  index: number;
  onChange: (patch: Partial<Task>) => void;
  selected: boolean;
  onToggleSelect: () => void;
  onDelete: () => void;
}) {
  const overdue = typeof t.dueInDays === 'number' && t.dueInDays < 0;
  const upcoming =
    typeof t.dueInDays === 'number' && t.dueInDays <= 3 && t.dueInDays >= 0;
  const [editing, setEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(t.title);

  useEffect(() => setLocalTitle(t.title), [t.title]);

  return (
    <article className="group relative rounded border p-3 bg-[color:var(--md-sys-color-surface)] shadow-sm">
      <div className="absolute left-3 top-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggleSelect}
          aria-label={`select-${t.id}`}
        />
      </div>

      <div className="flex items-start justify-between gap-2">
        <div className="pl-6">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold">
              {index + 1}.{' '}
              {editing ? (
                <input
                  value={localTitle}
                  onChange={(e) => setLocalTitle(e.target.value)}
                  onBlur={() => {
                    setEditing(false);
                    onChange({ title: localTitle.trim() || t.title });
                  }}
                  className="rounded border px-2 py-1 text-sm"
                />
              ) : (
                <button className="text-left" onClick={() => setEditing(true)}>
                  {t.title}
                </button>
              )}
            </h4>
            {overdue && (
              <span className="text-xs text-red-600 font-semibold">
                Overdue
              </span>
            )}
            {!overdue && upcoming && (
              <span className="text-xs text-amber-600 font-semibold">
                Upcoming
              </span>
            )}
          </div>

          <div className="mt-2 flex items-center gap-3">
            <div className="w-32">
              <RandomSparkline
                points={[
                  Math.max(0, t.progress - 8),
                  t.progress,
                  Math.min(100, t.progress + 8),
                ]}
                width={120}
                height={36}
              />
            </div>
            <div className="text-xs text-[color:var(--md-sys-color-on-surface-variant)]">
              ETA: {formatDue(t.dueInDays)}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                onChange({ progress: Math.min(100, t.progress + 10) })
              }
              className="rounded border px-2 py-1 text-xs"
            >
              +10%
            </button>
            <button
              onClick={() =>
                onChange({ progress: Math.max(0, t.progress - 10) })
              }
              className="rounded border px-2 py-1 text-xs"
            >
              -10%
            </button>
          </div>

          <div className="w-36">
            <input
              aria-label={`progress-${t.id}`}
              type="range"
              min={0}
              max={100}
              value={t.progress}
              onChange={(e) => onChange({ progress: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onChange({ dueInDays: (t.dueInDays ?? 3) - 1 })}
              className="text-xs rounded border px-2 py-1"
            >
              Postpone -1d
            </button>
            <button
              onClick={() => onDelete()}
              className="text-xs rounded border px-2 py-1 text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function TasksPage() {
  const { recent, loading, error, refetch } = useDashboardData();
  const [title, setTitle] = useState('');
  const [queue, setQueue] = useState<Task[]>([
    {
      id: 'q1',
      title: 'Design homepage outline',
      progress: 20,
      dueInDays: 5,
      assignee: 'Ava',
    },
    {
      id: 'q2',
      title: 'Implement auth guard',
      progress: 60,
      dueInDays: -1,
      assignee: 'Liam',
    },
    {
      id: 'q3',
      title: 'Create dashboard layout',
      progress: 40,
      dueInDays: 2,
      assignee: 'Noah',
    },
  ]);

  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<
    'all' | 'overdue' | 'upcoming' | 'complete'
  >('all');
  const [aiLoading, setAiLoading] = useState(false);
  const toast = useToast();

  function addTask(e?: React.FormEvent) {
    e?.preventDefault();
    if (!title.trim()) return;
    setQueue((q) => [
      { id: `q${Date.now()}`, title: title.trim(), progress: 0, dueInDays: 3 },
      ...q,
    ]);
    setTitle('');
  }

  function aiPrioritize() {
    // call AI to get a recommended ordering, show toast on result, fallback to heuristic
    (async () => {
      setAiLoading(true);
      try {
        const ordering = await prioritizeTasksOpenAI(queue);
        setQueue((q) => {
          const map = new Map(q.map((t) => [t.id, t]));
          const ordered = ordering
            .map((id) => map.get(id))
            .filter(Boolean) as Task[];
          const rest = q.filter((t) => !ordering.includes(t.id));
          return [...ordered, ...rest];
        });
        toast.show({ message: 'AI prioritized tasks', variant: 'success' });
      } catch (err: any) {
        console.error('AI prioritize failed, falling back to heuristic', err);
        toast.show({
          message: `AI prioritize failed: ${err?.message ?? err}`,
          variant: 'warning',
        });
        // fallback heuristic
        setQueue((q) => {
          const copy = [...q];
          copy.sort((a, b) => {
            const aDue = a.dueInDays ?? 999;
            const bDue = b.dueInDays ?? 999;
            if (aDue !== bDue) return aDue - bDue;
            if (a.title.toLowerCase().includes('auth')) return -1;
            if (b.title.toLowerCase().includes('auth')) return 1;
            return a.progress - b.progress;
          });
          return copy;
        });
      } finally {
        setAiLoading(false);
      }
    })();
  }

  const filtered = useMemo(() => {
    return queue.filter((t) => {
      if (search && !t.title.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (
        filter === 'overdue' &&
        !(typeof t.dueInDays === 'number' && t.dueInDays < 0)
      )
        return false;
      if (
        filter === 'upcoming' &&
        !(
          typeof t.dueInDays === 'number' &&
          t.dueInDays <= 3 &&
          t.dueInDays >= 0
        )
      )
        return false;
      if (filter === 'complete' && t.progress < 100) return false;
      return true;
    });
  }, [queue, search, filter]);

  function toggleSelect(id: string) {
    setSelectedIds((s) => ({ ...s, [id]: !s[id] }));
  }

  function selectAllVisible() {
    const visible = filtered.map((t) => t.id);
    const next: Record<string, boolean> = {};
    visible.forEach((id) => (next[id] = true));
    setSelectedIds(next);
  }

  function clearSelection() {
    setSelectedIds({});
  }

  function bulkComplete() {
    setQueue((q) =>
      q.map((t) => (selectedIds[t.id] ? { ...t, progress: 100 } : t))
    );
    clearSelection();
  }

  function bulkDelete() {
    setQueue((q) => q.filter((t) => !selectedIds[t.id]));
    clearSelection();
  }

  const stats = useMemo(() => {
    const total = queue.length;
    const overdue = queue.filter(
      (t) => typeof t.dueInDays === 'number' && t.dueInDays < 0
    ).length;
    const completed = queue.filter((t) => t.progress >= 100).length;
    return { total, overdue, completed };
  }, [queue]);

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
            Create and manage tasks.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => refetch()}
            className="rounded bg-[color:var(--md-sys-color-primary)] px-3 py-1 text-white text-sm"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-4">
        {/* main column */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <form onSubmit={addTask} className="flex gap-2 flex-1 min-w-0">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Quick add task"
                className="flex-1 rounded border px-3 py-2"
              />
              <button
                type="submit"
                className="rounded bg-[color:var(--md-sys-color-primary)] px-4 py-2 text-white"
              >
                Add
              </button>
            </form>

            <input
              placeholder="Search tasks"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded border px-3 py-2"
            />

            <select
              value={filter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFilter(
                  e.target.value as 'all' | 'overdue' | 'upcoming' | 'complete'
                )
              }
              className="rounded border px-2 py-2"
            >
              <option value="all">All</option>
              <option value="overdue">Overdue</option>
              <option value="upcoming">Upcoming</option>
              <option value="complete">Complete</option>
            </select>

            <button
              onClick={aiPrioritize}
              className="text-sm rounded border px-2 py-1 hover:bg-[color:var(--md-sys-color-surface-variant)]"
              disabled={aiLoading}
            >
              {aiLoading ? 'Running AI…' : 'Run AI'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={selectAllVisible}
              className="text-xs rounded border px-2 py-1"
            >
              Select visible
            </button>
            <button
              onClick={bulkComplete}
              className="text-xs rounded border px-2 py-1"
            >
              Mark complete
            </button>
            <button
              onClick={bulkDelete}
              className="text-xs rounded border px-2 py-1 text-red-600"
            >
              Delete
            </button>
            <button
              onClick={clearSelection}
              className="text-xs rounded border px-2 py-1"
            >
              Clear
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((t, i) => (
              <TaskCard
                key={t.id}
                t={t}
                index={i}
                selected={!!selectedIds[t.id]}
                onToggleSelect={() => toggleSelect(t.id)}
                onDelete={() => setQueue((q) => q.filter((x) => x.id !== t.id))}
                onChange={(patch) =>
                  setQueue((q) =>
                    q.map((x) => (x.id === t.id ? { ...x, ...patch } : x))
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* sidebar */}
        <aside className="space-y-4">
          <div className="rounded bg-[color:var(--md-sys-color-surface)] p-4 shadow">
            <h3 className="font-medium">Overview</h3>
            <p className="text-sm">
              Total: <strong>{stats.total}</strong>
            </p>
            <p className="text-sm">
              Overdue: <strong className="text-red-600">{stats.overdue}</strong>
            </p>
            <p className="text-sm">
              Completed: <strong>{stats.completed}</strong>
            </p>
          </div>

          <div className="rounded bg-[color:var(--md-sys-color-surface)] p-4 shadow">
            <h3 className="font-medium">Recent activity</h3>
            <div className="mt-2 space-y-2 text-sm">
              {loading && <p className="text-gray-500">Loading…</p>}
              {!loading &&
                recent.map((r) => (
                  <div
                    key={r.id}
                    className="rounded border p-2 hover:shadow-sm transition"
                  >
                    <p className="font-medium">{r.title}</p>
                    <p className="text-xs text-[color:var(--md-sys-color-on-surface-variant)]">
                      {r.desc}
                    </p>
                    <p className="text-xs text-gray-400">{r.time}</p>
                  </div>
                ))}
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
