import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const SidePanelContentUnit = (props) => {
    const [show, setShow] = useState( (props.show !== undefined ? props.show : true) );

    return (
        <div style={props.style}>
            <div className="sidepanel-container-header flexContainer">
                <div>{props.title}</div>
                <div
                    style={{cursor:"pointer"}}
                    onClick={ () => setShow(!show)}
                >{show ? <RemoveIcon fontSize="small"/>
                 : <AddIcon fontSize="small" />}</div>
            </div>
            <div className="sidepanel-container-content">
                {show ? props.children : ""}
            </div>
        </div>
    );
}