export const prerender = false;

export async function GET() {
  return new Response(
    JSON.stringify({
      status: "alive",
      message: "Server is running",
      timestamp: Date.now()
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
