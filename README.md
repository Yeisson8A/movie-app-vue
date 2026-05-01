# Movie App Vue

Movie catalog project using Vue 3 (Composition API), TypeScript, Vuetify, and Pinia. The application uses the TMDB API and applies advanced design patterns to ensure testability and decoupling, including unit tests using Vitest for this funcionalities.

<img width="1365" height="633" alt="image" src="https://github.com/user-attachments/assets/aa9e75c5-bec1-440d-82a0-3e69ab9adad5" />
<img width="1365" height="631" alt="image" src="https://github.com/user-attachments/assets/03ad2c1c-b27c-4c85-8b23-c1f6ede8ce30" />
<img width="1365" height="633" alt="image" src="https://github.com/user-attachments/assets/f83c2a39-8f78-4f87-8bc8-6ee1c378ca30" />
<img width="1365" height="632" alt="image" src="https://github.com/user-attachments/assets/c0953748-7f81-4442-b148-e697ee04e81e" />
<img width="1365" height="634" alt="image" src="https://github.com/user-attachments/assets/8f9bf511-0acc-42f7-9321-6ae4cf5f262b" />
<img width="1365" height="632" alt="image" src="https://github.com/user-attachments/assets/40575039-fdb6-4a22-9964-beb56d7b383c" />
<img width="1365" height="633" alt="image" src="https://github.com/user-attachments/assets/a18eb1ae-d0f8-4019-9de9-544517420c0d" />
<img width="1365" height="634" alt="image" src="https://github.com/user-attachments/assets/b698c3c5-7e6c-4e37-8893-bb3a12094113" />
<img width="1365" height="630" alt="image" src="https://github.com/user-attachments/assets/b7cacb80-0860-4817-98a2-7167dbdc954e" />
<img width="1365" height="631" alt="image" src="https://github.com/user-attachments/assets/a807bf5d-8788-433c-a252-8beb6e29a554" />
<img width="1365" height="633" alt="image" src="https://github.com/user-attachments/assets/60554c16-c641-4c19-b989-6712f927f0b4" />
<img width="1365" height="634" alt="image" src="https://github.com/user-attachments/assets/68c0f2a3-b0da-4ff6-b443-376ee8d57244" />
<img width="1365" height="633" alt="image" src="https://github.com/user-attachments/assets/552361e7-4bbc-468c-bba3-8db95361d210" />
<img width="1365" height="633" alt="image" src="https://github.com/user-attachments/assets/607ce796-a594-41e8-b826-7a8d4bd7fce5" />
<img width="1365" height="633" alt="image" src="https://github.com/user-attachments/assets/c3a28f9d-8a2f-458c-a2cd-a3dfe8e58ae3" />

## Features

- **Trending List**: Dynamic loading of popular movies.
- **Real-Time Search**: Implementation of Debounce to optimize API calls.
- **Extended Details**: Technical information, genres, and official YouTube trailer playback.
- **Favorites System**: Persistence in LocalStorage using Pinia.
- **Responsive Design**: Modern interface optimized for mobile and desktop with Vuetify 3.

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
├── api/            # Axios client and TMDB services
├── components/     # Atomic and reusable components
├── store/          # Pinia Modules (Favorites, etc.)
├── types/          # TypeScript Interfaces and Types
└── views/          # Main pages (Home, Detail, Favorites)
````

## Enabled Features

- ESLint
- Vuetify MCP

## Environment

- **VITE_TMDB_API_KEY**: API Key for `TheMovieDB API`

## Build the image
````
docker-compose build
````

## Start container
````
docker-compose up -d
````

**Note**: Once the container has started, the application will be available at `http://localhost:8080`

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

<img width="1365" height="632" alt="image" src="https://github.com/user-attachments/assets/c36759a8-a92e-4793-8066-e8170c4cb854" />
<img width="1365" height="629" alt="image" src="https://github.com/user-attachments/assets/2c140172-22be-4a74-8899-aba3f8c18bf3" />
<img width="1365" height="632" alt="image" src="https://github.com/user-attachments/assets/d9922303-bbe0-4ba6-8267-4f9efbcc4646" />
<img width="1365" height="632" alt="image" src="https://github.com/user-attachments/assets/edd33a89-be7d-4be8-bbf4-15ba8677cf39" />
<img width="1365" height="633" alt="image" src="https://github.com/user-attachments/assets/d73901ba-6038-482f-8822-f633f9f5c753" />
<img width="1365" height="629" alt="image" src="https://github.com/user-attachments/assets/7879664a-5011-40de-8177-a2f080fe5a35" />
<img width="1365" height="631" alt="image" src="https://github.com/user-attachments/assets/7ae3bfb9-aebc-48c1-84cc-891955fcfa66" />
<img width="1365" height="633" alt="image" src="https://github.com/user-attachments/assets/fd35cefd-164f-4527-9cce-e48b6c1e88f9" />
<img width="1365" height="631" alt="image" src="https://github.com/user-attachments/assets/94eaa075-4ce1-465e-953a-59251dec9f36" />

## Unit Test Coverage

```bash
npm run test:coverage
```

**Note**: This command will run the unit test coverage, which can be found in the `coverage` folder and in the `index.html` file

<img width="1365" height="634" alt="image" src="https://github.com/user-attachments/assets/ea63cea0-a639-4d17-96ab-ac39280a2342" />

## Documentation

- **Primary docs**: https://vuetifyjs.com/
- **Getting started guide**: https://vuetifyjs.com/en/getting-started/installation/
- **Community support**: https://community.vuetifyjs.com/
- **Issue tracker**: https://issues.vuetifyjs.com/

## Support Vuetify Development

This project uses Vuetify - an MIT licensed Open Source project. We are glad to welcome contributors and any support for ongoing development:

- **Contribute to Vuetify and ecosystem projects**: https://github.com/vuetifyjs
- **Request enterprise support**: https://support.vuetifyjs.com/
- **Sponsor on GitHub**: https://github.com/sponsors/vuetifyjs
- **Support on Open Collective**: https://opencollective.com/vuetify
