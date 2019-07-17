import React from 'react';
import './checkbox.scss'

function Checkbox(props) {
    return(
        <div>
            <label className="container">{props.label}
                <input type="checkbox" checked={props.checked} onChange={props.onChange}/>
                <span className="checkmark"></span>
            </label>
            </div>
    )
}

export default Checkbox;