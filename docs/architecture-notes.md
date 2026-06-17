# InfraHub Architecture Notes

## Authentication Flow

1. User enters email and password on LoginForm.
2. LoginForm calls loginAction.
3. loginAction sends credentials to Supabase.
4. Supabase validates credentials.
5. Supabase creates a session.
6. Middleware checks if a session exists.
7. Logged-in users can access /dashboard.
8. Logged-out users are redirected to /login.
9. signOutAction removes the session.
10. Middleware blocks access after logout.

## Important Files

components/auth/LoginForm.tsx
- Login UI
- Calls loginAction

app/(auth)/login/actions.ts
- loginAction
- signOutAction

middleware.ts
- Protects routes
- Redirects users

app/(dashboard)/layout.tsx
- Verifies session
- Loads dashboard shell

lib/supabase/client.ts
- Browser Supabase client

lib/supabase/server.ts
- Server Supabase client