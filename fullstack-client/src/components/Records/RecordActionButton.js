import React, {useContext} from "react";

import {RecordContext} from '../Records/RecordProvider'
import { StackContext } from '../Customers/Stacks/StackProvider'

import { useHistory } from "react-router-dom";


export const RecordActionButton = (props) => {


    const {addStackItem, removeStackItem} = useContext(StackContext)
    const { deleteRecord } = useContext(RecordContext)

    const handleRecordDelete = (e) => {
        e.preventDefault();
        deleteRecord(props.shopRecord.id)
            .then(props.getAuthedShop)
    }

    const handleStackDelete = (e) => {
        e.preventDefault();
        removeStackItem()
    }

    const isRecordInStack = () => {
        if(props.inStack) {
            return (
                <button>Remove from stack</button> 
            )
        } else {
            return (
                <button>Add to stack</button> 
            )
        }
    }

    const setButtonForUser = () => {
        if(props.currentUserProfile === 1) {
            return null
        } else if (props.currentUserProfile === 2) {
            if(props.isMyShop) {
                return <button onClick={handleRecordDelete}>X</button>
            } else {
                return null
            }
        } else if (props.currentUserProfile === 3) {
            return isRecordInStack()
        }
    }

    return (
        <>
            <div className="record-action-container" style={{ margin: "0 0", lineHeight: "1.75rem", }}>
            {setButtonForUser()}
            </div>
        </>
    )
};