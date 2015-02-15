import React from 'react';

var Router = require('react-router')
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


// require('../css/main.styl');
React.initializeTouchEvents(true);

let App = React.createClass({
  render(){
    return (
      <div>
        <header>
          <ul>
            <li><Link to="app">Dashboard</Link></li>
            <li><Link to="inbox">Inbox</Link></li>
            <li><Link to="calendar">Calendar</Link></li>
          </ul>
          Logged in as Jane
        </header>

        {/* this is the important part */}
        <RouteHandler/>
      </div>
    );
  }
});

let Inbox = React.createClass({
  render: function() {
    return <div>Inbox</div>
  }
});

let Calendar = React.createClass({
  render: function() {
    return <div>Calendar</div>
  }
});

let Dashboard = React.createClass({
  render: function() {
    return <div>Dashboard</div>
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="inbox" handler={Inbox}/>
    <Route name="calendar" handler={Calendar}/>
    <Route name="dashboard" path="/dashboard" handler={Dashboard}></Route>
    <DefaultRoute handler={Dashboard}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});

// React.render(<App />, document.body);
