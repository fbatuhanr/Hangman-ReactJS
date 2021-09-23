import React from 'react'

const Incorrect = ({incorrectLetters}) => {

    return (
        <div className="row justify-content-center mt-2 mb-3">
            <div className="col-4">
                <div className="row text-center fw-bolder fst-italic">
                {
                    incorrectLetters.map((incLetter) => 
                        <div className="col-2">
                            <div className="p-1 border-bottom border-3 border-danger">
                                {incLetter}
                            </div>
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default Incorrect;