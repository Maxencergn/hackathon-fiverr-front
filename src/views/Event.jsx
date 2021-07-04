import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import FormInput from './FormInput';
import './Event.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import MarkerClusterGroup from 'react-leaflet-markercluster';

function Event({ locId }) {
  const [users, setUsers] = useState([]);
  const [location, setLocation] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [formContent, setFormContent] = useState({
    user_id: 0,
    description: '',
    title: '',
    date: '',
    time: '',
  });
  const getLocation = async () => {
    try {
      await axios
        .get('https://dataxcowork.herokuapp.com/cowork')
        .then((response) => {
          setLocation(response.data);
          setLocationId(response.data.find((item) => item.id === locId));
        });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getLocation();
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`).then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(users);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/event`, formContent)
      .then((response) => {
        console.log(response);
      });
  };
  const handleChangeDescritpion = (event) => {
    setFormContent({
      description: event.target.value,
    });
  };
  return (
    <div className='container-card-event'>
      <Card className='container-event'>
        <form onSubmit={handleSubmit}>
          <div className='inputContent'>
            <Form.Label className='titre-label'>Work with.</Form.Label>
            <select className='label' name='user_id' id='user_id'>
              <option value=''>Choose your partner</option>
              {users.map((user) => {
                return (
                  <option key={user.id} name='user_id' value={user.id}>
                    {user.firstname} {user.lastname}
                  </option>
                );
              })}
            </select>
            <Form.Label className='titre-label'>About</Form.Label>
            <FormInput
              label='Titre'
              name='title'
              type='text'
              value={formContent}
              setValue={setFormContent}
            />
            <Form.Label className='titre-label'>
              Motivation / Description
            </Form.Label>
            <FormControl
              label='description'
              name='description'
              type='text'
              onChange={handleChangeDescritpion}
              as='textarea'
              rows={6}
            ></FormControl>
            <div className='container-button'>
              <input type='submit' value="Creer l'evenement" />
            </div>
          </div>
        </form>
      </Card>
      {!locationId ? (
        <p>loading . . . </p>
      ) : (
        <Card className='container-event'>
          <form>
            <div className='map-box'>
              <MapContainer
                Marker
                center={[locationId.latitude, locationId.longitude]}
                zoom={13}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution=''
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={[locationId.latitude, locationId.longitude]}>
                  <Popup keepInView closeButton={false}>
                    <h3>{locationId.NOM}</h3>
                    <br />
                    <FormInput
                      label='date '
                      name='date'
                      type='date'
                      value={formContent}
                      setValue={setFormContent}
                    />
                    <FormInput
                      label='time '
                      name='time'
                      type='time'
                      value={formContent}
                      setValue={setFormContent}
                    />
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            {/* <Card className='container-event-big'>
              <div className='map-box-big'>
                <MapContainer
                  Marker
                  center={[47.21815676426419, -1.552947858186399]}
                  zoom={6}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution=''
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />
                  <MarkerClusterGroup>
                    {locationBig[0].latitude && locationBig[0].longitude ? (
                      locationBig.map((place) => {
                        return (
                          // console.log([place.latitude, place.longitude]),
                          <Marker
                            position={[place.latitude, place.longitude]}
                            key={place.id}
                          >
                            <Popup>
                              <h3>{place.NOM}</h3>
                              <br />
                              <FormInput
                                label='date '
                                name='date'
                                type='date'
                                value={formContent}
                                setValue={setFormContent}
                              />
                              <FormInput
                                label='time '
                                name='time'
                                type='time'
                                value={formContent}
                                setValue={setFormContent}
                              />
                            </Popup>
                          </Marker>
                        );
                      })
                    ) : (
                      <p>loading</p>
                    )}
                  </MarkerClusterGroup>
                </MapContainer>
              </div>
            </Card> */}
          </form>
        </Card>
      )}
    </div>
  );
}

export default Event;
