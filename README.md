# Chatgpt-lite
## Overview
- A not so smart chatgpt clone whom users can submit prompts and will get responses.
- It is a MERN app which consists of a frontend to interface the user and a backend which handles the user requests.
- Some additional functionalities implemented are user signup and login, user session management using JsonWebToken.

## Working
- Users can submit their prompts to which the responses are fetched by searching in the database with the prompt as key fetching the corresponding response for it.
- Admins can put prompts and their responses in the database and later responses these prompts would be available to users.
- It works by sending an HTTP/ GET request to our server with the prompt which is first validated and then the database is searched with the prompt as key and response is sent back to client.

## Execution
1. Starting up nodejs server
```
npm start
```
2. Starting up react
```
npm start
```

## Note
- Before running the application, user needs to set up MONGO_URI, PORT and SECRET in backend->.env.
- MONGO_URI is the uri of your mongo-server, PORT is on which port the node server will run and SECRET is the salt used for hashing passwords.
