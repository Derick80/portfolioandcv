# Portfolio

## Welcome to my portfolio

## Development

features:

login with discord using prisma and server actions

render MDX files from a folder and display them in a list

Then render the selected MDX file in a component

## Tech Stack

![NextJs](https://img.shields.io/npm/v/npm.svg?logo=nextdotjs)
![TypeScript](https://img.shields.io/npm/v/npm.svg?logo=typescript)

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Neon](hhttps://console.neon.tech)
- [Cloudinary](https://cloudinary.com/)
- [Zod](https://zod.dev/)

## Additional Packages

- [tsx](https://www.npmjs.com/package/tsx)
- [Typography]([Typeography](https://github.com/tailwindlabs/tailwindcss-typography))

## Blog Posts

I wanted to create a blog section for my site and I was really interested in using MDX. [Kent C Dodds](https://github.com/kentcdodds/mdx-bundler) used MDXBundler to build his site. There was also an early remix stack I'll find the name that I really liked but a lot of this could be done with things more server side.

### plugins used for MDX (not)

- [reading-time](https://www.npmjs.com/package/reading-time)

### Commands

- `pnpm tsx scripts/sync-db.ts` - seed the database with posts
- `pnpm run dev` - start the development server
- `pnpm run build` - create a production build
- `pnpm run start` - start the production server

# Resume Builder Application

This application handles resume creation and display with a focus on printability and responsiveness.

## Features
- **Public Resume View**: Accessible at `/resume`. Server-side rendered for SEO.
- **Resume Editor**: Accessible at `/resume/edit` (requires login).
- **Interactive Editing**: Add, remove, and reorder bullet points. Real-time saving via Server Actions.
- **Print Friendly**: CSS optimized for printing to A4/Letter.

## Technical Stack
- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **UI**: Tailwind CSS, Shadcn UI, Lucide Icons
- **State Management**: React 19 `useActionState`, minimal client-side state.

## Setup
1. **Database**: Ensure PostgreSQL is running.
   ```bash
   npx prisma db push
   npx prisma db seed
   ```
2. **Environment**: Configure `.env` with `DATABASE_URL` and `AUTH_SECRET`.
3. **Run**: `npm run dev`

## Usage
- Login to access the editor.
- Navigate to `/resume/edit` to manage your profile, experience, education, and skills.
- Use the up/down arrows to reorder bullet points.
- Click "Print / Save PDF" on the public page to export.


