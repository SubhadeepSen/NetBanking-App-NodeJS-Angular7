### Description:
#### This API is for creating a simple banking application developed in Node JS and secured by JWT token. It includes three independent services, known as *__User-Service__*, *__Account-Service__* and *__Transaction-Service__* which have been developed keeping the concept and design of microservices in mind. Hence, these services can be independently deployed to different servers with minimal configurations. The User-Service takes care of handling user related information, the Account-Service takes care of handling account related information and the Transaction-Service takes care of handling transaction related information. The endpoints /register and /validateuser in User-Service are not secured by JWT token. These three services interact with their corresponding MongoDB collection.
#### For more design related information, please look into the design documents. 
https://github.com/SubhadeepSen/NetBanking-App-NodeJS-Angular7/tree/master/API-Design%20Documents

### Technology Used:
#### Database: MongoDB
#### Language: Javascript (Node JS)

### Node JS Modules:
+ *__express:__* A Node JS module to develop RESTFul Web Services(API) and Web Applications(MVC). Here I have used it for developing RESTFul API.

+ *__joi:__* A Node JS module to validate schemas. Here I have used it to validate the request body as input.

+ *__mongoose:__* A Node JS module to connect with the MongoDB server and perform operations on MongoDB.

+ *__bcrypt:__* A Node JS module to encrypt and decrypt. Here I have used it to encrypt the user password at the time of registering and compare it at the time of login.

+ *__jsonwebtoken:__* A Node JS module to generate JWT token and to verify the provided token. Here I have used to it generate JWT token on successful login and to verify each endpoint at the time of request.

+ *__morgan:__* A Node JS module to log http request and respone. Here I have used it for development purpose.

+ *__axios:__* A Node JS module to make external API calls. Here I have used it to call transaction service from account service at the time of transaction.

+ *__config:__* A Node JS module to load project related configuration json files located inside config folder depending upon the application running environment (development, production). It also helps to read the OS custom environment variables by the *custom-environment-variables.json* file. Here I have used it to read project related configurations and to read the secret key set in OS environment variable to generate JWT token.

+ *__pdfmake:__* A Node JS module to generate PDF document. Here I have used to generate transaction summary pdf document.

### Instructions:
#### To run this application please follow the below steps- ####
1.	Open command prompt and go inside the root of the project. (where main.js is located)
2.	Run __npm install__ to install the node modules.
2.	set the environment variable for JWT secret key and application running environment
	
    __set NODE_ENV = development or production__	//setting project environment
	
    __set bankingapp-secretkey = provide your secret key here__		//setting jwt secret key

3.	Make sure your MongoDB server is running on the same host and port mentioned in the configuration file (production.json or development.json) depending upon the environment.
4. 	You can simply run the application using either nodemon or node as __node main.js__ or __nodemon main.js__
