## Frontend Mentor - Kanban task management web app solution

This is a solution to the [Kanban task management web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB) for portfolio purposes.

## Table of contents

- [Frontend Mentor - Kanban task management web app solution](#frontend-mentor---kanban-task-management-web-app-solution)
- [Table of contents](#table-of-contents)
  - [The challenge](#the-challenge)
  - [Preview](#preview)
  - [Links](#links)
  - [How to run](#how-to-run)
  - [Built with](#built-with)
  - [Author](#author)

### The challenge

Users should be able to:

- Create, read, update, and delete boards and tasks
- Receive form validations when trying to create/edit boards and tasks
- Mark subtasks as complete and move tasks between columns (also via drag and drop)
- Hide/show the board sidebar
- Toggle the theme between light/dark modes
- Mobile responsive
- Keep track of any changes via backend

### Preview

![](./preview.jpg)

### Links

- Solution URL: [Task manager](https://task-manager-ten-pi.vercel.app)

### How to run

- Download [bun](https://bun.sh/)
- Clone the repo
- Setup a db on [turso](https://turso.tech/)
- Check `.env.example` to add the required environment variables to a `.env` file
- Run `bun i` to install dependencies
- Run `bun db:push` to push your schema to the database
- Run `bun dev` to start the development server
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Built with

- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind] (https://tailwindcss.com/)
- [TRPC] (https://trpc.io/)
- [Drizzle] (https://orm.drizzle.team/)
- [NextAuth] (https://next-auth.js.org/)
- [Hook Form] (https://react-hook-form.com/)
- [Zod] (https://zod.dev/)

### Author

- LinkedIn - [Donato Di Zenzo](https://www.linkedin.com/in/donato-di-zenzo/)
- Frontend Mentor - [@dodiz](https://www.frontendmentor.io/profile/dodiz)
