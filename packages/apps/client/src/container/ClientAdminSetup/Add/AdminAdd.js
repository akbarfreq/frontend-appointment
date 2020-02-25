import React, {PureComponent} from 'react';
import AdminInfoForm from "./AdminInfoForm";
import {
    AdminSetupUtils,
    EnterKeyPressUtils,
    EnvironmentVariableGetter,
    menuRoles,
    ProfileSetupUtils
} from "@frontend-appointment/helpers";
import {ConnectHoc} from "@frontend-appointment/commons";
import {
    clearAdminSuccessErrorMessagesFromStore,
    createAdmin,
    DepartmentSetupMiddleware,
    fetchActiveProfilesByDepartmentId,
    HospitalSetupMiddleware,
    previewProfile
} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants} from "@frontend-appointment/web-resource-key-constants";
import {Col, Container, Row} from "react-bootstrap";
import {CAlert, CButton, CLoading} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';
import AdminConfirmationModal from "./AdminConfirmationModal";
import "./../admin-setup.scss";
import PreviewRoles from "../../CommonComponents/PreviewRoles";

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;
const {fetchActiveDepartmentsForDropdown} = DepartmentSetupMiddleware;

const {FETCH_PROFILE_DETAILS, FETCH_ACTIVE_PROFILES_BY_DEPARTMENT_ID} = AdminModuleAPIConstants.profileSetupAPIConstants;
const {FETCH_DEPARTMENTS_FOR_DROPDOWN} = AdminModuleAPIConstants.departmentSetupAPIConstants;
const {CREATE_ADMIN} = AdminModuleAPIConstants.adminSetupAPIConstants;

class AdminAdd extends PureComponent {

    state = {
        department: null,
        profile: null,
        fullName: '',
        username: '',
        email: '',
        mobileNumber: '',
        status: 'Y',
        hasMacBinding: false,
        genderCode: '',
        macIdList: [],
        departmentList: [],
        profileList: [],
        errorMessageForAdminName: 'Admin Name should not contain special characters.',
        errorMessageForAdminMobileNumber: 'Mobile number should be of 10 digits.',
        showImageUploadModal: false,
        showConfirmModal: false,
        adminAvatar: null,
        adminAvatarURL: '',
        showAlert: false,
        alertMessageInfo: {
            variant: "",
            message: ""
        },
        adminImage: '',
        adminImageCroppedUrl: '',
        adminFileCropped: '',
        fullNameValid: false,
        emailValid: false,
        mobileNumberValid: false,
        profileData: {},
        showProfileDetailModal: false
    };

    resetStateValues = () => {
        this.setState({
            department: null,
            profile: null,
            fullName: '',
            username: '',
            email: '',
            password: '',
            mobileNumber: '',
            genderCode: '',
            status: 'Y',
            hasMacBinding: '',
            macIdList: [],
            departmentList: [],
            profileList: [],
            showImageUploadModal: false,
            showConfirmModal: false,
            adminImage: '',
            adminImageCroppedUrl: '',
            adminFileCropped: '',
            adminAvatar: null,
            adminAvatarUrl: '',
            fullNameValid: false,
            emailValid: false,
            mobileNumberValid: false,
        })
    };

    closeProfileDetailsViewModal = () => {
        this.setState({
            showProfileDetailModal: false
        })
    };

    setMacIdListInState = macIds => this.setState({macIdList: [...macIds]});

    setStateValues = (key, value, label, fieldValid) =>
        label ? value ?
            this.setState({[key]: {value, label}})
            : this.setState({[key]: null})
            : this.setState({[key]: value, [key + "Valid"]: fieldValid});

    setShowModal = () => this.setState({showImageUploadModal: !this.state.showImageUploadModal});

    setShowConfirmModal = () => this.setState({showConfirmModal: !this.state.showConfirmModal});

    addMacIdObjectToMacIdList = (hasMacBinding) => {
        let tempArray = AdminSetupUtils.addRemoveMacAddressObject(hasMacBinding, this.state.macIdList);
        this.setMacIdListInState(tempArray);
    };

    checkFormValidity = () => {
        const {
            department, profile, fullName, username, email, mobileNumber, genderCode, fullNameValid,
            emailValid, mobileNumberValid
        } = this.state;

        let formValidity = department && profile && fullNameValid && fullName && username && emailValid
            && email && mobileNumberValid && mobileNumber && genderCode;

        this.setState({
            formValid: Boolean(formValidity)
        })
    };

    closeAlert = () => {
        this.props.clearAdminSuccessErrorMessagesFromStore();
        this.setState({
            showAlert: !this.state.showAlert
        });
    };

    validateMacId = (macId) => {
        let macIdPattern = /^([0-9a-fA-F]{2}[:.-]){5}[0-9a-fA-F]{2}$/;
        return macIdPattern.test(macId);
    };

    actionsOnHospitalChange = async value => {
        if (value) {
            await this.fetchDepartmentsByHospitalId(value);
            const {departmentsByHospital} = this.props.DepartmentSetupReducer;
            this.setState({
                department: null,
                profile: null,
                departmentList: departmentsByHospital ? departmentsByHospital : [],
                profileList: []
            })
        } else {
            this.setState({
                department: null,
                profile: null,
                departmentList: [],
                profileList: []
            })
        }
    };

    actionsOnDepartmentChange = async value => {
        if (value) {
            await this.fetchProfilesByDepartmentId(value);
            const {activeProfilesByDepartmentId} = this.props.ProfileSetupReducer;
            this.setState({
                profile: null,
                profileList: activeProfilesByDepartmentId ? activeProfilesByDepartmentId : [],
            })
        } else {
            this.setState({
                profile: null,
                profileList: []
            })
        }
    };

    handleEnter = (event) => {
        EnterKeyPressUtils.handleEnter(event);
    };

    handleOnChange = async (event, fieldValid) => {
        if (event) {
            let fieldName = event.target.name;
            let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
            let label = event.target.label;
            await this.setStateValues(fieldName, value, label, fieldValid);
            switch (fieldName) {
                case "department":
                    this.actionsOnDepartmentChange(value);
                    break;
                case "hasMacBinding":
                    this.addMacIdObjectToMacIdList(value);
                    break;
            }
            this.checkFormValidity();
        }
    };

    handleMacIdChange = (event, index) => {
        let macIdValue = event.target.value;
        let macIds = [...this.state.macIdList];
        let macIdAlreadyExists = macIds.length > 0 && macIds.find(macId => macId.macId === macIdValue);
        macIds[index].macId = macIdValue;
        macIds[index].errorMessage = macIdValue && (!this.validateMacId(macIdValue) ? "Invalid MAC Id."
            : (macIdAlreadyExists ? 'MAC Id Already added.' : ''));
        this.setMacIdListInState(macIds);
    };

    handleAddMoreMacId = () => {
        this.addMacIdObjectToMacIdList(true);
    };

    handleRemoveMacId = (macId, index) => {
        let macIds = [...this.state.macIdList];
        macIds.splice(index, 1);
        this.setMacIdListInState(macIds);
    };

    handleImageSelect = imageUrl => {
        imageUrl && this.setState({adminImage: imageUrl})
    };

    handleCropImage = (croppedImageUrl) => {
        croppedImageUrl && this.setState({
            adminImageCroppedUrl: croppedImageUrl
        });
    };

    handleImageUpload = async (croppedImageFile) => {
        let croppedImage = this.state.adminImageCroppedUrl;
        await this.setState({
            adminAvatar: new File([croppedImageFile], "adminAvatar.jpeg"),
            adminAvatarUrl: croppedImage,
            showImageUploadModal: false
        })
    };

    handleConfirmClick = async () => {
        const {
            profile, fullName, username, email, mobileNumber, genderCode,
            status, hasMacBinding, macIdList, adminAvatar,
        } = this.state;

        let adminRequestDTO = {
            email,
            fullName,
            username,
            hasMacBinding: hasMacBinding ? 'Y' : 'N',
            mobileNumber,
            status,
            genderCode: genderCode,
            profileId: profile.value,
            macAddressInfo: macIdList.length ? macIdList.map(macId => {
                return macId.macId
            }) : [],
            baseUrl: EnvironmentVariableGetter.CLIENT_SERVER_DOMAIN.concat(":".concat(EnvironmentVariableGetter.CLIENT_PORT))
        };

        let formData = new FormData();
        formData.append('file', new File([adminAvatar], username.concat('-picture.jpeg')));
        try {
            await this.props.createAdmin(CREATE_ADMIN, adminRequestDTO, formData);
            await this.resetStateValues();
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "success",
                    message: this.props.AdminSetupReducer.successMessage
                }
            })
        } catch (e) {
            await this.setShowConfirmModal();
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "danger",
                    message: this.props.AdminSetupReducer.errorMessage ? this.props.AdminSetupReducer.errorMessage : e.message
                }
            })
        }

    };

    handleViewProfileDetails = async (profileId) => {
        try {
            await this.fetchProfileDetails(profileId);
            const {
                profilePreviewData,
            } = this.props.ProfilePreviewReducer;

            let profileData = profilePreviewData && await ProfileSetupUtils.prepareProfilePreviewData(profilePreviewData);
            this.setState({
                profileData,
                showProfileDetailModal: true
            });
        } catch (e) {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "danger",
                    message: this.props.ProfilePreviewReducer.profilePreviewErrorMessage,
                }
            })
        }
    };

    fetchProfileDetails = async (profileId) => {
        await this.props.previewProfile(FETCH_PROFILE_DETAILS, profileId);
    };

    fetchDepartmentsByHospitalId = async () => {
        await this.props.fetchActiveDepartmentsForDropdown(FETCH_DEPARTMENTS_FOR_DROPDOWN);
    };

    fetchProfilesByDepartmentId = async value => {
        value && await this.props.fetchActiveProfilesByDepartmentId(FETCH_ACTIVE_PROFILES_BY_DEPARTMENT_ID, value);
    };

    initialAPICalls = () => {
        this.fetchDepartmentsByHospitalId();
    };

    componentDidMount() {
        this.initialAPICalls();
    }

    render() {
        const {
            department, profile, fullName, username, email, genderCode, mobileNumber,
            status, hasMacBinding, macIdList, departmentList, profileList, adminAvatar, adminAvatarUrl, errorMessageForAdminMobileNumber,
            errorMessageForAdminName, showImageUploadModal, adminImage, adminImageCroppedUrl, showProfileDetailModal,
            profileData
        } = this.state;

        const {dropdownErrorMessage} = this.props.ProfileSetupReducer;
        const {isCreateAdminLoading} = this.props.AdminSetupReducer;
        const {departments} = this.props.DepartmentSetupReducer;

        return <>
            <div className=" ">
                <Container className="bg-white add-container" fluid>
                    <>
                        <CButton
                            id="resetAdminForm"
                            variant='outline-secondary'
                            size='sm'
                            name='Reset'
                            className="mb-2  float-right"
                            onClickHandler={this.resetStateValues}>
                            <>&nbsp;<i className='fa fa-refresh'/></>
                        </CButton>
                        <AdminInfoForm
                            adminInfoObj={{
                                department: department,
                                profile: profile,
                                fullName: fullName,
                                username: username,
                                email: email,
                                genderCode: genderCode,
                                mobileNumber: mobileNumber,
                                status: status,
                                hasMacBinding: hasMacBinding,
                                macIdList: macIdList,
                                adminAvatar: adminAvatar,
                                adminAvatarUrl: adminAvatarUrl
                            }}
                            onEnterKeyPress={this.handleEnter}
                            onInputChange={this.handleOnChange}
                            onMacIdChange={this.handleMacIdChange}
                            onAddMoreMacId={this.handleAddMoreMacId}
                            onRemoveMacId={this.handleRemoveMacId}
                            departmentList={departments}
                            profileList={profileList}
                            errorMessageForAdminName={errorMessageForAdminName}
                            errorMessageForAdminMobileNumber={errorMessageForAdminMobileNumber}
                            errorMessageForProfileDropdown={dropdownErrorMessage}
                            showModal={showImageUploadModal}
                            setShowModal={this.setShowModal}
                            onImageUpload={this.handleImageUpload}
                            adminImage={adminImage}
                            adminCroppedImage={adminImageCroppedUrl}
                            onImageSelect={this.handleImageSelect}
                            onImageCrop={this.handleCropImage}
                            viewProfileDetails={this.handleViewProfileDetails}
                            isCreateAdminLoading={isCreateAdminLoading}
                        />
                        <Row className="mt-4">
                            <Col
                                sm={12} md={{span: 3, offset: 9}}>
                                <CButton
                                    id="save-admin"
                                    variant="primary "
                                    className="float-right btn-action"
                                    name="Save"
                                    disabled={!this.state.formValid}
                                    isLoading={isCreateAdminLoading}
                                    onClickHandler={this.setShowConfirmModal}>
                                </CButton>
                                <AdminConfirmationModal
                                    showModal={this.state.showConfirmModal}
                                    setShowModal={this.setShowConfirmModal}
                                    onConfirmClick={this.handleConfirmClick}
                                    adminInfoObj={{
                                        department: department,
                                        profile: profile,
                                        fullName: fullName,
                                        username: username,
                                        email: email,
                                        genderCode: genderCode,
                                        mobileNumber: mobileNumber,
                                        status: status ? 'Y' : 'N',
                                        hasMacBinding: hasMacBinding,
                                        macIdList: macIdList,
                                        adminAvatar: adminAvatar,
                                        adminAvatarUrl: adminAvatarUrl
                                    }}
                                    adminImage={adminImageCroppedUrl}
                                    isCreateAdminLoading={isCreateAdminLoading}
                                />
                            </Col>
                        </Row>
                    </>

                    {
                        showProfileDetailModal &&
                        <PreviewRoles
                            showModal={showProfileDetailModal}
                            setShowModal={this.closeProfileDetailsViewModal}
                            profileData={profileData}
                            rolesJson={menuRoles}/>
                    }
                    <CAlert
                        id="profile-manage"
                        variant={this.state.alertMessageInfo.variant}
                        show={this.state.showAlert}
                        onClose={this.closeAlert}
                        alertType={this.state.alertMessageInfo.variant === "success" ? <><Material.MdDone/>
                        </> : <><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                        </>}
                        message={this.state.alertMessageInfo.message}
                    />
                </Container>
            </div>
        </>;
    }
}

export default ConnectHoc(AdminAdd,
    [
        'ProfileSetupReducer',
        'AdminSetupReducer',
        'ProfilePreviewReducer',
        'DepartmentSetupReducer'
    ],
    {
        createAdmin,
        clearAdminSuccessErrorMessagesFromStore,
        previewProfile,
        fetchActiveDepartmentsForDropdown,
        fetchActiveProfilesByDepartmentId
    });