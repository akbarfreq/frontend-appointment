import {adminUserMenusJson, clientUserMenusJson, EnvironmentVariableGetter} from "../../index";
import * as UserMenuUtils from "./UserMenuUtils";

export const prepareProfilePreviewData = (userMenusProfile) => {
    let filteredProfiles = {};
    let selectedMenus = [],
        selectedUserMenusForModal = [];

    const {profileResponseDTO, profileMenuResponseDTOS} = userMenusProfile;

    userMenusProfile.hasOwnProperty('profileMenuResponseDTOS') &&
    Object.keys(profileMenuResponseDTOS).map((parentMenuId, idx) => {
        // For each parent menu's selected menus
        let moduleCode = EnvironmentVariableGetter.REACT_APP_MODULE_CODE;
        const userMenus = moduleCode === "ADMIN" ?
            adminUserMenusJson[moduleCode] : clientUserMenusJson[moduleCode];
        const selectedUserMenus = profileMenuResponseDTOS[parentMenuId];
        let selectedParentMenus = new Set();
        let selectedChildMenus = new Set();

        selectedUserMenus &&
        selectedUserMenus.map((selectedMenu, indx) => {
            //filter out the selected unique parent menu and child menus
            selectedMenus.push({...selectedMenu});
            let parent = userMenus && userMenus.find(
                userMenu => Number(userMenu.id) === Number(selectedMenu.parentId)
            );
            parent && selectedParentMenus.add(parent);
            let child = parent && parent.childMenus.length && parent.childMenus.find(childMenu =>
                Number(childMenu.id) === Number(selectedMenu.userMenuId)
            );
            child && selectedChildMenus.add(child)
        });
        selectedUserMenusForModal = selectedUserMenusForModal.concat(Array.from(selectedParentMenus).map(
            // add filtered out child to their respective filtered out parent menu.
            parent => {
                let data = {
                    id: parent.id,
                    name: parent.name,
                    icon: parent.icon,
                    parentId: parent.parentId,
                    roles: [...parent.roles],
                    childMenus: []
                };
                let childrenOfParent = Array.from(selectedChildMenus).filter(
                    child => {
                        return (
                            child.parentId === parent.id && {
                                id: child.id,
                                name: child.name,
                                icon: child.icon,
                                parentId: child.parentId,
                                roles: child.roles,
                                childMenus: []
                            }
                        )
                    }
                );
                data.childMenus = [...childrenOfParent];
                return data
            }
        ));
        filteredProfiles = {
            selectedMenus,
            selectedUserMenusForModal
        }
    });
    let alphabeticallySortedMenus = UserMenuUtils.sortUserMenuJson([...selectedUserMenusForModal]);
    if (profileResponseDTO)
        filteredProfiles = {
            ...filteredProfiles,
            selectedUserMenusForModal: [...alphabeticallySortedMenus],
            profileName: profileResponseDTO.name,
            hospitalValue: {
                value: profileResponseDTO.hospitalId,
                label: profileResponseDTO.hospitalName
            },
            profileDescription: profileResponseDTO.description,
            departmentValue: {
                value: profileResponseDTO.departmentId,
                label: profileResponseDTO.departmentName
            },
            status: profileResponseDTO.status
        };
    return filteredProfiles
};
