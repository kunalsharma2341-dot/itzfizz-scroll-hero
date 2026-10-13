# Itzfizz Scroll Hero Assignment

This is my frontend assignment for the Itzfizz web development internship.
The goal was to recreate a smooth scroll-driven hero interaction using React, Tailwind CSS and GSAP.

## What I implemented

- Letter-by-letter intro animation for the main heading
- Staggered reveal for the statistics cards
- A car movement that is controlled by scroll progress
- Scroll-linked road trail and progress bar
- Responsive movement based on the available road width
- Reduced-motion support for accessibility

## Tech used

- React + TypeScript
- Vite
- Tailwind CSS
- GSAP + ScrollTrigger

## How the scroll animation works

The hero section stays pinned while the user scrolls. A GSAP timeline uses `ScrollTrigger` with `scrub`, so the car position follows the actual scroll progress instead of playing automatically.

The distance is calculated from the width of the road and the car, which keeps the animation responsive on different screen sizes. The car, trail and progress bar are animated mainly with transforms for smoother performance.

## Run locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Deployment

The project can be deployed directly from GitHub on Netlify. The included `netlify.toml` uses:

- Build command: `npm run build`
- Publish directory: `dist`

## Reference

Animation reference provided in the assignment:
https://paraschaturvedi.github.io/car-scroll-animation
