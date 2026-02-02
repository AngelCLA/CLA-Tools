export { renderers } from '../../renderers.mjs';

const prerender = false;

function GET() {
  return new Response(JSON.stringify({
    ok: true,
    token: !!process.env.BLOB_READ_WRITE_TOKEN,
    env: process.env.VERCEL_ENV
  }), {
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
