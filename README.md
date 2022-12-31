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

thats pretty boring so I am creating this gigantic overengineering boilerplate.
This abomination includes:

-   hapi
-   a ton lot of hapi plugins
-   mongodb / mongoose
-   redis
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

and maybe more in the near future.

## Install

You need the following things on your pc

-   [Node v18+](https://nodejs.org/en/)
-   [mongo](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/s)
-   [redis](https://redis.io/)

```bash
npm install -g live-server
```

```bash
npm install
```

## config

you have to create a Single Sender Verification on
[https://app.sendgrid.com/settings/sender_auth/senders/new](https://app.sendgrid.com/settings/sender_auth/senders/new)

## Translate

You can find an xlf file in `frontend/misc/xliff` currently translated in english and german.

### Add new word to the translation

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

> You can run both `npm run extract` and `npm run build` via `npm run translate-all`
> Running `npm run generate` also triggers translate-all
> Do not capitalize single words, styling of single words is handled by code

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

## env variables

-   RUNTIME triggers the address for the server
-   SERVE triggers if the production or dev version of the files are statically served
-   MONGO_URL example 127.0.0.1:27017
-   REDIS_PASSWORD
-   COOKIE_PASSWORD
-   SENDGRID stores the api key for sendgrid
-   SENDER_EMAIL

## Profile Page

## ToDo

1. bootstrap the whole backend parts
1. E2E tests
1. prevent people to create more js libs
