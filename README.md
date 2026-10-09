# Itzfizz Scroll Hero

A scroll-driven hero section built with React, Tailwind CSS and GSAP.

## Run locally

Requires Node.js 22.13 or newer.

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

## Deploy to Netlify

Manual deployment: upload the included `dist` folder through Netlify Drop. Its `index.html` must be at the root of the uploaded folder.

GitHub deployment: push this source folder to a repository and import it in Netlify. The included `netlify.toml` sets the build command to `npm run build` and the publish directory to `dist`.

## Animation

The headline and statistics reveal sequentially on load. ScrollTrigger pins the hero and maps scroll progress to car position. Numeric scrub interpolates movement; reverse scrolling reverses it. The car, trail and progress animate with transforms. Geometry is measured during setup/refresh rather than every scroll event. GSAP context cleans up on unmount, including in React StrictMode. Reduced-motion preferences disable pinning and animation.

## Reference

https://paraschaturvedi.github.io/car-scroll-animation/

Car image and example statistics follow the supplied assignment reference. The image license was not supplied in the reference.
