import React, { Component } from 'react'

class PrepareWord extends Component {


    getValidCountries = (countries) => {
        return countries.filter(c => /^[A-Za-z ]+$/.test(c) && !c.includes('(') && !c.includes(')') && !c.includes('-'));
    }
    getRandomCountry = (countries) => {
        return countries[Math.floor(Math.random()*countries.length)];
    }

    render() {

        let customVal = ["Côte d'Ivoire", "Afghanistan", "United States )", "Åland Islands", "Albania", "Bolivia (Plurinational State of)"];

        const country = this.getRandomCountry( this.getValidCountries(this.props.countryNames) );

        console.log(country);
    
        const letterUnderScores = [];
    
        for (let i = 0; i < country.length; i++) {

           letterUnderScores.push(
                <div className="col-2">
                    <div className={"p-1 "+(!(/^ *$/.test(country[i])) ? "border-bottom" : null)}>&nbsp;</div>
                </div>
            );
        }

        return (
            <div>
                {country}&nbsp;
                {country.length}
                <div className="row justify-content-center text-center">
                    { letterUnderScores }
                </div>
            </div>
        )
    }
}

export default PrepareWord;