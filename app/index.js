var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');

//components
var App = require('./components/App');

ReactDOM.render(
    <App />,
    document.getElementById('app')
);