export default async function AddApplication() {
  const fields = [
    {
      label: "Role",
      id: "role",
      type: "text",
    },
    {
      label: "Company",
      id: "company",
      type: "text",
    },
    {
      label: "Application Date",
      id: "applied_at",
      type: "date",
    },
    {
      label: "Status URL",
      id: "statusurl",
      type: "url",
    },
    {
      label: "Job Description Link",
      id: "descriptionurl",
      type: "url",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl pt-4">
      <h2 className="mb-4 text-2xl font-semibold">Add New Application</h2>
      <form className="min-w-96 bg-white p-4 text-black">
        {fields.map((field) => (
          <div className="group relative z-0 mb-5 w-full" key={field.id}>
            <input
              type={field.type}
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              id={field.id}
              placeholder=""
            ></input>
            <label
              htmlFor="role"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              {field.label}
            </label>
          </div>
        ))}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
        </button>
      </form>
    </div>
  );
}
