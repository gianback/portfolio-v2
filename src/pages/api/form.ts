import type { APIRoute } from "astro";
import {
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  SPREADSHEET_ID,
} from "astro:env/server";
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

  const auth = new google.auth.GoogleAuth({
    credentials: {
      private_key: GOOGLE_PRIVATE_KEY,
      client_email: GOOGLE_CLIENT_EMAIL,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  console.log(body);

  const values = [
    ["Nombres y Apellidos", "Correo", "Mensaje"],
    [body.full_name, body.email, body.message],
  ];

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values,
      },
    });

    console.log({ response });

    if (response.status >= 500) {
      return new Response(null, {
        status: 500,
        statusText: "Internal Server Error",
      });
    }

    return new Response(null, {
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    console.log(error);
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
