# InfectNet Browser Frontend
[![Build Status](https://travis-ci.org/infectnet/infectnet-browser-frontend.svg?branch=develop)](https://travis-ci.org/infectnet/infectnet-browser-frontend)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4689e81a1c4d43438d3f893962866ea6)](https://www.codacy.com/app/infectnet/infectnet-browser-frontend?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=infectnet/infectnet-browser-frontend&amp;utm_campaign=Badge_Grade)
[![Stories in Ready](https://badge.waffle.io/infectnet/infectnet-parent.svg?label=ready&title=Ready)](http://waffle.io/infectnet/infectnet-parent)

## Installation

First of all, make sure you have `node.js` installed. You can get it from [nodejs.org](https://nodejs.org/).

### Dependencies:

You can install the dependencies using the following commands:

~~~~
    npm install
    jspm install
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

### Configuration

The project uses `gulp`. Please see the `gulp-config.js` and `gulpfile.js` to configure the development and build process.
