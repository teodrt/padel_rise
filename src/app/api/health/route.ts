export async function GET() {
  return Response.json({
    ok: true,
    time: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
}



