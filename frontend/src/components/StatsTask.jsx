export default function StatsTask({ stats }) {
    return (
        <section className="stats-grid" aria-label="Task overview">
          <article className="stat-card">
            <span>Total tasks</span>
            <strong>{stats.total}</strong>
          </article>
          <article className="stat-card">
            <span>Completed</span>
            <strong>{stats.completed}</strong>
          </article>
          <article className="stat-card">
            <span>Progress</span>
            <strong>{stats.progress}%</strong>
          </article>
        </section>
    )
}