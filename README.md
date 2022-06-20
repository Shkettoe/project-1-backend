# Backend for Quotastic website

## Local installation
```bash
$ npm install
```

## Setting up a database
<p>Create a local database</p>
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
}]
```
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
