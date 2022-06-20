# Backend for Quotastic website

## Local installation
```bash
$ npm install
```

## Setting up a database
<p>Create a local postgres database</p>
<p>Create a .env file with data:</p>

```
PGHOST=[your postgres host]
PGPORT=[your postgres port]
PGUSER=[your postgres username]
PGPASSWORD=[your postgres password]
PGDATABASE=[the name of the database]
```

## Setting up other environment variables

```
JWTSECRET=[your jwt secret key you'll use when configuring jwt module in users.module]
JWTEXP=[jwt expiration duration if you're making it expirable, format: {some_number}s/m/h, e.g. 15s - expires in 15 seconds]
URL=[url of your application, needed for the purposes of avatar rendering]
```

To enable migrations make a ormconfig.json file as follows:

```json
[{
    "type": "postgres",
    "entities": ["dist/**/**/*entity{.ts,.js}"],
    "migrations": ["dist/migration/*{ts,js}"],
    "synchronize": false,
    "cli":{
        "migrationsDir": "src/migration"
    }
    // if you're not going to use a local database but rather a hosted one include this
    "ssl": {
        "rejectUnauthorized": false
    }
}]
```

## Images and upload

<p>By default, image upload is configured to use Cloudinary services. To upload images locally follow these steps:</p>

- Open terminal and run `rm -r public & mkdir -p public/uploads`
- Look up some default avatars or create your own, put the avatar you like the best into public/uploads folder and rename it to default.png
- Ctrl P and type user.entity.ts, then Ctrl F and type in avatar, uncomment the commented line and comment the one above it
- Ctrl P user.controller.ts, Ctrl F //, uncommenct the commented line and comment the one above it
- Run `npm run build` just in case

## Running a local instance
```bash

$ npm run build

# development
$ npm run start

# watch mode
$ npm run start:dev

# prod
$ npm run start:prod
```
