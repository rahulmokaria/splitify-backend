# Splitify Backend

Welcome to the Splitify Backend repository! This project is the server-side component of the Splitify application, which helps users manage and split expenses efficiently.

## Overview

Splitify Backend provides the necessary API endpoints and functionality to support the Splitify application. It manages user data, expense records, and other critical aspects of the application.

## Features

- User authentication and management
- Expense tracking and splitting
- Group creation and management
- Real-time data updates

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose

## Setup

To set up the Splitify Backend on your local machine, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rahulmokaria/splitify-backend.git
   cd splitify-backend
   ```

2. **Install dependencies**

   ```
   npm install
   ```

3. **Create a .env file in the root directory with the following content:**

   ```
   MONGO_URI=your_mongodb_uri
   JWT_key=your_jwt_secret

   ```

4. **Start the server:**

   ```
   npm start
   ```

   The server will start on the port specified in the .env file.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request
