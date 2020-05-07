import {combineReducers} from 'redux'
// import { LOCATION_CHANGE } from 'react-router-redux';
import {
    AdminDeleteReducer,
    AdminEditReducer,
    AdminListReducer,
    AdminLoggingDiagramSearchReducer,
    AdminLoggingSearchReducer,
    AdminLoggingStatsSearchReducer,
    AdminPreviewReducer,
    AdminSetupReducer,
    AppointmentApprovalListReducer,
    AppointmentApproveReducer,
    AppointmentDetailReducer,
    AppointmentLogListReducer,
    AppointmentModeDeleteReducer,
    AppointmentModeDropdownReducer,
    AppointmentModeEditReducer,
    AppointmentModePreviewReducer,
    AppointmentModeSaveReducer,
    AppointmentModeSearchReducer,
    AppointmentRefundDetailReducer,
    AppointmentRefundListReducer,
    AppointmentRefundReducer,
    AppointmentRefundRejectReducer,
    AppointmentRejectReducer,
    AppointmentStatusListReducer,
    BreakTypeDeleteReducer,
    BreakTypeDropdownReducer,
    BreakTypeEditReducer,
    BreakTypeSaveReducer,
    BreakTypeSearchReducer,
    CompanyAdminReducer,
    companyDeleteReducer,
    companyDropdownReducer,
    companyPreviewReducer,
    CompanyProfileCreateReducer,
    CompanyProfileDeleteReducer,
    CompanyProfileDropdownReducer,
    CompanyProfileEditReducer,
    CompanyProfilePreviewReducer,
    CompanyProfileSearchReducer,
    companySaveReducer,
    companySearchReducer,
    companyUpdateReducer,
    CountryCodeDropdownReducer,
    CountryDropdownReducer,
    DashboardAppointmentQueueReducer,
    DashboardAppointmentStatisticsReducer,
    DashboardFeaturesByAdminReducer,
    DashboardFeaturesReducer,
    DashboardRegisteredPatientReducer,
    DashboardRevenueGeneratedByDoctorReducer,
    DashboardRevenueGeneratedDayReducer,
    DashboardRevenueGeneratedMonthReducer,
    DashboardRevenueGeneratedWeekReducer,
    DashboardRevenueGeneratedYearReducer,
    DashboardRevenueStatisticsReducer,
    DepartmentDeleteReducer,
    DepartmentDropdownReducer,
    DepartmentEditReducer,
    DepartmentListReducer,
    DepartmentPreviewReducer,
    DepartmentSetupReducer,
    DoctorDeleteReducer,
    DoctorDropdownReducer,
    DoctorDutyRosterDeleteReducer,
    DoctorDutyRosterEditReducer,
    DoctorDutyRosterListReducer,
    DoctorDutyRosterPreviewReducer,
    DoctorDutyRosterSaveReducer,
    DoctorEditReducer,
    DoctorPreviewReducer,
    DoctorSaveReducer,
    DoctorSearchReducer,
    ForgotPasswordVerification,
    HospitalDeleteReducer,
    HospitalDropdownReducer,
    HospitalEditReducer,
    HospitalPreviewReducer,
    HospitalSaveReducer,
    HospitalSearchReducer,
    loggedInAdminInfoReducer,
    loginReducers as login,
    logoutReducer,
    PatientDetailReducer,
    PatientDropdownListReducer,
    PatientDropdownWithoutHospitalListReducer,
    PatientEditReducer,
    PatientPreviewReducer,
    PatientSearchReducer,
    ProfileDeleteReducer,
    ProfileEditReducer,
    ProfileListReducer,
    ProfilePreviewReducer,
    ProfileSetupReducer,
    QualificationAliasDeleteReducer,
    QualificationAliasDropdownReducer,
    QualificationAliasEditReducer,
    QualificationAliasSaveReducer,
    QualificationAliasSearchReducer,
    QualificationDeleteReducer,
    QualificationDropdownReducer,
    QualificationEditReducer,
    QualificationPreviewReducer,
    QualificationSaveReducer,
    QualificationSearchReducer,
    RescheduleLogReducer,
    ShiftDeleteReducer,
    ShiftDropdownReducer,
    ShiftEditReducer,
    ShiftSaveReducer,
    ShiftSearchReducer,
    SpecializationDeleteReducer,
    SpecializationDropdownReducer,
    SpecializationEditReducer,
    SpecializationPreviewReducer,
    SpecializationSaveReducer,
    SpecializationSearchReducer,
    TransactionLogReducer,
    UniversitiesForDropdownReducer,
    UniversityDeleteReducer,
    UniversityDropdownReducer,
    UniversityEditReducer,
    UniversityPreviewReducer,
    UniversitySaveReducer,
    UniversitySearchReducer,
    WeekdaysReducer,
} from '../reducers'

const {
    ForgotPasswordReducer,
    VerificationCodeReducer,
    ChangePasswordForgotReducer
} = ForgotPasswordVerification
const {
    CompanyAdminDeleteReducer,
    CompanyAdminEditReducer,
    CompanyAdminListReducer,
    CompanyAdminPreviewReducer,
    CompanyAdminSetupReducer,
    CompanyAdminMetaInfoReducer,
    CompanyAdminMetaInfoByCompanyIdReducer
} = CompanyAdminReducer
const appReducers = combineReducers({
    AdminDeleteReducer,
    AdminEditReducer,
    AdminListReducer,
    AdminLoggingDiagramSearchReducer,
    AdminLoggingSearchReducer,
    AdminLoggingStatsSearchReducer,
    AdminPreviewReducer,
    AdminSetupReducer,
    AppointmentApprovalListReducer,
    AppointmentApproveReducer,
    AppointmentDetailReducer,
    AppointmentLogListReducer,
    AppointmentModeDeleteReducer,
    AppointmentModeDropdownReducer,
    AppointmentModeEditReducer,
    AppointmentModePreviewReducer,
    AppointmentModeSaveReducer,
    AppointmentModeSearchReducer,
    AppointmentRefundDetailReducer,
    AppointmentRefundListReducer,
    AppointmentRefundReducer,
    AppointmentRefundRejectReducer,
    AppointmentRejectReducer,
    AppointmentStatusListReducer,
    BreakTypeDeleteReducer,
    BreakTypeDropdownReducer,
    BreakTypeEditReducer,
    BreakTypeSaveReducer,
    BreakTypeSearchReducer,
    ChangePasswordForgotReducer,
    CompanyAdminDeleteReducer,
    CompanyAdminEditReducer,
    CompanyAdminListReducer,
    CompanyAdminMetaInfoByCompanyIdReducer,
    CompanyAdminMetaInfoReducer,
    CompanyAdminPreviewReducer,
    CompanyAdminSetupReducer,
    companyDeleteReducer,
    companyDropdownReducer,
    companyPreviewReducer,
    CompanyProfileCreateReducer,
    CompanyProfileDeleteReducer,
    CompanyProfileDropdownReducer,
    CompanyProfileEditReducer,
    CompanyProfilePreviewReducer,
    CompanyProfileSearchReducer,
    companySaveReducer,
    companySearchReducer,
    companyUpdateReducer,
    CountryCodeDropdownReducer,
    CountryDropdownReducer,
    DashboardAppointmentQueueReducer,
    DashboardAppointmentStatisticsReducer,
    DashboardFeaturesByAdminReducer,
    DashboardFeaturesReducer,
    DashboardRegisteredPatientReducer,
    DashboardRevenueGeneratedByDoctorReducer,
    DashboardRevenueGeneratedDayReducer,
    DashboardRevenueGeneratedMonthReducer,
    DashboardRevenueGeneratedWeekReducer,
    DashboardRevenueGeneratedYearReducer,
    DashboardRevenueStatisticsReducer,
    DepartmentDeleteReducer,
    DepartmentDropdownReducer,
    DepartmentEditReducer,
    DepartmentListReducer,
    DepartmentPreviewReducer,
    DepartmentSetupReducer,
    DoctorDeleteReducer,
    DoctorDropdownReducer,
    DoctorDutyRosterDeleteReducer,
    DoctorDutyRosterEditReducer,
    DoctorDutyRosterListReducer,
    DoctorDutyRosterPreviewReducer,
    DoctorDutyRosterSaveReducer,
    DoctorEditReducer,
    DoctorPreviewReducer,
    DoctorSaveReducer,
    DoctorSearchReducer,
    ForgotPasswordReducer,
    HospitalDeleteReducer,
    HospitalDropdownReducer,
    HospitalEditReducer,
    HospitalPreviewReducer,
    HospitalSaveReducer,
    HospitalSearchReducer,
    loggedInAdminInfoReducer,
    loginReducers: login,
    logoutReducer,
    PatientDetailReducer,
    PatientDropdownListReducer,
    PatientDropdownWithoutHospitalListReducer,
    PatientEditReducer,
    PatientPreviewReducer,
    PatientSearchReducer,
    ProfileDeleteReducer,
    ProfileEditReducer,
    ProfileListReducer,
    ProfilePreviewReducer,
    ProfileSetupReducer,
    QualificationAliasDeleteReducer,
    QualificationAliasDropdownReducer,
    QualificationAliasEditReducer,
    QualificationAliasSaveReducer,
    QualificationAliasSearchReducer,
    QualificationDeleteReducer,
    QualificationDropdownReducer,
    QualificationEditReducer,
    QualificationPreviewReducer,
    QualificationSaveReducer,
    QualificationSearchReducer,
    RescheduleLogReducer,
    ShiftDeleteReducer,
    ShiftDropdownReducer,
    ShiftEditReducer,
    ShiftSaveReducer,
    ShiftSearchReducer,
    SpecializationDeleteReducer,
    SpecializationDropdownReducer,
    SpecializationEditReducer,
    SpecializationPreviewReducer,
    SpecializationSaveReducer,
    SpecializationSearchReducer,
    TransactionLogReducer,
    UniversitiesForDropdownReducer,
    UniversityDeleteReducer,
    UniversityDropdownReducer,
    UniversityEditReducer,
    UniversityPreviewReducer,
    UniversitySaveReducer,
    UniversitySearchReducer,
    VerificationCodeReducer,
    WeekdaysReducer,
})

export const rootReducers = (state, action) => {
    if (action.type === 'LOCATION_CHANGE') {
        state = {}
    }
    return appReducers(state, action)
}
