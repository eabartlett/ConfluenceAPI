ConfluenceAPI
=============

Backend API for Confluence Android app built using node.js, express.js, mongoose.js, and MongoDB

## Project Summary

Confluence is an application built for CS160 - User Interface Design at UC Berkeley. The project is an Android application that can be found [here](https://www.github.com/eabartlett/Confluence).

The Android application was built in collaboration with [Shana](https://github.com/shanawho), [Brian](https://github.com/dolphyin), and [Nahush](https://github.com/nbhanage).

The application is a language forum for users hoping to perfect their grammar, pronunciation, and accent in a language. The idea was supposed to essentially be a StackOverflow for languages. Users can post recordings of themselves talking and recieve both written and verbal feedback from peers.

A demo of the application can be found [here](https://www.youtube.com/watch?v=ySKpy1bGOws)

### Technical Decisions

##### Frameworks
* Node.js
  * I had never worked with web development node.js specifically, and a larger number of companies were beginning to use it as their backend - I also prefer to challenge myself with something new as opposed to using a language and framework I was more familiar with.
  * The asynchronous nature of node.js means that it can scale well enough on one server to handle all the load we were expecting to receive.
* Express
  * From what I read it was the most commonly used framework for web applications.
  * It is extremely lightweight and allows for a minimal amount of code being written before the app is up and running
* MongoDB
  * Once again NoSQL database are a technology that was becoming more popular in industry and I had never worked with them, so I decided learning how to write an app that has simple interactions with the database would be useful in the future.
* Mongoose.js
  * It was the first MongoDB ODM I read about and it fit my basic needs.
  
##### Trade-offs and Next Steps
*  I decided to separate all the route handling based on the type of data that it interacts with
  *  This created a more complex file structure while only slightly simplifying each route file. This decision was made mainly with scaling the project in mind. If the project were to go past this beta phase - there would be a large amount of routes that would need to be added. So while at this simple stage there is a somewhat unnecessary level of abstraction between routes - the current structure would scale much better than a single routes.js file.
*  There is more bullet-proofing of the route handling that would need to happen before this went into production. There needs to be more error handling and more null checking to ensure the application is more fault tolerant
*  The current way files are saved is by saving them in a directory and saving that path to the database object. It would be preferred to save the audio file as a buffer within the database to remove the call to fs.readFile when sending an audio file.
*  Add support for more profile information and use FacebookSDK to handle login and creation of accounts
  * This would automatically allow users to preload languages and create a faster onboarding process

##### Project Structure

1. Initialization is done in the main app.js file
2. All database schema and interactions are defined in the schema director
3. All Routes are defined within the routes directory
  * Each type of database object has it's own route for interacting with the model - to allow for clearer distinction between the contents of each file.
