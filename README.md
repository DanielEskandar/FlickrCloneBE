# Flickr Clone Back-End
This Project aims at providing a back-end server for software platform providing a clone to the Image Sharing Service [Flickr](https://www.flickr.com/). This project is developed mainly using NodeJS, using express framework and JavaScript. 

## Running the server
If you wish to run the server, the first step is [installing Node](https://nodejs.org/en/).

### Installing Dependencies
Once that's out of the way, open a terminal in the project's main directory and run the following command:

```
npm install
```

which will install all dependencies needed for project functionality. The server is now ready to run. Simply point a terminal to the project's folder and run:

```
npm start
```

which should start the server on the default port 7000

### API Documentation
The code has an integrated API Doc Module, to generate the API documentation just run the following command:

```
npm run apidoc
```

### API Testing
You can run API unit tests, however on a dummy dev database, to prevent overwriting production data. You can do it by running the following command:

```
npm run test
```

The test results will be displayed in the terminal

## Data Management
All data is stored on a MongoDB NoSql Database. Details on the structure can be found in the data model descriptions. 
Photos uploaded are transferred automatically to a cloud CDN, hosted by cloudinary. 

## License
The project has no special licenses and is developed for educational pruposes only. All trademarks belong to flickr, and all dependencies have their credit due to their original authors.
