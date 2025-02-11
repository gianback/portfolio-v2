import type { APIRoute } from "astro";
import {
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  SPREADSHEET_ID,
} from "astro:env/server";
import { google } from "googleapis";
export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  const auth = new google.auth.GoogleAuth({
    credentials: {
      private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: GOOGLE_CLIENT_EMAIL,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  const values = [[body.full_name, body.email, body.message]];

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Contacto Formulario",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values,
      },
    });

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
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
