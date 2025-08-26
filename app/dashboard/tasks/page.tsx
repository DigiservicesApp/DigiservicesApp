import { RiTaskLine } from 'react-icons/ri';

export default function TasksPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Tasks</h1>
      <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
        Create and manage tasks.
      </p>

      <div className="mt-6">
        {/* Simple task input to simulate AI prioritization */}
        <div className="space-y-4">
          <form className="flex gap-2">
            <input
              placeholder="Task title"
              className="flex-1 rounded border px-3 py-2"
            />
            <button className="rounded bg-[color:var(--md-sys-color-primary)] px-4 py-2 text-white">
              Add
            </button>
          </form>

          <div className="mt-4">
            <div className="rounded bg-[color:var(--md-sys-color-surface)] p-4 shadow">
              <h3 className="font-medium">AI Prioritized Queue</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>1. Design homepage outline</li>
                <li>2. Implement auth guard</li>
                <li>3. Create dashboard layout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
