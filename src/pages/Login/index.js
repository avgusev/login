import React, {useState} from 'react';
import api from '../../services/api';

export default function Login({ history }){
    const [email, setEmail] = useState('murilo.silvani@gmail.com');
    const [pass, setPass] = useState('admin');

    async function handleSubmit(e){
      e.preventDefault();
  
      const response = await api.post('/newUser' ,{
        email:email,
        password: pass,
        name: 'Nome static'
      });
      localStorage.setItem('user',response.data.user._id);

      history.push('/dashboard');
    };
    return (
        <>
            <p>
                Вход на сайт!
            </p>
            <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input 
                id="email"
                type="email"
                placeholder="Seu email:"
                value={email}
                onChange={event => setEmail(event.target.value)}
            />
            <label htmlFor="pass">Пароль:</label>
            <input 
                id="pass"
                type="password"
                placeholder="placeHolder"
                value={pass}
                onChange={event => setPass(event.target.value)}
            />

            <button className="btn" type="submit"> Войти </button>

            </form>
        </>
    );
};