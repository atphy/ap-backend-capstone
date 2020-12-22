import discogsKeys from './discogsKeys.json'
import React, { useState } from "react"

export const DiscogsContext = React.createContext()

export const DiscogsProvider = (props) => {

    const [artistId, setArtist] = useState([])

    const getArtistSearch = (artist_name) => {
        return fetch(`https://api.discogs.com/database/search?q=${artist_name}&type=artist`, {
            headers: {
                "Authorization": discogsKeys.Authorization,
                "Content-Type": discogsKeys['Content-Type'],
                "User-Agent": discogsKeys['User-Agent']
            }
        })
            .then(res => res.json())
                .then(setArtist)
    }

    return (
        <DiscogsContext.Provider value={{
            artistId, getArtistSearch,
        }}>
            {props.children}
        </DiscogsContext.Provider>
    )
}