export default function SidePanel() {
  return (
    <aside className="sidebar">
      <div className="brand-card">
        <p className="eyebrow">Focus planner</p>
        <h2>Organize your day with calm clarity.</h2>
        <p>
          A beautifully simple place to track your priorities, keep momentum,
          and finish what matters.
        </p>
      </div>

      <div className="quick-card">
        <p className="card-title">Today’s rhythm</p>
        <ul>
          <li>Morning review</li>
          <li>Deep work block</li>
          <li>Evening wrap-up</li>
        </ul>
      </div>
    </aside>
  );
}
