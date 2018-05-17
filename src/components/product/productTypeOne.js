import React from 'react'
import './product.css'
import FontsColor from '../../renderProps/fonts/fontsColor';

const ProductTypeOne = ({title, rate, desc, remark}) => {

    return (
        <div className="productTypeOne">
            <div className="p_left">
                <FontsColor value={rate} render={
                    rate => (
                        <div className="p_rate" style={rate.fontstyle}>{rate.value}
                            <span>{'%'}</span>
                        </div>
                    )
                }>
                </FontsColor>
                <div className="p_desc">{desc}</div>
            </div>
            <div className="p_right">
                <div className="p_title">{title}</div>
                <div className="p_remark">{remark}</div>
            </div>
        </div>
    )
}

export default ProductTypeOne;
