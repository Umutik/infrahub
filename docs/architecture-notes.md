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