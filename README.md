# Backend for Quotastic website

## Local installation
```bash
$ npm install
```

## Setting up a database
<p>Create a local database</p>
<p>Create a .env file with data:</p>
```.env
PGPORT=[your postgres port]
PGUSER=[your postgres username]
PGPASSWORD=[your postgres password]
PGDATABASE=[the name of the database]
```
<p>To enable migrations make a ormconfig.json file as follows:</p>
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
