# Lab 6 - Article API with PostgreSQL and Sequelize

This is a Node.js + Koa API developed for Lab 6 of the VT6003CEM Web API Development module. It connects to a PostgreSQL database and performs CRUD operations for article data.

## Project Structure

├── config.ts # Database config (excluded from Git)
├── helpers/
│ └── database.ts # Sequelize-based DB utility
├── models/
│ └── articles.ts # Article model with CRUD logic
├── routes/
│ └── articles.ts # API routes for articles
├── index.ts # Koa app entry point

## Installation

1. **Clone this repo**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   
2. Install dependencies:
npm install

3. Create DB configuration:
Create a config.ts file in the root directory with the following content:

export const config = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'my-password-here',
  database: 'postgres',
  connection_limit: 100
};

4. Start the server:
   npm run dev
   The server will run at http://localhost:3000

API Endpoints
Method	Endpoint	Description
GET	/articles	Get all articles
GET	/articles/:id	Get article by ID
POST	/articles	Create a new article

PUT and DELETE functions are optional for this lab and not yet implemented.

Database Table: articles
Ensure your PostgreSQL database has the following structure:

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  allText TEXT NOT NULL,
  summary TEXT,
  dateCreated DATE DEFAULT CURRENT_DATE,
  dateModified DATE DEFAULT CURRENT_DATE,
  imageURL TEXT,
  published BOOLEAN,
  authorId INT
);

Development Notes
- Sequelize is used for database access, but raw queries are manually written.

- Routes are separated from model logic for clean architecture.

- Errors are caught using try/catch and logged via console.error.

Created for Coursework Lab6
By: JackyKwok
Date: 2025/05/13
