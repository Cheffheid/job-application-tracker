"use client";

import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { updateApplication } from "~/app/actions";
import { statusTypes, secondaryStatusTypes } from "~/server/db/schema";

export default function UpdateForm({
  application,
}: {
  application: {
    id: number;
    role: string;
    company: string;
    applicationStatus: string | null;
    secondaryStatus: string | null;
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
    "block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0";
  const labelClasses = "text-sm text-gray-500";

  const floatingInputClasses = inputClasses + " peer";
  const floatingLabelClasses =
    labelClasses +
    " absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4";

  return (
    <form className="min-w-96 bg-white p-4 text-black" action={formAction}>
      <div className="group relative z-0 mb-5 w-full">
        <input type="hidden" name="id" id="id" value={applicationData.id} />
        <input
          className={floatingInputClasses}
          type="text"
          name="role"
          id="role"
          placeholder=""
          value={applicationData.role}
          onChange={handleValueUpdate}
          required
        ></input>
        <label className={floatingLabelClasses} htmlFor="role">
          Role
        </label>
      </div>
      <div className="group relative z-0 mb-5 w-full">
        <input
          className={floatingInputClasses}
          type="text"
          name="company"
          id="company"
          placeholder=""
          value={applicationData.company}
          onChange={handleValueUpdate}
          required
        ></input>
        <label className={floatingLabelClasses} htmlFor="role">
          Company
        </label>
      </div>
      <div className="group relative z-0 mb-5 w-full">
        <input
          className={floatingInputClasses}
          type="date"
          name="applied_at"
          id="applied_at"
          placeholder=""
          value={applicationData.appliedAt}
          onChange={handleValueUpdate}
          required
        ></input>
        <label className={floatingLabelClasses} htmlFor="role">
          Application Date
        </label>
      </div>
      <div className="group relative z-0 mb-5 w-full">
        <input
          className={floatingInputClasses}
          type="url"
          name="descriptionurl"
          id="descriptionurl"
          placeholder=""
          value={applicationData.descriptionUrl}
          onChange={handleValueUpdate}
          required
        ></input>
        <label className={floatingLabelClasses} htmlFor="role">
          Job Description URL
        </label>
      </div>
      <div className="group relative z-0 mb-5 w-full">
        <input
          className={floatingInputClasses}
          type="url"
          name="statusurl"
          id="statusurl"
          placeholder=""
          value={applicationData.statusUrl ? applicationData.statusUrl : ""}
          onChange={handleValueUpdate}
        ></input>
        <label className={floatingLabelClasses} htmlFor="role">
          Status URL
        </label>
      </div>
      <div className="group relative z-0 mb-5 w-full">
        <label className={labelClasses} htmlFor="applicationStatus">
          Status
        </label>
        <select
          className={inputClasses}
          name="applicationStatus"
          id="applicationStatus"
          onChange={handleValueUpdate}
          value={
            applicationData.applicationStatus
              ? applicationData.applicationStatus
              : ""
          }
        >
          {statusTypes.map((statusText, idx) => {
            return (
              <option key={`status-${idx}`} value={statusText}>
                {statusText}
              </option>
            );
          })}
        </select>
      </div>
      <div className="group relative z-0 mb-5 w-full">
        <label className={labelClasses} htmlFor="secondaryStatus">
          Secondary Status
        </label>
        <select
          className={inputClasses}
          name="secondaryStatus"
          id="secondaryStatus"
          onChange={handleValueUpdate}
          value={
            applicationData.secondaryStatus
              ? applicationData.secondaryStatus
              : ""
          }
        >
          {secondaryStatusTypes.map((statusText, idx) => {
            return (
              <option key={`secondary-status-${idx}`} value={statusText}>
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
