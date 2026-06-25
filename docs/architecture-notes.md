# InfraHub Architecture Notes

## Project Overview

### Stack

* Next.js 16 (App Router)
* TypeScript
* Tailwind CSS
* Supabase
* Supabase Auth

### Application Architecture

The application follows a layered architecture:

```
UI
    ↓
API Routes (when required)
    ↓
Service Layer
    ↓
Supabase
```

* Server Components are used by default.
* Client Components are used only for interactive UI.
* Business logic lives in the Service Layer.
* Supabase is responsible for authentication and data storage.

---

# Authentication

## Authentication Flow

1. User enters credentials in `LoginForm`.
2. `loginAction` authenticates with Supabase.
3. Supabase creates a session.
4. Middleware validates the session.
5. Authenticated users access protected routes.
6. Guests are redirected to `/login`.
7. `signOutAction` removes the session.
8. Middleware blocks protected pages after logout.

## Important Files

### Authentication

```
components/auth/LoginForm.tsx
```

* Login UI
* Calls `loginAction`

```
app/(auth)/login/actions.ts
```

* `loginAction`
* `signOutAction`

```
middleware.ts
```

* Protects authenticated routes
* Redirects unauthenticated users

```
app/(dashboard)/layout.tsx
```

* Verifies authenticated session
* Loads dashboard layout

```
lib/supabase/client.ts
```

* Browser Supabase client

```
lib/supabase/server.ts
```

* Server Supabase client

---

# Assets Module

## Database

### Table

```
assets
```

### Columns

* id (UUID)
* asset_name
* asset_type
* environment
* owner
* status
* description
* created_at
* updated_at

---

## API Routes

### Collection

```
app/api/assets/route.ts
```

* GET all assets
* POST create asset

### Individual Asset

```
app/api/assets/[id]/route.ts
```

* GET asset
* PUT update asset
* DELETE asset

---

## Service Layer

```
services/assetService.ts
```

### CRUD

* getAllAssets()
* getAssetById()
* createAsset()
* updateAsset()
* deleteAsset()

### Dashboard

* getAssetStats()
* getRecentAssets(limit)

### Assets List

* getFilteredAssets(filters)

---

## Pages

```
app/(dashboard)/assets/page.tsx
```

Assets list

```
app/(dashboard)/assets/new/page.tsx
```

Create asset

```
app/(dashboard)/assets/[id]/page.tsx
```

Asset details

```
app/(dashboard)/assets/[id]/edit/page.tsx
```

Edit asset

---

## Components

### Assets

* AssetTable
* AssetForm
* AssetDetail
* StatusBadge
* DeleteButton

### Dashboard

* StatCard
* RecentAssetsTable
* EmptyDashboard

### Assets List

* SearchBar
* FilterBar
* SortableColumn
* Pagination
* AssetsEmptyState

---

## Security

Row Level Security (RLS) is enabled for:

* SELECT
* INSERT
* UPDATE
* DELETE

Asset ownership is enforced using the authenticated user session.

---

# Dashboard Module (Phase 03)

## Purpose

The Dashboard provides a high-level overview of infrastructure assets and serves as the landing page after login.

---

## Features

### Statistics

Displays:

* Total Assets
* Active Assets
* Retired Assets
* Maintenance Assets

Statistics are calculated directly from Supabase.

### Recent Assets

Displays the five most recently created assets.

Ordered by:

```
created_at DESC
```

Each row links directly to the Asset Details page.

### Empty State

When no assets exist:

* EmptyDashboard component is displayed
* "Create Your First Asset" button is shown

Statistics and Recent Assets are hidden.

---

## Data Loading

The Dashboard is implemented as a Server Component.

Data is loaded before HTML is rendered.

Statistics and recent assets are fetched concurrently using:

```
Promise.all()
```

Benefits:

* Faster rendering
* No loading spinner
* No client-side fetching

---

## Responsive Layout

Stat Cards

* Mobile: 1 column
* Tablet: 2 columns
* Desktop: 4 columns

Recent Assets table remains horizontally scrollable on smaller screens.

---

## QA Coverage

* Dashboard statistics
* Recent assets ordering
* Asset count after CRUD operations
* Empty state
* Authentication
* Responsive layout
* Server-side rendering

---

# Assets List Enhancements (Phase 04)

## Purpose

Adds production-ready table functionality:

* Search
* Filtering
* Sorting
* Pagination
* Empty states

---

## URL-Based State

The Assets page stores UI state inside the URL.

Examples:

```
/assets?search=prod
/assets?status=active
/assets?asset_type=Server
/assets?environment=Production
/assets?sort=asset_name&order=asc
/assets?page=2
```

Benefits:

* Bookmarkable
* Shareable
* Refresh-safe
* Browser Back/Forward support

---

## Search Parameters

```
lib/searchParams.ts
```

Responsibilities:

* Parse URL parameters
* Normalize values
* Apply default values
* Build navigation URLs

---

## Filtering

Supports:

* Asset Name (partial search)
* Status
* Asset Type
* Environment

Name search uses Supabase `ilike`.

---

## Sorting

Supported columns:

* asset_name
* status
* created_at

Default:

* created_at
* desc

Invalid sort values automatically fall back to defaults.

---

## Pagination

Rules:

* Page size: 10
* Pages are 1-indexed
* Search and filters reset to page 1
* Existing search/filter/sort state is preserved
* Pagination hides when only one page exists

---

## Empty States

When no assets exist:

* Show "No assets yet"
* Show "Create Your First Asset"

When filters return no results:

* Show "No assets match your filters"
* Show "Clear all filters"

---

## Asset Table

Supports sortable columns:

* Name
* Status
* Created Date

Maintains actions:

* View
* Edit
* Delete

---

## Notable Bug Fix

### SearchBar + Pagination Conflict

Issue:

Changing pages updated the URL, causing SearchBar to reset pagination back to page 1.

Resolution:

SearchBar now updates the URL only when the search value actually changes.

Lesson:

Individual components may work correctly in isolation but still conflict when integrated.

---

## QA Coverage

* Partial search
* Case-insensitive search
* Status filtering
* Asset type filtering
* Environment filtering
* Sorting
* Pagination
* Combined search/filter/sort scenarios
* URL persistence
* Browser navigation
* View/Edit/Delete actions
* Empty states
* Result count validation
