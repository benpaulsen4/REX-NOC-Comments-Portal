# REX Energy NOC Comment Portal
This web app allows NOC users to create and delete comments in the database. These comments are then subsequently displayed on the NOC PowerBI report.
## License
REX Energy branding, including the 'X' logo are (c) REX Energy 2022. All non-brand related code/assets are distributed under GPLv3 as a result of contractual agreements with the technology team. 

# Limitations
At this time, the app itself is incomplete. The app can successfully add comments to the database, but the deletion functionality is not completed. Please delete comments from the database directly for them time being. 

Also, the way in which the app currently decides the existing sites is through entries in the comment database itself. As such, for a site to be selectable, there must be at least one dummy entry in the database associated with it.

# Installation
This combination React/Express app is bundled in a single Node package. To install it, simply clone the repository and run ```npm init``` in its respective directory. 

Additionally, you must specify your MSSQL database configuration in ```dbconfig.json``` (not included in this repository for obvious security reasons). See the [Node MSSQL Documentation](https://www.npmjs.com/package/mssql) for more information on what this should look like.

# Running
As this app is both a react and express server, they must be started separately. Once in the right directory you can start the backend server by running: <br>
```npm run server``` <br>
The React app itself should be built before running in production. Run ```npm build``` and then in the build directory run ```npm start``` to get it up and running.