"use server";

import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { applications } from "~/server/db/schema";
import { auth } from "~/server/auth";
import { createInsertSchema } from "drizzle-zod";
import { eq } from "drizzle-orm";

type ApplicationType = typeof applications.$inferInsert;

export async function isDemoUser() {
  const session = await auth();

  return !session || "demo" === session.user.accessLevel;
}

export async function isSpecialUser() {
  const session = await auth();

  return !session || "special" === session.user.accessLevel;
}

export async function getUserId() {
  const session = await auth();

  return session ? session.user.id : "";
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
  const schema = createInsertSchema(applications);
  const user = await auth();

  const parse = schema.safeParse({
    role: formData.get("role"),
    company: formData.get("company"),
    appliedAt: formData.get("applied_at"),
    statusUrl: formData.get("statusurl"),
    descriptionUrl: formData.get("descriptionurl"),
    createdBy: user?.user.id,
  });

  if (!parse.success) {
    console.error("Failed to parse input", parse.error);
    return {
      message: "Failed to create application",
      payload: { completed: true, successful: false },
    };
  }

  const data: ApplicationType = parse.data;

  try {
    await db.insert(applications).values(data);

    revalidatePath("/");

    return {
      message: `Added application for ${data.role}`,
      payload: { completed: true, successful: true },
    };
  } catch (e) {
    console.error("Failed to create application:", e);
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
  const schema = createInsertSchema(applications, {
    id: (schema) => schema.positive(),
  });

  const parse = schema.safeParse({
    id: Number(formData.get("id")),
    role: formData.get("role"),
    company: formData.get("company"),
    appliedAt: formData.get("applied_at"),
    statusUrl: formData.get("statusurl"),
    descriptionUrl: formData.get("descriptionurl"),
    applicationStatus: formData.get("applicationStatus"),
    secondaryStatus: formData.get("secondaryStatus"),
  });

  if (!parse.success) {
    return {
      message: "Failed to update application. Parse error.",
      payload: { completed: true, successful: false },
    };
  }

  const data = parse.data;

  if (!data.id) {
    return {
      message: "Failed to update application. Missing application ID.",
      payload: { completed: true, successful: false },
    };
  }

  try {
    await db.update(applications).set(data).where(eq(applications.id, data.id));

    revalidatePath("/application/update");

    return {
      message: `Updated application for ${data.role} at ${data.company}`,
      payload: { completed: true, successful: true },
    };
  } catch (e) {
    return {
      message: "Failed to update application",
      payload: { completed: true, successful: false },
    };
  }
}
