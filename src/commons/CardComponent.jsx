import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import marker from '../img/marker.png';
import { useHistory } from 'react-router';
import CardDetailsContext from '../contexts/CardDetailsContext';

function CardComponent(props) {
  const { nom, web, cp, ville, img } = props;
  const { setCardDetails } = useContext(CardDetailsContext);

  let history = useHistory();

  function handleClick() {
    history.push('/carddetails');
    setCardDetails(props);
  }

  return (
    <div className='Card'>
      <div>
        <Card
          style={{
            width: '14rem',
            height: '250px',
            margin: '3px',
          }}
        >
          <Card.Img
            variant='top'
            src={img}
            style={{ width: 'auto', height: '7rem' }}
          />
          <Card.Body>
            <Card.Title style={{ fontSize: '16px' }}>{nom}</Card.Title>
            <Card.Text style={{ fontSize: '12px' }}>
              <img
                style={{ width: '11px', height: '11px', marginRight: '3px' }}
                alt=''
                src={marker}
              />
              {ville}, {cp}
            </Card.Text>
            <Card.Text style={{ fontSize: '11px' }}>{web}</Card.Text>
          </Card.Body>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant='outline-success'
              style={{
                width: '90px',
                height: '20px',
                fontSize: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '5px',
              }}
              onClick={handleClick}
            >
              Get details
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CardComponent;
