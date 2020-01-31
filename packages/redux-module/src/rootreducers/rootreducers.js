import {combineReducers} from 'redux';
import {
    AdminDeleteReducer,
    AdminEditReducer,
    AdminListReducer,
    AdminPreviewReducer,
    AdminSetupReducer,
    DoctorDeleteReducer,
    DoctorEditReducer,
    DoctorPreviewReducer,
    DoctorSaveReducer,
    DoctorSearchReducer,
    DoctorDropdownReducer,
    DepartmentDeleteReducer,
    DepartmentEditReducer,
    DepartmentListReducer,
    DepartmentPreviewReducer,
    DepartmentSetupReducer,
    DoctorDutyRosterSaveReducer,
    DoctorDutyRosterEditReducer,
    DoctorDutyRosterDeleteReducer,
    DoctorDutyRosterListReducer,
    DoctorDutyRosterPreviewReducer,
    HospitalDeleteReducer,
    HospitalEditReducer,
    HospitalPreviewReducer,
    HospitalSaveReducer,
    HospitalSearchReducer,
    loggedInAdminInfoReducer,
    loginReducers as login,
    logoutReducer,
    ProfileDeleteReducer,
    ProfileEditReducer,
    ProfileListReducer,
    ProfilePreviewReducer,
    ProfileSetupReducer,
    SpecializationDeleteReducer,
    SpecializationEditReducer,
    SpecializationPreviewReducer,
    SpecializationSaveReducer,
    SpecializationSearchReducer,
    SpecializationDropdownReducer,
    HospitalDropdownReducer
} from '../reducers'

export const rootReducers = combineReducers({
    loginReducers: login,
    ProfileSetupReducer,
    ProfileListReducer,
    ProfileDeleteReducer,
    ProfileEditReducer,
    ProfilePreviewReducer,
    SpecializationDeleteReducer,
    SpecializationEditReducer,
    SpecializationPreviewReducer,
    SpecializationSaveReducer,
    SpecializationSearchReducer,
    SpecializationDropdownReducer,
    HospitalDeleteReducer,
    HospitalEditReducer,
    HospitalPreviewReducer,
    HospitalSaveReducer,
    HospitalSearchReducer,
    HospitalDropdownReducer,
    DoctorDeleteReducer,
    DoctorEditReducer,
    DoctorPreviewReducer,
    DoctorSaveReducer,
    DoctorSearchReducer,
    DoctorDropdownReducer,
    DepartmentDeleteReducer,
    DepartmentEditReducer,
    DepartmentListReducer,
    DepartmentPreviewReducer,
    DepartmentSetupReducer,
    DoctorDutyRosterSaveReducer,
    DoctorDutyRosterEditReducer,
    DoctorDutyRosterDeleteReducer,
    DoctorDutyRosterListReducer,
    DoctorDutyRosterPreviewReducer,
    AdminSetupReducer,
    AdminEditReducer,
    AdminDeleteReducer,
    AdminListReducer,
    AdminPreviewReducer,
    loggedInAdminInfoReducer,
    logoutReducer,
});
