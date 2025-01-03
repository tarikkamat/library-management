
# Library Management
This project provides a RESTful API to manage users, books, and borrowing/returning relationships in a library system. Built with Node.js, Express, and Sequelize ORM, it supports CRUD operations.

## Installation
Clone the project

```bash
  git clone https://github.com/tarikkamat/library-management.git
```

Go to the project directory

```bash
  cd library-management
```

Install necessary packages

```bash
  npm install
```

Run migration

```bash
npx sequelize db:migrate
```

If you want, you can seed with dummy information.

```bash
npx sequelize db:seed:all
```

## Docker Installation
Make sure Docker Desktop is installed and running on your machine.

```bash
  make start
  make migrate
  make seed
```

## API Usage

### Get Users
Getting user list with ids and names

```http
  GET /api/users
```

### Get User
Getting a user with no borrow history or his past and current book borrow list

```http
  GET /api/users/${id}
```

### Create User
Getting a user with no borrow history or his past and current book borrow list

```http
  POST /api/users
```

| Parameter | Type     |
| :-------- | :------- |
| `name`    | `string` |

### Get Books
Getting book list

```http
  GET /api/books
```

### Get Book
Getting a book with its average user score or is not scored yet

```http
  GET /api/books/${id}
```

### Create Book
Creating a book

```http
  POST /api/books
```

| Parameter | Type     |
| :-------- | :------- |
| `name`    | `string` |

### Borrow Book
User borrowed a book succesfully

```http
  POST /api/users/${userId}/barrow/${bookId}
```

### Return Book
User returning a book with his score

```http
  POST /api/users/${userId}/return/${bookId}
```

| Parameter | Type     |
| :-------- | :------- |
| `score`   | `int`    |


