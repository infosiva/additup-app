# additup-app

# WEBAPI
step 1: run  the webapi from the below location - WebApi\WebApi\ and if the configured port of API is being used by the other process 
        then change the port on the file - WebApi\WebApi\Properties\launchSettings.json - instead of 4000 to xxxxx
# WEBAPI Client
step 2: after webapi runs and its required change the URL of the api on the below file.
        \WebApiClient\additup-app\src\config.ts.
# Install required NPM packages
step 3: npm install \WebApiClient\additup-app 

# run the front end 
step 4: ng serve
