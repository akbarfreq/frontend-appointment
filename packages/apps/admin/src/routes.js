import Loadable from 'react-loadable';
import React from 'react';
import {CUnauthorized, CLoading} from '@frontend-appointment/ui-elements';

const getLoader = () => <CLoading/>;
/* ****** A ***** */

const AddProfileComponent = Loadable({
    loader: () => import('./container/ProfileSetup/Add/ProfileAdd'),
    loading: () => getLoader()
});
const AddDepartmentComponent = Loadable({
    loader: () => import('./container/DepartmentSetup/Add/DepartmentAdd'),
    loading: () => getLoader()
});
const AddAdminComponent = Loadable({
    loader: () => import('./container/AdminSetup/Add/AdminAdd'),
    loading: () => getLoader()
});

const AddSpecializationComponent = Loadable({
    loader: () => import('./container/SpecializationSetup/Add/SpecializationAdd'),
    loading: () => getLoader()
});
/* ****** B ***** */

/* ****** C ***** */

/* ****** D ***** */

const DashboardComponent = Loadable({
    loader: () => import('./container/AdminDashboard/AdminDashboard'),
    loading: () => getLoader(),
});

/* ****** E ***** */

/* ****** F ***** */

/* ****** G ***** */

/* ****** H ***** */

/* ****** I ***** */

/* ****** J ***** */

/* ****** K ***** */

/* ****** L ***** */

/* ****** M ***** */

const ManageProfileComponent = Loadable({
    loader: () => import('./container/ProfileSetup/Manage/ProfileManage'),
    loading: () => getLoader()
});

const ManageDepartmentComponent = Loadable({
    loader: () => import('./container/DepartmentSetup/Manage/DepartmentManage'),
    loading: () => getLoader()
});

const ManageSpecializationComponent = Loadable({
    loader: () => import('./container/SpecializationSetup/Manage/SpecializationManage'),
    loading: () => getLoader()
});

const ManageAdminComponent = Loadable({
    loader: () => import('./container/AdminSetup/Manage/AdminManage'),
    loading: () => getLoader()
});

/* ****** N ***** */

/* ****** O ***** */

/* ****** P ***** */

const ProfileComponent = Loadable({
    loader: () => import('./container/ProfileSetup/ProfileSetup'),
    loading: () => getLoader(),
});
/* ****** Q ***** */

/* ****** R ***** */

/* ****** S ***** */

/* ****** T ***** */

/* ****** U ***** */

/* ****** V ***** */

/* ****** W ***** */

/* ****** X ***** */

/* ****** Y ***** */

/* ****** Z ***** */

export const routes = [
    {
        "path": "/admin/dashboard",
        "component": DashboardComponent,
        "isLink": true,
        "icon": "",
        "hasTab": false,
        "name": "Dashboard"
    },
    {
        "path": "/admin/profile",
        "component": ProfileComponent,
        "isLink": false,
        "icon": "",
        "hasTab": true,
        "isTab": false,
        "name": "Profile Setup"
    },
    {
        "path": "/admin/profile/add",
        "name": "Add",
        "component": AddProfileComponent,
        "icon": "",
        "hasTab": true,
        "isLink": true
    },
    {
        "path": "/admin/profile/manage",
        "component": ManageProfileComponent,
        "icon": "",
        "hasTab": true,
        "isLink": true,
        "name": "Manage",
    },
    {
        "path": "/admin/specialization/add",
        "component": AddSpecializationComponent,
        "icon": "",
        "hasTab": true,
        "isLink": true,
        "name": "Add",
    },
    {
        "path": "/admin/specialization/Manage",
        "component": ManageSpecializationComponent,
        "icon": "",
        "hasTab": true,
        "isLink": true,
        "name": "Manage",
    },
    {
        "path": "/admin/department",
        "component": <></>,
        "isLink": false,
        "icon": "",
        "hasTab": true,
        "isTab": false,
        "name": "Department Setup"
    },
    {
        "path": "/admin/department/add",
        "name": "Add",
        "component": AddDepartmentComponent,
        "icon": "",
        "hasTab": true,
        "isLink": true
    },
    {
        "path": "/admin/department/manage",
        "name": "Add",
        "component": ManageDepartmentComponent,
        "icon": "",
        "hasTab": true,
        "isLink": true
    },
    {
        "path": "/admin/admin-setup",
        "name": "Admin Setup",
        "component": <></>,
        "icon": "",
        "hasTab": true,
        "isLink": true
    },
    {
        "path": "/admin/admin-setup/add",
        "name": "Add",
        "component": AddAdminComponent,
        "icon": "",
        "hasTab": true,
        "isLink": true
    },
    {
        "path": "/admin/admin-setup/manage",
        "name": "Manage",
        "component": ManageAdminComponent,
        "icon": "",
        "hasTab": true,
        "isLink": true
    }
    // {
    //     "path": "",
    //     "component": CUnauthorized,
    //     "icon": "",
    //     "hasTab": false,
    //     "isLink": false,
    //     "name": "Unauthorized"
    // }

];
