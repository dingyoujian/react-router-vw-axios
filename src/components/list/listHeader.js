import React from 'react'
import './list.css'

const ListHeader = ({titles, currentType, onTypeChange}) => {

    const handleChangeType = (title_type) => {
        if (title_type === currentType) {
            return false;
        }

        onTypeChange(title_type);
    }
    return (
        <div className="listHeader">
            {
                titles.length && titles.map((title, i) => {
                    return <div onClick={(e) => {handleChangeType(title.type)}} key={i} className="l_title"><span className={'l_title_content ' + (currentType === title.type ? "l_current" : '')}>{title.title}</span></div>
                })
            }
        </div>
    )
}

export default ListHeader;
