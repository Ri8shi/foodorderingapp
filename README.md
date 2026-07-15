# Food Ordering App

A full-stack food ordering application built as an internship project. It provides a backend API (Node.js, Express, MongoDB) for managing food orders, along with a JavaScript/CSS frontend for the user interface.

## Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv (environment configuration)
- CORS

**Frontend**
- React + Vite
- JavaScript
- CSS

## Project Structure

```
foodorderingapp/
├── Project/          # Application source code
├── .gitattributes
├── .gitignore
├── LICENSE
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed
- A MongoDB instance (local or cloud, e.g. MongoDB Atlas)

### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Ri8shi/foodorderingapp.git
   cd foodorderingapp
   ```

2. Initialize/configure the project
   ```bash
   npm init
   ```

3. Install dependencies
   ```bash
   npm i express mongoose dotenv cors
   ```

4. Create a `.env` file in the project root and add your configuration, e.g.:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

5. Start the server
   ```bash
   npm start
   ```

The server should now be running and ready to accept requests.

## Features

- Browse and order food items
- REST API backend for managing orders and menu data
- MongoDB-backed data persistence

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](./LICENSE).