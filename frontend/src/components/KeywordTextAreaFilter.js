// import React, { useState } from 'react';
// import { useDispatch } from "react-redux";
// import * as actions from '../modules';

// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// // import TextField from '@mui/material/TextField';

// import Form from 'react-bootstrap/Form';
// import { KeywordFilter } from './analyzer/GithruClasses';

// const useStyles = styled(theme => ({
//     container: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     textArea: {
//         marginLeft: theme.spacing(1),
//         marginRight: theme.spacing(1),
//         marginBottom: "8px",
//         fontSize: "12px",
//         minHeight: "50px",
//     },
// }));

// const KeywordTextAreaFilter = props => {
//     // const classes = useStyles(); // Temporarily disabled to fix Symbol error
//     const [ includeFilterStr, setIncludeFilterStr ] = useState("");
//     const [ excludeFilterStr, setExcludeFilterStr ] = useState("");
//     const dispatch = useDispatch();
// // 
//     const parseFilterStr = (str, isIncludes) => {
//         console.log("parseFilterStr", str, isIncludes, str.split("\n"))
//         return str.split("\n").map(d => d.trim()).filter(d => d !== "").map(line => {
//             let items = line.split(":");
//             if (items.length !== 2) {
//                 return undefined;
//             } else {
//                 return new KeywordFilter(isIncludes, items[ 0 ], items[ 1 ]);
//             }
//         });
//     }

//     return (
//         <div align="center" className="flexVerticalContainer" style={{ width: "100%", alignItems: "center" }}>
//             {/* <TextField
//                 style={{ "fontSize": "11px" }} 
//                 id="standard-basic"
//                 className={classes.textField}
//                 margin="none"
//                 size="small"

//                 defaultValue={filters}
//                 onChange={(event) => {
//                     console.log("addFilter!!", event.target.value);
//                     setFilters(event.target.value);
//                 }}
//             /> */}
//             <form className={classes.container} noValidate autoComplete="on">
//                 <Form.Control
//                     className={classes.textArea} as="textarea" rows="2"
//                     placeholder="INCLUDES (a:author, f:file, t:commitType, m:message)"
//                     onChange={(event) => {
//                         setIncludeFilterStr(event.target.value);
//                     }}
//                 />

//                 <Form.Control
//                     className={classes.textArea} as="textarea" rows="2"
//                     placeholder="EXCLUDES (a:author, f:file, t:commitType, m:message)"
//                     onChange={(event) => {
//                         setExcludeFilterStr(event.target.value);
//                     }}
//                 />
//             </form>
//             <div className="flexVerticalContainer" style={{ width: "100%", alignItems: "center" }}>
//                 <Button
//                     style={{ "fontSize": "11px", width: "95%" }} size="small" variant="outlined"
//                     onClick={() => {
//                         let kfList = [];
//                         kfList = kfList.concat(parseFilterStr(includeFilterStr, true));
//                         kfList = kfList.concat(parseFilterStr(excludeFilterStr, false));

//                         if (kfList.filter(d => d === undefined).length > 0) {
//                             alert("insert [dataType]:[keyword]");
//                             return;
//                         }
//                         console.log("keyword filters", kfList);

//                         dispatch(actions.updateKeywordFilterList(kfList));
//                     }}>
//                     FILTER IN/OUT BY KEYWORDS
//                 </Button>
//             </div>
//         </div>
//     );
// }

// Temporary placeholder component
const KeywordTextAreaFilter = () => <div style={{padding: '10px', fontSize: '12px'}}>Keyword Filter (temporarily disabled)</div>;

export default KeywordTextAreaFilter;