import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function DashBoard(){
    const [places, setPlaces] = useState([]);

    useEffect(()=>{
        async function loadPlaces(){
            const user_id = await localStorage.getItem('user'); 

            const response = await api.get('/listPlacesByUser',{
                headers: { user_id }
            });
            setPlaces(response.data.places);
        };
        loadPlaces();
    },[]);

    return (
        <>
            <ul className="place-list">
                {places.map(place => (
                    <li key={place._id}>
                        <header style={{ backgroundImage:`url(${place.thumbnail_url})` }} />
                        <strong>{place.name}</strong>
                        <span>{place.techs}</span>
                    </li>
                ))}
            </ul>
            <Link to="/new">
                <button className="btn">
                    Cadastrar Lugar
                </button>
            </Link>
        </>
    );
};