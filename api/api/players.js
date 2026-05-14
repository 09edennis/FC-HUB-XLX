module.exports = async function handler(req, res) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl) {
      return res.status(500).json({
        ok: false,
        error: "SUPABASE_URL is missing in Vercel variables"
      });
    }

    if (!serviceRoleKey) {
      return res.status(500).json({
        ok: false,
        error: "SUPABASE_SERVICE_ROLE_KEY is missing in Vercel variables"
      });
    }

    const url = `${supabaseUrl}/rest/v1/players?select=*&order=price.desc`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json"
      }
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        status: response.status,
        error: data
      });
    }

    return res.status(200).json({
      ok: true,
      count: Array.isArray(data) ? data.length : 0,
      players: data
    });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message || "Unknown server error"
    });
  }
};
