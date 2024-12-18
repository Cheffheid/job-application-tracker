"use client";

import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { updateApplication } from "~/app/actions";
import { statusesEnum } from "~/server/db/schema";

export default function UpdateForm({
  application,
}: {
  application: {
    id: number;
    role: string;
    company: string;
    status: "pending" | "interviewed" | "rejected" | null;
    appliedAt: string;
    statusUrl: string | null;
    descriptionUrl: string;
  };
}) {
  const initialState = {
    message: "",
    payload: {
      completed: false,
      successful: false,
    },
  };

  const [state, formAction] = useActionState(updateApplication, initialState);
  const [applicationData, setApplicationData] = useState({ ...application });

  function handleValueUpdate(
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>,
  ) {
    const { name, value } = e.currentTarget;

    setApplicationData((applicationData) => ({
      ...applicationData,
      [name]: value,
    }));
  }

  useEffect(() => {
    if (state?.payload?.completed) {
      toast(state.message);

      state.payload.completed = false;
    }
  });

  const inputClasses =
    "peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0";
  const labelClasses =
    "absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500";

  return (
    <form className="min-w-96 bg-white p-4 text-black" action={formAction}>
      <div className="group relative z-0 mb-5 w-full">
        <input type="hidden" name="id" id="id" value={applicationData.id} />
        <input
          className={inputClasses}
          type="text"
          name="role"
          id="role"
          placeholder=""
          value={applicationData.role}
          onChange={handleValueUpdate}
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
          value={applicationData.company}
          onChange={handleValueUpdate}
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
          value={applicationData.appliedAt}
          onChange={handleValueUpdate}
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
          name="descriptionurl"
          id="descriptionurl"
          placeholder=""
          value={applicationData.descriptionUrl}
          onChange={handleValueUpdate}
          required
        ></input>
        <label className={labelClasses} htmlFor="role">
          Job Description URL
        </label>
      </div>
      <div className="group relative z-0 mb-5 w-full">
        <input
          className={inputClasses}
          type="url"
          name="statusurl"
          id="statusurl"
          placeholder=""
          value={applicationData.statusUrl ? applicationData.statusUrl : ""}
          onChange={handleValueUpdate}
        ></input>
        <label className={labelClasses} htmlFor="role">
          Status URL
        </label>
      </div>
      <div className="group relative z-0 mb-5 w-full">
        <select
          className={inputClasses}
          name="status"
          id="status"
          onChange={handleValueUpdate}
        >
          {statusesEnum.enumValues.map((statusText, idx) => {
            return (
              <option key={`status-${idx}`} value={statusText}>
                {statusText}
              </option>
            );
          })}
        </select>
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
      >
        Update
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
