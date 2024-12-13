"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "~/server/db";
import { application } from "~/server/db/schema";
import { auth } from "~/server/auth";

type NewApplication = typeof application.$inferInsert;

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
  const schema = z.object({
    role: z.string().min(1),
    company: z.string().min(1),
    appliedAt: z.string().min(1),
    statusUrl: z.string(),
    descriptionUrl: z.string().min(1),
  });

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

  const data: NewApplication = parse.data;

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

export async function isDemoUser() {
  const session = await auth();

  return !session || "demo" === session.user.accessLevel;
}
