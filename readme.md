# Project Title

Trading Platform(Buy and Sell)(bid vs ask)

# Project Description

This Project is about Displaying Sell Order, Buy Order and Match Trade Order transactions live.
Application is responsive and works on almost all major browsers.

### Tech

Application uses a number of open source projects to work properly:

* [react]
* [redux]
* [ES6]
* [webpack]
* [node.js]
* [Babel]


### Installation

Requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd bitcoinTrading
$ npm install
$ npm start
  Open 'localhost:8888'
```

```
Another way to run this application (without npm install) is by opening 'index.html' in any browser.
```

### Prerequisites
 
```
Backend Services should be available to provide new Order every second
```

### Application Flow

Application has 3 sections. 

1. 
```
- Application will do API call to get new Order every second. Data limit is set to 100 and can be changed to anything.
- Buy Orders will be displayed under Buy Orders section in ascending order of price
- Sell Orders will be displayed under Sell Orders section in descending order of price
- Matched trades will be displayed under Match Trades section, ordered by created time
- Every buy and sell order will be compared and will be added to Match queue if they match

```
2. Match Order Detail
```
- Click on any item in Trade Order queue
- Modal will be displayed with all details about Trade Match
- Click Ok to close it.

```