var React = require('react');
var ReactRouter = require('react-router-dom');
var Link = ReactRouter.Link;
var NavLink = ReactRouter.NavLink;

//components
//var Nav = require('./Popular');

class Nav extends React.Component {
    render() {
        return (
            <ul className="nav">
                <li>
                    <NavLink exact activeClassName="active" to='/'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to='/battle'>
                        Battle
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to='/popular'>
                        Popular
                    </NavLink>
                </li>
            </ul>
        );
    }
}

module.exports = Nav;