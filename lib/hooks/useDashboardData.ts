'use client';

import { useCallback, useEffect, useState } from 'react';

export type Project = {
  id: string;
  name: string;
  progress: number;
  members?: number;
};

export type DashboardDataReturn = {
  loading: boolean;
  error: string | null;
  activity: number[];
  tasksCompleted: number;
  tasksTotal: number;
  recent: Array<{ id: string; title: string; desc?: string; time: string }>;
  projects: Project[];
  refetch: () => Promise<void>;
  adjustTasks: (delta: number) => void;
};

export function useDashboardData(): DashboardDataReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activity, setActivity] = useState<number[]>([
    12, 18, 9, 22, 30, 24, 28, 36, 32, 40, 38, 44, 50,
  ]);
  const [tasksCompleted, setTasksCompleted] = useState(42);
  const [tasksTotal, setTasksTotal] = useState(60);
  const [recent, setRecent] = useState<
    Array<{ id: string; title: string; desc?: string; time: string }>
  >([
    {
      id: 'a1',
      title: 'Task completed',
      desc: 'Finished UI for signup',
      time: '2h ago',
    },
    {
      id: 'a2',
      title: 'New comment',
      desc: 'Review on project X',
      time: '4h ago',
    },
  ]);
  const [projects, setProjects] = useState<Project[]>([
    { id: 'p1', name: 'Website Redesign', progress: 78, members: 5 },
    { id: 'p2', name: 'Mobile App', progress: 46, members: 3 },
    { id: 'p3', name: 'CRM Integration', progress: 12, members: 2 },
  ]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // simulate a light refresh
      await new Promise((r) => setTimeout(r, 200));

      // rotate demo activity slightly so UI updates feel live
      setActivity((prev) => {
        const next = [...prev];
        const last = next.pop() ?? 20;
        next.unshift(
          Math.max(8, Math.round(last * (0.9 + Math.random() * 0.3)))
        );
        return next.slice(0, 24);
      });

      // keep projects and recent deterministic but allow slight random progress nudges
      setProjects((prev) =>
        prev.map((p) => ({
          ...p,
          progress: Math.min(
            100,
            Math.max(0, p.progress + Math.round((Math.random() - 0.5) * 4))
          ),
        }))
      );

      setRecent((prev) => [
        {
          id: `r${Date.now()}`,
          title: 'Automated refresh',
          desc: 'Dashboard data refreshed',
          time: 'now',
        },
        ...prev.slice(0, 8),
      ]);

      // small adjustments to tasks
      setTasksTotal((t) => t || 60);
      setTasksCompleted((c) =>
        Math.min(
          tasksTotal,
          Math.max(0, c + Math.round((Math.random() - 0.5) * 3))
        )
      );
    } catch (err: any) {
      setError(String(err?.message ?? err ?? 'Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [tasksTotal]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    loading,
    error,
    activity,
    tasksCompleted,
    tasksTotal,
    recent,
    projects,
    refetch: fetchData,
    adjustTasks: (delta: number) =>
      setTasksCompleted((c) => Math.max(0, Math.min(tasksTotal, c + delta))),
  };
}
