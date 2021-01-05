import React, {useContext, useRef, useEffect, useState} from "react"
import { DiscogsContext } from "../../../discogs/DiscogsProvider"

export const DiscogsArtistSearch = (props) => {

    const {artistSearchList, getArtistSearch} = useContext(DiscogsContext)
    const [artistList, setArtistList] = useState(null)
    const artistName = useRef(null)

    const handleArtistSearch = (e) => {
        e.preventDefault();
        getArtistSearch(artistName.current.value)
        props.setSearchArtist(artistName.current.value)
    }

    useEffect(() => {
        setArtistList(artistSearchList)
    }, [artistSearchList])

    return (
        <div className="record-form-container">
        <h1>Search for artist by name</h1>
        <form onSubmit={handleArtistSearch}>
            <input ref={artistName} name="artistName" placeholder="Pavement" type="text"></input>
            <input type="submit"></input>
        </form>
        {artistList ? 
                artistList.map(artist => {
                    return <h2 onClick={() => 
                        {
                        props.findArtistMasters(artist.id)    
                        props.componentChangeHandler("masterSelect") 
                        }} key={artist.id}>{artist.name}</h2>
                })
            : 
            null}
        </div>
    )
}