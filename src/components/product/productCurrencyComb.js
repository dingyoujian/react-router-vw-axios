import React from 'react'
import './product.css'
import FontsColor from '../../renderProps/fonts/fontsColor'
import RiskLevel from '../../renderProps/riskLevel/riskLevel'

const ProductCurrencyComb = ({title, rate, desc, remark, riskLevel, riskName, handleClick}) => {
    const fofRisk = {
        "01": {
            level: '3'
        },
        "02": {
            level: '4'
        },
        "03": {
            level: '2'
        },
        "04": {
            level: '5'
        },
        "05": {
            level: '1'
        }
    }

    return (
        <div className="productCurrencyComb" onClick={handleClick}>
            <div className="p_title">{title}
                <RiskLevel riskLevel={riskLevel && fofRisk[riskLevel].level} render={
                    risk => (
                        <span className="p_risk" style={risk && risk.style}>{riskName}</span>
                    )
                }></RiskLevel>
            </div>
            <FontsColor value={rate} render={
                rate => (
                    <div className="p_rate" style={rate.fontstyle}>{rate.value}
                        <span>{'%'}</span>
                        <span className="p_desc">{desc}</span>
                    </div>
                )
            }></FontsColor>
            <div className="p_remark">{remark}</div>
        </div>
    )
}

export default ProductCurrencyComb;
