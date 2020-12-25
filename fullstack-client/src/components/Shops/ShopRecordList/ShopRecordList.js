import React from "react";
import { ShopRecord } from './ShopRecord'

export const ShopRecordList = (props) => {

    return (
        <>
            <div className="shop-record-list-container" style={{ margin: "0 0", lineHeight: "1.75rem", }}> 
            <button>Add Record</button>
            {props.currentShop.records.map(record => {
                return <ShopRecord shopRecord={record} />
            })}
            </div>
        </>
    )
};