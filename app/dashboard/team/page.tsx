'use client';

import { useMemo, useState, ChangeEvent } from 'react';
import { useDashboardData } from '@/lib/hooks/useDashboardData';
import RandomSparkline from '@/components/ui/RandomSparkline';
import { openAiChat } from '@/lib/aiClient';
import { useToast } from '@/components/ui/ToastContext';

type Member = {
  id: number;
  name: string;
  role: string;
  tasks: number;
  completed: number;
  status?: 'active' | 'busy' | 'away';
  lastActive?: string;
  projects?: string[];
  skills?: string[];
};

function MemberCard({
  member,
  onUpdate,
  onMessage,
  onViewProfile,
  onAiInsights,
  loadingAi,
}: {
  member: Member;
  onUpdate: (id: number, patch: Partial<Member>) => void;
  onMessage: (id: number) => void;
  onViewProfile: (id: number) => void;
  onAiInsights?: (id: number) => void;
  loadingAi?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(member.name);
  const [editRole, setEditRole] = useState(member.role);

  const efficiency = (member.completed / Math.max(1, member.tasks)) * 100;
  const status = member.status || 'active';
  const statusColor = {
    active: 'bg-green-500',
    busy: 'bg-amber-500',
    away: 'bg-gray-400',
  }[status];

  return (
    <div className="flex flex-col rounded-lg border bg-[color:var(--md-sys-color-surface)] p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          {editing ? (
            <div className="space-y-2">
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full rounded border px-2 py-1 text-sm"
                placeholder="Name"
              />
              <input
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
                className="w-full rounded border px-2 py-1 text-sm"
                placeholder="Role"
              />
            </div>
          ) : (
            <div onClick={() => setEditing(true)} className="cursor-pointer">
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                {member.role}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${statusColor}`}
            title={`Status: ${status}`}
          />
          {editing && (
            <button
              onClick={() => {
                onUpdate(member.id, { name: editName, role: editRole });
                setEditing(false);
              }}
              className="text-xs rounded bg-[color:var(--md-sys-color-primary)] px-2 py-1 text-white"
            >
              Save
            </button>
          )}
        </div>
      </div>

      <div className="mt-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">Task completion</span>
          <span className="text-sm font-medium">{Math.round(efficiency)}%</span>
        </div>

        <div className="relative h-2 w-full rounded bg-gray-200">
          <div
            className="h-2 rounded bg-[color:var(--md-sys-color-primary)]"
            style={{ width: `${efficiency}%` }}
          />
        </div>

        <div className="mt-2">
          <RandomSparkline
            points={Array.from({ length: 8 }).map(() =>
              Math.floor(Math.random() * (efficiency + 20))
            )}
            width={120}
            height={34}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex-1">
          <p className="text-sm">
            Tasks:{' '}
            <span className="font-medium">
              {member.completed}/{member.tasks}
            </span>
          </p>
          {member.lastActive && (
            <p className="text-xs text-[color:var(--md-sys-color-on-surface-variant)]">
              Active: {member.lastActive}
            </p>
          )}
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => onMessage(member.id)}
            className="rounded border px-2 py-1 text-xs hover:bg-[color:var(--md-sys-color-surface-variant)]"
          >
            Message
          </button>
          <button
            onClick={() => onViewProfile(member.id)}
            className="rounded border px-2 py-1 text-xs hover:bg-[color:var(--md-sys-color-surface-variant)]"
          >
            Profile
          </button>
          <button
            onClick={() => onAiInsights?.(member.id)}
            disabled={loadingAi}
            className="rounded border px-2 py-1 text-xs hover:bg-[color:var(--md-sys-color-surface-variant)]"
          >
            {loadingAi ? 'Thinking…' : 'AI Insights'}
          </button>
        </div>
      </div>

      {member.skills && (
        <div className="mt-2 flex flex-wrap gap-1">
          {member.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-[color:var(--md-sys-color-surface-variant)] px-2 py-0.5 text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TeamPage() {
  const { refetch } = useDashboardData();
  const { show } = useToast();
  const [inviting, setInviting] = useState(false);
  const [email, setEmail] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'busy' | 'away'>(
    'all'
  );
  const [aiLoadingMap, setAiLoadingMap] = useState<Record<number, boolean>>({});
  const [team, setTeam] = useState<Member[]>([
    {
      id: 1,
      name: 'Alice Cooper',
      role: 'UX Designer',
      tasks: 8,
      completed: 5,
      status: 'active',
      lastActive: '2m ago',
      skills: ['UI/UX', 'Figma', 'Research'],
      projects: ['Dashboard', 'Mobile App'],
    },
    {
      id: 2,
      name: 'Bob Wilson',
      role: 'Developer',
      tasks: 12,
      completed: 9,
      status: 'busy',
      lastActive: '5m ago',
      skills: ['React', 'TypeScript', 'Node.js'],
      projects: ['API', 'Auth System'],
    },
    {
      id: 3,
      name: 'Carol Smith',
      role: 'Project Manager',
      tasks: 6,
      completed: 4,
      status: 'away',
      lastActive: '1h ago',
      skills: ['Agile', 'Scrum', 'Team Lead'],
      projects: ['Release Planning'],
    },
  ]);

  const stats = useMemo(() => {
    const total = team.length;
    const activeCount = team.filter((m) => m.status === 'active').length;
    const totalTasks = team.reduce((sum, m) => sum + m.tasks, 0);
    const completedTasks = team.reduce((sum, m) => sum + m.completed, 0);
    const avgEfficiency =
      team.reduce((sum, m) => sum + m.completed / Math.max(1, m.tasks), 0) /
      total;

    return {
      total,
      activeCount,
      totalTasks,
      completedTasks,
      avgEfficiency: Math.round(avgEfficiency * 100),
    };
  }, [team]);

  function sendInvite(e?: React.FormEvent) {
    e?.preventDefault();
    if (!email.includes('@')) return;

    setTeam((t) => [
      ...t,
      {
        id: Date.now(),
        name: email.split('@')[0],
        role: 'New Member',
        tasks: 0,
        completed: 0,
        status: 'active',
        lastActive: 'just now',
        skills: [],
      },
    ]);
    setEmail('');
    setInviting(false);
  }

  const filtered = useMemo(() => {
    return team.filter((member) => {
      if (
        search &&
        !member.name.toLowerCase().includes(search.toLowerCase()) &&
        !member.role.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      if (filter !== 'all' && member.status !== filter) {
        return false;
      }
      return true;
    });
  }, [team, search, filter]);

  function updateMember(id: number, patch: Partial<Member>) {
    setTeam((team) => team.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }

  function handleMessage(id: number) {
    // Simulated message action
    console.log('Message member:', id);
  }

  function handleViewProfile(id: number) {
    // Simulated profile view action
    console.log('View profile:', id);
  }

  async function handleAiInsights(id: number) {
    const member = team.find((m) => m.id === id);
    if (!member) return;

    setAiLoadingMap((s) => ({ ...s, [id]: true }));
    try {
      const promptParts = [
        'Provide a short, actionable one-paragraph insight about this team member for a manager.',
        `Name: ${member.name}.`,
        `Role: ${member.role}.`,
        `Tasks: ${member.tasks}.`,
        `Completed: ${member.completed}.`,
        `Skills: ${(member.skills || []).join(', ')}.`,
        `Projects: ${(member.projects || []).join(', ')}.`,
      ];

      const prompt = promptParts.join(' ');

      const resp = await openAiChat(prompt, { temperature: 0.4 });
      show({
        title: `AI Insight: ${member.name}`,
        message: resp,
        variant: 'info',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      show({
        title: 'AI Error',
        message: msg,
        variant: 'error',
      });
    } finally {
      setAiLoadingMap((s) => ({ ...s, [id]: false }));
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Team</h1>
          <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
            Team members and task distribution
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

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search members..."
              className="flex-1 min-w-[200px] rounded border px-3 py-2"
            />

            <select
              value={filter}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setFilter(e.target.value as 'all' | 'active' | 'busy' | 'away')
              }
              className="rounded border px-3 py-2"
            >
              <option value="all">All Members</option>
              <option value="active">Active</option>
              <option value="busy">Busy</option>
              <option value="away">Away</option>
            </select>

            <button
              onClick={() => setInviting((s) => !s)}
              className="rounded bg-[color:var(--md-sys-color-primary)] px-4 py-2 text-white"
            >
              Invite
            </button>
          </div>

          {inviting && (
            <form onSubmit={sendInvite} className="flex gap-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@company.com"
                className="flex-1 rounded border px-3 py-2"
              />
              <button
                type="submit"
                className="rounded bg-[color:var(--md-sys-color-primary)] px-4 py-2 text-white"
              >
                Send Invite
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onUpdate={updateMember}
                onMessage={handleMessage}
                onViewProfile={handleViewProfile}
                onAiInsights={handleAiInsights}
                loadingAi={!!aiLoadingMap[member.id]}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="rounded bg-[color:var(--md-sys-color-surface)] p-4 shadow">
            <h3 className="font-medium mb-3">Team Overview</h3>
            <div className="space-y-2">
              <p className="text-sm flex justify-between">
                Members <span className="font-medium">{stats.total}</span>
              </p>
              <p className="text-sm flex justify-between">
                Active Now{' '}
                <span className="font-medium">{stats.activeCount}</span>
              </p>
              <p className="text-sm flex justify-between">
                Total Tasks{' '}
                <span className="font-medium">{stats.totalTasks}</span>
              </p>
              <p className="text-sm flex justify-between">
                Completed{' '}
                <span className="font-medium">{stats.completedTasks}</span>
              </p>
              <p className="text-sm flex justify-between">
                Avg. Efficiency{' '}
                <span className="font-medium">{stats.avgEfficiency}%</span>
              </p>
            </div>
          </div>

          <div className="rounded bg-[color:var(--md-sys-color-surface)] p-4 shadow">
            <h3 className="font-medium mb-3">Active Projects</h3>
            <div className="space-y-2">
              {Array.from(new Set(team.flatMap((m) => m.projects || []))).map(
                (project) => (
                  <div
                    key={project}
                    className="text-sm rounded border px-3 py-2"
                  >
                    {project}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="rounded bg-[color:var(--md-sys-color-surface)] p-4 shadow">
            <h3 className="font-medium mb-3">Team Skills</h3>
            <div className="flex flex-wrap gap-1">
              {Array.from(new Set(team.flatMap((m) => m.skills || []))).map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-[color:var(--md-sys-color-surface-variant)] px-2 py-0.5 text-xs"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
