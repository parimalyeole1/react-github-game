var React = require('react');

//components
var Popular = require('./Popular');

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Popular />
            </div>
        );
    }
}

module.exports = App;