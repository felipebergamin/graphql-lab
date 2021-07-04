[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

# My GraphQL Lab

This project is kind of a laboratory I'm using to implement a fullstack GraphQL application.

My goal is to create a monorepo, using yarn and lerna, with a backend service, a ReactJS app and a React Native mobile app. The repository should have a CI workflow to check the whole application, run tests, lint, build, etc.

The final application should be a password manager, which stores password encryted by a key holded by user (this key will never be sent to the backend).

This way, the stored password will not be readable by someone inspecting the database.

The goal is not to create a 100% secure app, ready to real world. Just implement a symmetrical encription for passwords, a simple authentication and authorization system, to allow the users to see and manage only their own passwords. But the focus of this project are both GraphQL and CI.

## Tech Stack

**Client:** React, TypeScript, React Native, Apollo Client v3, ..., To be Decided

**Server:** Node, TypeScript, Apollo Server, TypeORM, Postgres, Docker


## Features (Done/TODO)

- [x] Basic monorepo with lerna
- [x] Install eslint, prettier, add editorconfig file

### Backend:

- [x] User authentication
- [ ] User registration
- [ ] User profile
  - [x] Update profile
  - [ ] Delete account
- [x] Passwords
  - [x] Create
  - [x] Read
  - [x] Update
  - [x] Delete (don't use soft delete)

Authorization management:

- [x] An user can only read, update and delete their own passwords
  - [x] Read
  - [x] List
  - [x] Update
  - [x] Delete

### Frontend (web)

TBD

### Frontend (mobile)

TBD
