import React, {memo} from 'react'
import {
  CButton,
  CForm,
  CHybridInput,
  CModal,
  CHybridTextArea,
  CHybridSelect,
  CCheckbox
} from '@frontend-appointment/ui-elements'
import {Col, Container, Row} from 'react-bootstrap'

const ClientApiIntegrationEditModal = ({
  showEditModal,
  integrationData,
  setCloseModal,
  onChangeHandlerHeaderOrQueryParams,
  onRemoveHandlerHeaderOrQueryParams,
  onAddHeaderOrQueryParams,
  onChangeHandler,
  regexForCommaSeperation,
  isFeatureTypeDropdownLoading,
  isRequestMethodDropdownLoading,
  requestMethodData,
  regexForApiUrl,
  requestParamsIsSelected,
  requestHeadersIsSelected,
  changeRequestHandler,
  hospitalsForDropdown,
  isEditApiIntegrationLoading,
  editApiHandler,
  featureTypeDropdownData,
  formValid,
  errorMessage
}) => {
  console.log('showEditModal', showEditModal)
  const bodyContent = (
    <>
      <CForm id="profile-info spec" className="mt-2 profile-info">
        <Container-fluid>
          <Row>
            <Col sm={12} md={4}>
              <CHybridInput
                id="client"
                label="Client"
                name="clientId"
                value={integrationData.clientId}
                disabled={true}
                placeholder={'Select Client.'}
              />
            </Col>
            {/* <Col sm={12} md={4}>
              Integration Type
            </Col> */}

            <Col sm={12} md={4}>
              <CHybridSelect
                id="featureType"
                label="Feature Type"
                name="featureType"
                onChange={(event, validity) => onChangeHandler(event, validity,'E')}
                options={featureTypeDropdownData}
                value={integrationData.featureType}
                isDisabled={
                  !integrationData.clientId || !requestMethodData.length
                }
                placeholder={
                  integrationData.clientId
                    ? 'Select Client First.'
                    : featureTypeDropdownData.length
                    ? 'Select Feature Type'
                    : 'No Feature Types(s) Found'
                }
                isLoading={isFeatureTypeDropdownLoading}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={4} md={4} lg={4}>
              <CHybridSelect
                id="featureType"
                label="Request Method"
                name="requestMethod"
                onChange={(event, validity) => onChangeHandler(event, validity,'E')}
                options={requestMethodData}
                value={integrationData.requestMethod}
                isLoading={isRequestMethodDropdownLoading}
                isDisabled={
                  !integrationData.clientId || !requestMethodData.length
                }
                placeholder={
                  integrationData.clientId
                    ? 'Select Client First.'
                    : requestMethodData.length
                    ? 'Select Request method'
                    : 'No Request Method(s) Found'
                }
              />
            </Col>
            <Col sm={8} md={8}>
              <CHybridInput
                id="apiUrl"
                name="apiUrl"
                value={integrationData.apiUrl}
                onChange={(event, validity) => onChangeHandler(event, validity,'E')}
                placeholder={'Enter Request URL'}
                fieldValuePattern={regexForApiUrl}
                hasValidation={true}
                errorMessagePassed={'Value Should be Request Url'}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <CCheckbox
                id="c-checkbox-done"
                name="c-checkbox done"
                label="Headers"
                className="module fw-500"
                checked={requestHeadersIsSelected}
                onChange={() =>
                  changeRequestHandler('requestHeadersIsSelected', 'headers','E')
                }
              />
            </Col>
            <Col>
              {requestHeadersIsSelected ? (
                <CButton
                  id="add-header"
                  name=""
                  size="sm"
                  variant="outline-secondary"
                  className="float-right mb-2 add-button"
                  onClickHandler={() => onAddHeaderOrQueryParams('headers','E')}
                >
                  <i className="fa fa-plus" />
                  &nbsp;Add
                </CButton>
              ) : (
                ''
              )}
            </Col>
          </Row>

          <Row>
            {integrationData.headers.map((header, ind) => {
              return (
                <div key={'header' + ind} id="header" className="header">
                  {Object.keys(header).map((headerKey, index) => {
                    return (
                      <>
                        {headerKey !== 'status' && headerKey !== 'id' ? (
                          <div className="header-fields">
                            <CHybridInput
                              key={'header-' + headerKey + index}
                              id={'header-' + headerKey + index}
                              name={headerKey}
                              onChange={event =>
                                onChangeHandlerHeaderOrQueryParams(
                                  event,
                                  ind,
                                  'headers',
                                  'E'
                                )
                              }
                              placeholder={headerKey}
                              value={header[headerKey]}
                              required={true}
                            />
                          </div>
                        ) : null}
                      </>
                    )
                  })}

                  {integrationData.headers.length !== 1 ? (
                    <CButton
                      id="remove-header"
                      name=""
                      size="lg"
                      variant="outline-danger"
                      className="float-right  remove-button"
                      onClickHandler={() =>
                        onRemoveHandlerHeaderOrQueryParams(ind, 'headers','E')
                      }
                    >
                      <i className="fa fa-times" />
                      {/* &nbsp;Remove */}
                    </CButton>
                  ) : (
                    ''
                  )}
                </div>
              )
            })}
          </Row>
          <Row>
            <Col>
              <CCheckbox
                id="c-checkbox-done2"
                name="c-checkbox done2"
                label="Query Parameters"
                className="module fw-500"
                checked={requestParamsIsSelected}
                onChange={() =>
                  changeRequestHandler('requestParamsIsSelected', 'queryParams','E')
                }
              />
            </Col>
            <Col>
              {requestParamsIsSelected ? (
                <CButton
                  id="add-header"
                  name=""
                  size="sm"
                  variant="outline-secondary"
                  className="float-right mb-2"
                  onClickHandler={() => onAddHeaderOrQueryParams('queryParams','E')}
                >
                  <i className="fa fa-plus" />
                  &nbsp;Add
                </CButton>
              ) : (
                ''
              )}
            </Col>
          </Row>
          <div className="">
            <Row>
              {integrationData.queryParams.map((queryParam, ind) => {
                return (
                  <div
                    key={'query-param-' + ind}
                    id="query-param"
                    className="header"
                  >
                    {Object.keys(queryParam).map((queryParamKey, index) => {
                      return (
                        <>
                          {queryParamKey !== 'status' &&
                          queryParamKey !== 'id' ? (
                            <div className="header-fields">
                              <CHybridInput
                                key={'header-' + queryParamKey + index}
                                id={'header-' + queryParamKey + index}
                                name={queryParamKey}
                                onChange={event =>
                                  onChangeHandlerHeaderOrQueryParams(
                                    event,
                                    ind,
                                    'queryParams',
                                    'E'
                                  )
                                }
                                placeholder={queryParamKey}
                                value={queryParam[queryParamKey]}
                                required={true}
                              />
                            </div>
                          ) : null}
                        </>
                      )
                    })}

                    {integrationData.queryParams.length !== 1 ? (
                      <CButton
                        id="remove-header"
                        name=""
                        size="sm"
                        variant="outline-danger"
                        className="float-right  remove-button"
                        onClickHandler={() =>
                          onRemoveHandlerHeaderOrQueryParams(ind, 'queryParams','E')
                        }
                      >
                        <i className="fa fa-times" />
                      </CButton>
                    ) : (
                      ''
                    )}

                    {/* <div className="line-gap"></div> */}
                  </div>
                )
              })}
            </Row>
          </div>
          <Row className="mt-4">
            <Col sm={12}>
              <CHybridTextArea
                id="request-body-hospital-integration"
                name="requestBody"
                onChange={(event, validity) => onChangeHandler(event, validity,'E')}
                placeholder="Request Body Attributes"
                value={integrationData.requestBody}
                required={true}
                hasValidation={true}
                fieldValuePattern={regexForCommaSeperation}
                errorMessagePassed={'Value Should Be Comma Seperated'}
              />
              <p className="note">Note: Should be in comma separed format</p>
            </Col>
          </Row>
        </Container-fluid>
      </CForm>
    </>
  )
  let footerChildren = (
    <>
      <Container fluid="true">
        <Row>
          <div className="col-md-6">
            {errorMessage ? (
              <p className="modal-error">
                <i class="fa fa-exclamation-triangle" /> &nbsp; {errorMessage}
              </p>
            ) : (
              ''
            )}
          </div>
          <div className="col-md-6">
            <CButton
              id="submit-update-button"
              disabled={!formValid}
              isLoading={isEditApiIntegrationLoading}
              name="Update"
              size="lg"
              className="btn-action  float-right"
              onClickHandler={editApiHandler}
            />
            <CButton
              id="cancel-update-profile"
              variant="light"
              size="lg"
              className="btn-action  float-right mr-2"
              name="Cancel"
              onClickHandler={setCloseModal}
            />
          </div>
        </Row>
      </Container>
    </>
  )
  return (
    <>
      <CModal
        show={showEditModal}
        modalHeading="Client Api Integration"
        size="lg"
        bodyChildren={bodyContent}
        onHide={setCloseModal}
        centered={false}
        dialogClassName="preview-modal"
        footerChildren={footerChildren}
        closeButton={true}
      />
    </>
  )
}

export default memo(ClientApiIntegrationEditModal)
