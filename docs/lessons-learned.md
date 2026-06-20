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

## TypeScript

* TypeScript catches many mistakes before runtime
* Union types help restrict valid values (AssetStatus)
* Partial<T> is useful for edit forms with existing data
* Type imports help keep code organized

## Next.js

* Server Components can fetch data directly on the server
* Client Components are required for useState, useEffect, and event handlers
* Dynamic routes use folders like [id]
* notFound() displays the Next.js 404 page
* API Routes are located under app/api

## Forms

* One reusable form can support both Create and Edit workflows
* Validation should run before API calls
* Form state belongs inside the form component
* Loading states improve user experience

## CRUD

* Create → POST

* Read → GET

* Update → PUT

* Delete → DELETE

* A complete CRUD cycle consists of:

  * List
  * Detail
  * Create
  * Edit
  * Delete

## Supabase

* RLS policies protect data at the database level
* Owner should be assigned from the authenticated user session
* API routes should never trust client-supplied owner values

## Git

* git status shows tracked and untracked files
* New files require git add before they can be committed
* Small commits make debugging easier

## Debugging

* npm run lint should be run before committing
* Browser Network tab helps debug API requests
* Browser Console helps identify frontend errors
* Supabase logs help identify database issues
