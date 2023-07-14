# jon-higgins-2023

Portfolio site. Designed and built [back in 2019](https://github.com/jonjhiggins/jon-higgins-2019), then updated in 2023 with upgraded depdencies and converted from JS to Typescript.

## Development

- Install `npm install`
- Develop `npm run develop`
- Build `npm run develop`

If you get an `ENAMETOOLONG: name too long` error when developing or building, try removing `public` directory

## Deployment

`npm run deploy`

Deploys via rsync. Requires a .env file with correct values, check .env.example for values that need to exist.

## Technologies

- [Gatsby](https://www.gatsbyjs.org), using a [React](https://reactjs.org/) front-end and [GraphQL](https://graphql.org/) backend. Articles are written in [Markdown](https://daringfireball.net/projects/markdown/).
- CSS-in-JS provided by [Emotion](https://emotion.sh).
- Linting and formatting provided by [Prettier](https://prettier.io/), [ESLint](https://eslint.org/) and [Stylelint](https://github.com/stylelint/stylelint).
