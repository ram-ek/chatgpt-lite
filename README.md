# Chatgpt-lite
## Overview
- A not so smart chatgpt clone whom users can submit prompts and will get responses.

## Execution
1. Starting up nodejs server
```
npm start
```
2. Starting up react
```
npm run dev
```

## Note
- Before running the application, user needs to set up MONGO_URI, PORT and SECRET in backend->.env.
- MONGO_URI is the uri of your mongo-server, PORT is on which port the node server will run and SECRET is the salt used for hashing passwords.
