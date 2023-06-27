# URL Shortener
This is a simple website that shortens the URL provided by the user. The user can also add a note when he inputs the full URL, which must be unique. The website stores the data of the full URL provided by the user, the note provided with it, its shortened version, and the number of clicks the user has clicked on the shortened URL. In addition, there is a search feature included in the website which helps you to search the database using full URL, shortened URL, or the note.
## To run the project
You must have node.js installed on your computer. Clone this repository in a local directory on your computer. First, open the file [server.js](files/server.js) and add your MongoDB connection string in the space provided in the "uri" variable. Then, open the terminal, switch to the local directory, write `npm install`, and then write `nodemon server`. The website should automatically open in the browser, if not, open the browser and type "localhost:5000".
## Working
I have used MongoDB, Express, and node.js to develop the website. It uses the shortid dependency to create a unique short URL for every full URL you enter. The search feature iterates through the entire database to find the entered query and outputs the other information related to the input. Similarly, in the list tab entire database is iterated and printed in a table form, with the number of clicks. Below is the home page when you open the website.

![Screenshot (34)](https://github.com/adityaby02/URL_Shortener/assets/101334086/2c3b76e0-482e-4a09-9a3e-d166cf8f9ec5)

## What did I learn?
Learned a lot about web development (to the extent I am pretty clear now should I pursue it or not 🫠). More specifically, learned about the MERN stack, though I have not implemented React in my project but had a basic exposure to it during this project. 
## Resources used
* YouTube
* StackOverflow
* W3schools
