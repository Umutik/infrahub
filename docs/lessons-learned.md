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

## Dashboard

* Dashboards often require aggregate data rather than full records
* Statistics can be calculated on the server before rendering the page
* Empty states should be designed intentionally and tested
* Dashboard pages often act as the main entry point into an application

## Server Components

* Server Components render on the server before HTML reaches the browser
* Server Components can query databases directly without creating API endpoints
* Server Components cannot use useState or useEffect
* Server Components reduce client-side requests and improve performance
* Promise.all() allows multiple independent queries to run in parallel
* Parallel queries are usually faster than awaiting requests one by one

## Performance

* Not every page needs client-side fetching
* Browser Network tools can verify whether data is loaded server-side or client-side
* Avoid unnecessary request waterfalls by loading independent data in parallel
* Rendering data on the server can improve initial page load time

## UI Components

* Small reusable components make pages easier to maintain
* A component should have a single responsibility
* Reusing existing components (StatusBadge, Button) keeps the UI consistent
* Separate empty-state components help simplify page logic

## Responsive Design

* Layouts should be tested on mobile, tablet, and desktop screen sizes
* Tables should scroll horizontally on small screens instead of breaking layouts
* CSS grid can adapt layouts using responsive Tailwind classes
* Responsive testing should be part of QA, not an afterthought

## QA

* Dashboard statistics should be validated against database records
* Empty states require dedicated test cases
* Network tab verification can confirm server-side rendering behavior
* Manual QA should verify navigation paths, counts, links, and data accuracy
* Testing should include create, edit, delete, and status-change scenarios

## URL State

* URL query parameters can represent application state
* Search, filters, sorting, and pagination can all be synchronized with the URL
* URL-based state allows users to bookmark and share filtered views
* Updating URL parameters should preserve unrelated parameters whenever possible

## Search & Filtering

* Debounced search reduces unnecessary page reloads
* Search should reset pagination to the first page
* Server-side filtering scales better than filtering large datasets in the browser
* Empty states should distinguish between "no data" and "no matching results"

## Pagination

* Pagination should limit database queries using ranges
* Pagination should preserve search, filter, and sort parameters
* Pagination controls should not render when only one page exists
* Changing filters or search should reset pagination to page 1

## Sorting

* Sorting should validate allowed database columns before querying
* Sort direction should toggle between ascending and descending
* Visual indicators help users understand the current sort order

* ilike enables case-insensitive text searches
* eq filters exact column matches
* order controls database sorting
* range retrieves only a subset of rows for pagination
* count: "exact" can return the total number of matching records

## Debugging

* Integration bugs often appear only when multiple components work together
* Browser Network tools help identify unexpected repeated requests
* Compare the current URL and the next URL before triggering router.push()
* Small defensive checks can prevent unnecessary re-renders and navigation loops

## Architecture

* Server Components should fetch data and pass it to Client Components
* Client Components should handle user interactions, not database access
* Keeping data fetching centralized simplifies maintenance
* Reusable components reduce duplication across pages

## Integration

* Features that work correctly in isolation can still fail when combined
* Always test search, filtering, sorting, and pagination together—not just individually
