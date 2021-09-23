import React from 'react'

const PrepareFlag = ({flag}) => {
    return (
        <div className="row justify-content-center mt-2 mb-2">
            <div className="col-4">
                <img src={flag} className="countryFlag w-100 rounded"/>
            </div>
        </div>
    )
}
export default PrepareFlag;