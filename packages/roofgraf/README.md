# Roofgraf API

Make sure you have node version 8+ installed.

### Running the application

There are a few ways to run this app:
  - Everything in docker containers
  - Local copy of api with helper containers (mysql, elasticsearch and redis)
  - Local copy of everything you need
  
    #### 1. Running everything in docker containers
      ```bash
      $ yarn docker
      ```
      If pressing ctrl-c doesn't exit the containers, you can stop them by
      ```bash
      $ yarn docker-stop
      ```
  
    #### 2. Running everything locally
  
      - Install mysql
      - Ensure config points to the right hostnames + ports for each of these services
      - Run
      ```bash
      $  yarn install 
      $ DEBUG=* yarn dev
      ```

### Checking out available routes
[API Docs](http://localhost:5000/docs/)
