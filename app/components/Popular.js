var React = require('react');
var PropTypes = require('prop-types');

//Stateless React Component
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

SelectedLanguage.PropTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelectLang: PropTypes.func.isRequired
}

class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All'
        },
            this.updateLanguage = this.updateLanguage.bind(this);
    }
    updateLanguage(lang) {
        this.setState(() => {
            return {
                selectedLanguage: lang
            }
        })
    }
    render() {

        return (
            <div>
                <SelectedLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelectLang={this.updateLanguage} />
            </div>
        );
    }
}

module.exports = Popular;