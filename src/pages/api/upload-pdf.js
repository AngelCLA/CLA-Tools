export const prerender = false;

export async function POST({ request }) {
  return new Response(JSON.stringify({
    test: true,
    env_available: !!process.env.BLOB_READ_WRITE_TOKEN
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
