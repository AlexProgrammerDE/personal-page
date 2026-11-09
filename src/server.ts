import handler from "@tanstack/react-start/server-entry";

const redirects: Record<string, string> = {
  "/discord": "https://discord.gg/X4uV74BTKb",
  "/github": "https://github.com/AlexProgrammerDE",
};

export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    const target = redirects[url.pathname.replace(/\/$/, "")];
    if (target) return Response.redirect(target, 307);
    const original = await handler.fetch(request);
    const response = new Response(original.body, original);
    for (const [key, value] of Object.entries({
      "X-DNS-Prefetch-Control": "on",
      "X-XSS-Protection": "0",
      "X-Frame-Options": "SAMEORIGIN",
      "X-Content-Type-Options": "nosniff",
      "X-Accel-Buffering": "no",
    }))
      response.headers.set(key, value);
    return response;
  },
};
