export { renderers } from '../../renderers.mjs';

const prerender = false;

async function GET() {
  return new Response(JSON.stringify({
    timestamp: new Date().toISOString(),
    node_version: process.version,
    has_blob_token: !!process.env.BLOB_READ_WRITE_TOKEN,
    token_length: process.env.BLOB_READ_WRITE_TOKEN?.length || 0,
    vercel_env: process.env.VERCEL_ENV || 'not-set',
    all_env_keys: Object.keys(process.env).filter(k => 
      k.includes('BLOB') || k.includes('VERCEL') || k.includes('NODE')
    )
  }, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
