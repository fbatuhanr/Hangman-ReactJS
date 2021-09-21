import React from 'react'

export const PrepareWord = ({countryName}) => {

    console.log("PrepareWord, countryName: " + countryName );

    const letterUnderScores = [];

    for (let i = 0; i < countryName.length; i++) {

       letterUnderScores.push(
            <div className="col-sm-1 col-md-2">
                <div className={"p-1 "+(!(/^ *$/.test(countryName[i])) ? "border-bottom" : null)}>&nbsp;</div>
            </div>
        );
    }

    return (
        <div>
            ({countryName}&nbsp;
            {countryName.length})
            <div className="row justify-content-center text-center">
                { letterUnderScores }
            </div>
        </div>
    )
}

export default PrepareWord;