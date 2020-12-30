import React, {useEffect, useContext} from "react";
import { Link } from "react-router-dom"
import { RecordContext } from './RecordProvider'

export const RecordDetail = (props) => {

    const { getSingleRecord, singleRecord } = useContext(RecordContext)

    useEffect(() => {
        const recordId = parseInt(props.match.params.recordId)
        getSingleRecord(recordId)
    }, [])

    return <>
    <Link to={{pathname:`/`}}>Back to home</Link>
    <h1>{singleRecord.name}</h1>
    <h2>{singleRecord.artist}</h2>
    </>;
};