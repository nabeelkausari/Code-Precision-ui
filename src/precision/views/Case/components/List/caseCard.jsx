import * as React from 'react';
import {Button} from "../../../../components/Buttons/Button";

import {AddIcon} from '../../../../images/index'

export const CaseCard = (props) => {
    const {name, description} = props.case;
    return (
        <div className="case-card">
            <div className="case-card__title">{name}</div>
            <div className="case-card__desc">{description}</div>
            { props.showView && <Button className="case-card__btn" buttonType="primary" onClick={() => props.viewCase(props.case)}>View</Button>}
        </div>
    );
};
export const SelectableCaseCard = (props) => {
    const {case:{id,name, description},selectRecommendation } = props;
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
            <div className="case-card-create__img-wrapper">
                {/*<img src={add_button_icon} alt="create case" />*/}
                <AddIcon className="case-card-create__icon"/>
            </div>
            <p className="case-card-create__text">Create New Case</p>
        </div>
    );
};
export const NoCases = (props) => {
    return (
        <h2>No cases </h2>
    );
};