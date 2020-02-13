import React, {memo} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import HospitalDropdown from './HospitalDropdown'
import RevenueStatistics from './RevenueStatistics'
import RevenueTrend from './RevenueTrend'
import PatientStatistics from './PatientStatistics'
import AppointmentStatistics from './AppointmentStatistics'
import AdminDashboardHoc from './AdminDashboardHoc'
const AdminDashboard = props => {
  const AdminDash = AdminDashboardHoc(
    ({generateRevenue, revenueStatistics}) => (
      <div className="dashboard-wrapper">
        <Container fluid className="">
          <Row className="">
            <Col className="px-0">
              <div className="revenue-title-box">
                <div className="fiscal">
                  F<span className="slash">/</span>Y 2019
                  <span className="slash">/</span>2020
                </div>
                <h5 className="title">Revenue Statistics</h5>
              </div>
            </Col>
            <HospitalDropdown />
          </Row>
          <RevenueStatistics generateRevenue={generateRevenue} />

          <Row className="mt-1">
            <RevenueTrend revenueStatistics={revenueStatistics} />

            <Col lg={5} className="pr-0">
              <PatientStatistics />
              <AppointmentStatistics />
            </Col>
          </Row>
        </Container>
      </div>
    ),
    props,
    ''
  )

  return <AdminDash />
}

export default memo(AdminDashboard)
