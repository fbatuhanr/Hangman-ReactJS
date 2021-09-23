import React from 'react'

const UserHealth = ({userHealth}) => {

    const heartIcon = <svg style={{marginTop: '-15px'}} fill="#f00" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"/></svg>;

    return (
        <div className="row">
            <div className="col-2 mt-1">
                <span>{heartIcon} </span>
                <span className="fs-1">{userHealth}</span>
            </div>
        </div>
    )
}
export default UserHealth;