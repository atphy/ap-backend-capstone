import React, {useState, useRef} from "react";

export const ZipSearch = (props) => {

    const [useDefaultZip, setUseDefaultZip] = useState(true)

    const newZIP = useRef()
    const newRadius = useRef()
    
    const changeZipSearchHandler = (e) => {
        e.preventDefault();
        setUseDefaultZip(false)
    }

    const setZipSearchHandler = (e) => {
        e.preventDefault();
        props.setSearchZip(newZIP.current.value)
        setUseDefaultZip(true)
    }

    const searchRadiusHandler = (e) => {
        e.preventDefault();
        props.setSearchRadius(newRadius.current.value)
    }

    return <div className="customer-top-info">
    <h2 className="list-option-label">Showing record shops within&nbsp;</h2>
    <h2 className="list-option-display">{props.searchRadius}</h2>
    <input className="zip-input" min="50" max="300" onChange={searchRadiusHandler} ref={newRadius} defaultValue={props.searchRadius} type="number" step="50" ></input>
    <h2 className="list-option-label">miles of</h2>
    {useDefaultZip ?
    <h2 className="list-option-display" onClick={changeZipSearchHandler} defaultValue={props.searchZip}>{props.searchZip}</h2>
    :
    <form onSubmit={setZipSearchHandler}>
    <input defaultValue={props.searchZip} ref={newZIP} name="newZIP" minLength="5" maxLength="5" placeholder={props.searchZip} type="text"></input>
    <input type="submit"></input>
    </form>
    }
    </div>
};