# MökkiRent

## Introduction

A simple fullstack site for summer cottage listing and renting built with Next.JS with server components, React, Tailwind CSS,Image upload on Cloudinary,  Prisma with PostgreSQL hosted on Neon.tech

Main features:

- authentication with next-auth
- user can login/signup using an email/password or a Google & Github account.
- host can create listing with location, category, a picture and amenities info
- host can delete cottage listing
- user can add cottage to favorites list
- listing filter by location, category, price, room count, guest count, sauna availablility...
- simple price calculation
- user can reserve a cottage for a time, it will be made unavailable to other users
- user and host can cancel reservations
- search url can be shared to show filtered listings to other users
- responsive design

## To dos:

- messaging between host & user
- more detailed info on listing
- more images per listing
- advanced price calculation
- map view of all listings
- multilangues
- cookies consent
- dark theme
- paginated listing loading

## Link to demo

[https://web-messenger-nextjs.vercel.app](https://web-messenger-nextjs.vercel.app/)


## To run the project

- requirement: node.js
- clone the repo
- add these configs to .env file:

```bash
DATABASE_URL=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
NEXTAUTH_SECRET= "NEXTAUTH_SECRET"
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
```

- run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result