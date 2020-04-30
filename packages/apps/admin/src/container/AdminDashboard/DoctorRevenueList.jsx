import React, {memo} from 'react'
import {Row, Col, Form} from 'react-bootstrap'
import {
  CDataTable,
  CHybridSelect,
  CHybridInput,
  CLoading,
  CPagination
} from '@frontend-appointment/ui-elements'
import DoctorWithSpecializationAndImage from '../CommonComponents/table-components/DoctorWithSpecializationAndImage'
import {DoctorRevenueAppointmentAmount}  from '@frontend-appointment/commons'
import {DoctorRevenueNoOfAppointments}  from '@frontend-appointment/commons'
//import PatientWithMobileNumber from '../CommonComponents/table-components/PatientNameWithMobileNumber'
import {CEnglishDatePicker} from '@frontend-appointment/ui-components'
const DoctorRevenueList = props => {
  const {
    isDoctorRevenueLoading,
    doctorRevenueData,
    doctorRevenueErrorMessage,
    totalRecords,
    queryParams,
    handlePageChange,
    doctorId,
    handleDoctorChange,
    doctorDropdown,
    fromDate,
    toDate,
    handleDateChange,
    hospitalId,
    handleSpecializationChange,
    specializationId,
    specializationListHospitalWise,
    doctorTotalAppointments,
    doctorTotalRevenueAmount,
    doctorTotalFollowUp
  } = props.doctorRevenue
  return (
    <>

        <div className="doctor-revenue">
          <h5 className="title">Doctor Revenue</h5>
          <div className="app-log">
          {hospitalId.value  && hospitalId.value!=='A'? (
            <>
            <Row>
              <Col className="">
                <Form className="hospital-list float-left">
                  <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Col className="px-0">
                    <div className="hospital-list-input">
                      <CHybridSelect
                          name="specializationId"
                          placeholder="Select Specialization"
                          // label="Select Specialization"
                          onChange={handleSpecializationChange}
                          options={specializationListHospitalWise}
                          disabled={specializationListHospitalWise.length}
                          value={specializationId}
                        />
                      </div>
                      <div className="separator-doc">Or</div>
                      <div className="hospital-list-input">
                        <CHybridSelect
                          name="doctorId"
                          placeholder="Select Doctor"
                          onChange={handleDoctorChange}
                          options={doctorDropdown}
                          value={doctorId}
                        ></CHybridSelect>
                      </div>

                      </Col>

                  </Form.Group>
                </Form>
              </Col>

              <Col className="date">

                      <div className="">
                        <CEnglishDatePicker
                          id="from-date"
                          name="fromDate"
                          label="From Date"
                          dateFormat="yyyy-MM-dd"
                          showDisabledMonthNavigation={true}
                          selected={fromDate}
                          peekNextMonth={true}
                          showMonthDropdown={true}
                          showYearDropdown={true}
                          dropdownMode="select"
                          onKeyDown={event => this.handleEnter(event)}
                          onChange={date => handleDateChange(date, 'fromDate')}
                        />{' '}
                      <div className="separator-date">To</div>
                        <CEnglishDatePicker
                          id="to-date"
                          name="toDate"
                          label="To Date"
                          dateFormat="yyyy-MM-dd"
                          showDisabledMonthNavigation={true}
                          selected={toDate}
                          peekNextMonth={true}
                          showMonthDropdown={true}
                          showYearDropdown={true}
                          dropdownMode="select"
                          onChange={date => handleDateChange(date, 'toDate')}
                        />

                      </div>
                    </Col>


            </Row>


            <Row>
              <div className="app-queue-datatable">
                {!isDoctorRevenueLoading &&
                !doctorRevenueErrorMessage &&
                doctorRevenueData.length ? (
                  <>
                    <CDataTable
                      classes="ag-theme-balham"
                      id="roles-table"
                      width="100%"
                      height="360px"
                      enableSorting
                      editType
                      rowHeight={50}
                      columnDefs={[
                        {
                          headerName: 'Doctor Details',
                          resizable: true,
                          sortable: true,
                          sizeColumnsToFit: true,
                          cellRenderer: 'doctorwithSpecializationRenderer',
                          width:400,
                        },
                        {
                          headerName: 'No of Appt',
                          // field: 'totalAppointments',
                          resizable: true,
                          sortable: true,
                          sizeColumnsToFit: true,
                          cellRenderer : 'doctorRevenueNoOfAppointments',
                        },
                         {
                          headerName: 'No of Follow Up',
                          field: 'totalFollowUp',
                          resizable: true,
                          sortable: true,
                          sizeColumnsToFit: true,
                        },
                        {
                          headerName: 'Amount',
                          // field: 'totalRevenue',
                          resizable: true,
                          sortable: true,
                          sizeColumnsToFit: true,
                          cellRenderer : 'doctorRevenueAppointmentAmount'
                        }
                      ]}
                      frameworkComponents={{
                        doctorwithSpecializationRenderer: DoctorWithSpecializationAndImage,
                        doctorRevenueAppointmentAmount: DoctorRevenueAppointmentAmount,
                        doctorRevenueNoOfAppointments: DoctorRevenueNoOfAppointments
                      }}
                      defaultColDef={{resizable: true}}
                      rowSelection={'single'}
                      rowData={doctorRevenueData}
                      // rowModelType= "infinite"
                      // paginationPageSize={6}
                      // cacheOverflowSize={2}
                      // maxConcurrentDatasourceRequests={1}
                      // infiniteInitialRowCount={6}
                      // maxBlocksInCache={6}
                      // dataSource={()=>handlePageChange(queryParams.page++)}
                    />

            <Row>
              <Col className="">
              <div>
                  {/* <span>Date :</span> {fromDate.toDateString()} to{' '}
                  {toDate.toDateString()} */}
                  <span className="pull-left mt-3"> Total Appointment :<span className="rev-total"> {doctorTotalAppointments}</span></span>
                  <span className="pull-left mt-3"> Total Follow Up :<span className="rev-total"> {doctorTotalFollowUp}</span></span>
                  <span className="pull-right mt-3">Total Revenue Amount :<span className="rev-total"> Rs. {doctorTotalRevenueAmount} </span></span>
                </div>
              </Col></Row>

                    <CPagination
                      totalItems={totalRecords}
                      maxSize={queryParams.size}
                      currentPage={queryParams.page}
                      onPageChanged={handlePageChange}
                    />
                  </>
                ) : !isDoctorRevenueLoading && doctorRevenueErrorMessage ? (
                  <div className="filter-message">
                    <div className="no-data">
                      <i className="fa fa-file-text-o"></i>
                    </div>
                    <div className="message"> {doctorRevenueErrorMessage}</div>
                  </div>
                ) : (
                  <CLoading />
                )}
              </div>
            </Row>

          </>
          ) : (
            <div className="filter-message">
            <div className="no-data">
                <i className="fa fa-hand-o-up"></i>
            </div>
            <div className="message">Please select hosptial!.</div>
        </div>
            )}
         </div>
        </div>


    </>
  )
}
export default memo(DoctorRevenueList)
