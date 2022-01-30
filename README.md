# DYNAMIC TWITTER BANNER

Express JS Server which updates your twitter banner every minute with your latest 3 followers.


### Install & configuration
Install dependencies

`yarn install` or `npm install`

Create .env file and adjust with your variables

`cp .env.dist .env`

Enviroment variables
````dotenv
APP_KEY= GET API KEY FROM TWITTER
APP_SECRET= GET API KEY FROM TWITTER
ACCESS_TOKEN= GET API KEY FROM TWITTER
ACCESS_SECRET= GET API KEY FROM TWITTER
TWITTER_ID= YOUR TWITTER USER ID
PORT= CHOOSE A PORT // DEFAULT 3000
BANNER_PATH= PATH TO YOUR BANNER TEMPLATE
````

### Commands

Start server
`yarn start`

To start server in watch mode
`yarn watch`



