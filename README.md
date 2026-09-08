# 1Fi Marketplace — Assignment

Built to match the real 1Fi Shop page: purple gradient hero banner, "No-cost EMIs"
badge, segmented pill tabs (Top Brands / Nearby Stores / 1Fi Marketplace), search
bar, and icon-left list-row cards — all pulled directly from the reference screenshots.

## Setup & run (copy-paste, in order)

```bash
# 1. Create a fresh Expo TypeScript app
npx create-expo-app@latest 1fi-marketplace -t expo-template-blank-typescript
cd 1fi-marketplace

# 2. Install dependencies
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context expo-linear-gradient

# 3. Delete the generated App.tsx, then copy this project's files over:
#    - App.tsx
#    - src/ (entire folder)

# 4. Run it
npx expo start
# press "i" for iOS simulator, "a" for Android, or scan the QR with Expo Go
```

## What changed from the reference screenshots
- **Hero banner**: purple gradient (`gradientStart` → `gradientEnd` in `theme.ts`),
  "✦ NO-COST EMIs" pill badge, headline with the italic middle line, subtext.
- **Segmented tabs**: `SegmentedTabs.tsx` reproduces the white-pill-on-lavender
  switcher, now with a third option, "1Fi Marketplace", added.
- **Search bar**: rounded white search input under the tabs; placeholder text
  changes depending on which tab is active.
- **List rows**: `ListRowCard.tsx` matches the icon-square + title + subtitle
  brand-card layout ("No-cost EMIs upto N months" style subtitle), reused for
  every marketplace product.
- **Top Brands / Nearby Stores**: left as blank placeholders per the assignment,
  swapped in via the same tab switcher rather than separate pushed screens —
  matches how the real app behaves (tabs, not navigation).

## Architecture
- `src/types` — Product, EMIPlan, AsyncState
- `src/services/mockData.ts` — mock catalog + no-cost EMI math (equal split
  across tenure, capped per-product via `maxEmiTenureMonths`, matching the
  real app's "No-cost EMIs upto N months" model)
- `src/services/api.ts` — async wrapper simulating a real API — swap for real
  endpoints later without touching any screen/component
- `src/hooks` — generic `useAsync` (loading/error/data) + product-specific hooks
- `src/components` — `ListRowCard`, `SegmentedTabs`, `VariantSelector`,
  `EMIPlanCard`, `CTAButton`, `Loader`, `ErrorState` — all reusable, presentational
- `src/screens` — `ShopScreen` (hero + tabs + search + marketplace list, all in
  one screen matching the real app), `ProductDetailScreen` (variant + EMI selection)
- `src/theme` — colors picked directly from the reference screenshots; tweak
  `gradientStart`/`gradientEnd`/`primary` if you get exact hex values from the app

## Before you submit
1. Pull exact hex values from the screenshots (use a color picker) and update
   `theme.ts` if you want pixel-perfect match.
2. Swap `mockData.ts` products for whatever's in the assignment's reference
   material, if it specifies exact products/EMI terms.
3. Toggle `SIMULATE_ERROR = true` in `src/services/api.ts` to demo error states,
   then set back to `false`.

## What to mention in interview
- Marketplace is a tab within Shop (state, not navigation) — matches how the
  real app toggles Top Brands/Nearby Stores, so Marketplace slots in consistently
  rather than feeling like a bolted-on separate screen.
- EMI plans are capped per-product (`maxEmiTenureMonths`) exactly like the "No-cost
  EMIs upto N months" copy seen on every brand card in the real app.
- Loading/error states are handled once via `useAsync` and reused across product
  list and EMI plans, not duplicated.
