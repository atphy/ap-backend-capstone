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
    <img alt={`Full size of ${singleRecord.name} by ${singleRecord.artist}`} src={singleRecord.image_url} />
    <h1>{singleRecord.name}</h1>
    <h2>{singleRecord.artist}</h2>
    <h2>Edition info:</h2>
    <h3>released by {singleRecord.label} (cat. {singleRecord.catalogue_number})
    in {singleRecord.country} in {singleRecord.year}</h3>
    <h2>Media condition: {singleRecord.media_condition}</h2>
    <h2>Sleeve condition: {singleRecord.sleeve_condition}</h2>
    <a target="_blank" rel="noreferrer" href="https://support.discogs.com/hc/en-us/articles/360001566193">Information on condition grading</a>
    <h2>Notes:</h2>
    <h3>{singleRecord.notes}</h3>
    <h2>${singleRecord.price}</h2>
    <Link to={{pathname:`/shops/${singleRecord.shop_id}`}}>Back to shop page</Link>
    </>;
};