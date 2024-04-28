# Event Management Platform

This is a web application built with the PERN (PostgreSQL, Express.js, React.js, Node.js) stack for managing events organized by a company. The platform allows users to browse upcoming events, book tickets, and manage their bookings, while administrators have access to an admin dashboard for event management.

## Features

- Event Listing and Details
- Booking Tickets
- User Dashboard
- Admin Dashboard
- Basic Styling and UI/UX
- Error Handling and Validation

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:
```
git clone https://github.com/AganzeFelicite/EventManagement_elite
```

2. Navigate to the project directory:
 ```
 cd EventManagement_elite
 ```

3. Install dependencies for the client and in the server
```
npm install
```
run the above commnand in both folders

4. Create a `.env` file in the `server` directory and add the following environment variables:
```
PORT=5000
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=your_database_name
DB_PORT=your_postgres_port
DB_HOST=your_postgres_host
JWT_SECRET=your_jwt_secret
```

5. Create the database tables by running the SQL script in `server/schema.sql`.

### Running the Application

1. Start the server:
```
npm start
```

2. Start the client:
```
npm start
```


3. Open your web browser and navigate to `http://localhost:3000`.

### Creating an Admin User

To create an admin user with more privileges, you can use a tool like Postman or the terminal. Send a POST request to `http://localhost:5000/user/register` with the following user object:

```json
{
"username": "your_username",
"email": "your_email@example.com",
"password": "your_secure_password",
"isAdmin": true
}
```


## Screenshots

### Admin DashBoard
![Admin Create/Manage Events](https://github.com/AganzeFelicite/EventManagement_elite/blob/main/images/admin_create_manage_events.png)
![Admin Creates New Admins](https://github.com/AganzeFelicite/EventManagement_elite/blob/main/images/admin_creates_new_admins.png)
![Admin Manages Users](https://github.com/AganzeFelicite/EventManagement_elite/blob/main/images/admin_manages_users.png)
![Admin Update/Delete Event](https://github.com/AganzeFelicite/EventManagement_elite/blob/main/images/admin_update_delete_envt.png)

### User DashBoard
![List of Events](https://github.com/AganzeFelicite/EventManagement_elite/blob/main/images/listOfEvents_user_side.png)
![List of Tickets](https://github.com/AganzeFelicite/EventManagement_elite/blob/main/images/listOftickets.png)
![Login](https://github.com/AganzeFelicite/EventManagement_elite/blob/main/images/login.png)
![Print Tickets](https://github.com/AganzeFelicite/EventManagement_elite/blob/main/images/printTickets.png)
![Update Form](https://github.com/AganzeFelicite/EventManagement_elite/blob/main/images/updateForm.png)
![User Enters Number of Tickets](https://github.com/AganzeFelicite/EventManagement_elite/blob/main/images/user_enters%20_number_of_tickets.png)
![User Signup](https://github.com/AganzeFelicite/EventManagement_elite/blob/main/images/user_signup.png)



 ** The conclusion section is now displayed in bold text, 
 making it stand out from the rest of the content.**


## 🚀 About Me
I'm a full stack developer...


## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aganzefelicite2021/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/AganzeFelicite)


## Support
email aganzefelicite07@gmail.com 
