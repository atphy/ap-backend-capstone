import React, { useState } from "react";
import { RecordActionButton } from '../../Records/RecordActionButton'

import { useHistory } from "react-router-dom";


export const ShopRecord = (props) => {

    const [inStack] = useState(false)

    const history = useHistory();

    return (
        <>
            <div className={props.conditionalItemClass} style={{ margin: "0 0", lineHeight: "1.75rem", }}>
            <h4>{props.shopRecord.name}</h4>
            <img alt={`Thumbnail of ${props.shopRecord.name} by ${props.shopRecord.artist}`} onClick={() => {
                history.push(`/records/${props.shopRecord.id}`)
                }} src="https://img.discogs.com/dXtqg_LCoufipJBQhmYQcmGV2AY=/fit-in/150x150/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-4010053-1526605919-5360.jpeg.jpg" />
            <h4>{props.shopRecord.artist}</h4>
            <RecordActionButton inStack={inStack} {...props} currentUserProfile={props.currentUserProfile}/>
            </div>
        </>
    )
};