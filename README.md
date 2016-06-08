# _theDeal_

## Install
Clone repo

`cd theDeal`

`npm i`

`gulp build`

## Develop Locally without DB Access
`gulp no-db`

This will open a browser window with live reloads

## Develop Locally with DB Access
### Without live loads
`npm start`

Severed at `http://localhost:5555`

### With live loads
** _WIP_ **

`gulp`

Severed at `http://localhost:7777`

This will open a browser window with live reloads

## Components
- express

- gulp

- browserify

- mongodb

- angular-ui-bootstrap

- font-awesome

## File Structure
```
├───┬ app/
|   ├───┬ css/
|   |   └── main.less
|   ├───┬ js/
|   |   └── main.js
|   ├── app.js
|   └── app.less
├───┬ resources/
|   ├───┬ db/
|   |   ├───┬ mongodb/
|   |   |   ├── mongoDBConnection.js
|   |   |   └── mongoDBUI.js
|   |   └── templateConnection.js
|   ├───┬ images/
|   |   ├── favicon.ico
|   |   └── petelogo.png
|   └── templateConnection.js
├───┬ www/
|   ├───┬ css/
|   |   ├── bundle.css
|   |   └── bundle.min.css
|   ├───┬ js/
|   |   ├── bundle.js
|   |   └── bundle.min.js
|   └── index.html
├── gulpfile.js
├── package.json
├── README.md
└── server.js
```

## Usage
`gulp build` will build `bundled.css` and `bundled.js`, `bundled.min.css` and `bundled.min.js`, _&_ add the bootstrap and font awesome icons to `fonts/` (_run this first_)

`gulp` or `gulp no-db` will build your `bundled.css` and `bundled.js` in `www/` -> `css/` and `js/` and run live reloads

`npm start` or `gulp local` will build your `bundled.css` and `bundled.js` -> `css/` and `js/`

`gulp` or `npm start` with mongodb running will give you access to the mongodb

edit files in `app/` -> `js/` and `css/` they will be bundled into `www/`

edit `index.html` in `www/`

add resources in `resources/`

images are in `resources/images/`

## Mongodb
Start mongodb

#### Auto db create and add data
This will create a db name `deal` in mongodb

Then it will add 3 records to `deal`

Navigate to this project folder `mongodb` in terminal and run `createDBandData.js`

- `cd resources/db/mongodb/`

- `node createDBandData.js`

The following three records will be added to `deal`

#### Enter data manually
Create db in mongodb `deal`

insert the following objects into mongodb

`{
    "name" : "pete",
    "color" : "blue",
    "fun" : "yes"
}`

`{
    "name" : "mary",
    "color" : "purple",
    "fun" : "yes"
}`

`{
    "name" : "paul",
    "color" : "red",
    "fun" : "no"
}`


