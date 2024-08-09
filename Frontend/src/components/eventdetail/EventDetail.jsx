import React, { useState, useEffect } from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import './EventDetail.css';

const EventDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { name } = useSelector((state) => state.user); // Access user data from Redux
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    // Fetch event data based on ID
    const fetchEventData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/events/${id}`);
        const data = await response.json();
        setEventData(data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };
    fetchEventData();
  }, [id]);

  if (!eventData) {
    return <p>Loading...</p>;
  }

  const handleRegisterClick = () => {
    if (name) {
      // User is logged in, redirect to event registration page
      navigate(`/event-register/${eventData.id}`);
    } else {
      // User is not logged in, redirect to login page
      navigate('/login');
    }
  };

  return (
    <>
    <title>{eventData.name}</title>
      <Navbar />
      <section className="py-5">
        <div className="container">
          <div className="row gx-5">
            <aside className="col-lg-6">
              <div className="border rounded-4 mb-3 d-flex justify-content-center">
                <a data-fslightbox="mygalley" className="rounded-4" target="" data-type="image" href="#">
                <img
  style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }}
  className="rounded-4 fit"
  src={eventData.image} // Prepend a slash to make it an absolute path
  alt="Event"
/>

                </a>
              </div>
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">{eventData.name}</h4>
           
                <p>{eventData.small_description}</p>
                <div className="row">
                  <dt className="col-3">Organization</dt>
                  <dd className="col-9">{eventData.organization}</dd>
                  <dt className="col-3">Organizer</dt>
                  <dd className="col-9">{eventData.organizer}</dd>
                  <dt className="col-3">Guest</dt>
                  <dd className="col-9">{eventData.guest}</dd>
                  <dt className="col-3">Event Type</dt>
                  <dd className="col-9">{eventData.type}</dd>
                  <dt className="col-3">Place</dt>
                  <dd className="col-9">{eventData.place}</dd>
                  <dt className="col-3">Date</dt>
                  <dd className="col-9">{eventData.date}</dd>
                  <dt className="col-3">Location</dt>
                  <dd className="col-9">{eventData.location}</dd>
                  <dt className="col-3">Capacity</dt>
                  <dd className="col-9">{eventData.capacity}</dd>
                </div>
                <hr />
                <button onClick={handleRegisterClick} className="btn btn-primary shadow-0">Register</button>
              </div>
            </main>
          </div>
        </div>
      </section>

      <section className="bg-light border-top py-4">
        <div className="container">
          <Row className="gx-4">
            <Col lg={8} className="mb-4">
              <div className="border rounded-2 px-3 py-2 bg-white">
                <Tab.Container id="left-tabs-example" defaultActiveKey="warranty-info">
                  <Nav variant="pills" className="nav-justified mb-3" id="ex1" role="tablist">
                    <Nav.Item className="d-flex">
                      <Nav.Link eventKey="warranty-info" className="d-flex align-items-center justify-content-center w-100">
                        Description
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="d-flex">
                      <Nav.Link eventKey="shipping-info" className="d-flex align-items-center justify-content-center w-100">
                        Map Location
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="d-flex">
                      <Nav.Link eventKey="seller-profile" className="d-flex align-items-center justify-content-center w-100">
                        Organization Details
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="warranty-info">
                      <p>{eventData.description}</p>
                      <div className="row mb-2">
                        <div className="col-12 col-md-6">
                          <ul className="list-unstyled mb-0">
                            {eventData.inclusive.map((item, index) => (
                              <li key={index}><i className="fas fa-check text-success me-2"></i>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-12 col-md-6 mb-0">
                          <ul className="list-unstyled">
                            {eventData.exclusive.map((item, index) => (
                              <li key={index}><i className="fas fa-times text-danger me-2"></i>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="shipping-info">
                      <iframe src={eventData.gmap} className='gmap' height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </Tab.Pane>
                    <Tab.Pane eventKey="seller-profile">
                      <p>{eventData.organization_details}</p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default EventDetails;
