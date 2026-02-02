export const prerender = false;

export function GET() {
  return new Response(JSON.stringify({
    ok: true,
    token: !!process.env.BLOB_READ_WRITE_TOKEN,
    env: process.env.VERCEL_ENV
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
