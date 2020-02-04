import {fetchLoggedInAdminUserInfo, fetchUserMenus, signinUser} from '@frontend-appointment/thunk-middleware';
import {Login} from '@frontend-appointment/ui-components';
import React from 'react';
import {ConnectHoc} from '@frontend-appointment/commons';
import {LocalStorageSecurity} from '@frontend-appointment/helpers';
class LoginPage extends React.PureComponent {
  onSubmitHandler = async user => {
    try {
      await this.props.signinUser('/api/v1/login', user);
      await this.props.fetchUserMenus('/api/v1/sidebar',{username:user.username});
      const selectedPath = LocalStorageSecurity.localStorageDecoder("active");
      const pathToRedirect = selectedPath?"/admin"+selectedPath.replace("true",""):"/admin/dashboard"
      await this.props.history.push(pathToRedirect);
      return null;
    } catch (e) {
      console.log(e);
      const err = e.errorMessage
        ? e.errorMessage
        : 'Sorry Server Could not process data';
      return err;
    }
  };

  render() {
    return <Login {...this.props} onSubmitHandler={this.onSubmitHandler}/>;
  }
}

//Mapping the thunkActions to Dispatcher to props
export default ConnectHoc(
  LoginPage,
  ['loginReducers', 'userMenuReducers'],
  {
    fetchUserMenus,
    signinUser,
    fetchLoggedInAdminUserInfo
  }
);
