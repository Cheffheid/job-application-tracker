"use client";

import { useActionState } from "react";
import { createApplication } from "~/app/actions";

const initialState = { message: "" };

export default function ApplicationForm() {
  const [state, formAction] = useActionState(createApplication, initialState);

  const inputClasses =
    "peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0";
  const labelClasses =
    "absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500";

  return (
    <form className="min-w-96 bg-white p-4 text-black" action={formAction}>
      <div className="group relative z-0 mb-5 w-full">
        <input
          className={inputClasses}
          type="text"
          name="role"
          id="role"
          placeholder=""
          required
        ></input>
        <label className={labelClasses} htmlFor="role">
          Role
        </label>
      </div>
      <div className="group relative z-0 mb-5 w-full">
        <input
          className={inputClasses}
          type="text"
          name="company"
          id="company"
          placeholder=""
          required
        ></input>
        <label className={labelClasses} htmlFor="role">
          Company
        </label>
      </div>
      <div className="group relative z-0 mb-5 w-full">
        <input
          className={inputClasses}
          type="date"
          name="applied_at"
          id="applied_at"
          placeholder=""
          required
        ></input>
        <label className={labelClasses} htmlFor="role">
          Application Date
        </label>
      </div>
      <div className="group relative z-0 mb-5 w-full">
        <input
          className={inputClasses}
          type="url"
          name="statusurl"
          id="statusurl"
          placeholder=""
        ></input>
        <label className={labelClasses} htmlFor="role">
          Status URL
        </label>
      </div>
      <div className="group relative z-0 mb-5 w-full">
        <input
          className={inputClasses}
          type="url"
          name="descriptionurl"
          id="descriptionurl"
          placeholder=""
          required
        ></input>
        <label className={labelClasses} htmlFor="role">
          Job Description URL
        </label>
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
