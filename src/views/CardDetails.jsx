import React, { useContext } from 'react';
import CardDetailsContext from '../contexts/CardDetailsContext';
import { Card, Button } from 'react-bootstrap';
import Event from './Event';
import marker from '../img/marker.png';
import stars from '../img/stars.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CardDetails.css';

function CardDetails() {
  const { cardDetails } = useContext(CardDetailsContext);
  const href = `https://${cardDetails.web}`;
  console.log(cardDetails);
  return (
    <div className='card-details'>
      <div className='card-details-container'>
        <img className='card-details-img' alt='' src={cardDetails.img} />
      </div>
      <div>
        <Card className='card-details-bt'>
          <div className='title-img'>
            <h1 className='name-img'>
              {cardDetails.nom}
              <a href={href} target='_blank' rel='noreferrer'>
                <Button className='btn-site'>Website</Button>
              </a>
            </h1>
            <p>
              <img
                style={{ width: '11px', height: '11px', marginRight: '3px' }}
                alt=''
                src={marker}
              />
              {cardDetails.adresse}, {cardDetails.cp} {cardDetails.ville}
            </p>
          </div>
          <div className='stars'>
            <p>8,9/10</p>
            <img alt='' src={stars} />
            <p>15 avis</p>
          </div>
          <div className='desc'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br />
              <br /> Suscipit aliquid rerum mollitia laborum provident corporis
              voluptatum quia ratione molestias quibusdam tempore, possimus
              inventore error veritatis neque, quas nisi. Qui, et. Lorem ipsum
              dolor sit, amet consectetur adipisicing elit.
              <br />
              <br /> Suscipit aliquid rerum mollitia laborum provident corporis
              voluptatum quia ratione molestias quibusdam tempore, possimus
              inventore error veritatis neque Qui, et. aliquid rerum mollitia
              laborum provident corporis voluptatum quia ratione molestias
              quibusdam tempore, possimus inventore error veritatis neque.
              Suscipit aliquid rerum mollitia laborum provident corporis
              voluptatum quia ratione molestias quibusdam tempore, possimus
              inventore error veritatis neque, quas nisi. Aliquid rerum mollitia
              laborum provident corporis voluptatum quia ratione molestias
              quibusdam tempore, possimus inventore error veritatis neque.
            </p>
          </div>
        </Card>
        <div className='title'>
          <h1>Book your meeting !</h1>
        </div>
        <Event locId={cardDetails.id} />
      </div>
    </div>
  );
}

export default CardDetails;
