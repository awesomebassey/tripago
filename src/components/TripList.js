import { useState } from "react"
import './TripList.css'
import { useFetch } from '../hooks/useFetch'

export default function TripList() {
    const [url, setUrl] = useState('http://localhost:3000/trips')
    const { data, pending, error } = useFetch(url)

    return (
        <div className="trip-list">
            <h2>TripList</h2>
            {pending && <div>Please wait...</div>}
            {error && <div>{error}</div>}
            <ul>
                {data && data.map(trip => {
                    return <li key={trip.id}>
                        <h3>{trip.title}</h3>
                        <p>{trip.price}</p>
                    </li>
                })}
            </ul>
            <div className="filters">
                <button onClick={() => setUrl('http://localhost:3000/trips?loc=europe')}>Get European Trips</button>
                <button onClick={() => setUrl('http://localhost:3000/trips')}>Get All Trips</button>
            </div>
        </div>
    )
}
