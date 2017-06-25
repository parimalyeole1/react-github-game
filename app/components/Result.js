var React = require('react');
var PropTypes = require('prop-types');
var ReactRouter = require('react-router-dom');
var queryString = require('query-string');
var Link = ReactRouter.Link;
var NavLink = ReactRouter.NavLink;

var api = require('./../utils/api');
var PlayerPreview = require('./PlayerPreview');
var Loading = require('./Loading');
//components


function Profile (props) {
  var info = props.info;

  return (
    <PlayerPreview username={info.login} avatar={info.avatar_url}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

function Player (props){
    return (
        <div>
            <h1 className="header">{props.label}</h1>
            <h3 style={{
                textAlign: 'center'
            }}>Score: {props.score}</h3>
            <Profile info={props.profile}/> 
        </div>
    )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            winner: null,
            loser:null,
            loading: true
        }
    }
    componentDidMount() {
        let players = queryString.parse(this.props.location.search);
        api.battle([
            players.playersOneName,
            players.playersTwoName
        ]).then(function (results) {
            console.info('aas', results);
            if (results === null) {
                return this.setState(function () {
                    return {
                        error: "Look like there was error. Check that both users exist on Github",
                        loading: false
                    }
                })
            }

            this.setState(function () {
                return {
                    error: null,
                    winner: results[0],
                    loser: results[1],
                    loading: false
                }
            })
        }.bind(this));
    }
    render() {
        let error = this.props.error;
        let winner = this.state.winner;
        let loser = this.state.loser;
        let loading = this.state.loading;

        if (loading === true) {
            return <Loading />
        }

        if (error) {
            return (
                <div>
                    <p>{error}</p>
                    <Link to='/battle'>Reset</Link>
                </div>
            )
        }
        return (
            <div className="row">
                <Player
                    label='Winner'
                    score={winner.score}
                    profile={winner.profile}
                    />

                <Player
                    label='Loser'
                    score={loser.score}
                    profile={loser.profile}                
                    />
            </div>
        );
    }
}

module.exports = Result;