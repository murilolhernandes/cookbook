'use strict'

// This script assumes that you have included the Supabase client library in your HTML
// and that `SUPABASE_URL` and `SUPABASE_ANON_KEY` are available as global variables.
const googleBtn = document.getElementById('google-btn')
const { createClient } = supabase
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

if (googleBtn) {
  googleBtn.addEventListener('click', async () => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/account/login`, // Redirect to home page after login
      },
    })

    if (error) {
      console.error('Error logging in:', error.message)
    }
  })
}

supabaseClient.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' && session) {
    const response = await fetch('/account/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: session.access_token,
        email: session.user.email
      }),
    })

    if (response.ok) {
      window.location.href = "/account/";
    } else {
      console.error("Failed to sync session with server");
    }
  }
})

// async function handleLogin() {}