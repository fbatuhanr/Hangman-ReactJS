import React, {Component} from 'react';
import axios from 'axios';

import PrepareFlag from './components/PrepareFlag';
import PrepareWord from './components/PrepareWord';

class Hangman extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedCountry : null,
            errorMsg: null
        };

        this.keypressFunc = this.keypressFunc.bind(this);
    }
    keypressFunc(e){
        let eventKey = (e.key).toUpperCase();
        console.log(eventKey)

        let selectedCountryName = this.state.selectedCountry.name;
        
        if(selectedCountryName.includes(eventKey)){

            var indices = [];
            var idx = selectedCountryName.indexOf(eventKey);
            while (idx != -1) {
            indices.push(idx);
            idx = selectedCountryName.indexOf(eventKey, idx + 1);
            }
            console.log(indices);
        }
    }
    componentDidMount() {
        console.log("here");
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            //console.log(response.data);
            const thisCountry = this.getRandomCountry( this.getValidCountries( response.data ) );
            this.setState({ selectedCountry: thisCountry.toUpperCase() });
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
        const { selectedCountry, errorMsg } = this.state;

       // console.log(selectedCountry);
        return (
            <div className="row">
                { selectedCountry && <PrepareFlag flag={selectedCountry.flag} /> }
                { selectedCountry && <PrepareWord countryName={selectedCountry.name} /> }
            </div>
        )
    }
}

export default Hangman;