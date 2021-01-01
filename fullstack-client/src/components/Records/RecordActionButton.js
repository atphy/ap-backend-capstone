import React, {useContext, useState, useEffect, useRef} from "react";

import {RecordContext} from '../Records/RecordProvider'
import { StackContext } from '../Customers/Stacks/StackProvider'

import { AddRecordForm } from "../Shops/ShopRecordList/AddRecordForm/AddShopRecordForm"

export const RecordActionButton = (props) => {
    const [inStack, setInStack] = useState(false)

    useEffect(() => {
            const stackIds = props.stackItems.map(s => s.record.id)
            if (props.shopRecord.id in stackIds) {
                setInStack(true)
        }
    }, [props.stackItems])

    const addRecordDialog = useRef(null)

    const {addStackItem, removeStackItem} = useContext(StackContext)
    const { deleteRecord } = useContext(RecordContext)

    const newStackItem = {
        "record_id": props.shopRecord.id,
    }

    const handleRecordDelete = (e) => {
        e.preventDefault();
        deleteRecord(props.shopRecord.id)
            .then(props.getAuthedShop)
    }

    const handleStackAdd = (e) => {
        e.preventDefault();
        addStackItem(newStackItem)
    }

    const handleStackDelete = (e) => {
        e.preventDefault();
        removeStackItem()
    }

    const isRecordInStack = () => {
        if(inStack) {
            return (
                <button onClick={handleStackDelete}>Remove from stack</button> 
            )
        } else {
            return (
                <button onClick={handleStackAdd}>Add to stack</button> 
            )
        }
    }

    const setButtonForUser = () => {
        if(props.currentUserProfile === 1) {
            return null
        } else if (props.currentUserProfile === 2) {
            if(props.isMyShop) {
                return <> 
                <button onClick={handleRecordDelete}>X</button>
                <button onClick={() => {
                        addRecordDialog.current.showModal()}}>Edit</button>
                <dialog className="dialog dialog--addRecord" ref={addRecordDialog}>
                    <AddRecordForm modalComponent={"finalForm"}/>    
                </dialog>
                </>
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