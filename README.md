# Eventer: The Ultimate Event Management App

This project was created with React and the backend with Node.js/Express.js.

## About Eventer

You can run the demo of the app using this [Live link](https://eventer-2024.vercel.app/).\
Check out the link to the [backend repository here](https://github.com/lancevd/Eventer-backend)

On this app here are the things you can do:
* View all upcoming events
* Check event details
* Create your own events (requires login)
* Edit events (requires login)
* Delete events (requires login)

### Roles 
* Admin
* User

### Testing the App

You can login either as admin or user. You can create account only as a user. The admin is preset. On the dashboard, the admin can see all events posted by all the users. They can edit or delete any event. They can also create events.\
Users can only see the events they(the user) posted. They can edit and delete these events.

#### Admin login
* Username: admin
* Password: pass

#### User login
* Username: user
* Password: user


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!