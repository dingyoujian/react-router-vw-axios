import React from 'react'
import './product.css'

const ProductHeader = ({ icon, title, subTitle, more }) => {

    return (
        <div className="productHeader">
            {
                icon && <img alt="icon" className="p_icon" src={icon}/>
            }
            <span className="p_title">{title}</span>
            {
                subTitle && <span className="p_sub">{subTitle}</span>
            }
            {
                more &&
                <div className="p_more" onClick={more}>
                    <span>更多</span>
                    <img alt="more" src={require("../../img/goRight.png")} />
                </div>
            }
        </div>
    )
}

export default ProductHeader;
