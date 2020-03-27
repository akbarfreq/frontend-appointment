import React, {memo} from 'react'
import {Col, Row} from 'react-bootstrap'
import {
  CFLabel,
  CForm,
  CHybridInput,
  CRadioButton,
  CHybridTextArea,
  CButton,
  CFControl,
  CCheckbox
} from '@frontend-appointment/ui-elements'
import * as DefaultLogo from '../img/default-logo.png'
import {CImageUploadAndCropModal} from '@frontend-appointment/ui-components'

const HospitalForm = ({
  companyInfoObj,
  errorMessageForCompanyName,
  errorMessageForCompanyCode,
  onEnterKeyPress,
  onInputChange,
  addContactNumber,
  removeContactNumber,
  editContactNumber,
  contactLength,
  companyImage,
  companyImageCroppedUrl,
  showImageUploadModal,
  onImageSelect,
  handleCropImage,
  handleImageUpload,
  setImageShow
}) => {
  return (
    <>
      <Container-fluid>
        <Row sm="12 p-0">
          <h5 className="title">Hospital Info</h5>
        </Row>
        <CForm id="hospital-info" className="mt-2 add-info">
          <Container-fluid>
            <Row>
              <Col
                lg={12}
                // className=" order-md-first order-lg-last"
              >
                <Row>
                  <Col sm={12} md={12} lg={12}>
                    <div className="image-upload-container">
                      {/* <CFLabel id='logo' labelName="Hospital Logo" /> */}

                      <div className="image-box">
                        <img
                          alt="COMPANY IMAGE"
                          src={
                            companyInfoObj.companyLogo
                              ? companyInfoObj.companyLogoUrl
                              : DefaultLogo
                          }
                        />
                        <CButton
                          id="uploadCompanyImage"
                          name="Upload"
                          size="lg"
                          variant="primary"
                          className=" mt-1 mb-4  upload-button"
                          onClickHandler={setImageShow}
                        />
                        <CImageUploadAndCropModal
                          id="company-logo"
                          showModal={showImageUploadModal}
                          setShowModal={setImageShow}
                          ruleOfThirds={true}
                          handleImageUpload={handleImageUpload}
                          imageSrc={companyImage}
                          croppedImageSrc={companyImageCroppedUrl}
                          circularCrop={false}
                          onImageSelect={onImageSelect}
                          onImageCrop={data => handleCropImage(data)}
                        />
                      </div>
                    </div>
                  </Col>

                  <Col sm={12} md={12} lg={6} className=" order-md-first"></Col>
                </Row>
              </Col>

              <Col lg={12}>
                <Row>
                  <Col sm={12} md={6} lg={6}>
                    <CHybridInput
                      id="company-name"
                      name="name"
                      onKeyDown={event => onEnterKeyPress(event)}
                      onChange={(event, validity) =>
                        onInputChange(event, validity)
                      }
                      placeholder="Company Name"
                      value={companyInfoObj.name}
                      required={true}
                      hasValidation={true}
                      max={100}
                      fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                      errorMessagePassed={errorMessageForCompanyName}
                    />
                  </Col>

                  <Col sm={12} md={6} lg={6}>
                    <CHybridInput
                      id="company-code"
                      name="companyCode"
                      onKeyDown={event => onEnterKeyPress(event)}
                      onChange={(event, validity) =>
                        onInputChange(event, validity)
                      }
                      placeholder="Company Code"
                      value={companyInfoObj.companyCode}
                      required={true}
                      errorMessagePassed={errorMessageForCompanyCode}
                      max={10}
                      min={2}
                    />
                  </Col>

                  <Col sm={12} md={6} lg={6}>
                    <CHybridInput
                      id="company-alias"
                      name="companyAlias"
                      placeholder="Company Alias"
                      value={companyInfoObj.alias}
                      required={true}
                      disabled={true}
                      readOnly={true}
                      max={10}
                      min={2}
                    />
                  </Col>

                  <Col sm={12} md={6} lg={6}>
                    <CHybridInput
                      id="company-panNumber"
                      name="panNumber"
                      onKeyDown={event => onEnterKeyPress(event)}
                      onChange={(event, validity) =>
                        onInputChange(event, validity)
                      }
                      placeholder="Hospital PAN Number"
                      value={companyInfoObj.panNumber}
                      fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                      hasValidation={true}
                      max={9}
                      errorMessagePassed={
                        'Pan number should only be alphanumber and of 9 max characters'
                      }
                      required={true}
                    />
                  </Col>

                  <Col sm={12} md={6} lg={6}>
                    <CHybridTextArea
                      id="hospital-address"
                      name="address"
                      onKeyDown={event => onEnterKeyPress(event)}
                      onChange={(event, validity) =>
                        onInputChange(event, validity)
                      }
                      placeholder="Hospital Address"
                      value={companyInfoObj.address}
                      max={200}
                      min={1}
                      required={true}
                    />
                  </Col>

                  <Col sm={12} md={6} lg={6} className="mb-4">
                    <CFLabel labelName="Contact Number" id="contactNumber" />
                    {contactLength != companyInfoObj.contactNumber.length && (
                      <CButton
                        id={'add-contact-numbers'}
                        variant="outline-secondary"
                        onClickHandler={() =>
                          addContactNumber('contactNumber', '')
                        }
                        name=""
                        size="sm"
                        className="pull-right"
                      >
                        <i className="fa fa-plus" /> Add
                      </CButton>
                    )}
                    <Row key={'contactForm'}>
                      {companyInfoObj.contactNumber.map((contNumber, idx) => {
                        return (
                          <Col
                            md={12}
                            lg={12}
                            key={'contInputs' + idx}
                            className="contact-box my-1"
                          >
                            <CFControl
                              key={'contactInput' + idx}
                              id={'contactInput' + idx}
                              name="contactNumber"
                              onKeyDown={event => onEnterKeyPress(event)}
                              onChange={e =>
                                editContactNumber(
                                  'contactNumber',
                                  e.target.value,
                                  idx
                                )
                              }
                              placeholder="Company Contact Number"
                              value={contNumber}
                              required={true}
                              max={10}

                              // errorMessagePassed={errorMessageForHospitalCode}
                            />
                            {companyInfoObj.contactNumber.length !== 1 ? (
                              <CButton
                                key={'removecontact' + idx}
                                id={'removecontact' + idx}
                                variant="outline-danger"
                                onClickHandler={() =>
                                  removeContactNumber('contactNumber', idx)
                                }
                                name=""
                                size="sm"
                                className="remove-contact "
                              >
                                {' '}
                                <i className="fa fa-close" />
                              </CButton>
                            ) : (
                              ''
                            )}
                          </Col>
                        )
                      })}
                    </Row>
                  </Col>

                  <Col sm={12} md={6} lg={6}>
                    <CFLabel labelName="Status" id="status" />
                    <div>
                      <CRadioButton
                        checked={Boolean(companyInfoObj.status)}
                        disabled={true}
                        id="radio1"
                        label="Active"
                        type="radio"
                        readOnly
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container-fluid>
        </CForm>
      </Container-fluid>
    </>
  )
}

export default memo(HospitalForm)
