import React from 'react'
import './header.css'

const Header = ({ title, client }) => {

    const handleBack = () => {
        window.history.back();
    }

    return (
        <React.Fragment>
            {
                client === 'h5' &&
                <div className="header">
                    <img alt="back" className="h_back" src={require("../../img/arrowLeft.png")} onClick={handleBack} />
                    <span className="h_title">{title}</span>
                </div>
            }
        </React.Fragment>
    )
}

export default Header;
