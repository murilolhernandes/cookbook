const pool = require('../database/')

/* *****************************
* Get user data by email (since Supabase Auth uses email)
* ***************************** */
async function getUserByEmail(email) {
  try {
    const result = await pool.query(
      'SELECT * FROM public.users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  } catch (error) {
    return new Error("No matching email found")
  }
}

module.exports = { getUserByEmail };