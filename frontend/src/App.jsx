import { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormModel from "./components/FormModel";
import api from "@/services/api";
import "./App.css";
import SidePanel from "./components/SidePanel";
import StatsTask from "./components/StatsTask";
import FileterTask from "./components/FilterTask";

const categoriesTask = [
  {
    id: 0,
    icon: "fa fa-house",
    text: "Home",
    color: "bg-blue-200",
    active: true,
  },
  {
    id: 1,
    icon: "fa fa-thumbtack",
    text: "Work",
    color: "bg-red-200",
    active: false,
  },
  {
    id: 2,
    icon: "fa fa-lightbulb",
    text: "Ideas",
    color: "bg-yellow-200",
    active: false,
  },
  {
    id: 3,
    icon: "fa fa-star",
    text: "Favorites",
    color: "bg-orange-200",
    active: false,
  },
  {
    id: 4,
    icon: "fa fa-tag",
    text: "Tags",
    color: "bg-green-200",
    active: false,
  },
  {
    id: 5,
    icon: "fa fa-book",
    text: "Reading",
    color: "bg-purple-200",
    active: false,
  },
  {
    id: 6,
    icon: "fa fa-cart-shopping",
    text: "Shopping",
    color: "bg-indigo-200",
    active: false,
  },
  {
    id: 7,
    icon: "fa fa-dumbbell",
    text: "Fitness",
    color: "bg-lime-200",
    active: false,
  },
];
function App() {
  const [showModal, setShowModal] = useState(false);
  const [lstTask, setTasks] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      category: categoriesTask[0].id,
    },
  });

  const [filter, setFilter] = useState("all");
  const visibleTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return lstTask.filter((task) => Number(task.is_completed) === 0);

      case "completed":
        return lstTask.filter((task) => Number(task.is_completed) === 1);

      case "all":
      default:
        return lstTask;
    }
  }, [lstTask, filter]);

  const categoryMap = Object.fromEntries(
    categoriesTask.map((item) => [item.id, item]),
  );
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get("/todos");

        console.log(response.data.data);
        setTasks(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, []);
  const onSubmitForm = async (data) => {
    await createTask(data);
  };

  const createTask = async (data) => {
    try {
      const response = await api.post("/todos", data);
      console.log(response.data);
      setTasks((prev) => [
        ...prev,
        {
          ...response.data.todo,
          is_completed: 0,
        },
      ]);
      reset();
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  const stats = useMemo(() => {
    const completed = lstTask.filter((task) => Number(task.is_completed) === 1).length;
    const total = lstTask.length;

    return {
      total,
      completed,
      pending: total - completed,
      progress: total === 0 ? 0 : Math.round((completed / total) * 100),
    }
  }, [lstTask]);

  const toggleUpdateTask = async (id) => {
    try {
      const response = await api.put("/todos/" + id, { is_completed: 1 });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? { ...task, is_completed: !task.completed } : task,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete("/todos/" + id);
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
      //Hàm filter() tạo ra một mảng mới với tất cả các phần tử của mảng hiện tại mà thỏa mã điều kiện được cung cấp trong hàm callback.
      // Trong trường hợp này, nó giữ lại tất cả các task mà có id khác với id của task cần xóa.
    } catch (error) {
      console.error(error);
    }
  };

  const clearCompleted = async () => {
    try {
      await api.get("/todos/clear-completed");
      setTasks((currentTasks) =>
        currentTasks.filter((task) => Number(task.is_completed) !== 1),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-shell">
      <SidePanel />

      <main className="todo-panel">
        <header className="todo-header">
          <div>
            <p className="eyebrow">Productivity board</p>
            <h1>Today&apos;s focus list</h1>
            <p className="subtitle">
              Stay on top of your priorities with a polished workspace.
            </p>
          </div>
          <div className="header-badge">
            <button
              className="hover:-translate-y-px hover:cursor-pointer "
              type="button"
              onClick={() => setShowModal(true)}
            >
              Add Task
            </button>
          </div>

          {/* <div className="header-badge">{stats.pending} left</div> */}
        </header>

        <StatsTask stats={stats} />

       <FileterTask
          filter={filter}
          setFilter={setFilter}
          clearCompleted={clearCompleted}
        />
        {/* List task view */}
        <ul className="task-list">
          {visibleTasks.length > 0 ? (
            visibleTasks.map((task) => {
              const category = categoryMap[Number(task.category)];

              return (
                <li
                  key={task.id}
                  className={`task-item ${task.is_completed == 1 ? "done" : ""}`}
                >
                  <label className="task-main">
                    <input
                      type="checkbox"
                      checked={task.is_completed == 1}
                      onClick={() => toggleUpdateTask(task.id)}
                      disabled={task.is_completed == 1}
                    />

                    <span className="task-content">
                      <span className="task-title">{task.title}</span>

                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs ${category?.color}`}
                      >
                        <i className={category?.icon}></i>
                        {category?.text}
                      </span>
                    </span>
                  </label>

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => deleteTask(task.id)}
                  >
                    ×
                  </button>
                </li>
              );
            })
          ) : (
            <li className="empty-state">No tasks in this view yet.</li>
          )}
        </ul>
      </main>
      {showModal && (
        <FormModel
          title="Add Task"
          categoriesTask={categoriesTask}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit(onSubmitForm)}
          isSubmitting={isSubmitting}
          register={register}
          watch={watch}
          errors={errors}
        ></FormModel>
      )}
    </div>
  );
}

export default App;
