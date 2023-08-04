import type { RequestHandler } from "@sveltejs/kit"

export const GET = (async ({ request }) => {
    
    return new Response(null, {
        headers: {
            "Content-type" : "application/pdf",
            "Content-Disposition": "attachment; filename=resume.pdf"
        }
    })
}) satisfies RequestHandler