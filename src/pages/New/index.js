import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import './styles.css';

import camera from '../../assets/camera.svg';

export default function New({ history }){
    const [empresa, setEmpresa] = useState('');
    const [techs, setTechs] = useState('');
    const [thumb, setThumb] = useState();

    const preview = useMemo(()=>{
        return thumb ? URL.createObjectURL(thumb) : null;
    },[thumb]);

    async function handleSubmit(e){
        e.preventDefault();
        const user_id = await localStorage.getItem('user'); 
        
        const data = new FormData();
        data.append('thumbnail',thumb);
        data.append('name',empresa);
        data.append('techs', techs);
        
        const response = await api.post('/newPlace', data, {
            headers: { user_id:user_id }
        });
        console.log(response.data);

        history.push('/dashboard');
    };
    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})`}}
                className={thumb ? 'has-thumb' : ''}
            >
                <input type="file" onChange={event => setThumb(event.target.files[0])} />
                <img src={camera} alt="Select img"/>
            </label>

            <label htmlFor="empresa">Empresa</label>
            <input 
                id="empresa"
                placeholder="Nome da empresa"
                value={empresa}
                onChange={event => setEmpresa(event.target.value)}
            />

            <label htmlFor="techs">Techs <span>(separado por virgula)</span></label>
            <input 
                id="techs"
                placeholder="Nome da empresa"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    );
};