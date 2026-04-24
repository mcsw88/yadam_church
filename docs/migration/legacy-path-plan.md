# Legacy Path Cleanup Plan (No Move/Delete in This Phase)

## Scope Guard

- This phase documents cleanup strategy only.
- No legacy file deletion.
- No legacy file move.

## 1) Files actively used by the Next app

- `app/layout.tsx`
- `app/page.tsx`
- `app/about/page.tsx`
- `app/ministries/page.tsx`
- `app/news/page.tsx`
- `app/notice/page.tsx`
- `app/gallery/page.tsx`
- `app/contact/page.tsx`
- `app/location/page.tsx`
- `app/post/page.tsx`
- `components/site-header.tsx`
- `components/prehero-meta.tsx`
- `lib/content-data.ts`
- `styles.css`
- `public/fonts/SUIT-Variable.woff2`
- `next.config.ts`
- `tsconfig.json`
- `package.json`

## 2) Files that appear to be legacy-only (not part of Next routing)

- `index.html`
- `about.html`
- `ministries.html`
- `news.html`
- `notice.html`
- `gallery.html`
- `contact.html`
- `location.html`
- `post.html`
- `script.js`
- `content-data.js`

## 3) Files to keep as visual/reference baseline for now

- All legacy HTML files above
- `script.js` (interaction reference history)
- `content-data.js` (data mapping reference history)

## 4) Files that are risky to remove

- `styles.css` (shared global design source used by Next)
- `components/site-header.tsx` (navigation behavior owner)
- `lib/content-data.ts` (board and post data source)
- `public/fonts/SUIT-Variable.woff2` (current font asset)
- `assets/images/*` and `public/*` images referenced by Next pages

## 5) Candidates to move later into `legacy-html/`

- `index.html`
- `about.html`
- `ministries.html`
- `news.html`
- `notice.html`
- `gallery.html`
- `contact.html`
- `location.html`
- `post.html`
- `script.js`
- `content-data.js`

## 6) Preconditions required before any future move/delete

1. Confirm no runtime import/reference from `app/`, `components/`, or `lib/`.
2. Confirm all production routes render from Next pages only.
3. Verify `npm run build` passes after temporary rename test.
4. Verify navigation, board list, and post detail UX from Next routes.
5. Keep one release cycle where legacy files remain untouched as rollback reference.
