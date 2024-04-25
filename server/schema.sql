-- Create the database
CREATE DATABASE event_management_platform;

-- Switch to the new database created
\c event_management_platform

-- Create the "users" table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create the "events" table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    location VARCHAR(100) NOT NULL,
    available_tickets INT NOT NULL,
    created_by INT REFERENCES users(id) NOT NULL
);

-- Create the "bookings" table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(id) NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL,
    tickets_booked INT NOT NULL,
    booking_date TIMESTAMP NOT NULL DEFAULT NOW()
);