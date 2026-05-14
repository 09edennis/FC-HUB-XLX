module.exports = function handler(req, res) {
  return res.status(200).json({
    ok: true,
    message: "FC Hub backend is live",
    hasSupabaseUrl: !!process.env.SUPABASE_URL,
    hasAnonKey: !!process.env.SUPABASE_ANON_KEY,
    hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
  });
};
