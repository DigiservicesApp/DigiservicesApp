'use client';

import { useState, useMemo } from 'react';
import { useDashboardData } from '@/lib/hooks/useDashboardData';
import { useAiSimulator } from '@/lib/hooks/useAiSimulator';
import SimpleCard from '@/components/ui/SimpleCard';
import { openAiChat } from '@/lib/aiClient';
import { useToast } from '@/components/ui/ToastContext';
import {
  RiAddLine,
  RiCalendarLine,
  RiTimeLine,
  RiTeamLine,
  RiRobot2Line,
} from 'react-icons/ri';

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'meeting' | 'milestone' | 'deadline';
  team?: string[];
  description?: string;
  progress?: number;
}

interface NewEvent extends Omit<Event, 'id' | 'start' | 'end'> {
  title: string;
}

export default function CalendarPage() {
  const { refetch } = useDashboardData();
  const { simulate, loading: aiLoading } = useAiSimulator();
  const [aiBusy, setAiBusy] = useState(false);
  const toast = useToast();
  const [showAll, setShowAll] = useState(false);
  const [newEvent, setNewEvent] = useState<NewEvent>({
    title: '',
    type: 'meeting',
    description: '',
    team: [],
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [events, setEvents] = useState<Event[]>(() => [
    {
      id: 'e1',
      title: 'Project Kickoff',
      start: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
      end: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60 * 2), // 2 hours long
      type: 'meeting',
      team: ['Alice', 'Bob', 'Carol'],
      description: 'Initial project planning and team alignment',
    },
    {
      id: 'e2',
      title: 'MVP Release',
      start: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 14 days from now
      end: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
      type: 'milestone',
      progress: 35,
    },
    {
      id: 'e3',
      title: 'Design Review',
      start: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
      end: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5 + 1000 * 60 * 60), // 1 hour long
      type: 'meeting',
      team: ['Alice', 'Diana'],
    },
  ]);

  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Sort events by date and filter based on showAll
  const sortedEvents = useMemo(() => {
    const now = Date.now();
    return events
      .filter((e) => showAll || e.start.getTime() > now)
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  }, [events, showAll]);

  // Get AI suggestions for optimal meeting times
  const getAiSuggestions = async () => {
    const eventContext = events
      .map(
        (e) =>
          `${e.title} (${e.type}) on ${e.start.toLocaleDateString()} ${
            e.team ? `with ${e.team.join(', ')}` : ''
          }`
      )
      .join('; ');

    try {
      setAiBusy(true);
      const text = await openAiChat(
        `Based on these events: ${eventContext}, suggest optimal times for team sync and any schedule optimizations.`
      );
      setAiSuggestion(text);
      toast.show({ message: 'AI suggestions ready', variant: 'success' });
    } catch (err) {
      console.error(err);
      toast.show({
        message: `AI suggestions failed: ${String(err)}`,
        variant: 'error',
      });
    } finally {
      setAiBusy(false);
    }
  };

  // Add a new event
  const addEvent = () => {
    if (!newEventTitle.trim() || !selectedDate) return;

    const eventToAdd: Event = {
      id: `e${Date.now()}`,
      title: newEventTitle.trim(),
      start: selectedDate,
      end: new Date(selectedDate.getTime() + 1000 * 60 * 60), // 1 hour default
      ...newEvent,
    };

    setEvents((prev) => [...prev, eventToAdd]);
    setNewEventTitle('');
    setSelectedDate(null);
    setNewEvent({
      title: '',
      type: 'meeting',
      description: '',
      team: [],
    });
  };

  // Format time relative to now
  const getTimeDisplay = (date: Date) => {
    const now = Date.now();
    const diff = date.getTime() - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `in ${days}d ${hours}h`;
    if (hours > 0) return `in ${hours}h`;
    return 'soon';
  };

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[color:var(--md-sys-color-on-surface)]">
            Timeline & Milestones
          </h1>
          <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
            Visual project overview and upcoming milestones.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={getAiSuggestions}
            className="inline-flex items-center gap-1 rounded border border-[color:var(--md-sys-color-outline)] px-3 py-1 text-sm hover:bg-[color:var(--md-sys-color-surface-variant)]"
            disabled={aiLoading}
          >
            <RiRobot2Line className="h-4 w-4" />
            {aiLoading ? 'Thinking...' : 'Get AI suggestions'}
          </button>
          <button
            onClick={() => refetch()}
            className="rounded bg-[color:var(--md-sys-color-primary)] px-3 py-1 text-white text-sm"
          >
            Refresh
          </button>
          <button
            onClick={() => setShowAll(!showAll)}
            className="rounded border border-[color:var(--md-sys-color-outline)] px-3 py-1 text-sm"
          >
            {showAll ? 'Hide past' : 'Show all'}
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <SimpleCard className="col-span-2 min-h-[400px]">
          <div className="flex items-center justify-between">
            <h2 className="font-medium flex items-center gap-2">
              <RiCalendarLine className="h-5 w-5 text-[color:var(--md-sys-color-primary)]" />
              Timeline View
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1 rounded bg-[color:var(--md-sys-color-primary)] px-3 py-1 text-white text-sm"
              >
                <RiAddLine className="h-4 w-4" /> Add Event
              </button>
            </div>
            {showAddModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-[color:var(--md-sys-color-surface)] p-6 rounded-lg shadow-xl w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Add New Event</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={newEventTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                        placeholder="Event title..."
                        className="w-full rounded border border-[color:var(--md-sys-color-outline)] px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={selectedDate?.toISOString().slice(0, 16) ?? ''}
                        onChange={(e) =>
                          setSelectedDate(new Date(e.target.value))
                        }
                        className="w-full rounded border border-[color:var(--md-sys-color-outline)] px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Team Members
                      </label>
                      <input
                        type="text"
                        placeholder="Enter names separated by commas"
                        className="w-full rounded border border-[color:var(--md-sys-color-outline)] px-3 py-2 text-sm"
                        onChange={(e) => {
                          const team = e.target.value
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean);
                          setNewEvent((prev) => ({ ...prev, team }));
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Description
                      </label>
                      <textarea
                        placeholder="Event description..."
                        rows={3}
                        className="w-full rounded border border-[color:var(--md-sys-color-outline)] px-3 py-2 text-sm"
                        onChange={(e) => {
                          setNewEvent((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Type
                      </label>
                      <select
                        className="w-full rounded border border-[color:var(--md-sys-color-outline)] px-3 py-2 text-sm"
                        onChange={(e) => {
                          setNewEvent((prev) => ({
                            ...prev,
                            type: e.target.value as Event['type'],
                          }));
                        }}
                      >
                        <option value="meeting">Meeting</option>
                        <option value="milestone">Milestone</option>
                        <option value="deadline">Deadline</option>
                      </select>
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
                          addEvent();
                          setShowAddModal(false);
                        }}
                        disabled={!newEventTitle || !selectedDate}
                        className="px-4 py-2 text-sm rounded bg-[color:var(--md-sys-color-primary)] text-white disabled:opacity-50"
                      >
                        Add Event
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 space-y-4">
            {sortedEvents.map((event) => (
              <div
                key={event.id}
                className={`group relative flex items-center gap-4 rounded-lg border p-4 transition-all hover:shadow-md ${
                  event.type === 'milestone'
                    ? 'border-[color:var(--md-sys-color-primary)] bg-[color:var(--md-sys-color-primary-container)]'
                    : 'border-[color:var(--md-sys-color-outline)]'
                }`}
              >
                <div className="flex-shrink-0">
                  {event.type === 'meeting' && (
                    <RiTeamLine className="h-6 w-6 text-[color:var(--md-sys-color-primary)]" />
                  )}
                  {event.type === 'milestone' && (
                    <RiTimeLine className="h-6 w-6 text-[color:var(--md-sys-color-primary)]" />
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{event.title}</h3>
                    <span className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                      {getTimeDisplay(event.start)}
                    </span>
                  </div>
                  {event.description && (
                    <p className="mt-1 text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                      {event.description}
                    </p>
                  )}
                  {event.team && (
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <RiTeamLine className="h-4 w-4" />
                      <span className="text-[color:var(--md-sys-color-on-surface-variant)]">
                        {event.team.join(', ')}
                      </span>
                    </div>
                  )}
                  {typeof event.progress === 'number' && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>Progress</span>
                        <span>{event.progress}%</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-[color:var(--md-sys-color-surface-variant)]">
                        <div
                          className="h-1.5 rounded-full bg-[color:var(--md-sys-color-primary)] transition-all duration-500"
                          style={{ width: `${event.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    const updatedEvents = events.filter(
                      (e) => e.id !== event.id
                    );
                    setEvents(updatedEvents);
                  }}
                  className="absolute right-2 top-2 rounded p-1 opacity-0 hover:bg-[color:var(--md-sys-color-surface-variant)] group-hover:opacity-100"
                >
                  <span className="sr-only">Remove</span>
                  <RiAddLine className="h-4 w-4 rotate-45" />
                </button>
              </div>
            ))}
          </div>
        </SimpleCard>

        <SimpleCard>
          <h2 className="font-medium flex items-center gap-2">
            <RiRobot2Line className="h-5 w-5 text-[color:var(--md-sys-color-primary)]" />
            AI Insights
          </h2>
          <div className="mt-4 space-y-4">
            {aiLoading && (
              <div className="animate-pulse space-y-2">
                <div className="h-4 w-3/4 rounded bg-[color:var(--md-sys-color-surface-variant)]" />
                <div className="h-4 w-1/2 rounded bg-[color:var(--md-sys-color-surface-variant)]" />
              </div>
            )}
            {!aiLoading && aiSuggestion && (
              <div className="rounded-lg border border-[color:var(--md-sys-color-outline)] p-4">
                <p className="text-sm">{aiSuggestion}</p>
              </div>
            )}
            {!aiLoading && !aiSuggestion && (
              <div className="text-center">
                <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                  Click &quot;Get AI suggestions&quot; for schedule optimization
                  tips.
                </p>
              </div>
            )}
            <div className="rounded-lg border border-[color:var(--md-sys-color-outline)] p-4">
              <h3 className="text-sm font-medium">Quick Stats</h3>
              <div className="mt-2 space-y-2 text-sm">
                <p>
                  Next milestone:{' '}
                  {sortedEvents.find((e) => e.type === 'milestone')?.title ??
                    'None planned'}
                </p>
                <p>
                  Upcoming meetings:{' '}
                  {sortedEvents.filter((e) => e.type === 'meeting').length}
                </p>
                <p>
                  Team members involved:{' '}
                  {
                    new Set(
                      events.filter((e) => e.team).flatMap((e) => e.team ?? [])
                    ).size
                  }
                </p>
              </div>
            </div>
          </div>
        </SimpleCard>
      </div>
    </div>
  );
}
