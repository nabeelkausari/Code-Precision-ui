import * as React from 'react';
import {Button} from "../../../../components/Buttons/Button";

export const CaseCard = (props) => {
    const {name, description,tags} = props.case;
    return (
        <div className="case-card">
            <div className="case-card__title">{name}</div>
            <div>{description}</div>
            { props.showView && <Button buttonType="primary" onClick={() => props.viewCase(props.case)}>View</Button>}
        </div>
    );
};
export const SelectableCaseCard = (props) => {
    const {case:{id,name, description,tags},selectRecommendation } = props;
    return (
        <div className="case-card" onClick={() =>selectRecommendation(id)}>
            <div className="case-card__title">{name}</div>
            <div>{description}</div>
            <Button buttonType="primary">View</Button>
        </div>
    );
};



export const CreateCaseCard = (props) => {
    return (
        <div className="case-card-create" onClick={props.createCase}>
            <p>Plus</p>
            <p>Create New Case</p>
        </div>
    );
};
export const NoCases = (props) => {
    return (
        <h2>No cases </h2>
    );
};