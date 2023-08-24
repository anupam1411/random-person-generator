import { React, useState, useEffect } from "react";
import {
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaLock,
  FaPhone,
  FaEnvelopeOpen,
  FaUserAlt,
} from "react-icons/fa";
import { Button } from "react-bootstrap";

function App() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("Random Person");
  const [value, setValue] = useState("name");

  const getUser = async () => {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const person = data.results[0];
    const { phone, email } = person;
    const { large: image } = person.picture;
    const { password, username } = person.login;
    const { first, last } = person.name;
    const {
      dob: { age },
    } = person;
    const {
      street: { number, name },
    } = person.location;

    const newPerson = {
     
      image,
      phone,
      email,
      password,
      username:`${username}`,
      age,
      street: `${number}${name}`,
      name: `${first}${last}`,
    };
    setUser(newPerson);
    setTitle("name");
    setValue(newPerson.name);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(user[newValue]);
    }
  };

  return (
    <div className="h-screen bg-slate-600">
      {/* RANDOM PERSON GENERATOR */}
      <div className="block bcg-block">{/* this is a black banners div */}</div>
      <div className="block">
        <div className="container">
          <img
            src={user && user.image}
            height={200}
            width={200}
            className="user-img"
            alt="user img"
          />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-Label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-Label="street"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-Label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button className="icon" data-Label="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-Label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button
              className="icon"
              data-Label="username"
              onMouseOver={handleValue}
            > <FaUserAlt /> </button>
            <button
              className="icon"
              data-Label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
            
          </div>
          <Button onClick={getUser} variant="primary" size="lg">
              NEXT USER
            </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
