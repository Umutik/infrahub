# Lessons Learned

## Git

- git commit does not push to GitHub
- git push sends commits to GitHub

## PowerShell

- Paths with parentheses need quotes:
  "app/(dashboard)/layout.tsx"

## Next.js

- Route groups (auth) do not appear in URLs
- layout.tsx wraps child pages

## Supabase

- signInWithPassword validates credentials
- signOut removes the session
- middleware checks auth before loading pages