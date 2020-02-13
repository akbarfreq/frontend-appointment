import React, {memo} from 'react'
import {
  Image,
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Form
} from 'react-bootstrap'
import {CDateButtonPills} from '@frontend-appointment/ui-components';
import {CLineChart} from '@frontend-appointment/ui-elements';
const RevenueTrend = props => {
  const {
    isRevenueStatsLoading,
    revenueStatsData,
    revenueStatsErrorMessage,
    fromDate,
    toDate
  }=props.revenueStatistics;
  let newLineData=[],newRevenueStatsData=[];
  const changeObjectToArray = (lineData) => {

     Object.keys(lineData).map(line => {
      newLineData.push(lineData[line]);
    })
    console.log(newLineData)
    return newLineData;
  }
  newLineData =[...changeObjectToArray(revenueStatsData)];
  console.log(revenueStatsData);
  newRevenueStatsData=Object.keys(revenueStatsData)?Object.keys(revenueStatsData):{}
  return (
    <Col lg={7}>
      <Row>
        <h5 className="title">Revenue Trend</h5>
      </Row>
      <Row>
        <div className="chart">
          <Row>
           <CDateButtonPills/>
            <Col xs={12} md={4} className="p-0">
              <Col className="date">
                <div>
                  {/* <span>From :</span>{fromDate} */}
                </div>
                <div>
                  {/* <span>To :</span> {toDate} */}
                </div>
              </Col>
            </Col>
          </Row>

          <Row>
           <CLineChart lineData={newLineData} labels={newRevenueStatsData?newRevenueStatsData:[]} width={600} height={350}/>
          </Row>
        </div>
      </Row>
    </Col>
  )
}
export default memo(RevenueTrend)
