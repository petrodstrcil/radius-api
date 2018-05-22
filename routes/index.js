'use strict';

const fs = require('fs');
const path = require('path');
const config = require('config');
const url = require('url'); 

const URL = url.parse(config.server.url); 

//import radreply from "./radreply.js";

/*
module.exports = (app) => {
  app.use(`/${proj_name}/radreply`, radreply)
  // etc..
}*/

// loop through all routes and dynamically require them – passing api
//fs.readdirSync(path.join(__dirname, 'routes')).map(file => {

const exludeRoute = ['index', 'action', 'api-docs', 'login'];

module.exports = (app) => {   
    fs.readdirSync(path.join(__dirname, '')).map(file => {
        var routeName = path.parse(file).name;
        if (!exludeRoute.includes(routeName)) {
        //if (routeName !== 'index') {
            
            var routePath = URL.pathname; 

            //require('./routes/' + file)(api);
            //console.log(file);
            console.log('Register route: ', `${routePath}/${routeName}`);
            //console.log(path.join(__dirname, file));

            app.use(
                  `${routePath}/${routeName}`
                , require(path.join(__dirname, file))
            );
        }
    });
};    
