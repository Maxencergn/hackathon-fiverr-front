import axios from 'axios';
import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handlePseudo = (event) => {
    setPseudo(event.target.value);
  }
  const handleFirstname = (event) => {
    setFirstname(event.target.value);
  }
  const handleLastname = (event) => {
    setLastname(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div className='signUpForm'>
      <form onSubmit={handleSubmit}>
        <label className='field' htmlFor='firstname'>
          <input
            id='firstname'
            type='firstname'
            name='firstname'
            onChange={handleFirstname}
            placeholder='Firstname :'
            required
          />
        </label>
        <label className='field' htmlFor='lastname'>
          <input
            id='lastname'
            type='lastname'
            name='lastname'
            onChange={handleLastname}
            placeholder='Lastname :'
            required
          />
        </label>
        <label className='field' htmlFor='pseudo'>
          <input
            id='pseudo'
            type='pseudo'
            name='pseudo'
            onChange={handlePseudo}
            placeholder='Pseudo :'
            required
          />
        </label>
        <label className='field' htmlFor='email'>
          <input
            id='email'
            type='email'
            name='email'
            onChange={handleEmail}
            placeholder='E-mail :'
            required
          />
        </label>
        <label className='field' htmlFor='password'>
          <input
            id='password'
            type='password'
            name='password'
            onChange={handlePassword}
            placeholder='Mot de passe : '
            required
          />
        </label>
        <button type='submit'>Login</button>
      </form> 
    </div>
  );
}

export default Login;
