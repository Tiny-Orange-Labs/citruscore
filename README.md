# log

![log logo](frontend/assets/img/logos/logo_192x192.png)

I build the same stuff over and over again:

-   translation
-   login
-   rate limiting
-   user management
-   automatic emails
-   auth
-   settings
-   design systems
-   building systems
-   charts
-   accessibility

thats pretty boring and just reduces development speed
so I am creating this gigantic overengineered boilerplate. This abomination includes:

-   hapi
-   a ton lot of hapi plugins
-   mongodb / mongoose
-   redis
-   sharp
-   typescript
-   lit
-   lit-localize
-   tailwind
-   shoelace
-   chartjs
-   fontawesome (not sure if I will keep it)
-   rollup
-   a ton lot of rollup plugins
-   cypress (I am pretty sure in the near future)
-   railway (not sure if they implement persistence storage)

and maybe more in the near future. I put everything in a monorepo
because I am lazy and I don't want to deal with multiple repos. Also
I am sure there are likely 80% 1-2 Men teams out there. So I am trying to
make this as easy as possible to use.

# Setup

Log should remove as much friction as possible! Lets try to keep
it as small as possible.

## Install

You need the following things on your pc

-   [Node v18+](https://nodejs.org/en/)
-   [mongo](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/s)
-   [redis](https://redis.io/)

And of course you need to do:

```bash
npm install
```

## config

you have to create a Single Sender Verification on
[https://app.sendgrid.com/settings/sender_auth/senders/new](https://app.sendgrid.com/settings/sender_auth/senders/new)
if you want to send emails to the user. You can omit this step if you don't want to send emails.

## env variables

-   RUNTIME triggers the address for the server
-   SERVE triggers if the production or dev version of the files are statically served
-   MONGO_URL example 127.0.0.1:27017
-   REDIS_PASSWORD
-   COOKIE_PASSWORD
-   SENDGRID stores the api key for sendgrid
-   SENDER_EMAIL

and that's it!

# Run & Build

As usual with now a days frontend projects you have some
building steps. We are using rollup to bundle our frontend
and typescript to compile our frontend and backend code.

## Frontend

### CSS

It comes with tailwindcss and shoelace. You can build the tailwind part with:

```bash
npm run build-css
```

which also gets triggered by `npm run build-all` and `npm run generate`.

### Typescript / Javascript

The frontend code is in `frontend/src/ts` and gets compiled to `frontend/dist/dev/js`.
You can compile the frontend code with:

```bash
npm run build-frontend-ts
```

but I would recommend to use:

```bash
npm run build-alls
```

because there a too many build steps right now.

### misc

## Backend

The backend is written in typescript and uses hapi as a server.
As database we use mongodb and redis for caching.

### Build

We use typescript to compile our code.
The source code you are working on is in `backend/src` and
compiled code is in `backend/dist`. Use:

```bash
npm run build-backend-ts
```

to compile the backend code. The backend code comes with its
own `tsconfig.json` file, which can be found in `backend/tsconfig.json`.

> Also triggeres `rename-js-to-mjs` which renames all the js files to mjs because
> typescript still does not transpile to .mjs (01.2023)

### Run

To start the hapi server run:

```bash
npm run start-server
```

in production you would use:

```bash
npm start
```

which triggers the build (`npm run build-backend-ts`) and then starts the server (`npm run start-server`).
if you activily develop the backend you should use `npm run start-nodemon`.

## Misc

if you just want to build frontend and backend typescript code you can use:

```bash
npm run build-ts
```

If you want build everything and I mean everything (frontend, backend, translate) you can use:

```bash
npm run generate
```

# Development

After you did the setup and tested the build you can
start developing.

### shard data

Everything from `./frontend/src/ts/data/shared` is copied to `./backend/src/data/shared` which
happens through `npm run copy-data`. `npm run copy-data` is also triggered by `npm run build-backend-ts`.

## Frontend

We combine lit, tailwind and shoelace to build our frontend.

#### Shoelace

Build everything with shoelace components [https://shoelace.style/](https://shoelace.style/).
You can find basically ever standard UIE every imagenable in there! Do not forget to add
dependencies to `frontend/src/ts/main.ts`!

### Translate

You can find an xlf file in `frontend/misc/xliff` currently translated in english and german.

#### Add new word to the translation

Just pass strings to the `msg` method and us the `localized` decorator.

```javascript
import { localized, msg } from '@lit/localize';

@localized()
@customElement('login-layout')
export default class LoginLayout extends LitElement {
    rendern() {
        return msg('hello');
    }
}
```

Then run:

```bash
npm run translate-extract
```

after the extract the xlf file in `frontend/misc/xliff` has new entries:

```xml
  <source>hello</source>
```

You need to add the translation like this:

```xml
  <source>hello</source>
  <target>hallo</target>
```

to generate the files which get load from the server you need to run
the following command after translating:

```bash
npm run translate-build
```

Check out the new generated files in `frontend/src/ts/lang.ts`.

Note:

> -   You can run both `npm run extract` and `npm run build` via `npm run translate-all`
> -   Running `npm run build` also triggers translate-all
> -   Do not capitalize single words, styling of single words is handled by code
> -   Do not use html tags in the translation, styling is handled by code
> -   Do not try fancy things like compiling senteces, out of single words, this will not work for other languages

### Profile Page

Come with basic stuff like username, password language, team about section and avatar.

## Backend

## Tests

We are using web-test-runner with a combo of chai and open-wc/testing as assertion libraries.
Chai for stuff doesn't need dom and open-wc/testing for stuff that needs a dom.

```bash
npm test
```

To check your coverage with an UI run:

```bash
npm run coverage
```

# BootStrap Dev Data

# ToDo

1. Remove users
1. deployment
1. add more tests
1. improve code quality
1. improve documentation
1. add localization for backend
