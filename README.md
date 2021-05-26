# Introduction

This application is intended for personal use and consists of the MERN stack technologies:
 - MongoDB
 - Express
 - React.js
 - NodeJS  
 *This application requires the node package manager (npm)*

The goal of this app is to allow the user to track movie titles, add notes to them and save them as favorites. It is not intended 
for commercial use and multi-user support.

## App structure

The app consists of a home page, where popular movies and the user's "Favorites" collection are presented. They can then navigate to the "/movie" route, which will present them with more detailed information about their selected movie and the change to rate and comment on it. ___!Important: The ratings and notes on this application are not reflected on the TMDB api!___ The changes the user inputs for the star rating and comments are auto-saved on change and will be reflected in the local Mongo database. The user can also search for their favorite movies with the search functionality and navigate through the results with the halp of the pagination.  

## Running the application

1. Navigate to the root folder of the project and run
```
npm install
```  
  After completing, the folder should contain the *node_modules* folder, containing the dependancies for the back-end application.
  
2. Run
```
cd client
npm install
```
  After completing, the */client* folder should contain the *node_modules* folder, containing the dependancies for the front-end application.
  
3. Run
```
npm run-script build
```
This will build the react.js application and set up the statically served files

4. Open server.js in the root directory and input your TMDB api key  
***The key is aquired by registering in [TMDB](https://www.themoviedb.org/)***

5. Navigate to the root folder and run 
```
npm start 
```

The application will be available on the _(default)_ address and port http://localhost:3000
