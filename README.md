# Northcoders News API

Overview

Welcome to the Northcoders News API! This project serves as the backend for a full-stack web application, providing access to application data programmatically. It mimics the functionality of a real-world backend service like Reddit, offering various endpoints to interact with articles, comments, users, and topics.

Background

This API utilises Node.js and Express for server-side functionality. Efficient communication between the API and the postgreSQL databases is facilitated by node-postgres, providing the user to interact with the databases with the ability to perform a range of CRUD (Create, Read, Update, Delete) operations. The API follows a Model-View-Controller (MVC) architecture with a clear separation of concerns for scalability and maintainability.


The live version of the Northcoders News is hosted by render and may be viewed [here](https://northcoders-news-xznn.onrender.com/api).



## Getting Started

To get started with the project, follow these steps:



### 1. Clone the repository 

https://github.com/itskabeh/nc-news-project.git



### 2. Setup environment variables

You will need to create two .env files for your project: 
    
    .env.development
    .env.test


The env.development file should contain: 

    PGDATABASE=nc_news


The env.development file should contain: 

    PGDATABASE=nc_news_test


You will want to make sure that these .env files are .gitignored to protect your database from infiltration.



### 3. Install dependencies

Run the below code in your terminal to install all required dependencies:

    npm install



### 4. Setup and seed database

This project provides two databases: nc_news and nc_news_test. The latter can be used to interact with and test the functionality of the main development database without corrupting the original data. It is also a much smaller version of the development database, with a more manageble dataset to work with.

The db folder holds the database data for both databases, a setup.sql file and a seeds folder. Refer to the index.js in each of the data folders to export out all the data from that folder, currently stored in separate files.

To set up both your nc_news and nc_news_test databases, run:

    npm run setup-dbs

To seed your databases, run:

    npm run seed



### 5. Run tests

To test the functionality of the code, run the following command:

    npm run test-app



## Endpoints

Retrieve a list of all available endpoints.

    https://northcoders-news-xznn.onrender.com/api

Retrieve a list of all topics.

    https://northcoders-news-xznn.onrender.com/api/topics

Retrieve a single article by ID.

    https://northcoders-news-xznn.onrender.com/api/articles/:article_id  

Retrieve a list of all articles.

    https://northcoders-news-xznn.onrender.com/api/articles/    

Retrieve comments for a specific article.

    https://northcoders-news-xznn.onrender.com/api/articles/:article_id/comments

Add a comment to an article.

    https://northcoders-news-xznn.onrender.com/api/articles/:article_id/comments

    Create a request: { 
                      username: "insert username", 
                      body: "comment here"
                      }

Update the votes on an article by upvoting or downvoting.

    https://northcoders-news-xznn.onrender.com/api/articles/:article_id

    Create a request: { inc_votes: 1 } or { inc_votes: -1 }

Delete a comment.

    https://northcoders-news-xznn.onrender.com/api/comments/:comment_id

Retrieve a list of users.

    https://northcoders-news-xznn.onrender.com/api/users

Filter articles by topic.

    https://northcoders-news-xznn.onrender.com/api/articles?topic=
    
    Provide a topic query.


For more information, refer to the endpoints.json file.



## Minimum Requirements

    node.js: ">=v21.3.0"
    postgres: ">=14.10"



## List of Dependencies

Production Dependencies:

    "dotenv": "^16.4.4",    Loads environment variables from .env files.
    "express": "^4.18.2",    Simplifies building of APIs, adding a robust set of helpful features.
    "husky": "^9.0.11",    Performs pre-commit checks to prevent bad commits to github.         
    "pg": "^8.11.3"    Allows interaction with PostgreSQL databases.


Developer Dependencies:

    "jest": "^27.5.1",    A feature-rich test framework for creating tests to ensure the correctness of codebases. 
    "jest-extended": "^2.0.0",    Provides additional matchers for testing with more specificity.
    "jest-sorted": "^1.0.15",    Provides ability to test whether data has been sorted.
    "pg-format": "^1.0.4",    Allows safe creation of dynamic SQL queries to avoid SQL injection.
    "supertest": "^6.3.4"    Gives ability to write automated tests for API routes and endpoints.
    

