import React, {useContext, useRef} from "react";

import {RecordContext} from '../Records/RecordProvider'
import { StackContext } from '../Customers/Stacks/StackProvider'

import { AddRecordForm } from "../Shops/ShopRecordList/AddRecordForm/AddShopRecordForm"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap';

export const RecordActionButton = (props) => {

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
        removeStackItem(props.shopRecord.id)
    }

    const isRecordInStack = () => {
        if(props.inStack) {
            return (
                <Button color="warning" onClick={handleStackDelete}>Remove from stack</Button> 
            )
        } else {
            return (
                <Button color="success" onClick={handleStackAdd}>Add to stack</Button> 
            )
        }
    }

    const setButtonForUser = () => {
        if(props.currentUserProfile === 1) {
            return null
        } else if (props.currentUserProfile === 2) {
            if(props.isMyShop) {
                return <> 
                <Button color="danger" onClick={handleRecordDelete}><FontAwesomeIcon icon={faTimesCircle} /></Button>
                <Button color="warning" onClick={(e) => {
                        addRecordDialog.current.showModal()}}>Edit</Button>
                <dialog className="dialog dialog--addRecord" ref={addRecordDialog}>
                <Button color="danger" onClick={e => {addRecordDialog.current.close()}}><FontAwesomeIcon icon={faTimesCircle} /></Button>
                    <AddRecordForm shopRecord={props.shopRecord} modalComponent={"editRecord"}/>    
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