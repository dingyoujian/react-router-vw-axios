import React from 'react'
import './product.css'

const ProductThreeLayers = ({title, rate, desc}) => {

    return (
        <div className="productThreeLayers">
            <div className="p_title">{title}</div>
            <div className="p_rate">{rate}
                <span>{'%'}</span>
            </div>
            <div className="p_desc">{desc}</div>
        </div>
    )
}

export default ProductThreeLayers;
