import {fetchUserMenus, signinUser} from '@frontend-appointment/thunk-middleware'
import {Login} from '@frontend-appointment/ui-components'
import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons';

class LoginPage extends React.PureComponent {
    onSubmitHandler = async user => {
        try {
            await this.props.signinUser('/auth', user);
            await this.props.fetchUserMenus('/admin/api/v1/sidebar',
                {username: user.username, subDepartmentCode: process.env.REACT_APP_SUB_DEPARTMENT_CODE});
            await this.props.history.push('/admin/dashboard');
            return null;
        } catch (e) {
            console.log(e)
            const err = e.errorMessage
                ? e.errorMessage
                : 'Sorry Server Could not process data'
            return err;
        }
    }

    render() {
        return <Login {...this.props} onSubmitHandler={this.onSubmitHandler}/>
    }
}

//Mapping the thunkActions to Dispatcher to props
export default ConnectHoc(
    LoginPage,
    ['loginReducers', 'userMenuReducers'],
    {fetchUserMenus, signinUser}
);
