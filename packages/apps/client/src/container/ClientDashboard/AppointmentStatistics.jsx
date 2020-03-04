import React, {memo} from 'react'
import {Row, Col} from 'react-bootstrap'
import {CDateButtonPills} from '@frontend-appointment/ui-components'
import {CLoading, CDoughnutChart} from '@frontend-appointment/ui-elements'
const AppointmentStatistics = props => {
  const {
    isAppointmentStatsLoading,
    appointmentStatsData,
    appointmentStatsErrorMessage,
    fromDate,
    toDate
  } = props.appointmentList
  let data = [],
    color = [],
    label = [],
    chartData = {}
  if (appointmentStatsData) {
    const {
      newPatient,
      registeredPatient,
      totalAppointment
    } = appointmentStatsData
    const newPatientPercent = (newPatient / totalAppointment).toFixed(2) * 100
    const registeredPatientPercent =
      (registeredPatient / totalAppointment).toFixed(2) * 100
    data.push(newPatientPercent)
    data.push(registeredPatientPercent)
    color.push('rgba(13, 97, 147, 0.2)')
    color.push('#0d6193')
    label.push('New Patients')
    label.push('Registered Patients')
    chartData = {
      datasets: [{data: [...data], backgroundColor: [...color]}],
      labels: [...label]
    }
  }
  return (
    <>
      <div className="appointment-box">
        {!isAppointmentStatsLoading && !appointmentStatsErrorMessage ? (
          <>
            {' '}
            <Row>
              <CDateButtonPills
                onPillsClickHandler={props.onPillsClickHandler}
                type={props.type}
                variant="outline-secondary"
                data={props.appointmentFilter}
              />
              <Col className="date">
                <div>
                  <span>From :</span> {new Date(fromDate.fromDate).toDateString()}
                 
                </div>
                <div>
                  <span>To :</span> {new Date(toDate.toDate).toDateString()}
                  
                </div>
              </Col>
            </Row>
            <Row>
              {/* <img
            src={require('./img/doughnut-chart.png')}
            className="doughnut-chart mx-auto"
          /> */}
         <div className="doughnut-chart">
              <CDoughnutChart chartData={chartData} width={200} height={200} />
              </div>
            </Row>
            <p>
              <br></br>
              {appointmentStatsData.totalAppointment}
            </p>
            <div className="title">Appointments</div>
            <hr></hr>
            <ul>
              <li>
                <span className="color-code code1">&nbsp;</span>
                <span>{appointmentStatsData.newPatient}</span>
                <br></br>New Patient
              </li>
              <li>
                <span className="color-code code2">&nbsp;</span>
                <span>{appointmentStatsData.registeredPatient}</span>
                <br></br>Registered Patient
              </li>
            </ul>
          </>
        ) : isAppointmentStatsLoading ? (
          <CLoading />
        ) : (
          <span>
            <p>{appointmentStatsErrorMessage}</p>
          </span>
        )}
      </div>
    </>
  )
}
export default memo(AppointmentStatistics)
