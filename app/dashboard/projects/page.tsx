export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Projects</h1>
      <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
        Project overview and analytics.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Analytics Dashboard */}
        <div className="rounded bg-[color:var(--md-sys-color-surface)] p-6 shadow">
          <h2 className="font-medium">Analytics</h2>
          <div className="mt-4">
            <div className="space-y-2">
              <p className="text-sm">
                Efficiency Rate: <span className="font-medium">82%</span>
              </p>
              <div className="h-2 rounded bg-gray-200">
                <div
                  className="h-2 rounded bg-[color:var(--md-sys-color-primary)]"
                  style={{ width: '82%' }}
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm">
                Task Completion: <span className="font-medium">68%</span>
              </p>
              <div className="h-2 rounded bg-gray-200">
                <div
                  className="h-2 rounded bg-[color:var(--md-sys-color-primary)]"
                  style={{ width: '68%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Client Communication Panel */}
        <div className="rounded bg-[color:var(--md-sys-color-surface)] p-6 shadow">
          <h2 className="font-medium">Communication Hub</h2>
          <div className="mt-4">
            <div className="space-y-2">
              <div className="rounded bg-gray-50 p-3">
                <p className="text-sm font-medium">Client Update</p>
                <p className="text-xs text-gray-500">
                  Latest milestone achieved - Homepage design approved
                </p>
              </div>
              <div className="rounded bg-gray-50 p-3">
                <p className="text-sm font-medium">File Sharing</p>
                <p className="text-xs text-gray-500">
                  3 new design assets uploaded
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Task Assignment */}
        <div className="rounded bg-[color:var(--md-sys-color-surface)] p-6 shadow">
          <h2 className="font-medium">AI Task Assignment</h2>
          <div className="mt-4">
            <div className="space-y-2">
              <div className="rounded border p-3">
                <p className="text-sm">Team Member: Alice</p>
                <p className="text-xs text-gray-500">
                  Suggested task: UX design revisions (based on skill match)
                </p>
              </div>
              <div className="rounded border p-3">
                <p className="text-sm">Team Member: Bob</p>
                <p className="text-xs text-gray-500">
                  Suggested task: API integration (based on availability)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Overview */}
        <div className="rounded bg-[color:var(--md-sys-color-surface)] p-6 shadow">
          <h2 className="font-medium">Timeline</h2>
          <div className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-[color:var(--md-sys-color-primary)]" />
                <div className="ml-3">
                  <p className="text-sm font-medium">Design Phase</p>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-[color:var(--md-sys-color-primary-container)]" />
                <div className="ml-3">
                  <p className="text-sm font-medium">Development</p>
                  <p className="text-xs text-gray-500">In Progress - 60%</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-gray-200" />
                <div className="ml-3">
                  <p className="text-sm font-medium">Testing</p>
                  <p className="text-xs text-gray-500">Upcoming</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
