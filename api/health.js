module.exports = function handler(req, res) {
  const envKeys = Object.keys(process.env)
    .filter(key => key.toLowerCase().includes("supabase"))
    .sort();

  return res.status(200).json({
    ok: true,
    message: "FC Hub backend is live",
    hasSupabaseUrl: Boolean(process.env.SUPABASE_URL),
    hasAnonKey: Boolean(process.env.SUPABASE_ANON_KEY),
    hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    detectedSupabaseVariableNames: envKeys
  });
};
