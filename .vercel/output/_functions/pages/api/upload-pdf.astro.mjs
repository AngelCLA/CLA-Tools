export { renderers } from '../../renderers.mjs';

const prerender = false;

async function POST({ request }) {
  return new Response(JSON.stringify({
    test: true,
    env_available: !!process.env.BLOB_READ_WRITE_TOKEN
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
