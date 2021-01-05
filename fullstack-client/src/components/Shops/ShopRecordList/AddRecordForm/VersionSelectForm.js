import React from "react"
import { Loading } from "../../../Loading/Loading"

export const VersionSelectForm = (props) => {


    if (!props.masterVersionsList) {
        return <Loading />
    } else {
    const vinylReleases = props.masterVersionsList.filter(r => r.formats[0].name === "Vinyl")
    return (
        <div className="record-form-container">
        <h1>Select release version</h1>
        {props.masterVersionsList ? 
                vinylReleases.map(version => {
                    return <>
                    <h2 
                    onClick={() => 
                        {
                        props.setInfoForForm(version)    
                        props.componentChangeHandler("recordForm") 
                        }}
                    key={version.id}>{version.title}</h2>
                    <p>{version.country} Pressing, {version.formats[0].descriptions.join(", ")}</p>
                    <p>Released by {version.labels[0].split("'")[1]} in {version.year}</p>
                    <p>{version.notes}</p>
                    </>
                })
            : 
            null}
        </div>
    )}
}