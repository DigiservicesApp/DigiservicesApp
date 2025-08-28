'use client';

import React from 'react';
import SimpleCard from '@/components/ui/SimpleCard';
import { Skeleton } from '@/components/ui/Skeleton';
import ActivityChart from './ActivityChart';
import TaskDonut from './TaskDonut';
import RecentActivity from './RecentActivity';
import ProjectList from './ProjectList';
import { useDashboardData } from '@/lib/hooks/useDashboardData';
import { useAiSimulator } from '@/lib/hooks/useAiSimulator';

export default function DashboardOverview() {
  const {
    loading,
    error,
    activity,
    tasksCompleted,
    tasksTotal,
    recent,
    projects,
    refetch,
    adjustTasks,
  } = useDashboardData() as any;

  // local adjusted view so the user can tweak completed tasks inline
  const [adjustedCompleted, setAdjustedCompleted] =
    React.useState(tasksCompleted);
  React.useEffect(() => setAdjustedCompleted(tasksCompleted), [tasksCompleted]);

  const { simulate, loading: aiLoading, enabled: aiEnabled } = useAiSimulator();
  const [prompt, setPrompt] = React.useState(
    'Summarize project priorities for this week'
  );
  const [aiResult, setAiResult] = React.useState<string | null>(null);

  async function runAi() {
    setAiResult(null);
    const res = await simulate(prompt);
    setAiResult(res.text);
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <SimpleCard>
          <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
            Active Tasks
          </p>
          <div className="flex items-center justify-between">
            <p className="mt-2 text-2xl font-semibold text-[color:var(--md-sys-color-on-surface)]">
              {!loading ? (
                Math.round(
                  (adjustedCompleted / Math.max(1, tasksTotal)) * 100
                ) + '%'
              ) : (
                <Skeleton width={40} height={28} />
              )}
            </p>
            <div className="flex items-center gap-2">
              <button
                className="rounded border px-2 py-1 text-sm"
                onClick={() => refetch()}
                title="Refresh data"
              >
                Refresh
              </button>
            </div>
          </div>
          <div className="mt-3">
            {loading ? (
              <Skeleton height={120} />
            ) : (
              <TaskDonut
                completed={adjustedCompleted}
                total={tasksTotal}
                onAdjust={(d) => {
                  if (typeof adjustTasks === 'function') adjustTasks(d);
                  setAdjustedCompleted((c) =>
                    Math.max(0, Math.min(tasksTotal, c + d))
                  );
                }}
              />
            )}
          </div>
        </SimpleCard>

        <SimpleCard>
          <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
            Team Activity
          </p>
          <div className="mt-4 min-h-[120px]">
            {loading ? (
              <Skeleton height={120} />
            ) : (
              <ActivityChart data={activity} height={120} />
            )}
          </div>
        </SimpleCard>

        <SimpleCard>
          <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
            Projects
          </p>
          <div className="mt-3">
            {loading ? (
              <Skeleton height={120} />
            ) : (
              <ProjectList projects={projects} />
            )}
          </div>
        </SimpleCard>

        <SimpleCard>
          <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
            Recent Activity
          </p>
          <div className="mt-3">
            {loading ? (
              <Skeleton height={120} />
            ) : (
              <RecentActivity items={recent} />
            )}
          </div>
        </SimpleCard>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-lg bg-[color:var(--md-sys-color-surface)] p-6 shadow col-span-1 lg:col-span-2">
          <h3 className="text-lg font-medium text-[color:var(--md-sys-color-on-surface)]">
            AI Suggestions
          </h3>
          <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)] mt-1">
            AI-powered suggestions are provided locally when a provider is
            configured.
          </p>
          <div className="mt-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full rounded border p-2 text-sm"
              rows={3}
            />
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={runAi}
                disabled={aiLoading}
                className="rounded bg-[color:var(--md-sys-color-primary)] px-3 py-1 text-white text-sm"
              >
                Get suggestion
              </button>
              <button
                onClick={() =>
                  setPrompt('Summarize project priorities for this week')
                }
                className="rounded border px-3 py-1 text-sm"
              >
                Reset
              </button>
              <div className="text-xs text-[color:var(--md-sys-color-on-surface-variant)]">
                Provider: {aiEnabled ? 'Configured' : 'Not configured'}
              </div>
            </div>

            <div className="mt-4 rounded border bg-[color:var(--md-sys-color-surface-variant)] p-3 min-h-[72px]">
              {aiLoading && (
                <div className="text-sm text-gray-500">Thinking…</div>
              )}
              {aiResult && <div className="text-sm">{aiResult}</div>}
              {!aiLoading && !aiResult && (
                <div className="text-sm text-gray-400">No suggestion yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bigger area widgets */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-[color:var(--md-sys-color-surface)] p-6 shadow">
          <h2 className="text-lg font-medium text-[color:var(--md-sys-color-on-surface)]">
            Detailed Activity
          </h2>
          <div className="mt-4">
            {loading ? (
              <Skeleton height={220} />
            ) : (
              <ActivityChart
                data={activity.concat(activity.map((x) => Math.round(x * 0.8)))}
                height={220}
              />
            )}
          </div>
        </div>

        <div className="rounded-lg bg-[color:var(--md-sys-color-surface)] p-6 shadow">
          <h2 className="text-lg font-medium text-[color:var(--md-sys-color-on-surface)]">
            Your Projects
          </h2>
          <div className="mt-4">
            {loading ? (
              <Skeleton height={220} />
            ) : (
              <ProjectList projects={projects} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
