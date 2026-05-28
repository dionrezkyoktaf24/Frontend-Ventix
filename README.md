This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Backend Integration Guide

This frontend is currently using mock data and simulated flows.

### What the backend should provide

- Event data: list of events and single event detail by `slug` or `id`
- Authentication: user login and registration
- Checkout/order creation: seat selection, payment summary, order confirmation
- Ticket lookup: retrieve an order/ticket by `orderId`
- Admin dashboard access for administrators

### Recommended API contract

- `GET /api/events`
  - returns an array of event objects
- `GET /api/events/:slug`
  - returns a single event by slug
- `POST /api/auth/login`
  - receives `{ email, password }`
  - returns user session data or token
- `POST /api/auth/register`
  - receives `{ fullName, email, password }`
  - creates a user account
- `POST /api/checkout`
  - receives selected seats, payment method, event slug, promo code, and user info
  - returns an order result and redirect ticket ID
- `GET /api/orders/:orderId`
  - returns order/ticket details for the confirmation page

### Frontend integration points

- `lib/mockEvents.ts`
  - replace this mock dataset with API data from the backend
- `app/events/page.tsx`
  - currently renders the event browser from `components/events/BrowseEvent.tsx`
- `app/events/[slug]/page.tsx`
  - currently loads event detail from `mockEvents` and renders `EventDetailClient`
- `app/login/page.tsx`
  - currently simulates login and redirects to `/admin/dashboard` or `/dashboard`
- `app/register/page.tsx`
  - currently simulates registration and can be wired to a real `/api/auth/register` endpoint
- `components/events/CheckoutClient.tsx`
  - current checkout flow is local-only and should call a backend payment/order endpoint
- `components/ticket/ETicketClient.tsx`
  - can be updated to fetch actual ticket/order data rather than reading from local storage

### Implementation notes

- This is a Next.js App Router project. If you want to add server-side API routes in the same repo, use `app/api/.../route.ts`.
- If the backend is separate, use a base URL like `NEXT_PUBLIC_API_URL` and call external endpoints from the client or server components.
- Keep the event object shape consistent with the existing mock data so the UI continues to work with minimal changes.

### Suggested event object shape

```json
{
  "id": "1",
  "slug": "midnight-symphony-orchestra",
  "title": "Midnight Symphony Orchestra",
  "category": "Music",
  "date": "2024-10-24",
  "location": "Jakarta Convention Center",
  "price": 450000,
  "availableSeats": 120,
  "totalSeats": 1500,
  "image": "https://example.com/images/midnight.jpg",
  "isFeatured": true,
  "organizer": "Ventix Prime Events"
}
```

If you want, I can also add a small backend-ready example using `app/api` routes or a remote API wrapper. 

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
