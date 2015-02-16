import React from 'react';

var Router = require('react-router')
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var RouteHandlerMixin = Router.RouteHandlerMixin;

var MyRouterHandler = React.createClass({
  mixins: [RouteHandlerMixin],
  shouldComponentUpdate: function () {
    return this.props.isFlip;
  },
  render: function () { return this.createChildRouteHandler(); }
});

React.initializeTouchEvents(true);

let App = React.createClass({
  setInitialState: function () {
    this.isFlip = false;
    return {};
  },
  render(){
    this.isFlip = !this.isFlip
    return (
      <div>
        <header>
          <ul>
            <li><Link to="app">Dashboard</Link></li>
            <li><Link to="inbox">Inbox</Link></li>
            <li><Link to="calendar">Calendar</Link></li>
          </ul>
        </header>

        <MyRouterHandler isFlip={this.isFlip} />
        <MyRouterHandler isFlip={!this.isFlip} />

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
    return <div>Calendar</div>;
  }
});

let Dashboard = React.createClass({
  render: function() {
    return <div>Dashboard</div>
  }
});

var routes = (
  <Route name="app" path="/app" handler={App}>
    <Route name="inbox" handler={Inbox}/>
    <Route name="calendar" handler={Calendar}/>
    // <Route name="dashboard" path="/dashboard" handler={Dashboard}></Route>
    <DefaultRoute handler={Dashboard}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});

// React.render(<App />, document.body);
