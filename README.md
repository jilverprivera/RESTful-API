[![API Rest Deploy](https://github.com/jilverprivera/TypeScript-API-Rest/actions/workflows/pipeline.yml/badge.svg)](https://github.com/jilverprivera/TypeScript-API-Rest/actions/workflows/pipeline.yml)

<h1 align="center">
  RESTful API for Ecommerce📈
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
┌ src/
│   ├─ api/
│   │   ├─ auth/
│   │   ├─ categories/
│   │   ├─ images/
│   │   ├─ payments/
│   │   ├─ products/
│   │   └─ users/
│   ├─ db/
│   ├─ helpers/
│   ├─ interfaces/
│   ├─ middlewares/
│   ├─ types/
│   └─ `index.ts`
├─ test/
│    └─ *on build yet...*
├─ `eslintrc.js`
├─ `jest.config.js`
└─ `tsconfig.json`


### END POINTS 
- Sign Up. 
  - `Method: POST` 
  - `Requirements: name | email | password | password2`
  - `Route: ${your_domain}/auth/signup`
- Sign In. 
  - `Method: POST` 
  - `Requirements:  email | password`
  - `Route: ${your_domain}/auth/signin`

