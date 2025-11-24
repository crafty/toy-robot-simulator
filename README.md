# Running the app

- Running it locally requires you to have SQLlite installed, nodeJS, NVM, and other dependency.
- To save you time and complexity time I opted for containerizing the client, server, and adding a persistnt volume for SQLite.
- I've deployed it to TODO: URL HERE
- If you want to run it locally and have the aforementioned depdenecies installed you could clone the project and run npm run dev from the client dir and npm run:start:dev from the server
- This README should be way more fleshed out but opted to stop due to time contraints.

# client

- Vite generated React + Typescript Project
- No access to Figma so I color picked the colors and used an icon lib for the robot and chevron
- Didn't add unit test but I might return in the morning and make another commit with unit test so you can at least see a few

# server

- NestJS using their Typescript starter project to save time
- Went with TypeORM as Nest mentions in their documentation that they have out of the box integration with it using @nestjs/typeorm.
- Swagger docs are available at /api
- No time to setup proper migrations when deployed in production
- No time to add unit test for my controller and service
- Realized I need to handle the request better to prevent race conditions on reload, no time to

# data

- SQLite per the projects requirements
- Actual SQLite file at runtime (dev + Docker)
