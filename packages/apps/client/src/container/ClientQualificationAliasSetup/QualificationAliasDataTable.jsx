import React from 'react';
import {CFControl, CLoading, CPagination, CSelect, CTable} from "@frontend-appointment/ui-elements";
import StatusRenderer from "../CommonComponents/table-components/StatusRenderer";
import {ActionFilterUtils} from "@frontend-appointment/helpers";

const {checkIfRoleExists} = ActionFilterUtils;

const QualificationAliasDataTable = ({tableData}) => {
    const {
        qualificationAliasList,
        isSearchQualificationAliasLoading,
        searchErrorMessage,
        currentPage,
        maxSize,
        totalItems,
        handlePageChange,
        aliasData,
        handleCancel,
        handleEdit,
        handleSave,
        handleUpdate,
        handleDelete,
        formValid,
    } = tableData;
    return <>
        <div className="manage-details">
            <h5 className="title">Qualification Alias Setup</h5>
            {!isSearchQualificationAliasLoading && !searchErrorMessage && qualificationAliasList.length ?
                (
                    <>
                        <CTable
                            id="qualification-alias"
                            columnDefinition={[
                                {
                                    headerName: 'Name',
                                    field: 'name',
                                    editComponent: prop => <CFControl
                                        id="name"
                                        name='name'
                                        type="text"
                                        reference={prop.reff}
                                        defaultValue={aliasData.name}
                                    />,
                                },
                                {
                                    headerName: 'Status',
                                    field: 'status',
                                    editComponent: prop => <CSelect
                                        {...prop}
                                        id="status"
                                        name='status'
                                        innerRef={prop.reff}
                                        options={[
                                            {
                                                label: 'Active', value: 'Y'
                                            },
                                            {
                                                label: 'Inactive', value: 'N'
                                            },
                                        ]}
                                        defaultValue={aliasData.status}
                                    />,
                                    displayComponent: prop => <StatusRenderer {...prop}/>
                                }
                            ]}
                            rowData={qualificationAliasList}
                            headerBordered={true}
                            headerClassName="table-header"
                            bodyClassName="table-body"
                            footerClassName="table-footer"
                            onCancel={handleCancel}
                            onEdit={handleEdit}
                            // onSave={checkIfRoleExists(filteredAction, 2) ? handleSave : ''}
                            // onUpdate={checkIfRoleExists(filteredAction, 3) ? handleUpdate : ''}
                            // onDelete={checkIfRoleExists(filteredAction, 5) ? handleDelete : ''}
                            onSave={handleSave}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                            // onPreview={}
                        />

                        <CPagination
                            totalItems={totalItems}
                            maxSize={maxSize}
                            currentPage={currentPage}
                            onPageChanged={handlePageChange}
                        />
                    </>
                )
                : !isSearchQualificationAliasLoading && searchErrorMessage ? (
                    <div className="filter-message">
                        <div className="no-data">
                            <i className="fa fa-file-text-o"/>
                        </div>
                        <div className="message"> {searchErrorMessage}</div>
                    </div>
                ) : (
                    <CLoading/>
                )}
        </div>
    </>;
};

export default QualificationAliasDataTable;
