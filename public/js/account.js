'use strict'

// This script assumes that you have included the Supabase client library in your HTML
// and that `SUPABASE_URL` and `SUPABASE_ANON_KEY` are available as global variables.
document.addEventListener('DOMContentLoaded', () => {

  // Check if the server redirected us here after a logout
  const params = new URLSearchParams(window.location.search)
  if (params.get('logout') === 'success') {
    // Manually clear Supabase tokens from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('sb-')) {
        localStorage.removeItem(key)
      }
    })
    // Clean up the URL so the user doesn't see the query param
    window.history.replaceState(null, null, window.location.pathname)
  }

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
      // Clean up the URL hash (remove the token) so it doesn't look messy
      if (window.location.hash) {
        window.history.replaceState(null, null, window.location.pathname)
      }

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
        // Only redirect if we are on the login or register page.
        // This prevents the "infinite loop" if a user lands on the home page with a token.
        const path = window.location.pathname
        if (path.includes('/account/login') || path.includes('/account/register')) {
          window.location.href = "/account/";
        }
      } else {
        console.error("Failed to sync session with server");
      }
    }
  })
})