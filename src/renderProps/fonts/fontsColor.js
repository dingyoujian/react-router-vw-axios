import React from 'react'
import './fontsColor.css'

class FontsColor extends React.Component {
    
  render() {
      let {value} = this.props;
      let fontstyle = "";

      if (value > 0) {
          fontstyle = {color:"#fd7753"};
      } else if (value < 0) {
          fontstyle = {color:"#3fb17f"};
      } else {
          fontstyle = {color:"#434343"};
      }

      return (
          <React.Fragment>
              {
                  this.props.render({
                      value: value,
                      fontstyle: fontstyle
                  })
              }
          </React.Fragment>
      );
  }
}

export default FontsColor;
