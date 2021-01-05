import React, {useRef, useContext} from "react"
import { Loading } from '../../../Loading/Loading'
import { RecordContext } from '../../../Records/RecordProvider'
import { useHistory } from "react-router-dom";

export const RecordForm = (props) => {
    const history = useHistory();

    const { addRecord } = useContext(RecordContext)

    const name = useRef()
    const artist = useRef()
    const label = useRef()
    const catalogue_number = useRef()
    const country = useRef()
    const year = useRef()
    const media_condition = useRef()
    const sleeve_condition = useRef()
    const price = useRef()
    const notes = useRef()

    const constructNewRecord = (e) => {
        e.preventDefault();
        const newRecordObject = {
            discogs_id: props.infoForForm.id,
            name: name.current.value,
            artist: artist.current.value,
            label: label.current.value,
            catalogue_number: catalogue_number.current.value,
            country: country.current.value,
            year: year.current.value,
            media_condition: media_condition.current.value,
            sleeve_condition: sleeve_condition.current.value,
            price: price.current.value,
            notes: notes.current.value,
            }
        addRecord(newRecordObject)
        history.push(`/`)
    }

    if(!props.infoForForm) {
            return <Loading />
    }
    return (
        <>
        <h1>Enter Record Information</h1>
        <form >
            <label for="name">Record name: </label>
            <input type="text" name="name" ref={name} defaultValue={props.searchMaster} />
            <label for="artist">Artist: </label>
            <input type="text" ref={artist} name="artist" defaultValue={props.searchArtist} />
            <label for="label">Label: </label>
            <input type="text" ref={label} name="label" />
            <label for="catalogue_number">Catalogue Number: </label>
            <input type="text" ref={catalogue_number} defaultValue={props.infoForForm.catalogue_number} name="catalogue_number" />
            <label for="year">Release year: </label>
            <input type="text" ref={year} name="year" defaultValue={props.infoForForm.year} />
            <label for="year">Release country: </label>
            <input type="text" ref={country} name="country" defaultValue={props.infoForForm.country} />
            <select ref={media_condition}>
                <option>Select media condition</option>
                <option>Mint</option>
                <option>Near Mint</option>
                <option>Very Good</option>
                <option>Good</option>
                <option>Fair</option>
                <option>Poor</option>
            </select>
            <select ref={sleeve_condition}>
                <option>Select sleeve condition</option>
                <option>Mint</option>
                <option>Near Mint</option>
                <option>Very Good</option>
                <option>Good</option>
                <option>Fair</option>
                <option>Poor</option>
            </select>
            <label for="price">Price: </label>
            <input type="text" ref={price} name="price" />
            <label for="notes">Notes: </label>
            <input ref={notes} type="textarea" defaultValue={props.infoForForm.notes} rows="10" name="notes" />
            <input type="submit" onClick={constructNewRecord}/>
        </form>
        </>
    )
}