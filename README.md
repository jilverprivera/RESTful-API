[![API Rest Deploy](https://github.com/jilverprivera/TypeScript-API-Rest/actions/workflows/pipeline.yml/badge.svg)](https://github.com/jilverprivera/TypeScript-API-Rest/actions/workflows/pipeline.yml)

<h1 align="center">
  RESTful API for Ecommerceπ
</h1>
<hr>
<p align="center">
  Technologies: NodeJS, Express, Mongoose, TypeScript
</p>
<hr>

## Features
- CI/CD support - Using Github Actions.
  

## Commands

**Important:** These commands are available in `package.json`.

```bash
npm run tsc # generate a transpilation of *.ts files to *.js.
npm run eslint # lint using ESLint.
npm run dev # run the API in development mode.
npm start # transpile TS project to JS and start the API in production mode.
```
## Directory structure
β src/
β   ββ api/
β   β   ββ auth/
β   β   ββ categories/
β   β   ββ images/
β   β   ββ payments/
β   β   ββ products/
β   β   ββ users/
β   ββ db/
β   ββ helpers/
β   ββ interfaces/
β   ββ middlewares/
β   ββ types/
β   ββ `index.ts`
ββ test/
β    ββ *on build yet...*
ββ `eslintrc.js`
ββ `jest.config.js`
ββ `tsconfig.json`


### END POINTS 
- Sign Up. 
  - `Method: POST` 
  - `Requirements: name | email | password | password2`
  - `Route: ${your_domain}/auth/signup`
- Sign In. 
  - `Method: POST` 
  - `Requirements:  email | password`
  - `Route: ${your_domain}/auth/signin`

