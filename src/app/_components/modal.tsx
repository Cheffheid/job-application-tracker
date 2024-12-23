"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({
  title = "Application Details",
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="absolute w-screen max-w-lg"
      onClose={onDismiss}
    >
      <div className="flex justify-between px-4 py-2">
        <h2>
          <strong>{title}</strong>
        </h2>
        <button
          onClick={onDismiss}
          className=""
          aria-label="close modal"
          autoFocus
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {children}
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
