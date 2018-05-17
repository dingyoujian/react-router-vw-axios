import React from 'react'
import './pagination.css'

const Pagination = ({ dots, index, onChangeIndex }) => {

    const handleChangeIndex = (_event) => {
        const index = parseInt(_event.target.dataset.index, 10);
        onChangeIndex(index);
    }
    const views = (dots, index, onChangeIndex) => {
        const list = [];
        for (let i = 0; i < dots; i++) {
            list.push(<div key={i} className={'p '+ (i === index ? '': 'p_ncheck')} data-index={i} onClick={handleChangeIndex}></div>)
        }
        return list;
    }

    return (
        <div className="pagination">
            {views(dots, index, onChangeIndex)}
        </div>
    )
}


export default Pagination;
