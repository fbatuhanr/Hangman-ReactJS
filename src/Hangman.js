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

        this.keyboardPress = this.keyboardPress.bind(this);
    }
    keyboardPress(event){

        let eventKey = (event.key).toUpperCase();
        let selectedCountryName = this.state.selectedCountry.name.toUpperCase();
        
        if(selectedCountryName.includes(eventKey)){

            let userAnswersState = [...this.state.userAnswers];
            let keyIsExistInState = userAnswersState.some(answ => answ.key == eventKey);

            if(!keyIsExistInState){

                // key exist in word and not exist in state

                let keyIndices = [];
                    let keyIndex = selectedCountryName.indexOf(eventKey);
                    while (keyIndex != -1) {
                        keyIndices.push(keyIndex);
                        keyIndex = selectedCountryName.indexOf(eventKey, keyIndex+1);
                    }

                this.setState(previousState => ({
                    userAnswers: [...previousState.userAnswers, {key: eventKey, indices: keyIndices}]
                }));

                keyIsExistInState = true;
            }
            else {

                // key exist in word but exist in state

                
            }
            
            this.checkWin();
        }
        else { 
            // key not exist in word!

        }
    }

    fetchData = () => {
        //axios.get('https://restcountries.eu/rest/v2/all')
        return axios.get('https://raw.githubusercontent.com/fbatuhanr/Hangman-ReactJS/main/api/restcountries.json')
        .then(({data}) => {
            //console.log(response.data);
            return data;
        })
        .catch(error => {
            //console.error('There was an error!', error);
            // this.setState({ errorMsg: error });
        });
    }

    componentDidMount() {
        
        this.fetchData().then(response => {

            const thisCountry = this.getRandomCountry( this.getValidCountries( response ) );
            this.setState({ selectedCountry: thisCountry });
        });
        
        document.addEventListener("keydown", this.keyboardPress, false);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.keyboardPress, false);
    }

    checkWin = () => {

        let total = 0;

        console.log(this.state.userAnswers);
        this.state.userAnswers.map(answer => total += answer.indices.length)
        if(this.state.selectedCountry.name.toUpperCase().replace(/\s/g, "").length == total)
        alert("finished!")
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
            <div className="hangman">
                { selectedCountry && <PrepareFlag flag={selectedCountry.flag} /> }
                { selectedCountry && <PrepareWord countryName={selectedCountry.name} userAnswers={userAnswers} /> }
            </div>
        )
    }
}

export default Hangman;