export const prerender = false;

import { put } from "@vercel/blob";

export async function POST({ request }) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Missing BLOB_READ_WRITE_TOKEN env var");
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return new Response("Missing file", { status: 400 });
  }

  const blob = await put(file.name, file, {
    access: "public",
  });

  return Response.json({
    success: true,
    url: blob.url,
  });
}
