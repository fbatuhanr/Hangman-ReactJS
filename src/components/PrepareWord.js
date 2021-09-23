import React from 'react'

export const PrepareWord = ({countryName, userAnswers}) => {

    //console.log("PrepareWord, countryName: " + countryName );

    const letterUnderScores = [];

    //console.log("+: ", userAnswers);
    for (let i = 0; i < countryName.length; i++) {

       letterUnderScores.push(
            <div className="col-sm-1 col-md-2">
                <div className={"p-1 "+(!(/^ *$/.test(countryName[i])) ? "border-bottom" : null)}>
                    {
                        userAnswers && userAnswers.map(answer => 
                            answer.map(ind => 
                                ind.indices.map(inx => 
                                    (i == inx) ? ind.key : null      
                                )
                            )
                        )
                    }
                </div>
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