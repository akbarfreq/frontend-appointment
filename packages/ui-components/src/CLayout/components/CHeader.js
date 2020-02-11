import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button, Dropdown, Image, Nav} from 'react-bootstrap';
import {Axios} from '@frontend-appointment/core';
import {CBreadcrumb, CMenuSearch} from '@frontend-appointment/ui-elements';

import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants';
import CChangePasswordModal from '../../CChangePassword/CChangePasswordModal';
import {Link} from "react-router-dom";

const {CHANGE_PASSWORD} = AdminModuleAPIConstants.adminSetupAPIConstants;

class CHeader extends Component {
    state = {
        alertMessageInfo: {
            variant: '',
            message: ''
        },
        userInfo: {},
        assignedModules: [],
        urlBase: '',
        showAlert: false,
        showChangePasswordModal: false,
        oldPassword: '',
        errorOldPassword: '',
        keyPressCount: 0,
        searchKeyword: '',
        searchResult: [],
        showResults: false
    };

    formControl = React.createRef();

    // closeAlert = () => {
    //     this.setState({
    //         showAlert: !this.state.showAlert,
    //         alertMessageInfo: {
    //             variant: '',
    //             message: ''
    //         },
    //     });
    // };

    setShowModal = () => this.setState({
        showChangePasswordModal: false,
        oldPassword: '',
        errorOldPassword: ''
    });

    onChangeHandler = (event) => {
        let {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };

    logoutUser = async () => {
        localStorage.clear();
        this.props.history.push('/');
    };

    setLoggedInUserInfo = () => {
        let absoluteUrl = window.location.href;
        let base = absoluteUrl.split('#')[0];
        let adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
        // let modules = JSON.parse(localStorage.getItem('assignedModules'));
        // TODO CURRENT MODULE AND CHECK VARIABLE NAMES
        this.setState({
            userInfo: {...adminInfo},
            // assignedModules: modules && [...modules],
            urlBase: base
        });
    };

    handleChangePassword = () => {
        this.setState({
            showChangePasswordModal: true
        });
    };

    changePassword = async (newPasswordObj) => {
        if (!this.state.oldPassword) {
            this.setState({
                errorOldPassword: 'OLD PASSWORD is required!'
            });
        } else {
            let passwordChangeData = {
                oldPassword: this.state.oldPassword,
                newPassword: newPasswordObj.password,
                remarks: newPasswordObj.remarks,
                id: this.state.userInfo.adminId
            };
            try {
                await Axios.put(CHANGE_PASSWORD, passwordChangeData);
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: 'Password Changed successfully. Logout and Login to verify.'
                    },
                    showChangePasswordModal: false
                });
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: e.errorMessage ? e.errorMessage : e.message ? e.message : 'Something went wrong!!!'
                    },
                    showChangePasswordModal: false
                });
            }
        }
    };

    clearCount = () => {
        this.setState({
            keyPressCount: 0
        });
    };

    clearKeyPressCount = () => {
        // console.log("===========================>",document.activeElement);
        // console.log("===========================>",document.getElementById('searchMenu'));
        setTimeout(() => this.clearCount(), 1000)
    };

    handleKeyPress = (event) => {
        let keypressCount = this.state.keyPressCount;
        if (event.keyCode === 16) {
            if (!keypressCount || keypressCount === 2) {
                keypressCount += 1;
                this.setState({
                    keyPressCount: keypressCount
                });
                this.clearKeyPressCount();
            } else if (keypressCount === 1) {
                let searchClass = ReactDOM.findDOMNode(this.formControl.current).className;
                if (!searchClass.includes('active')) {
                    this.formControl.current && this.formControl.current.focus();
                    // ReactDOM.findDOMNode(this.formControl.current).classList.add('active');
                } else {
                    this.formControl.current && this.formControl.current.blur();
                    // ReactDOM.findDOMNode(this.formControl.current).classList.remove('active');
                }
                keypressCount += 1;
                this.setState({
                    keyPressCount: keypressCount
                });
            }
            // else if (keypressCount === 3) {
            //     this.formControl.current && this.formControl.current.blur();
            //     this.clearCount();
            // }
        }
    };

    componentDidMount() {
        this.setLoggedInUserInfo();
        document.addEventListener('keydown', this.handleKeyPress)
    };

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
        clearTimeout(this.clearKeyPressCount);
    }

    handleSearchOnBlur = (event) => {
        if (event.target.value) {

        } else {

            ReactDOM.findDOMNode(this.formControl.current).classList.remove('active');
        }
    };

    handleSearchOnFocus = () => {
        ReactDOM.findDOMNode(this.formControl.current).classList.add('active');
    };

    searchUserMenus = (event) => {
        let BASE_PATH = process.env.REACT_APP_BASE_PATH_CODE;
        let keyWord = event.target.value;
        let menusMatchingKeyWord = [];
        let userMenus = JSON.parse(localStorage.getItem('userMenus'));

        if (keyWord !== '') {
            keyWord = keyWord.toLowerCase();
            userMenus.map(
                userMenu => {
                    if (!userMenu.childMenus.length) {
                        if ((userMenu.name).toLowerCase().includes(keyWord)) {
                            // IF PARENT MATCHES THE KEYWORD,ADD PARENT
                            let displayData = {
                                id: userMenu.id,
                                name: userMenu.name,
                                path: BASE_PATH.concat(userMenu.path)
                            };
                            menusMatchingKeyWord.push(displayData);
                        }
                    } else {
                        // IF PARENT DID NOT MATCH CHECK CHILDREN, IF ANY  CHILD MATCHED ADD  PARENT AND CHILD
                        let childrenMatchingKeyWord = userMenu.childMenus.filter(
                            child => (child.name).toLowerCase().includes(keyWord));
                        if (childrenMatchingKeyWord.length > 0) {
                            childrenMatchingKeyWord.map(child => {
                                let displayData = {
                                    id: child.id,
                                    name: userMenu.name.concat("/".concat(child.name)),
                                    path: BASE_PATH.concat(child.path)
                                };
                                menusMatchingKeyWord.push(displayData);
                            });
                        }
                    }
                }
            )
        } else {
            menusMatchingKeyWord = [];
        }

        this.setState({
            searchKeyword: event.target.value,
            searchResult: [...menusMatchingKeyWord],
            showResults: true
        });
    };

    render() {

        return (
            <React.Fragment>
                <header className="main-header container-fluid d-flex justify-content-between align-items-center">
                    <div className="header-content-left">
                        <CBreadcrumb
                            id="cogent"
                            breadcrumbData={this.props.dataForBreadCrumb}/>
                    </div>

                    {/*search start*/}
                    <div className="header-content-right d-flex align-items-center">
                        {/*<Dropdown alignRight className="topbar-dropdown topbar-search">*/}
                        {/*    <Dropdown.Toggle variant="default" id="dropdown-basic"*/}
                        {/*                     className="search-button rounded-circle">*/}
                        {/*        <Material.MdSearch className="search-icon"/>*/}
                        {/*        <InputGroup className="ts-input">*/}
                        {/*            <InputGroup.Prepend>*/}
                        {/*                <InputGroup.Text id="ssea">*/}
                        {/*                    <Material.MdSearch className="search-icon"/>*/}
                        {/*                </InputGroup.Text>*/}
                        {/*            </InputGroup.Prepend>*/}
                        {/*            <FormControl*/}
                        {/*                placeholder="Search ..."*/}
                        {/*            />*/}
                        {/*            <InputGroup.Append>*/}
                        {/*                <InputGroup.Text> <Material.MdClose/></InputGroup.Text>*/}
                        {/*            </InputGroup.Append>*/}
                        {/*        </InputGroup>*/}
                        {/*    </Dropdown.Toggle>*/}
                        {/*    <Dropdown.Menu>*/}
                        {/*        <div className="dropdown-details">*/}
                        {/*            <InputGroup className="ts-input">*/}
                        {/*                <InputGroup.Prepend>*/}
                        {/*                    <InputGroup.Text id="ssea">*/}
                        {/*                        <Material.MdSearch className="search-icon"/>*/}
                        {/*                    </InputGroup.Text>*/}
                        {/*                </InputGroup.Prepend>*/}
                        {/*                <FormControl*/}
                        {/*                    id="searchMenu"*/}
                        {/*                    placeholder="Search ..."*/}
                        {/*                />*/}
                        {/*                <InputGroup.Append>*/}
                        {/*                    <InputGroup.Text> <Material.MdClose/></InputGroup.Text>*/}
                        {/*                </InputGroup.Append>*/}
                        {/*            </InputGroup>*/}
                        {/*        </div>*/}
                        {/*        <ul className="drop-down-list">*/}
                        {/*            <li className="">*/}
                        {/*                <div className="menu">Menu :</div>*/}
                        {/*                <div className="sub-menu"> Submenu</div>*/}
                        {/*            </li>*/}
                        {/*            <li className="">*/}
                        {/*                <div className="menu">Menu :</div>*/}
                        {/*                <div className="sub-menu"> Submenu</div>*/}
                        {/*            </li>*/}
                        {/*            <li className="">*/}
                        {/*                <div className="menu">No results found...</div>*/}
                        {/*            </li>*/}
                        {/*        </ul>*/}
                        {/*    </Dropdown.Menu>*/}
                        {/*</Dropdown>*/}
                        {/*<Dropdown alignRight>*/}
                        {/*<Dropdown.Toggle>*/}
                        <span className="searchMenu">
                                    <CMenuSearch
                                        id="searchMenu"
                                        setRef={this.formControl}
                                        onChange={this.searchUserMenus}
                                        value={this.state.searchKeyword}
                                        handleOnBlur={this.handleSearchOnBlur}
                                        handleOnFocus={this.handleSearchOnFocus}
                                    />
                                </span>
                        {
                            this.state.showResults ?
                                <ul className="drop-down-list">
                                    {
                                        this.state.searchResult.length ?
                                            this.state.searchResult.map(value => (
                                                <li className="" key={'menu-li' + value.id}>
                                                    <div className="menu" key={value.id}>
                                                        <Link
                                                            key={'menu-link' + value.id}
                                                            to={value.path}
                                                        >
                                                            {value.name}
                                                        </Link>
                                                        {/*<a href={value.path}>{value.name}</a>*/}
                                                    </div>
                                                </li>
                                            ))
                                            : ''
                                    }
                                </ul> : ''
                        }
                        {/*</Dropdown.Toggle>*/}
                        {/*</Dropdown>*/}
                        {/* end search */}

                        {/* start user profile */}
                        <Dropdown alignRight className="user-profile">
                            <Dropdown.Toggle variant="default" id="dropdown-basic">
                                <Image src={require('../../img/sabu.jpg')} className="avatar"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <div className="user-details">
                                    <Image src={require('../../img/sabu.jpg')} className="avatar"/>
                                    <div
                                        className="user-name"> {this.state.userInfo && this.state.userInfo.fullName}</div>
                                    <div
                                        className="profile-name">
                                        {this.state.userInfo && this.state.userInfo.profileName}</div>
                                    <Button variant="outline-light" className="mb-2 reset-password">Reset
                                        Password</Button>
                                </div>
                                <div className="logout">
                                    <Button variant="outline-primary"
                                            onClick={this.handleChangePassword}
                                            block><i className='fa fa-lock'/> Change Password</Button>
                                    <Button variant="outline-primary"
                                            onClick={this.logoutUser}
                                            block><i className='fa fa-sign-out'/> Logout</Button>
                                </div>
                                {this.state.showChangePasswordModal &&
                                <CChangePasswordModal
                                    showPasswordChangeModal={this.state.showChangePasswordModal}
                                    setShowModal={this.setShowModal}
                                    oldPassword={this.state.oldPassword}
                                    oldPasswordError={this.state.errorOldPassword}
                                    onChangeHandler={this.onChangeHandler}
                                    changePassword={this.changePassword}
                                />
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* end user profile */}
                    </div>

                </header>

            </React.Fragment>
        );

    }
}

export default CHeader;
