# Welcome to Weather Forecast Demo App

This is a demo project build on [`Vue3`](https://vuejs.org/) using [`vite`](https://vitejs.dev/) as build tool, [`firebase`](https://firebase.google.com/) for authentication and data storage and [`openweather`](https://openweathermap.org/api) api to get weather forecast data.

## Instructions to be considered before project setup

```sh
Copy firebase config credentials and openweather credentials from `.env.sample` file and create seperate `.env` file for this particular instance. Have a look at `.env.sample` for detail.
```

## Project Setup

### For installing necessary dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Previewing the production build file

```sh
npm run preview
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Format files with [Prettier](https://prettier.io/)

```sh
npm run format
```
