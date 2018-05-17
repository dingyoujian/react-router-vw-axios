import React from 'react'
import './riskLevel.css'

class RiskLevel extends React.Component {

  render() {
      let {riskLevel} = this.props;
      const riskLevelObj = {
          "1" : {
              text: '高风险',
              style: {
                  color: "#fff",
                  background: '#fd7753'
              }
          },
          "2" : {
              text: '中风险',
              style: {
                  color: "#fff",
                  background: '#ff8809'
              }
          },
          "3" : {
              text: '低风险',
              style: {
                  color: "#fff",
                  background: '#6faaf4'
              }
          },
          "4" : {
              text: '中低风险',
              style: {
                  color: "#fff",
                  background: '#ff8809'
              }
          },
          "5" : {
              text: '中高风险',
              style: {
                  color: "#fff",
                  background: '#fd7753'
              }
          }
      };
      const current = riskLevelObj[riskLevel];

      return (
          <React.Fragment>
              {
                  this.props.render(current)
              }
          </React.Fragment>
      );
  }
}

export default RiskLevel;
