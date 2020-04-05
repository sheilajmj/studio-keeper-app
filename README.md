# Studio Keeper

Studio Keeper is a web application designed to support artists, makers, and designers manage the business of their creative work.  The application allows users to easily catalog their work, enter contacts, and keep track of events of interest.  The application also provides a gallery view, which allows users to easily share their work.  

Live Link: [Studio Keeper](https://studio-keeper-app.now.sh/)
Client Repo: [Client Repo](https://github.com/sheilajmj/studio-keeper-app)
Api Repo: [API Repo](https://github.com/sheilajmj/studio-keeper-server)

## Getting Started
Upon first arriving to the site, you will see the welcome page.  Here you may click the 'get started' button or the 'login' button to continue.

<img src="src/assets/readme-assets/app-welcome-mk.png" alt="welcome-page" width="400">

To view the project in action, you will need to log in using the demo account.  
Username: painter99
password: penny

<img src="src/assets/readme-assets/login-mk.png" alt="login-page" width="400">

## Using the App

Once logged in, users will see the application landing page.  

<img src="src/assets/readme-assets/app-landing.png" alt="landing-page" width="300">


Users may click an icon along the top menu to view a preview of the entries.

<img src="src/assets/readme-assets/main-nav-mk.png" alt="main-nav" width="300">

The user will see several options from here.  Options include, viewing entry details, adding an entry, editing an entry, selecting a different icon from the main menu to view a new category or to view the gallery, and returing to the application landing page.

<img src="src/assets/readme-assets/contact-items-mk.png" alt="contact-item-anno" width="500">

### Adding an Entry

Selecting to add an entry will allow the user to enter information, and choose 'submit' to commit the new entry to the database.  

<img src="src/assets/readme-assets/contact-submit-mk.png" alt="contact-add" width="300">


### Editing an Entry

Selecting to edit an entry will allow the user to make changes to the selected entry.  The user has options to submit the changes to the database, cancel the changes, or delete the entire entry from the database.  

<img src="src/assets/readme-assets/edit-event-mk.png" alt="edit-event" width="300">

## The Gallery

The gallery page is a minimal view of the catalog entries, designed to serve as a tool for showcasing work.  To allow the focus to be on the catalog images, the additional navigation options are not present.  However, by clicking the title at the top, a user may return to the main application landing page.  

<img src="src/assets/readme-assets/gallery1.png" alt="gallery1" width="300">

<br />


<img src="src/assets/readme-assets/gallery2.png" alt="gallery2" width="300">


## Deployment

The server and client application are deployed to Heroku.  Image storage is managed in AWS S3.  

## Built With

<img src="src/assets/readme-assets/react-logo.svg" alt="react-logo" height="48"> The frontend was created using React

<img src="src/assets/readme-assets/node-logo.svg" alt="node-logo" height="96"> The backend was created using Node

<img src="src/assets/readme-assets/postgres-logo.png" alt="postgres-logo" height="48"> The database used was Postgres

<img src="src/assets/readme-assets/aws-logo.png" alt="aws-logo" height="48"> Images are stored using AWS S3

## Authors

* **Sheila Jagla** - [SheilaJagla](https://github.com/sheilajmj)

## Acknowledgments

####Stock Images
    * Paweł Czerwiński on Unsplash
    * Mr Karl on Unsplash
    * Alexander Ant on Unsplash

