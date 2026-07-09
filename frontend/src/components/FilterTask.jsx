export default function FilterTask({ filter, setFilter, clearCompleted }) {
    return (
          <div className="list-toolbar">
          <div className="filters" role="tablist" aria-label="Task filters">
            <button
              type="button"
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              type="button"
              className={filter === "active" ? "active" : ""}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              type="button"
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>

          <button
            type="button"
            className="ghost-button"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        </div>
    )
}