/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { RecordActionButton } from '../../Records/RecordActionButton'

import { useHistory } from "react-router-dom";


export const ShopRecord = (props) => {

    const [inStack, setInStack] = useState(false)

    useEffect(() => {
        const stackIds = props.stackItems.map(s => s.record.id)
        if(stackIds.indexOf(props.shopRecord.id) >= 0) {
            setInStack(true)
    } else {
        setInStack(false)
    }
    }, [props.stackItems])

    const history = useHistory();

    return (
        <>
            <div className={props.conditionalItemClass} style={{ margin: "0 0", lineHeight: "1.75rem", }}>
            <h4>{props.shopRecord.name}</h4>
            <img alt={`Thumbnail of ${props.shopRecord.name} by ${props.shopRecord.artist}`} onClick={() => {
                history.push(`/records/${props.shopRecord.id}`)
                }} src={props.shopRecord.image_url} />
            <h4>{props.shopRecord.artist}</h4>
            <RecordActionButton inStack={inStack} {...props} currentUserProfile={props.currentUserProfile}/>
            </div>
        </>
    )
};