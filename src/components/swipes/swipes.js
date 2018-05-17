import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import Pagination from '../pagination/pagination'
import './swipes.css'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

class Swipes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0
        }
    }

    handleChangeIndex = index => {
        this.setState({
            index
        });
    }

    handleClick = (url) => {
        window.location.href = url;
    }

    render() {
        const { index } = this.state;
        const len = this.props.swipes.length;
        const swipes = this.props.swipes;

        return (
            <div className="swipes">
                {
                    len &&
                    <AutoPlaySwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
                        {
                            swipes.map((swipe, i) => {
                                return <img alt="swipe" key={i} className="swipe" onClick={(e) => {this.handleClick(swipe.H5RedirectUrl)}} src={swipe.fileResourseUrl}/>
                            })
                        }
                    </AutoPlaySwipeableViews>
                }

                <Pagination dots={len} index={index} onChangeIndex={this.handleChangeIndex} />
            </div>
        )
    }
}


export default Swipes;
