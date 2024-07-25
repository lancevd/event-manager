import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const CreateEventForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("location", location);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:5000/api/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Event created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating event");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      ></textarea>
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEventForm;
