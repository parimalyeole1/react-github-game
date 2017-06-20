var React = require('react');
var ReactRouter = require('react-router-dom');
var Link = ReactRouter.Link;
var NavLink = ReactRouter.NavLink;

//components

class Result extends React.Component {
    render() {
        console.info('aas',this.props)
        return (
            <div className="">
               Results
            </div>
        );
    }
}

module.exports = Result;