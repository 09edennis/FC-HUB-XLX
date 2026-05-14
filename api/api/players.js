export default async function handler(req, res) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return res.status(500).json({
        ok: false,
        error: "Missing Supabase environment variables"
      });
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/players?select=*&order=price.desc`,
      {
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        error: data
      });
    }

    return res.status(200).json({
      ok: true,
      players: data
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
}
