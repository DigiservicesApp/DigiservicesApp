export default function TeamPage() {
  const team = [
    {
      id: 1,
      name: 'Alice Cooper',
      role: 'UX Designer',
      tasks: 8,
      completed: 5,
    },
    { id: 2, name: 'Bob Wilson', role: 'Developer', tasks: 12, completed: 9 },
    {
      id: 3,
      name: 'Carol Smith',
      role: 'Project Manager',
      tasks: 6,
      completed: 4,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold">Team</h1>
      <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
        Team members and task distribution.
      </p>

      <div className="mt-6">
        <div className="rounded bg-[color:var(--md-sys-color-surface)] p-6 shadow">
          <div className="space-y-4">
            {team.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded border p-4"
              >
                <div>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                    {member.role}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm">
                    Tasks:{' '}
                    <span className="font-medium">
                      {member.completed}/{member.tasks}
                    </span>
                  </p>
                  <div className="mt-1 h-2 w-24 rounded bg-gray-200">
                    <div
                      className="h-2 rounded bg-[color:var(--md-sys-color-primary)]"
                      style={{
                        width: `${(member.completed / member.tasks) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
