import React, {PureComponent} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import ProfileInfoForm from './ProfileInfoForm'
import ProfileMenuAssignment from './ProfileMenuAssignment'
import {CAlert, CButton} from '@frontend-appointment/ui-elements'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    clearSuccessErrorMessagesFromStore,
    createProfile,
    UnitSetupMiddleware,
    HospitalSetupMiddleware
} from "@frontend-appointment/thunk-middleware";
import ConfirmationModal from "./ConfirmationModal";
import * as Material from 'react-icons/md';
import {
    clientUserMenusJson,
    EnterKeyPressUtils,
    EnvironmentVariableGetter,
    LocalStorageSecurity,
    menuRoles,
    ProfileSetupUtils,
    TryCatchHandler
} from "@frontend-appointment/helpers";
import {AdminModuleAPIConstants} from "@frontend-appointment/web-resource-key-constants";

const {FETCH_UNIT_FOR_DROPDOWN} = AdminModuleAPIConstants.departmentSetupAPIConstants;

const {CREATE_PROFILE} = AdminModuleAPIConstants.profileSetupAPIConstants;

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;
const {fetchActiveDepartmentsForDropdown} = UnitSetupMiddleware;

class ProfileAdd extends PureComponent {

    state = {
        profileDescription: '',
        profileName: '',
        selectedDepartment: null,
        menusAssignedToProfileAndAllowedToChange: [],
        status: 'Y',
        isAllRoleAssigned: 'N',
        // subDepartmentsByDepartmentId: [],
        userMenus: [],
        defaultSelectedMenu: [],
        showConfirmModal: false,
        selectedUserMenusForModal: [],
        userMenuAvailabilityMessage: '',
        formValid: false,
        profileNameValid: false,
        profileDescriptionValid: false,
        errorMessageForProfileName: "Profile Name should not contain special characters",
        errorMessageForProfileDescription: 'Profile Description should contain 200 characters only.',
        showAlert: false,
        alertMessageInfo: {
            variant: "",
            message: ""
        },
        departmentListByHospital: [],
        originalTotalNoOfMenusAndRoles: ProfileSetupUtils.countTotalNoOfMenusAndRoles(
            clientUserMenusJson[EnvironmentVariableGetter.CLIENT_MODULE_CODE]),
        isCloneAndAdd:false
    };

    closeAlert = () => {
        this.props.clearSuccessErrorMessagesFromStore();
        this.setState({
            showAlert: !this.state.showAlert
        });
    };

    resetStateValues = () => {
        this.setState({
            profileDescription: '',
            profileName: '',
            selectedDepartment: null,
            selectedHospital: null,
            menusAssignedToProfileAndAllowedToChange: [],
            status: 'Y',
            isAllRoleAssigned: 'N',
            userMenus: [],
            defaultSelectedMenu: [],
            showConfirmModal: false,
            selectedUserMenusForModal: [],
            userMenuAvailabilityMessage: '',
            formValid: false,
            profileNameValid: false,
            profileDescriptionValid: false,
            isCloneAndAdd:false
        })
    };

    resetFormData = () => {
        this.resetStateValues();
    };

    setShowConfirmModal = () => {
        this.setState({showConfirmModal: !this.state.showConfirmModal});
    };

    initialApiCalls = async () => {
        await this.fetchDepartments();
        // await this.fetchHospitals();
    };

    componentDidMount() {
        TryCatchHandler.genericTryCatch(this.initialApiCalls());
    }

    handleOnChange = async (event, fieldValid) => {
        event && await this.bindValuesToState(event, fieldValid);
    };

    setStateValues = (key, value, label, fieldValid) =>
        label ? value ?
            this.setState({[key]: {value, label}})
            : this.setState({[key]: null})
            : this.setState({[key]: value, [key + "Valid"]: fieldValid});

    fetchDepartments = async () => {
        await TryCatchHandler.genericTryCatch(this.props.fetchActiveDepartmentsForDropdown(FETCH_UNIT_FOR_DROPDOWN));
    };

    filterMenuByDepartment = () => {
        // let menusForDept = Object.keys(clientUserMenusJson).find(code => code === process.env.REACT_APP_MODULE_CODE)
        //     ? [...clientUserMenusJson[process.env.REACT_APP_MODULE_CODE]] : [];
        let alphabeticallySortedMenus = LocalStorageSecurity.localStorageDecoder("userMenus");
        // UserMenuUtils.sortUserMenuJson([...menusForDept]);
        alphabeticallySortedMenus ?
            this.setState({
                userMenus: [...alphabeticallySortedMenus],
                menusAssignedToProfileAndAllowedToChange: [],
                defaultSelectedMenu: alphabeticallySortedMenus[0]
            }) :
            this.setState({
                userMenus: [],
                defaultSelectedMenu: [],
                menusAssignedToProfileAndAllowedToChange: [],
                userMenuAvailabilityMessage: 'No user menus available.'
            });
    };

    checkFormValidity = () => {
        let formValidity = this.state.profileNameValid && this.state.profileDescriptionValid && this.state.profileName
            && this.state.profileDescription && this.state.selectedDepartment !== null && this.state.menusAssignedToProfileAndAllowedToChange.length !== 0;

        this.setState({
            formValid: formValidity
        })
    };

    async bindValuesToState(event, fieldValid) {
        let fieldName = event.target.name;
        let value = event.target.type === 'checkbox' ? (event.target.checked ? 'Y' : 'N') : event.target.value;
        let label = event.target.label;
        await this.setStateValues(fieldName, value, label, fieldValid);
        switch (fieldName) {
            case 'selectedDepartment':
                value ? this.filterMenuByDepartment(value) : this.setState({
                    selectedDepartment: null,
                    userMenus: [],
                    defaultSelectedMenu: [],
                    userMenuAvailabilityMessage: '',
                    menusAssignedToProfileAndAllowedToChange: []
                });
                break;
            default:
                break;
        }

        this.checkFormValidity();
    }

    setValuesForModalDisplay = (userMenus, selectedMenuAndRoles) => {
        let selectedParentMenus = new Set(),
            selectedChildMenus = new Set(),
            selectedUserMenus;

        selectedMenuAndRoles.forEach(selectedMenu => {
            let parent = userMenus.find(userMenu => userMenu.id === selectedMenu.parentId);
            parent && selectedParentMenus.add(parent);
            let child = parent && parent.childMenus.length && parent.childMenus.find(
                childMenu => childMenu.id === selectedMenu.userMenuId);
            child && selectedChildMenus.add(child);
        });

        selectedUserMenus = Array.from(selectedParentMenus).map(parent => {
            let data = {
                id: parent.id,
                name: parent.name,
                icon: parent.icon,
                parentId: parent.parentId,
                childMenus: [],
                roles: [...parent.roles]
            };
            let childrenOfParent = Array.from(selectedChildMenus).filter(child => {
                return child.parentId === parent.id && {
                    id: child.id,
                    name: child.name,
                    icon: child.icon,
                    parentId: child.parentId,
                    roles: [...child.roles],
                    childMenus: [...child.childMenus]
                }
            });
            data.childMenus = [...childrenOfParent];
            return data;
        });
        return selectedUserMenus;
    };

    checkIfAllRolesAndMenusAssigned = (selectedUserMenus) => {
        let allRoleAssigned = false;
        if (LocalStorageSecurity.localStorageDecoder("adminInfo").isAllRoleAssigned === 'Y') {
            allRoleAssigned = Number(this.state.originalTotalNoOfMenusAndRoles) === Number(selectedUserMenus.length);
        }
        return allRoleAssigned;
    };

    addAllMenusAndRoles = async (userMenus, checkedAllUserMenus) => {
        let currentSelectedMenus = [],
            userMenusSelected;

        if (checkedAllUserMenus) {
            currentSelectedMenus = [...ProfileSetupUtils.prepareUserMenusAndRolesCombinationList(userMenus)];
        }

        userMenusSelected = currentSelectedMenus.length && this.setValuesForModalDisplay(
            this.state.userMenus, currentSelectedMenus);

        await this.setState({
            menusAssignedToProfileAndAllowedToChange: currentSelectedMenus,
            selectedUserMenusForModal: userMenusSelected,
            isAllRoleAssigned: this.checkIfAllRolesAndMenusAssigned(currentSelectedMenus) ? 'Y' : 'N'
        });

        this.checkFormValidity();
    };

    handleRolesCheck = async (roles, childMenu) => {
        let currentSelectedMenus = [...this.state.menusAssignedToProfileAndAllowedToChange];
        for (let role of roles) {
            role.isChecked ?
                !currentSelectedMenus.find(menu => menu.roleId === role.id && menu.userMenuId === childMenu.id)
                && currentSelectedMenus.push({
                    parentId: childMenu.parentId === null ? childMenu.id : childMenu.parentId,
                    //IN CASE OF PARENT WITH NO CHILD SET PARENT ID TO ITS OWN ID
                    userMenuId: childMenu.id,
                    roleId: role.id,
                    status: 'Y'
                })
                :
                currentSelectedMenus.splice(currentSelectedMenus.findIndex(menu => menu.roleId === role.id
                    && menu.userMenuId === childMenu.id), 1);
        }

        let userMenusSelected = this.setValuesForModalDisplay(this.state.userMenus, currentSelectedMenus);

        await this.setState({
            menusAssignedToProfileAndAllowedToChange: currentSelectedMenus,
            selectedUserMenusForModal: userMenusSelected,
            isAllRoleAssigned: this.checkIfAllRolesAndMenusAssigned(currentSelectedMenus) ? 'Y' : 'N'
        });
        this.checkFormValidity();
    };

    isCloneAndAdd = async () => {
        await this.setState({
          isCloneAndAdd: true
        })
        this.handleConfirmClick('cloneAndAdd')
      }

    handleConfirmClick = async (value) => {
        const {
            profileName, profileDescription, status, isAllRoleAssigned, selectedDepartment, menusAssignedToProfileAndAllowedToChange
        } = this.state;
        let profileDetails = {
            profileDTO: {
                name: profileName,
                description: profileDescription,
                status: status,
                departmentId: selectedDepartment && selectedDepartment.value,
                isAllRoleAssigned
            },
            profileMenuRequestDTO: menusAssignedToProfileAndAllowedToChange
        };
        try {
            await this.props.createProfile(CREATE_PROFILE, profileDetails);
            // this.setShowConfirmModal();
            if(!value)
            this.resetStateValues();

            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "success",
                    message: "Profile Added successfully."
                },
                showConfirmModal:false
            })
        } catch (e) {
            await this.setShowConfirmModal();
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "danger",
                    message: e.errorMessage ? e.errorMessage : e.message
                }
            })
        }

    };

    handleEnter = (event) => {
        EnterKeyPressUtils.handleEnter(event)
    };

    render() {

        const {departments} = this.props.UnitSetupReducer;
        const {isCreateProfileLoading} = this.props.ProfileSetupReducer;

        const {
            selectedDepartment, profileDescription, profileName, status,
            errorMessageForProfileDescription, errorMessageForProfileName, userMenus,
            menusAssignedToProfileAndAllowedToChange, defaultSelectedMenu,
            selectedUserMenusForModal, userMenuAvailabilityMessage, showConfirmModal,
            showAlert, alertMessageInfo, formValid,isCloneAndAdd
        } = this.state;

        return (
            <>
                <div className=" ">
                    <Container className="bg-white add-container " fluid>

                        <Row>
                            <ProfileInfoForm
                                onEnterKeyPress={this.handleEnter}
                                departmentList={departments}
                                onInputChange={this.handleOnChange}
                                profileInfoObj={{
                                    departmentValue: selectedDepartment,
                                    profileDescription: profileDescription,
                                    profileName: profileName,
                                    status: status
                                }}
                                errorMessageForProfileName={errorMessageForProfileName}
                                errorMessageForProfileDescription={errorMessageForProfileDescription}
                            />
                            {selectedDepartment &&
                            <ProfileMenuAssignment
                                userMenus={userMenus}
                                selectedMenus={menusAssignedToProfileAndAllowedToChange}
                                defaultSelectedMenu={defaultSelectedMenu}
                                onCheckAllUserMenus={this.addAllMenusAndRoles}
                                onTabAndRolesChange={this.handleRolesCheck}
                                resetFormData={this.resetFormData}
                                profileData={{
                                    profileName: profileName,
                                    profileDescription: profileDescription,
                                    departmentValue: selectedDepartment,
                                    status: status,
                                    selectedMenus: menusAssignedToProfileAndAllowedToChange,
                                    userMenus: userMenus,
                                    selectedUserMenusForModal: selectedUserMenusForModal,
                                    userMenuAvailabilityMessage: userMenuAvailabilityMessage
                                }}/>
                            }
                        </Row>
                        <Row className="mt-4">
                            <Col sm={12} md={{span: 3, offset: 9}}>
                                <CButton
                                    id="save-profile-add"
                                    variant="primary "
                                    className="float-right btn-action"
                                    name="Save"
                                    disabled={!formValid || showConfirmModal}
                                    isLoading={showConfirmModal}
                                    onClickHandler={this.setShowConfirmModal}/>
                                <ConfirmationModal
                                    showConfirmModal={showConfirmModal}
                                    setShowConfirmModal={this.setShowConfirmModal}
                                    onConfirmClick={() => this.handleConfirmClick()}
                                    cloneAndAdd={()=>{this.isCloneAndAdd()}}
                                    isCloneAndAdd={isCloneAndAdd}
                                    isAddLoading={isCreateProfileLoading}
                                    profileData={{
                                        profileName: profileName,
                                        profileDescription: profileDescription,
                                        departmentValue: selectedDepartment,
                                        status: status,
                                        selectedMenus: menusAssignedToProfileAndAllowedToChange,
                                        selectedUserMenusForModal: selectedUserMenusForModal,
                                        userMenus: userMenus
                                    }}
                                    rolesJson={menuRoles}
                                />
                            </Col>
                        </Row>
                        <CAlert id="profile-manage"
                                variant={alertMessageInfo.variant}
                                show={showAlert}
                                onClose={this.closeAlert}
                                alertType={alertMessageInfo.variant === "success" ? <><Material.MdDone/>
                                </> : <i className="fa fa-exclamation-triangle" aria-hidden="true"/>}
                                message={alertMessageInfo.message}
                        />
                    </Container>
                </div>
            </>

        );
    }
}

export default ConnectHoc(ProfileAdd,
    [
        'ProfileSetupReducer',
        'UnitSetupReducer',
    ], {
        fetchActiveDepartmentsForDropdown,
        createProfile,
        clearSuccessErrorMessagesFromStore,
        fetchActiveHospitalsForDropdown
    })
