import React from 'react';

import {Button, Col, Container, OverlayTrigger, Row, Tooltip, Badge} from "react-bootstrap";
import {CLoading, CButton} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';

import "./appointment-status.scss";
import {appointmentStatusList} from "@frontend-appointment/helpers";

const TIME_SLOT_EMPTY_ERROR_MESSAGE = "APPOINTMENTS NOT AVAILABLE";
const DAY_OFF_MESSAGE = "DAY OFF";

const AppointmentStatusDetails = ({statusDetailsData}) => {
    const {
        appointmentStatusDetails,
        doctorInfoList,
        errorMessageForStatusDetails,
        searchErrorMessage,
        isStatusListLoading,
        filterAppointmentDetailsByStatus,
        activeStatus,
        getPatientDetails,
        selectedPatientData,
        handleCheckIn
    } = statusDetailsData;
    return <>
        <div className="manage-details">
            <Container fluid>
                {!isStatusListLoading && !searchErrorMessage &&
                appointmentStatusDetails.length ?
                    <Row>
                        <Col className="p-0"><h5 className="title">Appointment Status Details</h5></Col>

                        <Col>
                            <div className="appointment-badge float-right">
                                {
                                    appointmentStatusList.map(appointmentStatus => (
                                        <div>
                                            <Badge variant={appointmentStatus.variant}>&nbsp;</Badge>
                                            <a href=""
                                               className={activeStatus === appointmentStatus.value ? "active" : ''}
                                               onClick={(event) => filterAppointmentDetailsByStatus(appointmentStatus.value, event)}>
                                                {appointmentStatus.label}
                                            </a>
                                        </div>
                                    ))
                                }
                            </div>
                        </Col>
                    </Row>
                    : ''
                }
                {!isStatusListLoading && !searchErrorMessage && appointmentStatusDetails.length ?
                    appointmentStatusDetails.map((appointmentStatusDetail, index) => (
                        <Row className="appointment-status-list" key={"detail-" + index}>

                            <Col md={2} className="d-flex  flex-column justify-content-start">
                                <h5 className="title">Doctor Details</h5>
                                <div className="doctor-image">
                                    {doctorInfoList.map(doctorData => (
                                        doctorData.value === appointmentStatusDetail.doctorId ?
                                            <img
                                                src={doctorData.fileUri}
                                                alt={"DOCTOR"}/> : ''
                                    ))}
                                    {/*<img src={""}/>*/}
                                </div>
                                <p className="doctor-details">
                                    <span>{appointmentStatusDetail.doctorName}</span>
                                    <br></br>{appointmentStatusDetail.specializationName}
                                </p>
                            </Col>


                            <Col sm={12} md={8} lg={8} className="time-container">
                                <h5 className="title">Appointment Slots</h5><br></br>
                                <p className="doctor-details">
                                    {appointmentStatusDetail.date} {appointmentStatusDetail.weekDayName}&nbsp;[
                                    {appointmentStatusDetail.doctorTimeSlots[0].appointmentTime} -&nbsp;
                                    {appointmentStatusDetail.doctorTimeSlots[
                                    appointmentStatusDetail.doctorTimeSlots.length - 1].appointmentTime}]
                                </p>
                                <ul>
                                    {appointmentStatusDetail.doctorTimeSlots ?
                                        (appointmentStatusDetail.doctorTimeSlots.length ?
                                                appointmentStatusDetail.doctorTimeSlots.map((timeSlot, index) => (
                                                    <li key={'timeSlot-' + index}>
                                                        {['PA', 'A', 'C'].indexOf(timeSlot.status) >= 0 ?
                                                            <OverlayTrigger
                                                                placement='top'
                                                                overlay={
                                                                    <Tooltip id={timeSlot.status + "-" + index}>
                                                                        App no: {timeSlot.appointmentNumber}<br>
                                                                    </br>
                                                                        {timeSlot.patientName} ({timeSlot.age} / {timeSlot.gender})<br>
                                                                    </br>
                                                                        Mobile No: {timeSlot.mobileNumber || 'N/A'}
                                                                    </Tooltip>
                                                                }>
                                                                <Button
                                                                    onClick={() => getPatientDetails(timeSlot,
                                                                        appointmentStatusDetail.date)}
                                                                    variant={timeSlot.status === 'PA' ? 'primary'
                                                                        : timeSlot.status === 'A' ? 'danger'
                                                                            : timeSlot.status === 'C' ? 'dark'
                                                                                : 'info'}
                                                                    size="lg block">
                                                                    {timeSlot.appointmentTime}
                                                                </Button>
                                                            </OverlayTrigger> :
                                                            (timeSlot.status === 'V') ?
                                                                (<CButton
                                                                    variant={"success"}
                                                                    size="lg"
                                                                    id="vacant"
                                                                    name=""
                                                                >
                                                                    {timeSlot.appointmentTime}
                                                                </CButton>)
                                                                : ''
                                                        }
                                                    </li>
                                                ))

                                                : appointmentStatusDetail.dayOffStatus === 'Y' ?
                                                    <div className="day-off"><i
                                                        className='fa  fa-calendar-times-o'/>{DAY_OFF_MESSAGE}</div>
                                                    : TIME_SLOT_EMPTY_ERROR_MESSAGE
                                        ) : appointmentStatusDetail.dayOffStatus === 'Y' ? <div className="day-off"><i
                                                className='fa fa-calendar-times-o'/>{DAY_OFF_MESSAGE}</div>
                                            : TIME_SLOT_EMPTY_ERROR_MESSAGE
                                    }
                                </ul>
                            </Col>
                            {
                                Object.keys(selectedPatientData).length !== 0 && selectedPatientData.constructor === Object ?
                                    <Col sm={12} md={2} lg={2}>
                                        <h5 className="title">Patients Details</h5><br/>
                                        <p className="patient-details">
                                            <i className="fa fa-adn"/> {selectedPatientData.appointmentNumber}<br/>
                                            <i className="fa fa-user-o"/>{selectedPatientData.patientName}<br/>
                                            <i className="fa fa-phone"/> {selectedPatientData.mobileNumber}<br/>
                                            <i className="fa fa-home"/> {selectedPatientData.address}<br/>
                                            <CButton
                                                name=""
                                                vairant="primary "
                                                size="sm"
                                                className="btn-checkin"
                                                disabled={!selectedPatientData.canCheckIn}
                                                onClickHandler={() => handleCheckIn(selectedPatientData.appointmentId)}
                                            >
                                                <i className="fa fa-sign-in"/>Check-in
                                            </CButton>
                                        </p>
                                    </Col> :
                                    ''
                            }
                        </Row>
                    ))
                    :
                    <>
                        {((!isStatusListLoading && errorMessageForStatusDetails) ?
                            (
                                <Row>
                                    <Col>
                                        <div className="filter-message">
                                            <div className="no-data ">
                                                <i className="fa fa-hand-o-up"/>
                                            </div>
                                            <div
                                                className="message text-center">{errorMessageForStatusDetails}</div>
                                        </div>
                                    </Col>
                                </Row>
                            ) :
                            (!isStatusListLoading && searchErrorMessage) ?
                                (
                                    <Row>
                                        <Col>
                                            <div className="filter-message">
                                                <div className="no-data primary">
                                                    <i className="fa fa-file-text-o"/>
                                                </div>
                                                <div className="message text-center">{searchErrorMessage}</div>
                                            </div>
                                        </Col>
                                    </Row>
                                ) :
                                <CLoading/>)}
                    </>
                }

            </Container>
        </div>
    </>;
};
export default AppointmentStatusDetails;
