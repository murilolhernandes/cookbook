'use strict'

// This script assumes that you have included the Supabase client library in your HTML
// and that `SUPABASE_URL` and `SUPABASE_ANON_KEY` are available as global variables.
const googleBtn = document.getElementById('google-btn')

if (googleBtn) {
  googleBtn.addEventListener('click', async () => {
    const { createClient } = supabase
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin, // Redirect to home page after login
      },
    })

    if (error) {
      console.error('Error logging in:', error.message)
    }
  })
}

// async function handleLogin() {}