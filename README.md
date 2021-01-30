## Running the application

The development process is carried out using [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/) tools.
Before you start, make sure they are installed on your machine by running `docker -v` and `docker-compose -v` commands in your terminal.
The project uses [yarn](https://yarnpkg.com/) as package manager. Issue the following command to confirm that you have yarn installed `yarn -v`.

<br/>

- The first step is to clone the repository via ssh.

```shell
git clone git@github.com:Ofadiman/a36d85899d2b473c5147128a71d611f3.git
```

or if you prefer, you can use https as well

```shell
git clone https://github.com/Ofadiman/a36d85899d2b473c5147128a71d611f3.git
```

<br/>

- The second step is to install the necessary dependencies.

```shell
yarn install
```

<br/>

- The third step is to create `.env.development` file with the following keys.

```dotenv
# Your omdb API key. You can obtain it here: https://omdbapi.com/apikey.aspx.
OMDB_API_KEY=
# The secret that will be used to sign json web tokens.
# It can be any string, but for security reasons it's best if it has lowercase and upprescase letters, numbers and at least, it's 40 characters long.
JWT_SECRET=
```

<br/>

- The fourth step is to run our services via `docker-compose`.

```shell
docker-compose up -d
```

The compose command will start several services:

- `pg-admin` - Service containing pgAdmin tool.
- `pg-dev` - Service containing the database used during development process.
- `pg-test` - Service containing the database used during integration tests.
- `server` - Service containing the NestJS application.

<br />

- We don't have any relationships in our database yet, so now it's time to run migrations. Important fact is, that we have to issue the migration command from docker container.

```shell
docker-compose exec server bash
yarn run typeorm migration:run -t false
```

Now you are all set! You can log in as an already existing user.

- Basic user

  - email: user1@domain.com
  - password: asdf1234

- Premium user
  - email: user2@domain.com
  - password: asdf1234

## Running tests

It's important to remember that tests need be run inside the `server` container. To run all the tests issue the following commands.

```shell
docker-compose exec server bash
yarn test
```

## Code generator

The project has a code generator based on the [plop](https://github.com/plopjs/plop) library.
To run it from the terminal, type the `plop` command.
This will run the cli which will guide you through the code generation process in the application.
Alternatively, you can generate code by passing the appropriate arguments to the `plop` command.
The command structure in the terminal is as follows `plop <generator-name> <args>`.
For example, to generate a new type named `UserOptions` in module `users` you need to type `plop type user-options users`.
The command structure is closely related to the structure of the questions asked during cli.

**Currently available generators**

- `dto` - Generate a data transfer object.
- `enum` - Generate an enum.
- `exception` - Generate an exception class based on `HttpException` class.
- `nest-module` - Generate a NestJS module and select additional components such as service, controller, entity or test files.
- `guard` - Generate a type guard.
- `type` - Generate a type.

## API endpoints

The API currently exposes 4 endpoints.

### POST /api/v1/auth/register-user

- Description: Register a new user.

- Example request body structure

```json
{
  "email": "user@domain.com",
  "firstName": "first",
  "lastName": "last",
  "username": "user",
  "password": "asdf1234"
}
```

### POST /api/v1/auth/login

- Description: Login a user via email and password strategy.

- Example request body structure

```json
{
  "email": "user2@domain.com",
  "password": "asdf1234"
}
```

- Example response structure

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImlhdCI6MTYxMjAyNTg0NCwiZXhwIjoxNjEyMDI5NDQ0fQ.IYQmZoYR3zuyLyEFCTDw9fvM34uzjQ7PfcEOlLl99oE",
  "user": {
    "id": 6,
    "createdAt": "2021-01-30T00:00:00.000Z",
    "updatedAt": "2021-01-30T00:00:00.000Z",
    "email": "user2@domain.com",
    "firstName": "user",
    "lastName": "two",
    "username": "user2",
    "roles": [
      {
        "id": 3,
        "createdAt": "2021-01-30T16:55:56.259Z",
        "updatedAt": "2021-01-30T16:55:56.259Z",
        "name": "Premium"
      }
    ]
  }
}
```

### POST /api/v1/movies

- Description: Create a new movie.
- Authorization method: Bearer token

- Example request body structure

```json
{
  "title": "Star"
}
```

- Example response structure

```json
{
  "directory": "George Lucas",
  "genre": "Action, Adventure, Fantasy, Sci-Fi",
  "released": "25 May 1977",
  "title": "Star Wars: Episode IV - A New Hope",
  "user": {
    "id": 6,
    "createdAt": "2021-01-30T00:00:00.000Z",
    "updatedAt": "2021-01-30T00:00:00.000Z",
    "email": "user2@domain.com",
    "firstName": "user",
    "lastName": "two",
    "username": "user2",
    "passwordHash": "$2b$10$x8RS9AQVUytqCB3qzaXfgOHJh1noAxnuPTI/hHtpn41/.a6bEpY3K",
    "roles": [
      {
        "id": 3,
        "createdAt": "2021-01-30T16:55:56.259Z",
        "updatedAt": "2021-01-30T16:55:56.259Z",
        "name": "Premium"
      }
    ]
  },
  "id": 27,
  "createdAt": "2021-01-30T16:57:36.283Z",
  "updatedAt": "2021-01-30T16:57:36.283Z"
}
```

### GET /api/v1/movies

- Description: Get all movies for a user.
- Authorization method: Bearer token

- Example response structure

```json
[
  {
    "id": 11,
    "createdAt": "2021-01-30T09:53:14.437Z",
    "updatedAt": "2021-01-30T09:53:14.437Z",
    "title": "Star Wars: Episode IV - A New Hope",
    "released": "1977-05-25T00:00:00.000Z",
    "genre": "Action, Adventure, Fantasy, Sci-Fi",
    "directory": "George Lucas"
  },
  {
    "id": 12,
    "createdAt": "2021-01-30T09:53:15.460Z",
    "updatedAt": "2021-01-30T09:53:15.460Z",
    "title": "Star Wars: Episode IV - A New Hope",
    "released": "1977-05-25T00:00:00.000Z",
    "genre": "Action, Adventure, Fantasy, Sci-Fi",
    "directory": "George Lucas"
  }
]
```
