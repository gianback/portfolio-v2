import type { APIRoute } from "astro";
import { URL_SPREADSHEET } from "astro:env/server";
import { google } from "googleapis";
export const POST: APIRoute = async ({ request }) => {
  console.log(request.body);

  const body = await request.json();

  const params = new URLSearchParams();

  params.append("submit", "Submit");
  params.append("usp", "pp_url");
  params.append("entry.1421905852", body.full_name);
  params.append("entry.1424868227", body.email);
  params.append("entry.1360716532", body.message);

  const url = `${URL_SPREADSHEET}?${params.toString()}`;

  return new Response(
    JSON.stringify({
      url,
    }),
    {
      status: 200,
      statusText: "Internal Server Error",
    }
  );
};
