import * as React from 'react';
import {Button} from "../../../../components/Buttons/Button";

export const CaseCard = (props) => {
    const {name, description,tags} = props.case;
    return (
        <div className="case-card">
            <div className="case-card__title">{name}</div>
            <div>{description}</div>
            <Button buttonType="primary">View</Button>
        </div>
    );
};



export const CreateCaseCard = (props) => {
    return (
        <div className="case-card-create">
            <p>Plus</p>
            <p>Create New Case</p>
        </div>
    );
};