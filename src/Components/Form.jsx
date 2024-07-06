// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
// import { useUrlPosition } from "../hooks/useUrlPosition";
// import Message from "./Message";
// import Spinner from "./Spinner";
// import { useCities } from "../contexts/CitiesContext";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import BackButton from "./BackButton";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import useUrlPosition from "../Hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../Contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();

  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [message, setMessage] = useState("");
  const { addNewCity, isloading } = useCities();
  useEffect(
    function () {
      if (!lat || !lng) return;
      async function fetchData() {
        try {
          setMessage("");
          setIsLoadingGeocoding(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (data.countryName === "" || data.city === "")
            throw new Error("please click another place");

          setCountry(data.countryName);
          setCityName(data.city);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setMessage(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchData();
    },
    [lat, lng]
  );

  async function handleSubmitForm(e) {
    e.preventDefault();
    if (!cityName || !date || !lat || !lng) return;
    const newCity = {
      cityName,
      country,
      emoji,
      notes,
      date,
      lat,
      lng,
      position: {
        lat,
        lng,
      },
    };
    await addNewCity(newCity);
    navigate("/app/cities");
  }
  if (!lng && !lat)
    return <Message message={"Start by clicking somwhere on the map"} />;
  if (isLoadingGeocoding) return <Spinner />;
  if (message) return <Message message={message} />;
  return (
    <form
      onSubmit={(e) => handleSubmitForm(e)}
      className={` ${styles.form} ${isloading ? styles.loading : ""}`}
    >
      <>
        <div className={styles.row}>
          <label htmlFor="cityName">City name</label>
          <input
            id="cityName"
            onChange={(e) => setCityName(e.target.value)}
            value={cityName}
          />
          <span className={styles.flag}>{emoji}</span>
        </div>

        <div className={styles.row}>
          <label htmlFor="date">When did you go to {cityName}?</label>

          <DatePicker
            id="date"
            onChange={(date) => setDate(date)}
            selected={date}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="notes">Notes about your trip to {cityName}</label>
          <textarea
            id="notes"
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          />
        </div>

        <div className={styles.buttons}>
          <Button type={"primary"}>Add</Button>
          <Button
            type={"back"}
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </Button>
        </div>
      </>
    </form>
  );
}

export default Form;
