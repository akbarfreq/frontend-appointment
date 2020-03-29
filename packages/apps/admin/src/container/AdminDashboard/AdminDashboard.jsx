import React, {memo} from 'react'
import {Col, Container, Row, Form} from 'react-bootstrap'
import HospitalDropdown from './HospitalDropdown'
import RevenueStatistics from './RevenueStatistics'
import RevenueTrend from './RevenueTrend'
import PatientStatistics from './PatientStatistics'
import AppointmentStatistics from './AppointmentStatistics'
import AdminDashboardHoc from './AdminDashboardHoc'
import AppointmentQueue from './AppointmentQueue'
import DoctorRevenueList from './DoctorRevenueList'
import {checkDashboardRole} from '@frontend-appointment/helpers'
import {CHybridSelect} from '@frontend-appointment/ui-elements'
const AdminDashboard = props => {
  const AdminDash = AdminDashboardHoc(
    memo(
      ({
        generateRevenue,
        revenueStatistics,
        registeredPatients,
        hospitalDropdown,
        hospitalId,
        handleHospitalChange,
        onPillsClickHandler,
        appointmentList,
        revenueFilter,
        appointmentFilter,
        appointmentQueue,
        doctorRevenue,
        specializationListHospitalWise
      }) => (
        <div className="dashboard-wrapper">
          <Container fluid className="">
            <Row className="">
              <Col className="px-0">
                {checkDashboardRole(generateRevenue.code) ? (
                  <div className="revenue-title-box">
                    <div className="fiscal">
                      Fiscal Year{' '}
                      {generateRevenue &&
                      generateRevenue.revenueGeneratedDayData &&
                      generateRevenue.revenueGeneratedDayData.fiscalYear
                        ? generateRevenue.revenueGeneratedDayData.fiscalYear.split(
                            '/'
                          )[0]
                        : ''}
                      <span className="slash">/</span>
                      {generateRevenue &&
                      generateRevenue.revenueGeneratedDayData &&
                      generateRevenue.revenueGeneratedDayData.fiscalYear
                        ? generateRevenue.revenueGeneratedDayData.fiscalYear.split(
                            '/'
                          )[1]
                        : ''}
                    </div>
                    <h5 className="title">Revenue Statistics</h5>
                  </div>
                ) : null}
              </Col>
              <HospitalDropdown
                hospitalDropdown={hospitalDropdown}
                hospitalId={hospitalId}
                handleHospitalChange={handleHospitalChange}
                className="top-hospital-list"
              />
            </Row>

            <Row>
            {checkDashboardRole(generateRevenue.code) ? (
              <RevenueStatistics generateRevenue={generateRevenue} />
            ) : null}
          </Row>
            <Row className="mt-1">
           
                {checkDashboardRole(revenueStatistics.code) ? (
                   <Col md={6} className="p-0">
                  <RevenueTrend
                    revenueStatistics={revenueStatistics}
                    onPillsClickHandler={onPillsClickHandler}
                    revenueFilter={revenueFilter}
                  />
                  </Col>
                ) : null}


                {checkDashboardRole(doctorRevenue.code) ? (
                  <Col md={6} className="pr-0">
                  <DoctorRevenueList doctorRevenue={doctorRevenue} />
                  </Col>
                ) : null}
           </Row>

           <Row className="mt-1">

              {checkDashboardRole(appointmentQueue.code) ? (
                  <Col md={6} className="p-0">
                  <AppointmentQueue
                    appointmentQueue={appointmentQueue}
                    hospitalId={hospitalId}
                  />
                  </Col>
                ) : null}

              <Col  md={6} className="pr-0">
                {checkDashboardRole(registeredPatients.code) ? (
                    
                  <PatientStatistics registeredPatients={registeredPatients} />
                  
                ) : null}

                {checkDashboardRole(appointmentList.code) ? (
                  
                  <AppointmentStatistics
                    onPillsClickHandler={onPillsClickHandler}
                    type="appointment"
                    appointmentList={appointmentList}
                    appointmentFilter={appointmentFilter}
                  />
                
                ) : null}
                  </Col>
              </Row>
            
        

            {/* <Row>
              <Col>
              <DoctorRevenueList doctorRevenue={doctorRevenue}/>
              </Col>
            </Row> */}
          </Container>
        </div>
      )
    ),
    props,
    ''
  )

  return <AdminDash />
}

export default memo(AdminDashboard)
