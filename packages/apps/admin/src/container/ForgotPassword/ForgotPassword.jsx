import React, {PureComponent} from 'react'
import {CForgotPassword} from '@frontend-appointment/ui-components'
import {CAlert} from '@frontend-appointment/ui-elements'
import {ConnectHoc} from '@frontend-appointment/commons'
import {ForgotPasswordMiddleware} from '@frontend-appointment/thunk-middleware'
import {CommonAPIConstants} from '@frontend-appointment/web-resource-key-constants'
const {forgotPassword} = ForgotPasswordMiddleware
const {ForgotPasswordAndVerification} = CommonAPIConstants
class ForgotPassword extends PureComponent {
  state = {
    username: '',
    isValid: false,
    alertMessageInfo: {
      variant: '',
      message: ''
    },
    showAlert: false
  }
  intervalAlertClear

  checkFormValid = (name, value) => {
    const {username} = this.state
    const isValidTrue = username.length
    this.setState({
      isValid: isValidTrue || false,
      [name]: value
    })
  }

  closeAlert = () => {
    this.setState({
      showAlert: false
    })
  }

  onChangeHandler = event => {
    const {name, value} = event.target
    this.checkFormValid(name, value)
  }

  closeAlertAfterCertainInterval = () => {
    this.intervalAlertClear = setTimeout(this.closeAlert, 4000)
  }

  onSubmitFormHandler = async event => {
    try {
      await this.props.forgotPassword(
        ForgotPasswordAndVerification.FORGOT_PASSWORD,
        this.state.username
      )
    } catch (e) {
      this.setState({
        alertMessageInfo: {
          variant: 'danger',
          message: this.props.ForgotPasswordReducer.message
        },
        showAlert: true
      })
      this.closeAlertAfterCertainInterval()
    }
  }

  componentWillUnmount () {
    this.intervalAlertClear && clearTimeout(this.intervalAlertClear)
  }

  render () {
    const {username, isValid} = this.state
    return (
      <>
        <CForgotPassword
          passwordForgotData={{username}}
          onChangeHandler={this.onChangeHandler}
          isValid={isValid}
          onSubmitFormHandler={this.onSubmitFormHandler}
        />
        <CAlert
          id="profile-manage"
          variant={alertMessageInfo.variant}
          show={showAlert}
          onClose={this.closeAlert}
          alertType={
            alertMessageInfo.variant === 'success' ? (
              <>
                <Material.MdDone />
              </>
            ) : (
              <>
                <i className="fa fa-exclamation-triangle" aria-hidden="true" />
              </>
            )
          }
          message={alertMessageInfo.message}
        />
      </>
    )
  }
}
export default ConnectHoc(ForgotPassword, ['ForgotPasswordReducer'], {
  forgotPassword
})
