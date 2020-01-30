import React, {memo} from 'react'
import {Col, Row} from 'react-bootstrap'
import {
  CFLabel,
  CForm,
  CHybridInput,
  CRadioButton
} from '@frontend-appointment/ui-elements'

const QualificationForm = ({
  qualificationInfoObj,
  errorMessageForQualificationName,
  onEnterKeyPress,
  onInputChange,
  countryCodeForDropdown,
  qualificationsAliasForDropdown,
  qualificationsForDropdown,
  universitiesDropdown
}) => {
  return (
    <>
      <Container-fluid>
        <Row sm="12 p-0">
          <h5 className="title">Qualification Info</h5>
        </Row>
        <CForm id="profile-info" className="mt-2 profile-info">
          <Container-fluid>
            <Row>
              <Col sm={12} md={4} lg={4}>
                <CHybridInput
                  id="qualification-name"
                  name="name"
                  onKeyDown={event => onEnterKeyPress(event)}
                  onChange={(event, validity) => onInputChange(event, validity)}
                  placeholder="Qualification Name"
                  value={qualificationInfoObj.name}
                  required={true}
                  hasValidation={true}
                  fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                  errorMessagePassed={errorMessageForQualificationName}
                />
              </Col>
              <Col sm={12} md={4} xl={4}>
                  <CHybridSelect
                      id="countryId"
                      name="countryId"
                      onKeyDown={event => handleEnter(event)}
                      onChange={event => onInputChange(event)}
                      value={qualificationInfoObj.countryId}
                      options={countryCodeForDropdown}
                      label="Select a Country"
                    />
              </Col>
              <Col sm={12} md={4} xl={4}>
                  <CHybridSelect
                      id="qualificationAliasId"
                      name="qualificationAliasId"
                      onKeyDown={event => handleEnter(event)}
                      onChange={event => onInputChange(event)}
                      value={qualificationInfoObj.qualificationAliasId}
                      options={qualificationsAliasForDropdown}
                      label="Select a qualification alias"
                    />
              </Col>
              <Col sm={12} md={4} xl={4}>
                  <CHybridSelect
                      id="universityId"
                      name="universityId"
                      onKeyDown={event => handleEnter(event)}
                      onChange={event => onInputChange(event)}
                      value={qualificationInfoObj.universityId}
                      options={qualificationsAliasForDropdown}
                      label="Select a University Alias"
                    />
              </Col>
              <Col sm={12} md={4} lg={4}>
                <CFLabel labelName="Status" id="status"></CFLabel>
                <CRadioButton
                  checked={Boolean(qualificationInfoObj.status)}
                  disabled={true}
                  id="radio1"
                  label="Active"
                  type="radio"
                  readOnly
                />
              </Col>
            </Row>
          </Container-fluid>
        </CForm>
      </Container-fluid>
    </>
  )
}

export default memo(QualificationForm)
