# CitrusCore

![citurscore logo](citruscore.png)

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

-   bun
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
-   rollup
-   a ton lot of rollup plugins

and maybe more in the near future. I put everything in a monorepo
because I am lazy and I don't want to deal with multiple repos. Also I am sure there are likely 80% 1-2 Men teams out there. So I am trying to make this as easy as possible to use.

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
-   NAME the name of your app
-   URL the url of your app

and that's it!

# Run & Build

As usual with now a days frontend projects you have some
building steps. We are using rollup to bundle our frontend
and typescript to compile our frontend and backend code.
