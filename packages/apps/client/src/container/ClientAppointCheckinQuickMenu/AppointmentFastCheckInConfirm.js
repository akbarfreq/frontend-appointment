import React from 'react'
import {CCopyToClipboard, CForm, CModal} from '@frontend-appointment/ui-elements'
import {Button, Row} from 'react-bootstrap'

const AppointmentFastCheckInConfirm = ({
                                           showModal,
                                           modalHeader,
                                           setShowModal,
                                           appointmentDetails
                                       }) => {

    const bodyContent = <>
        <Container-fluid>
            <CForm id ="quick-checkin" className="mt-2">
                <Container-fluid>
                    <Row className="clip">

                        <Button variant="secondary"
                                size="lg"
                                name=""
                            // onClickHandler={e =>
                            //     onClick(e, props.node.data.id || props.node.data, 'C')
                            // }
                        >
                            <i className="fa fa-print"/>&nbsp;Print
                        </Button>
                        &nbsp;&nbsp;

                        <CCopyToClipboard

                            id={"appointmentNumber"}
                            textToCopy={appointmentDetails.appointmentNumber}
                            children={
                                <button className="btn btn-primary btn-lg"><i className="fa fa-copy"/>&nbsp;Copy Appt. Number
                                </button>
                            }
                        />
                    </Row>
                </Container-fluid>
            </CForm>
        </Container-fluid>
    </>
    return (
        <>
            <CModal
                id={"confirm-quick-checkin"}
                show={showModal}
                // modalHeading={modalHeader}
                size="lg"
                modalHeading="Appointment Checked-In Successfully"
                bodyChildren={bodyContent}
                // footerChildren={footer}
                onHide={setShowModal}
                dialogClassName="cogent-modal"
            />
        </>
    )
}

export default AppointmentFastCheckInConfirm
