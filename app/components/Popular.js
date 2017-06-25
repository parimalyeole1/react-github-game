var React = require('react');
var PropTypes = require('prop-types');
var api = require('./../utils/api');
var Loading = require('./Loading');

//Stateless React Component
//#01
function SelectedLanguage(props) {
    var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
        <ul className="languages">
            {languages.map(lang => {
                return (
                    <li
                        style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
                        key={lang}
                        onClick={props.onSelectLang.bind(null, lang)}>
                        {lang}
                    </li>
                );
            })
            }
        </ul>
    );
}

SelectedLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelectLang: PropTypes.func.isRequired
}

//#02
function RepoGrids(props) {
    return (
        <ul className="popular-list">
            {props.repos.map((repo,index) => {
                return (
                    <li key={repo.name} className="popular-item">
                       <div className="popular-rank">#{index + 1}</div>
                       <ul className="space-list-items">
                            <li>
                                <img className="avatar"
                                src={repo.owner.avatar_url} 
                                alt={"avatar for" + repo.owner.login}/>
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} star</li>
                       </ul>
                    </li>
                );
            })
            }
        </ul>
    );
}

RepoGrids.propTypes = {
    repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    //life cycleevent
    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    // 
    updateLanguage(lang) {
        this.setState(() => {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });

        api.fetchPopularRepos(lang)
            .then(function (repos) {
                console.log("repos", repos);
                this.setState(function () {
                    return {
                        repos: repos
                    }
                });
            }.bind(this));
            // this inside then was diff so we bind this

    }
    render() {

        return (
            <div>
                <SelectedLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelectLang={this.updateLanguage} />
                { !this.state.repos
                  ? <Loading />
                  : <RepoGrids repos={this.state.repos}/>
                 }
                
            </div>
        );
    }
}
// Debuging line <pre>{JSON.stringify(this.state.repos,null,2)}</pre>
module.exports = Popular;