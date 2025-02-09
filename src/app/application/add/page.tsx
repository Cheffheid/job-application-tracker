import CreateForm from "~/app/_components/forms/create-form";

export default async function AddApplication() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-4">
      <h2 className="mb-4 text-2xl font-semibold">Add New Application</h2>
      <CreateForm></CreateForm>
    </div>
  );
}
