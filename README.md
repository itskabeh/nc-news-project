# Northcoders News API

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as Reddit) which should provide this information to the front end architecture.

## Project Setup

### 1. Clone the repository 

https://github.com/itskabeh/nc-news-project.git

### 2. Setup environment variables

You will need to create two .env files for your project: .env.test and .env.development. 

The env.development file should contain: 

    PGDATABASE=nc_news


The env.development file should contain: 

    PGDATABASE=nc_news_test


You will want to make sure that these .env files are .gitignored.

You'll need to run npm install at this point.


### 3. Setup and seed database

The db folder holds the database data, a setup.sql file and a seeds folder. Refer to the index.js in each of the data folders to export out all the data from that folder, currently stored in separate files.

To set up your database, run:

    npm run setup-dbs

To seed your database, run:

    npm run seed


### 4. Install dependencies

You will need to install the following packages:

    - jest
    - jest-extended
    - jest-sorted
    - supertest
    - husky
    - pg
    - pg-format
    - express
    - dotenv

