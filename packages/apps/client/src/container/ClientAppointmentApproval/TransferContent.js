import React from 'react'
import {
  CForm,
  CHybridInput,
  CHybridTextArea,
  CHybridSelect
} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'

const TransferContent = ({
  transferData,
  transferTime,
  transferDate,
 // appointmentTransferCharge,
  specializationList,
  doctorList,
  onChangeHandler
  //rejectRemarksHandler,
  //remarks
}) => {
  const {
   // appointmentId,
    //hospitalName,
    appointmentDate,
    appointmentNumber,
    appointmentTime,
    //esewaId,
    patientName,
    patientGender,
    patientAge,
   // patientDob,
    isRegistered,
    mobileNumber,
    doctorName,
    fileUri,
    remarks,
    // specializationName,
    // transactionNumber,
    appointmentAmount,
    // isSelf,
    // appointmentMode,
    // doctorId,
    // specializationId,
    // followUp,
    transferredSpecialization,
    transferredDoctor,
    transferredDate,
    transferredTime,
    transferredCharge,
  } = transferData
  const patientMetaInfo = patientName
    .concat(', ')
    .concat(patientAge + '/' + patientGender)
    .concat(',')
    .concat(isRegistered === 'N' ? 'Registered' : 'New')
    .concat(', ')
    .concat(mobileNumber)
  const doctorDetails = (
    <p>
      <img src={fileUri} alt="" />
      {doctorName}
    </p>
  )
  let optionsDate=[],optionsTime=[];
   optionsDate =transferDate.appointmentTransferDate && transferDate.appointmentTransferDate.map(tdate => ({value:tdate,label:tdate}))
   optionsTime = transferTime.appointmentTransferTime && transferTime.appointmentTransferTime.map(tTime =>({value:tTime,label:tTime}))
  return (
    <>
      <Container-fluid>
        <CForm id="refund-info" className="mt-2">
          <Container-fluid>
            <Row>
              {/*<Col sm={12} md={6} lg={6}>*/}
              {/*    <CHybridInput*/}
              {/*        id="clientName"*/}
              {/*        placeholder="Client Name"*/}
              {/*        value={transferData.hospitalName}*/}
              {/*        disabled={true}*/}
              {/*    />*/}
              {/*</Col>*/}
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="Appointment Number"
                  placeholder="Appointment Number"
                  value={appointmentNumber || 'N/A'}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridTextArea
                  id="patientMetaInfo"
                  placeholder="Patient Meta Info"
                  value={patientMetaInfo || 'N/A'}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                {doctorDetails}
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="date"
                  placeholder="Appointment Date"
                  value={appointmentDate || 'N/A'}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="date"
                  placeholder="Appointment Time"
                  value={appointmentTime || 'N/A'}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="date"
                  placeholder="Appointment Charge"
                  value={appointmentAmount || 'N/A'}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridSelect
                  id="transferredSpecialization"
                  name="transferredSpecialization"
                  placeholder={'Select Specialization'}
                  label="Select Transferred Specialization"
                  value={transferredSpecialization}
                  options={specializationList}
                  isDisabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridSelect
                  id="transferredDoctor"
                  name="transferredDoctor"
                  placeholder={
                    transferredSpecialization.value
                      ? 'Select Doctor To Transfer'
                      : 'Select Specialization First..'
                  }
                  label="Transferred Doctor"
                  value={transferredDoctor}
                  options={doctorList}
                  onChange={onChangeHandler}
                  isDisabled={!doctorList.length}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridSelect
                  id="transferredDate"
                  name="transferredDate"
                  placeholder={
                    transferredDoctor.value
                      ? 'Select Date To Transfer'
                      : 'Select Doctor First..'
                  }
                  label="Transferred Date"
                  value={transferredDate}
                  options={optionsDate}
                  onChange={onChangeHandler}
                  isDisabled={!optionsDate.length || !transferredDoctor.value}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridSelect
                  id="transferredTime"
                  name="transferredTime"
                  placeholder={
                    transferredDate.value
                      ? 'Select Time To Transfer'
                      : 'Select Date First..'
                  }
                  label="Transferred Time"
                  value={transferredTime}
                  options={optionsTime}
                  onChange={onChangeHandler}
                  isDisabled={!optionsTime.length ||!transferredDate.value}
                />
               
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="charge"
                  placeholder="Transferred Charge"
                  name="transferredCharge"
                  value={transferredCharge || 0}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridTextArea
                  id="remarks"
                  name="remarks"
                  placeholder="Remarks"
                  onChange={(e)=>onChangeHandler(e)}
                  value={remarks}
                />
              </Col>
            </Row>
          </Container-fluid>
        </CForm>
      </Container-fluid>
    </>
  )
}

export default TransferContent