export const prerender = false;

import { put } from "@vercel/blob";

// robust env check
const getToken = () => {
  return process.env.BLOB_READ_WRITE_TOKEN || import.meta.env.BLOB_READ_WRITE_TOKEN;
};

export async function GET() {
  const token = getToken();
  return new Response(JSON.stringify({ 
    status: "ok", 
    message: "PDF Upload API is ready",
    hasToken: !!token
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}

export async function POST({ request }) {
  const token = getToken();

  if (!token) {
    return new Response(
      JSON.stringify({
        error: "Missing BLOB_READ_WRITE_TOKEN env var. Check your Vercel project settings.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Sanitize filename to avoid issues with special characters and collisions
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}-${safeName}`;

    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false, // We already added a timestamp
      token: token // Explicitly pass the token
    });

    return new Response(
      JSON.stringify({
        success: true,
        url: blob.url,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(
      JSON.stringify({
        error: "Upload failed: " + (error.message || "Unknown error"),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
