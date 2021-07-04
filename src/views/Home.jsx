import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardComponent from '../commons/CardComponent';
import './Home.css';

function Home() {
  const [visible, setVisible] = useState(12);
  const [coworkPlaces, setCoworkPlaces] = useState([]);
  const [valueSelect, setValueSelect] = useState('');
  const [cities, setCities] = useState(null);

  const showMoreItems = (e) => {
    e.preventDefault();
    setVisible((prevValue) => prevValue + 12);
  };

  const getCities = async () => {
    try {
      await axios
        .get('https://dataxcowork.herokuapp.com/cities')
        .then((response) => {
          setCities(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const getCowork = async () => {
    try {
      await axios
        .get('https://dataxcowork.herokuapp.com/cowork')
        .then((response) => {
          setCoworkPlaces(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCowork();
    getCities();
  }, []);

  function toggle(e) {
    setValueSelect(e.target.value);
  }

  return (
    <div className='home-view'>
      <div className='filtering'>
        <h1
          style={{
            fontSize: '80px',
            color: '#eee',
            fontWeigth: '900',
            marginTop: '50px',
          }}
        >
          Find a place...
        </h1>
        <Form>
          <Form.Group controlId='select' className='select-city'>
            <Form.Control as='select' onChange={toggle}>
              {cities ? (
                cities.map((elem) => <option>{elem}</option>)
              ) : (
                <option>Select a city ...</option>
              )}
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
      <div className='container-card'>
        <div className='Card-view'>
          {valueSelect === ''
            ? coworkPlaces
                .slice(0, visible)
                .map((elem) => (
                  <CardComponent
                    key={elem.id}
                    id={elem.id}
                    adresse={elem.ADRESSE}
                    nom={elem.NOM}
                    web={elem.WEB}
                    cp={elem.CP}
                    ville={elem.VILLE}
                    img={elem.IMG.URL}
                  />
                ))
            : coworkPlaces
                .filter((item) => item.VILLE === valueSelect)
                .slice(0, visible)
                .map((elem) => (
                  <CardComponent
                    key={elem.id}
                    id={elem.id}
                    adresse={elem.ADRESSE}
                    nom={elem.NOM}
                    web={elem.WEB}
                    cp={elem.CP}
                    ville={elem.VILLE}
                    img={elem.IMG.URL}
                    latitude={elem.latitude}
                    longitude={elem.longitude}
                  />
                ))}
        </div>
        <Button className='btnload' onClick={showMoreItems}>
          Load more...
        </Button>
      </div>
    </div>
  );
}

export default Home;
