export default function FormModel({
  categoriesTask,
  onClose,
  title,
  onSubmit,
  isSubmitting,
  watch,

  register,
  errors,
}) {
  const selectedCategory = watch("category");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-gray-100 px-6 py-4 rounded-t-xl">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 transition hover:text-red-500"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <form className="space-y-5 p-6" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="titleTask"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Title Task
            </label>

            <input
              id="titleTask"
              type="text"
              placeholder="Enter title task"
              {...register("title", { required: "Title is required" })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>

            <div className="flex gap-2">
              {categoriesTask.map((category) => (
                <label
                  key={category.id}
                  className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border transition ${Number(selectedCategory) === category.id ? category.color : ""}`}
                >
                  <input
                    type="radio"
                    value={category.id}
                    {...register("category", {
                      required: "Category is required",
                    })}
                    defaultChecked={category.id === categoriesTask[0].id}
                    className="hidden"
                  />
                  <i className={`${category.icon} text-lg `}></i>
                </label>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-5 py-2 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
             disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}              
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
