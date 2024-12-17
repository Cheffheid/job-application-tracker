"use server";

import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { application } from "~/server/db/schema";
import { auth } from "~/server/auth";
import { createInsertSchema } from "drizzle-zod";
import { eq } from "drizzle-orm";

type ApplicationType = typeof application.$inferInsert;
type UpdateType = {
  id?: number | undefined;
  role?: string | undefined;
  company?: string | undefined;
  status?: "pending" | "interviewed" | "rejected" | null | undefined;
  appliedAt?: string | undefined;
  statusUrl?: string | null | undefined;
  descriptionUrl?: string | undefined;
};

export async function isDemoUser() {
  const session = await auth();

  return !session || "demo" === session.user.accessLevel;
}

export async function createApplication(
  prevState: {
    message: string;
    payload: {
      completed: boolean;
      successful: boolean;
    };
  },
  formData: FormData,
): Promise<{
  message: string;
  payload: {
    completed: boolean;
    successful: boolean;
  };
}> {
  const schema = createInsertSchema(application);

  const parse = schema.safeParse({
    role: formData.get("role"),
    company: formData.get("company"),
    appliedAt: formData.get("applied_at"),
    statusUrl: formData.get("statusurl"),
    descriptionUrl: formData.get("descriptionurl"),
  });

  if (!parse.success) {
    return {
      message: "Failed to create application",
      payload: { completed: true, successful: false },
    };
  }

  const data: ApplicationType = parse.data;

  try {
    await db.insert(application).values(data);

    revalidatePath("/");

    return {
      message: `Added application for ${data.role}`,
      payload: { completed: true, successful: true },
    };
  } catch (e) {
    return {
      message: "Failed to create application",
      payload: { completed: true, successful: false },
    };
  }
}

export async function updateApplication(
  prevState: {
    message: string;
    payload: {
      completed: boolean;
      successful: boolean;
    };
  },
  formData: FormData,
): Promise<{
  message: string;
  payload: {
    completed: boolean;
    successful: boolean;
  };
}> {
  const schema = createInsertSchema(application, {
    id: (schema) => schema.positive(),
  });

  const parse = schema.safeParse({
    id: formData.get("id"),
    role: formData.get("role"),
    company: formData.get("company"),
    appliedAt: formData.get("applied_at"),
    statusUrl: formData.get("statusurl"),
    descriptionUrl: formData.get("descriptionurl"),
  });

  if (!parse.success) {
    return {
      message: "Failed to update application. Parse error.",
      payload: { completed: true, successful: false },
    };
  }

  const data: UpdateType = parse.data;

  if (!data.id) {
    return {
      message: "Failed to update application. Missing application ID.",
      payload: { completed: true, successful: false },
    };
  }

  try {
    await db.update(application).set(data).where(eq(application.id, data.id));

    revalidatePath("/");

    return {
      message: `Added application for ${data.role}`,
      payload: { completed: true, successful: true },
    };
  } catch (e) {
    return {
      message: "Failed to create application",
      payload: { completed: true, successful: false },
    };
  }
}
