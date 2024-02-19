# Northcoders News API

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as Reddit) which should provide this information to the front end architecture.

## Project Setup

### 1. Clone the repository 

https://github.com/itskabeh/nc-news-project.git

### 2. Setup environment variables

You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

You'll need to run npm install at this point.

Please do not install specific packages as you can do this down the line when you need them.

You have also been provided with a db folder with some data, a setup.sql file and a seeds folder.

The job of index.js in each of the data folders is to export out all the data from that folder, currently stored in separate files. This is so that, when you need access to the data elsewhere, you can write one convenient require statement to the index file, rather than having to require each file individually. Think of it like the index of a book - a place to refer to! Make sure the index file exports an object with values of the data from that folder with the keys:

topicData
articleData
userData
commentData

