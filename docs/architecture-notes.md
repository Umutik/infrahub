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

## Assets Module (Phase 02)

### Database

Table: assets

Columns:
- id (UUID)
- asset_name
- asset_type
- environment
- owner
- status
- description
- created_at
- updated_at

### Architecture

Assets use a standard CRUD flow:

UI
→ API Routes
→ Service Layer
→ Supabase

### API Routes

app/api/assets/route.ts
- GET all assets
- POST create asset

app/api/assets/[id]/route.ts
- GET single asset
- PUT update asset
- DELETE asset

### Service Layer

services/assetService.ts

Functions:
- getAllAssets()
- getAssetById()
- createAsset()
- updateAsset()
- deleteAsset()

### Pages

app/(dashboard)/assets/page.tsx
- Assets list page

app/(dashboard)/assets/new/page.tsx
- Create asset page

app/(dashboard)/assets/[id]/page.tsx
- Asset detail page

app/(dashboard)/assets/[id]/edit/page.tsx
- Edit asset page

### Components

components/assets/AssetTable.tsx
- Assets table

components/assets/AssetForm.tsx
- Shared create/edit form

components/assets/AssetDetail.tsx
- Read-only asset details

components/assets/StatusBadge.tsx
- Status display

components/assets/DeleteButton.tsx
- Delete confirmation

### Security

RLS enabled for:
- SELECT
- INSERT
- UPDATE
- DELETE

Owner is assigned from authenticated user session.

## Dashboard Module (Phase 03)

### Purpose

The Dashboard provides a high-level overview of infrastructure assets and serves as the application's landing page after login.

### Architecture

Dashboard Page
→ Service Layer
→ Supabase

No API routes are required for dashboard rendering.

### Service Layer

services/assetService.ts

Additional functions:

* getAssetStats()
* getRecentAssets(limit)

#### getAssetStats()

Returns:

* total
* active
* inactive
* retired
* maintenance

Used by dashboard StatCards.

#### getRecentAssets()

Returns the most recently created assets ordered by:

created_at DESC

Used by the Recent Assets table.

### Dashboard Components

components/dashboard/StatCard.tsx

* Displays a single dashboard metric
* Reusable card component
* Supports variants:

  * default
  * success
  * warning
  * danger

components/dashboard/RecentAssetsTable.tsx

* Displays up to 5 most recent assets
* Links directly to Asset Details pages
* Reuses StatusBadge component

components/dashboard/EmptyDashboard.tsx

* Displayed when no assets exist
* Provides onboarding message
* Includes Create Your First Asset CTA

### Dashboard Page

app/(dashboard)/dashboard/page.tsx

Responsibilities:

* Load dashboard statistics
* Load recent assets
* Render EmptyDashboard when no assets exist
* Render StatCards and Recent Assets when data exists

### Data Loading Strategy

Dashboard uses Server Components.

Data is loaded server-side before HTML is sent to the browser.

Queries are executed in parallel using:

Promise.all()

Benefits:

* Faster page load
* No loading spinner
* No client-side dashboard fetch requests

### Server Component Rules

Dashboard components do NOT use:

* useState
* useEffect
* "use client"

Dashboard data is fetched directly on the server.

### Dashboard Statistics

Displayed metrics:

* Total Assets
* Active Assets
* Retired Assets
* Maintenance Assets

Statistics are calculated from asset status values stored in Supabase.

### Empty State Logic

When:

stats.total === 0

Dashboard displays:

* EmptyDashboard component
* Create Your First Asset button

Dashboard hides:

* StatCards
* Recent Assets table

### Responsive Layout

Dashboard supports:

* Mobile (375px)
* Tablet (768px)
* Desktop (1280px)

StatCard Grid:

* Mobile: 1 column
* Tablet: 2 columns
* Desktop: 4 columns

Recent Assets table remains scrollable on smaller screens.

### QA Coverage

Phase 03 includes validation for:

* Dashboard statistics accuracy
* Recent Assets ordering
* Asset count updates after create/edit/delete
* Empty state behavior
* Authentication protection
* Responsive layout
* Server-side rendering behavior
