import React from 'react'

export const PrepareWord = ({countryName, userAnswers}) => {

    //console.log("PrepareWord, countryName: " + countryName );


    //console.log("+: ", userAnswers);


    const checkLetterInxIsCorrect = (thisInx) => userAnswers.some(answ => answ.indices.some(ans => ans == thisInx));
    const checkLetterIsEmpty = (thisLetter) => !(/^ *$/.test(thisLetter)) ? true : false;
    const countWords = (thisStr) => {
        thisStr = thisStr.replace(/(^\s*)|(\s*$)/gi,"");
        thisStr = thisStr.replace(/[ ]{2,}/gi," ");
        thisStr = thisStr.replace(/\n /,"\n");
        return thisStr.split(' ').length;
    }

    const letterUnderScores = [];
    for (let letterInx in countryName) {

        if( checkLetterIsEmpty(countryName[letterInx]) ) {
            letterUnderScores.push(
                <div 
                    className={(countryName.length > 6 ? "col-1" : "col-2") + " mb-1"} 
                    style={{minHeight: '50px'}}
                >
                    <div className={"p-1 "+ 
                        (checkLetterInxIsCorrect(letterInx) 
                        ? "border-bottom border-3 border-success fw-bold" 
                        : "border border-2 border-black rounded-1")}>
                            <span>
                            &nbsp;
                            {
                                userAnswers && userAnswers.map(answer => 
                                    answer.indices.map(inx => 
                                        (letterInx == inx) ? answer.key : null 
                                    )
                                )
                            }
                            &nbsp;
                            </span>
                    </div>
                </div>
            )
        } 
        else {
            letterUnderScores.push(
                <div className="newline"></div>
            )
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-8">
                <span style={{opacity:0.1}}>{ countryName }</span>
                <div className="row justify-content-center">
                    <div className="col-2">
                        <p className="m-0 fs-4"><span className="fs-2 text-info">{countWords(countryName)}</span>-Word</p>
                        <p className="fs-4"><span className="fs-2 text-info">{countryName.length}</span>-Letter</p>
                    </div>
                    <div className="col-2">
                        <p className="m-0 text-right fs-2 pt-3 text-primary">Country</p>
                    </div>
                </div>
                <div className="row justify-content-center fs-4 text-center">
                    { letterUnderScores }
                </div>
            </div>
        </div>
    )
}

export default PrepareWord;