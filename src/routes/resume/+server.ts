import fs from 'fs'
import type { RequestHandler } from "@sveltejs/kit"

export const GET = (async ({ request }) => {
    const pdf = fs.readFileSync("./resume/resume.pdf")
    return new Response(pdf, {
        headers: {
            "Content-type" : "application/pdf",
            "Content-Disposition": "attachment; filename=resume-viernes.pdf"
        }
    })
}) satisfies RequestHandler