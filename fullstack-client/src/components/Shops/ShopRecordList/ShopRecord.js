import React, {useContext} from "react";

import {RecordContext} from '../../Records/RecordProvider'
import { StackContext } from '../../Customers/Stacks/StackProvider'

export const ShopRecord = (props) => {

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

    return (
        <>
            <div className="shop-record-container" style={{ margin: "0 0", lineHeight: "1.75rem", }}>
                {props.profile_type === "shop" ?
                    <button onClick={handleRecordDelete}>X</button> 
                    : isRecordInStack() }
                <img src="https://img.discogs.com/dXtqg_LCoufipJBQhmYQcmGV2AY=/fit-in/150x150/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-4010053-1526605919-5360.jpeg.jpg" />
                <h1>{props.shopRecord.name} by {props.shopRecord.artist}</h1>
            </div>
        </>
    )
};