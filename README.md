# Movie App Vue

Movie catalog project using Vue 3 (Composition API), TypeScript, Vuetify, and Pinia. The application uses the TMDB API and applies advanced design patterns to ensure testability and decoupling.

## Features

- **Trending List**: Dynamic loading of popular movies.
- **Real-Time Search**: Implementation of Debounce to optimize API calls.
- **Extended Details**: Technical information, genres, and official YouTube trailer playback.
- **Favorites System**: Persistence in LocalStorage using Pinia.
- **Responsive Design**: Modern interface optimized for mobile and desktop with Vuetify 3.

## Documentation

- **Primary docs**: https://vuetifyjs.com/
- **Getting started guide**: https://vuetifyjs.com/en/getting-started/installation/
- **Community support**: https://community.vuetifyjs.com/
- **Issue tracker**: https://issues.vuetifyjs.com/

## Stack

- **Framework**: Vue 3 + Vite
- **UI Library**: Vuetify
- **Language**: TypeScript
- **Package manager**: npm

## Start Here

- **Main entry**: `src/main.ts`
- **Main app component**: `src/App.vue`
- **Main styles**: `src/styles/`
- **Plugin setup**: `src/plugins/`

## Project Structure

- `src/main.ts` — application entry point
- `src/App.vue` — root component
- `src/components/` — reusable Vue components
- `src/plugins/` — plugin registration and setup
- `src/styles/` — global styles and theme settings
- `public/` — static public files

## Detailed Structure

````
src/
├── api/            # Cliente Axios y servicios de TMDB
├── components/     # Componentes atómicos y reutilizables
├── store/          # Módulos de Pinia (Favoritos, etc.)
├── types/          # Interfaces y tipos de TypeScript
└── views/          # Páginas principales (Home, Detail, Favorites)
````

## Enabled Features

- ESLint
- Vuetify MCP

## Environment

- **VITE_TMDB_API_KEY**: API Key for `TheMovieDB API`

## Install

Use your selected package manager (npm) to install dependencies:

```bash
npm install
```

## Quick Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Unit Test

```bash
npm test
```

## Unit Test UI

```bash
npm run test:ui
```

## Unit Test Coverage

```bash
npm run test:coverage
```

**Note**: This command will run the unit test coverage, which can be found in the `coverage` folder and in the `index.html` file

## Support Vuetify Development

This project uses Vuetify - an MIT licensed Open Source project. We are glad to welcome contributors and any support for ongoing development:

- **Contribute to Vuetify and ecosystem projects**: https://github.com/vuetifyjs
- **Request enterprise support**: https://support.vuetifyjs.com/
- **Sponsor on GitHub**: https://github.com/sponsors/vuetifyjs
- **Support on Open Collective**: https://opencollective.com/vuetify
