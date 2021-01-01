import React from "react"


export const MasterSelectForm = (props) => {

    if (!props.artistMasterList) {
        return null
    }
    return (
        <>
        <h1>Select record</h1>
        {props.artistMastersList ? 
                props.artistMasterList.map(master => {
                    return <h1 key={master.id}>{master.title}</h1>
                })
            : 
            null}
        </>
    )
}