import React, {memo} from 'react'
import {CForm, CHybridInput, CButton} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'
import logo from './images/400x400.png'
const CCodeVerification = ({
  codeVerificationData,
  onChangeHandler,
  onSubmitFormHandler,
  isValid
}) => {
  return (
    <>
      <div className="header-login new-password">
        <div className="inner-header flex">
          <Container className="container-login">
            <Row>
              <Col md={{span: 6, offset: 3}} className="login-right">
                <div className="login-wrapper">
                  <div className="login-header">
                    <Image src={logo} className="logo-image" />
                  </div>
                  <CForm id="save-password" className="login-form">
                    <CHybridInput
                      id="code"
                      name="code"
                      placeholder="Enter the verification token"
                      onChange={onChangeHandler}
                      value={codeVerificationData.username}
                    />
                    <CButton
                      variant="primary"
                      className="btn-action float-right"
                      type="submit"
                      disabled={!isValid ? true : false}
                      onClick={onSubmitFormHandler}
                      name="Forgot Password"
                    />
                  </CForm>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div>
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>

      <div className="content-login flex">
        <p>Powered by Cogent Health (P) Ltd</p>
      </div>
    </>
  )
}

export default memo(CCodeVerification)
