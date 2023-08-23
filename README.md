# Online Trading Card Game API Server

This repository serves as an API server for an online trading card game. The real-life game is being developed by a friend, and this project aims to create a generic framework for an online version of the game. 

## Project Status

This project is still in its infancy. It currently handles basic authentication and is being used as a learning platform to expand skills in Node.js-based web server design. 

## Project Structure

This repository is one half of the whole project, the API server. The other half will be the client or multiple clients that communicate with the server. 

The project was structured with a clear separation between the API server and the client(s) to promote modularity and scalability. This way, multiple clients can communicate with the server independently, and changes to the server or client codebases do not affect each other.

## Goals

The end goals for this repository are to handle API calls for:

- Authentication
- Managing user sessions
- Creating game lobbies
- Establishing WebSocket connections
- Managing game state for each lobby

## Configurability

The project is designed to be highly configurable with abstractions for common connectors. For example, user data may be stored within many different types of databases, and the server will determine which database to use based on a config file. 

### Technology Choices

- **Node.js**: Chosen for its event-driven, non-blocking I/O model which makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices. Node.js also offers a vast ecosystem of libraries and frameworks, making it an ideal choice for fast development. While it may not be the fastest tool for certain use cases, it provides significant advantages in terms of development speed and ease of use.

- **TypeScript**: The whole project is using TypeScript, with a heavy emphasis on type safety wherever possible. TypeScript was chosen to bring static types to JavaScript, reducing bugs and enhancing the development experience with better tooling.

- **Passport.js**: This authentication middleware was chosen for its simplicity and flexibility. It supports a wide range of different authentication strategies, making it a good fit for our needs.

- **express-session**: This module was chosen to handle session management. It's simple to use and integrates well with Express.

- **Socket.IO**: Chosen for real-time bidirectional event-based communication. It works on every platform, browser, or device, focusing equally on reliability and speed.

## Performance

While Node.js may not be the most performant choice, the priority is to get a working server up and running quickly. However, I am aware that there are alternative technologies that could potentially offer better performance for this project.

## Exploring Alternative Technologies

In the pursuit of finding the best tools for the job, I have considered exploring alternative technologies like Go, PHP, and Rust.

- **Go**: Go is known for its performance and concurrency capabilities. It provides a strong foundation for building high-performance applications. I am particularly interested in doing a deeper dive into learning Go. However, I understand that rewriting the server in Go may take longer and delay the project's launch.

- **PHP**: PHP has made significant advancements in the language and ecosystem in recent years. It offers a wide range of frameworks and libraries for web development. While I have previous experience with PHP, I haven't worked with it in some time. Despite that, I acknowledge that it could be a viable option for this project.

- **Rust**: Rust is gaining popularity for its focus on performance, memory safety, and concurrency. It could be a great choice for building a high-performance server. However, I currently do not have enough knowledge and experience with Rust to confidently use it for this project.

## Decision to Stick with Node.js

After considering these alternative technologies, I have decided to stick with Node.js for the project. The need for fast development and leveraging existing knowledge and resources outweighs the potential performance gains offered by other technologies. However, I remain open to exploring these alternatives in the future as part of my ongoing commitment to learning and using the best tools for the job.

## Scalability

As I embark on this project, one of my primary goals is to explore the realm of scalability
and delve into the intricacies of horizontal scaling. By designing an application that can
handle increased load and traffic, I aim to learn and implement various deployment methods
to ensure a seamless user experience.

In my previous experiences, most of the projects I worked on were relatively small and
straightforward, not requiring the ability to scale beyond a single process. This allowed me
to focus on the core functionality without the need to manage sessions between multiple
nodes or worry about routing WebSocket connections to the correct node process.
Additionally, transitioning connections to new server instances in case of failure was not a
concern.

Furthermore, I often relied on keeping everything in memory, avoiding the need for
persistent database stores. This approach worked well for my personal projects, which
typically didn't require the scale and performance demands beyond testing.

However, with this project, I am taking a different approach. I am building it from the
ground up with scalability in mind, anticipating the potential need for handling larger
volumes of traffic. It is important to note that intentionally designing the server to be
slow is not the goal, nor is it considered a best practice. Rather, it is a simple side
effect of choosing Node.js as the backend technology.

Node.js is a popular choice for many companies due to its increased development speed,
allowing for rapid iteration and deployment. While it may not be the fastest tool for
certain use cases, it offers significant advantages in terms of development speed and ease
of use. This trade-off between raw application performance and development speed is a very
real-world scenario that many companies face.

By intentionally designing the server to be slower, it forces me to think about practical
considerations such as managing sessions, routing WebSocket connections, and transitioning
connections to new server instances. This approach allows me to gain valuable insights and
experience in handling real-world scenarios, where performance optimizations are crucial.

Through this project, I am not only building a personal portfolio piece but also laying the
foundation for future endeavors where scalability is a critical factor. I recognize that
while Node.js may not be the most performant choice, the need for fast development and
leveraging existing knowledge and resources outweighs the potential performance gains
offered by other technologies. However, I remain open to exploring alternative technologies
in the future as part of my ongoing commitment to learning and using the best tools for the
job.

By exploring and implementing horizontal scaling techniques, I aim to create an application
that can seamlessly handle increased user demand and traffic. This not only enhances the
user experience but also equips me with valuable knowledge and skills in building scalable
and robust applications.

Through this journey, I hope to gain a deeper understanding of scalability and contribute to
the broader knowledge base of building applications that can handle the challenges of a
rapidly growing user base.

## Purpose

This is a personal portfolio project.
