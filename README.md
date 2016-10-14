# InfectNet Browser Frontend
[![Build Status](https://travis-ci.org/infectnet/infectnet-browser-frontend.svg?branch=develop)](https://travis-ci.org/infectnet/infectnet-browser-frontend)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4689e81a1c4d43438d3f893962866ea6)](https://www.codacy.com/app/infectnet/infectnet-browser-frontend?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=infectnet/infectnet-browser-frontend&amp;utm_campaign=Badge_Grade)
[![Stories in Ready](https://badge.waffle.io/infectnet/infectnet-parent.svg?label=ready&title=Ready)](http://waffle.io/infectnet/infectnet-parent)

## Installation

First of all, make sure you have `node.js` installed. You can get it from [nodejs.org](https://nodejs.org/).

### Dependencies

You can install the dependencies using the following commands:

~~~~
    npm install
    node_modules/.bin/jspm install
~~~~

## Development

### Build

Build the project (default destination is `dist`):

~~~~
    npm run build
~~~~

### Development server

Use the following command to spin-up a development server at `localhost:8080` with watch:

~~~~
    npm run serve
~~~~

### Mock backend

A mock backend server can be launched on `127:0.0.1:3000` using:

~~~~
    npm run json-server
~~~~

This way the frontend can be tested with real requests to a mock server. JS and JSON files related to the mock server can be found in the `json-server` directory.

For more information on the mock server configuration please read the `json-server/README.md` file. 

### Configuration

The project uses `gulp`. Please see the `gulp-config.js` and `gulpfile.js` to configure the development and build process.

## Source Structure 

The source folder (considering only the JS part) is structured on a per-realm basis. The site is separated into realms, loosely coupled sections that make up the application. Currently there are 3 (and a half) realms:

- **play**: the actual game screen
- **server**: server-specific pages, such as login, server info, registration, and the half-realm, **admin**
- **site**: contains no server specific stuff, only informations about the game, docs, tutorials

Each realm has a top-level file which has the same name as the realm. This module returns a `getRoutes()` method which returns an array of routes exposed by the realm.

Subdirectires in realms are structured per feature instead of layers/realms to keep together closely related modules even if they belong to different layers.

### common

Contains common components that can be used as building blocks for other, less general components and services that expose utilities for other parts of the application.

A great example for a service is the `Request` which handles AJAX requests.

### main.js

The `main.js` file is the entry point of the application which mounts the Mithril SPA to the `body` of the HTML page. 

### routes.js

`routes.js` provides a simple API for storing the routes supported by the application.
