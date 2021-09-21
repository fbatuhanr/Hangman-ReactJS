import React, {Component} from 'react';
import axios from 'axios';

import PrepareFlag from './components/PrepareFlag';
import PrepareWord from './components/PrepareWord';

class Hangman extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedCountry : null,
            userAnswers: [],
            errorMsg: null
        };

        this.keypressFunc = this.keypressFunc.bind(this);
    }
    keypressFunc(e){
        let eventKey = (e.key).toUpperCase();
        console.log(eventKey)

        let selectedCountryName = this.state.selectedCountry.name.toUpperCase();
        
        if(selectedCountryName.includes(eventKey)){

            let userAnswersState = [...this.state.userAnswers];
            let keyIsExistInState = false;
            userAnswersState.map(answ => answ.map(ans => keyIsExistInState = ans.key == eventKey ? true : keyIsExistInState));

             if(!keyIsExistInState){

                let newUserAnswersState = [];
                
                let keyIndices = [];
                let keyIndex = selectedCountryName.indexOf(eventKey);
                while (keyIndex != -1) {
                    keyIndices.push(keyIndex);
                    keyIndex = selectedCountryName.indexOf(eventKey, keyIndex+1);
                }
                console.log(keyIndices);
                
                newUserAnswersState.push({ key: eventKey, indices: keyIndices });

                this.setState(previousState => ({
                    userAnswers: [...previousState.userAnswers, newUserAnswersState]
                }));
            }
        }
        else { 
        }
    }
    componentDidMount() {
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            //console.log(response.data);
            const thisCountry = this.getRandomCountry( this.getValidCountries( response.data ) );
            this.setState({ selectedCountry: thisCountry });
        })
        .catch(error => {
            //console.error('There was an error!', error);
            this.setState({ errorMsg: error });
        });
        
        document.addEventListener("keydown", this.keypressFunc, false);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.keypressFunc, false);
    }



   // let customVal = ["Côte d'Ivoire", "Afghanistan", "United States )", "Åland Islands", "Albania", "Bolivia (Plurinational State of)"];

    getValidCountries = (countries) => {
        return countries.filter(c => /^[A-Za-z ]+$/.test(c.name) && !c.name.includes('(') && !c.name.includes(')') && !c.name.includes('-'));
    }
    getRandomCountry = (countries) => {
        return countries[Math.floor(Math.random()*countries.length)];
    }

    render() {
        const { selectedCountry, userAnswers, errorMsg } = this.state;

        return (
            <div className="row">
                { selectedCountry && <PrepareFlag flag={selectedCountry.flag} /> }
                { selectedCountry && <PrepareWord countryName={selectedCountry.name} userAnswers={userAnswers} /> }
            </div>
        )
    }
}

export default Hangman;