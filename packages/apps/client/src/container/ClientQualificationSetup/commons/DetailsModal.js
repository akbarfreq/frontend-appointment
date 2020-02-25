import React from 'react'
import {CFLabel, CForm, CHybridInput, CRadioButton} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'

const DetailsModal = ({qualificationData, type}) => {
    let universityId, qualificationAliasId, universityName;
    if (type !== 'M') {
        universityId = qualificationData.universityId;
        universityName = qualificationData.universityName;
        qualificationAliasId = qualificationData.qualificationAliasId;
    } else {
        universityId = {value: qualificationData.universityId, label: qualificationData.universityName}
        universityName = qualificationData.universityName;
        qualificationAliasId = {
            value: qualificationData.qualificationAliasId,
            label: qualificationData.qualificationAliasName
        }
    }
    return (
        <>
            <Container-fluid>
                <Row className="pl-4 pr-4">
                    <h5>Qualification Info</h5>
                </Row>

                <CForm id="department-info" className="mt-2 ">
                    <Container-fluid>
                        <Row>
                            <Col sm={12} md={4} lg={4}>
                                <CHybridInput
                                    id="qualification-name"
                                    name="name"
                                    placeholder="Qualification Name"
                                    value={qualificationData.name}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={4} xl={4}>
                                <CHybridInput
                                    id="qualificationAliasId"
                                    name="qualificationAliasName"
                                    placeholder="Qualification Alias Id"
                                    value={qualificationAliasId.label}
                                    isDisabled={true}
                                />
                            </Col>
                            <Col sm={12} md={4} xl={4}>
                                <CHybridInput
                                    id="universityId"
                                    name="universityName"
                                    placeholder="University Id"
                                    value={universityName ? universityName : 'N/A'}
                                    isDisabled={true}
                                />
                            </Col>
                            <Col sm={12} md={4} lg={4}>
                                <CFLabel labelName="Status" id="status"></CFLabel>
                                <CRadioButton
                                    checked={Boolean(qualificationData.status)}
                                    disabled={true}
                                    id="radio1"
                                    label="Active"
                                    type="radio"
                                    readOnly
                                />
                            </Col>
                        </Row>
                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    )
}

export default DetailsModal