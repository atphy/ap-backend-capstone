import React, {useContext, useRef, useEffect, useState} from "react"
import { DiscogsContext } from "../../../discogs/DiscogsProvider"

export const DiscogsArtistSearch = (props) => {

    const {artistSearchList, getArtistSearch} = useContext(DiscogsContext)
    const artistName = useRef(null)

    const handleArtistSearch = (e) => {
        e.preventDefault();
        getArtistSearch(artistName.current.value)
    }

    return (
        <>
        <h1>Search for artist by name</h1>
        <form onSubmit={handleArtistSearch}>
            <input ref={artistName} name="artistName" placeholder="Pavement" type="text"></input>
            <input type="submit"></input>
        </form>
        {artistSearchList.results ? 
                artistSearchList.results.map(artist => {
                    return <h1 onClick={() => 
                        {props.componentChangeHandler("masterSelect") 
                        props.setSearchArtistId(artist.id)}}
                        key={artist.id}>{artist.title}</h1>
                })
            : 
            null}
        </>
    )
}