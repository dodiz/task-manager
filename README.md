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
    - [Javascript main stack](#javascript-main-stack)
    - [Styling](#styling)
    - [Backend and utils](#backend-and-utils)
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

- Download [Node.js](https://nodejs.org/en/download/)
- Download [pnpm](https://pnpm.io/installation)
- Clone the repo
- For a local database, download `Docker` and run `docker-compose up -d` to start a postgres container
- Check `.env.example` to add the required environment variables to a `.env` file
- Run `pnpm install` to install dependencies
- Run `pnpm db:push` to push your schema to the database
  - You might get an env variable error, add NODE_ENV=development to the .env file
- Run `pnpm dev` to start the development server
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Built with

#### Javascript main stack

- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Typescript](https://www.typescriptlang.org/) - For type checking

#### Styling

- [Tailwind] (https://tailwindcss.com/) - For page styles
- CSS custom properties for ui components
- [classnames] (https://www.npmjs.com/package/classnames) for conditional styling

#### Backend and utils

- [TRPC] (https://trpc.io/) - For server-client communication
- [Drizzle] (https://orm.drizzle.team/) - DB ORM, postgres, supabase
- [NextAuth] (https://next-auth.js.org/) - For authentication (TODO...)
- [Formik] (https://formik.org/) - For form management
- [Zod] (https://zod.dev/) - For validation

### Author

- LinkedIn - [Donato Di Zenzo](https://www.linkedin.com/in/donato-di-zenzo/)
- Frontend Mentor - [@dodiz](https://www.frontendmentor.io/profile/dodiz)
