import React from 'react'

const PrepareFlag = ({flag}) => {
    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <img src={flag} className="countryFlag w-100 rounded"/>
            </div>
        </div>
    )
}
export default PrepareFlag;