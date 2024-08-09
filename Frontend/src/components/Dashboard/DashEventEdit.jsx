import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const EventEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    trend: false,
    name: '',
    place: '',
    date: '',
    organizer: '',
    organization: '',
    description: '',
    small_description: '',
    organization_details: '',
    location: '',
    type: '',
    guest: '',
    image: '',
    capacity: 0,
    gmap: '',
    inclusive: [],
    exclusive: [],
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/events/${id}/`);
          setEvent(response.data);
        } catch (error) {
          console.error('Error fetching event data:', error);
        }
      };

      fetchEvent();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleListChange = (type, index, value) => {
    setEvent((prevEvent) => {
      const list = [...prevEvent[type]];
      list[index] = value;
      return { ...prevEvent, [type]: list };
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'newmanreact'); // Replace with your upload preset
    formData.append('cloud_name', 'dfiyrqut1'); // Replace with your Cloudinary cloud name

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dfiyrqut1/image/upload', formData);
      return response.data.secure_url; // Return the secure URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      return null;
    }
  };

  const handleSave = async () => {
    setLoading(true); // Start loading
    try {
      let imageUrl = event.image;

      if (imageFile) {
        imageUrl = await uploadImageToCloudinary();
        if (!imageUrl) {
          console.error('Error uploading image');
          setLoading(false); // Stop loading if there's an error
          return;
        }
      }
      const combinedInclusions = [
        ...event.inclusive
      ].join('; ');
      const combinedExclusions = [
        ...event.exclusive
      ].join('; ');
      
      const updatedEvent = {
        ...event,
        image: imageUrl,
        inclusions: combinedInclusions, // Use the combined string here
        exclusions: combinedExclusions, // Use the combined string here
      };

      await axios.put(`http://localhost:8000/events/${id}/`, updatedEvent);
      setTimeout(() => {
        toast.success('Event Edited successful!');
        
      }, 500);
      navigate('/dashboard/events');
    } catch (error) {
      console.error('Error updating event:', error);
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  const handleDelete = async () => {
    setLoading(true); // Start loading
    try {
      await axios.delete(`http://localhost:8000/events/${id}/`);
      setTimeout(() => {
        toast.error('Event Deleted successful!');
        
      }, 500);
      navigate('/dashboard/events');
    } catch (error) {
      console.error('Error deleting event:', error);
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  const handleAddField = (type) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      [type]: [...prevEvent[type], ''],
    }));
  };

  const handleRemoveField = (type, index) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      [type]: prevEvent[type].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="container mt-4">
      <h2>Edit Event</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={event.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Place</label>
          <input
            type="text"
            className="form-control"
            name="place"
            value={event.place}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-check-input me-2"
            type="checkbox"
            id="form4Example4"
            name="trend" // Updated name to match the state property
            checked={event.trend}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="form4Example4">
            Add event to home page
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={event.date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Organizer</label>
          <input
            type="text"
            className="form-control"
            name="organizer"
            value={event.organizer}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Organization</label>
          <input
            type="text"
            className="form-control"
            name="organization"
            value={event.organization}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={event.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={event.location}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <input
            type="text"
            className="form-control"
            name="type"
            value={event.type}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Guest</label>
          <input
            type="text"
            className="form-control"
            name="guest"
            value={event.guest}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Capacity</label>
          <input
            type="number"
            className="form-control"
            name="capacity"
            value={event.capacity}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)} // Preview the selected image
              alt="Event Preview"
              className="mt-2"
              style={{ maxWidth: '200px' }}
            />
          )}
          {event.image && !imageFile && (
            <img
              src={event.image} // Display the existing image
              alt="Event"
              className="mt-2"
              style={{ maxWidth: '200px' }}
            />
          )}
        </div>
  
              <div className="mb-3">
                <label className="form-label">Inclusive</label>
                {event.inclusive.map((item, index) => (
                  <div className="d-flex mb-2" key={index}>
                    <input
                      type="text"
                      className="form-control me-2"
                      value={item}
                      onChange={(e) => handleListChange('inclusive', index, e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemoveField('inclusive', index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleAddField('inclusive')}
                >
                  Add Inclusive
                </button>
              </div>
              <div className="mb-3">
                <label className="form-label">Exclusive</label>
                {event.exclusive.map((item, index) => (
                  <div className="d-flex mb-2" key={index}>
                    <input
                      type="text"
                      className="form-control me-2"
                      value={item}
                      onChange={(e) => handleListChange('exclusive', index, e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemoveField('exclusive', index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleAddField('exclusive')}
                >
                  Add Exclusive
                </button>
              </div>
        
          
          
        
        
        {loading ? (
          <div className="d-flex justify-content-center mb-3">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
            <button type="button" className="btn btn-danger ms-2" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default EventEdit;
