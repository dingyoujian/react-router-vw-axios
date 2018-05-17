import React from 'react'
import './product.css'
import FontsColor from '../../renderProps/fonts/fontsColor';

const ProductTypeTwo = ({title, rate, desc, remark}) => {

    return (
        <div className="productTypeTwo">
            <div className="p_left">
                <div className="p_title">{title}</div>
                <div className="p_remark">{remark}</div>
            </div>
            <div className="p_right">
                <FontsColor value={rate} render={
                    rate => (
                        <div className="p_rate" style={rate.fontstyle}>{rate.value}
                            <span>{desc === '万份收益' ? '' : '%'}</span>
                        </div>
                    )
                }>
                </FontsColor>
                <div className="p_desc">{desc}</div>
            </div>
        </div>
    )
}

export default ProductTypeTwo;
