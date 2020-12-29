import React from "react";
import { ShopRecord } from './ShopRecord'

export const ShopRecordList = (props) => {

    return (
        <>
            <div className="shop-record-list-container" style={{ margin: "0 0", lineHeight: "1.75rem", }}> 
            {props.currentShop.records.map(record => {
                return <ShopRecord {...props} key={record.id} profile_type={props.profile_type} shopRecord={record} />
            })}
            </div>
        </>
    )
};