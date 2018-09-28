# fast-food-fast

[![Build Status](https://travis-ci.org/okoroemeka/fast-food-fast.svg?branch=develop)](https://travis-ci.org/okoroemeka/fast-food-fast)  [![Coverage Status](https://coveralls.io/repos/github/okoroemeka/fast-food-fast/badge.svg)](https://coveralls.io/github/okoroemeka/fast-food-fast)  [![Maintainability](https://api.codeclimate.com/v1/badges/110dddcd1a88478f06b0/maintainability)](https://codeclimate.com/github/okoroemeka/fast-food-fast/maintainability)

fast-food-fast app is a food delivery service app for a restaurant.

<!-- [![okoroemeka.github.io/fast-food-fast/UI]: (https://okoroemeka.github.io/fast-food-fast/UI)]
[![fast-food-fast-12.herokuapp.com]: (//https://fast-food-fast-12.herokuapp.com)] -->
## Project overview 
https://okoroemeka.github.io/fast-food-fast/UI
https://fast-food-fast-12.herokuapp.com)
A template for fast-food-fast app with the features below.

## project UI template and Heroku app

## Required features

1. Users can Place order
2. Admin users can create edit and delete food items
3. Admin user can update order status 
4. Admin user can get all order
5. Admin user can get specific order

## Technologies used

1. Html and Css on the front end
2. Nodejs
3. Expressjs frame work
4. Mocha,Chai,Chai-Http for test

## API End Points

|Verb   |Enpoints                           | Action               | Description                    |
|:------|:----------------------------------|:---------------------|:-------------------------------|
|GET    |/orders                            |fetch all orders      |Get all available order         |
|POST   |/orders                            |create order          |creates a new order             |
|GET    |/orders/:orderId                   |fetch specific order  |view specific order             |
|PUT    |/orders/:orderId                   |update an order status|modify a particular order status|

## Setting up Locally

1. Clone this repository to your local machine
2. cd to `fast-food-fast`
3. Run `npm install`
4. Start app with `npm start`

## Test 

Run `npm test`

## Author

Okoro Emeka.