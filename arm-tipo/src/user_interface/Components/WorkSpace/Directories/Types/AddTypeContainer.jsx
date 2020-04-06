import React from 'react';
import {addTypeCreator, updateTypeNameKzCreator, updateTypeNameRuCreator} from "../../../../../redux/TypeReducer";
import AddType from "./AddType";

const AddTypeContainer = (props) => {

    console.log('from state: ' + props.state.typesDir.newTypeNameRu + ' - ' + props.state.typesDir.newTypeNameKz);

    const addType = () => {
        props.dispatch(addTypeCreator());
    };

    const updateNameRu = (ru) => {
        props.dispatch(updateTypeNameRuCreator(ru));
    };

    const updateNameKz = (kz) => {
        props.dispatch(updateTypeNameKzCreator(kz));
    };

    return (
        <AddType
            addType={addType}
            updateTypeNameRu={updateNameRu}
            updateTypeNameKz={updateNameKz}
            typesDir={props.state.typesDir}
        />
    );
};

export default AddTypeContainer;