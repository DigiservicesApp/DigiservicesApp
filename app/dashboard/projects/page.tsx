'use client';

import { useMemo, useState } from 'react';
import { useDashboardData } from '@/lib/hooks/useDashboardData';
import SimpleCard from '@/components/ui/SimpleCard';
import RandomSparkline from '@/components/ui/RandomSparkline';
import { openAiChat } from '@/lib/aiClient';
import { useToast } from '@/components/ui/ToastContext';
import {
  RiAddLine,
  RiTeamLine,
  RiRobot2Line,
  RiBarChartLine,
  RiPieChartLine,
} from 'react-icons/ri';

// use RandomSparkline for lightweight, random visualizations

type DashboardProject = ReturnType<typeof useDashboardData>['projects'][0];

interface Project extends DashboardProject {
  healthScore?: number;
  riskLevel?: 'low' | 'medium' | 'high';
  nextMilestone?: string;
  teamEfficiency?: number;
}

export default function ProjectsPage() {
  const { projects: rawProjects, activity, refetch } = useDashboardData();
  const [showAddModal, setShowAddModal] = useState(false);

  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [aiBusy, setAiBusy] = useState(false);
  const toast = useToast();

  const projects = useMemo<Project[]>(
    () =>
      rawProjects.map((p) => ({
        ...p,
        healthScore: Math.random() * 100, // In real app, this would come from AI analysis
        riskLevel: ['low', 'medium', 'high'][
          Math.floor(Math.random() * 3)
        ] as Project['riskLevel'],
        teamEfficiency: 65 + Math.random() * 35,
      })),
    [rawProjects]
  ); // Get AI insights for all projects
  const getProjectInsights = async () => {
    const projectContext = projects
      .map(
        (p) =>
          `${p.name} (Progress: ${p.progress}%, Members: ${
            p.members
          }, Health: ${Math.round(p.healthScore || 0)}%)`
      )
      .join('; ');

    try {
      setAiBusy(true);
      const text = await openAiChat(
        `Based on these projects: ${projectContext}, analyze overall portfolio health, identify risks, and suggest optimizations.`
      );
      setAiInsights(text);
      toast.show({ message: 'AI insights generated', variant: 'success' });
    } catch (err) {
      console.error(err);
      toast.show({
        message: `AI insights failed: ${String(err)}`,
        variant: 'error',
      });
    } finally {
      setAiBusy(false);
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[color:var(--md-sys-color-on-surface)]">
            Projects
          </h1>
          <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
            AI-powered project insights and analytics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={getProjectInsights}
            className="inline-flex items-center gap-1 rounded border border-[color:var(--md-sys-color-outline)] px-3 py-1 text-sm hover:bg-[color:var(--md-sys-color-surface-variant)]"
            disabled={aiBusy}
          >
            <RiRobot2Line className="h-4 w-4" />
            {aiBusy ? 'Analyzing...' : 'Get AI Insights'}
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1 rounded bg-[color:var(--md-sys-color-primary)] px-3 py-1 text-white text-sm"
          >
            <RiAddLine className="h-4 w-4" /> New Project
          </button>
          <button
            onClick={() => refetch()}
            className="rounded border border-[color:var(--md-sys-color-outline)] px-3 py-1 text-sm"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-2 space-y-4">
          {projects.map((p) => (
            <SimpleCard
              key={p.id}
              className="flex items-center justify-between p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{p.name}</h3>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      p.riskLevel === 'low'
                        ? 'bg-green-100 text-green-800'
                        : p.riskLevel === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {p.riskLevel} risk
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                  <span className="flex items-center gap-1">
                    <RiTeamLine className="h-4 w-4" />
                    {p.members ?? 0} members
                  </span>
                  <span className="flex items-center gap-1">
                    <RiBarChartLine className="h-4 w-4" />
                    {Math.round(p.teamEfficiency ?? 0)}% efficiency
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{p.progress}%</span>
                  <div className="h-2 w-40 rounded bg-[color:var(--md-sys-color-surface-variant)]">
                    <div
                      className="h-2 rounded bg-[color:var(--md-sys-color-primary)]"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-[color:var(--md-sys-color-on-surface-variant)]">
                      Health Score
                    </span>
                    <span className="font-medium">
                      {Math.round(p.healthScore ?? 0)}%
                    </span>
                  </div>
                  <div className="w-24">
                    <RandomSparkline points={activity.slice(-12)} />
                  </div>
                </div>
              </div>
            </SimpleCard>
          ))}
        </div>

        <div className="space-y-6">
          <SimpleCard className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-medium flex items-center gap-2">
                <RiPieChartLine className="h-5 w-5 text-[color:var(--md-sys-color-primary)]" />
                Portfolio Overview
              </h3>
              <span className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                Last 30 days
              </span>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Health</span>
                  <span className="font-medium">
                    {Math.round(
                      projects.reduce(
                        (acc, p) => acc + (p.healthScore ?? 0),
                        0
                      ) / projects.length
                    )}
                    %
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-[color:var(--md-sys-color-surface-variant)]">
                  <div
                    className="h-1.5 rounded-full bg-[color:var(--md-sys-color-primary)]"
                    style={{
                      width: `${Math.round(
                        projects.reduce(
                          (acc, p) => acc + (p.healthScore ?? 0),
                          0
                        ) / projects.length
                      )}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Team Efficiency</span>
                  <span className="font-medium">
                    {Math.round(
                      projects.reduce(
                        (acc, p) => acc + (p.teamEfficiency ?? 0),
                        0
                      ) / projects.length
                    )}
                    %
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-[color:var(--md-sys-color-surface-variant)]">
                  <div
                    className="h-1.5 rounded-full bg-[color:var(--md-sys-color-primary)]"
                    style={{
                      width: `${Math.round(
                        projects.reduce(
                          (acc, p) => acc + (p.teamEfficiency ?? 0),
                          0
                        ) / projects.length
                      )}%`,
                    }}
                  />
                </div>
              </div>
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Risk Distribution</h4>
                <div className="flex gap-4 text-sm">
                  {['low', 'medium', 'high'].map((risk) => (
                    <div key={risk} className="flex-1">
                      <div className="text-center mb-1">
                        {projects.filter((p) => p.riskLevel === risk).length}
                      </div>
                      <div
                        className={`text-center py-1 rounded ${
                          risk === 'low'
                            ? 'bg-green-100 text-green-800'
                            : risk === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {risk}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SimpleCard>

          <SimpleCard className="p-6">
            <h3 className="font-medium flex items-center gap-2">
              <RiRobot2Line className="h-5 w-5 text-[color:var(--md-sys-color-primary)]" />
              AI Insights
            </h3>
            <div className="mt-4 space-y-4">
              {aiBusy && (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 w-3/4 rounded bg-[color:var(--md-sys-color-surface-variant)]" />
                  <div className="h-4 w-1/2 rounded bg-[color:var(--md-sys-color-surface-variant)]" />
                </div>
              )}

              {!aiBusy && aiInsights && (
                <div className="rounded-lg border border-[color:var(--md-sys-color-outline)] p-4">
                  <p className="text-sm whitespace-pre-line">{aiInsights}</p>
                </div>
              )}

              {!aiBusy && !aiInsights && (
                <div className="text-center">
                  <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                    Click &quot;Get AI Insights&quot; for portfolio analysis.
                  </p>
                </div>
              )}
            </div>
          </SimpleCard>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <SimpleCard className="p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">New Project</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  placeholder="Enter project name"
                  className="w-full rounded border border-[color:var(--md-sys-color-outline)] px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Team Members
                </label>
                <input
                  type="number"
                  min={1}
                  placeholder="Number of team members"
                  className="w-full rounded border border-[color:var(--md-sys-color-outline)] px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Project description"
                  className="w-full rounded border border-[color:var(--md-sys-color-outline)] px-3 py-2 text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm rounded border"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Add project logic here
                    setShowAddModal(false);
                  }}
                  className="px-4 py-2 text-sm rounded bg-[color:var(--md-sys-color-primary)] text-white"
                >
                  Create Project
                </button>
              </div>
            </div>
          </SimpleCard>
        </div>
      )}
    </div>
  );
}
