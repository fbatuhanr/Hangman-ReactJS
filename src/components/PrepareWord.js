import React from 'react'

export const PrepareWord = ({countryName, userAnswers}) => {

    //console.log("PrepareWord, countryName: " + countryName );

    const letterUnderScores = [];

    //console.log("+: ", userAnswers);
    for (let i in countryName) {

       letterUnderScores.push(
            <div className={countryName.length > 10 ? "col-1" : "col-2"} style={{minHeight: '50px'}}>
                <div className={"p-1 "+(!(/^ *$/.test(countryName[i])) ? "border-bottom" : null)}>
                    <span>
                    &nbsp;
                    {
                        userAnswers && userAnswers.map(answer => 
                            answer.indices.map(inx => 
                                (i == inx) ? answer.key : null
                            )
                        )
                    }
                    &nbsp;
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="row text-center justify-content-center">
            <div className="col-8">
                {/* countryName */}
                <h4>{countryName.length}-Letter Country</h4>
                <div className="row">
                    { letterUnderScores }
                </div>
            </div>
        </div>
    )
}

export default PrepareWord;