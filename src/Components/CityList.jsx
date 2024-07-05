import { useEffect } from "react";
import { useCities } from "../Contexts/CitiesContext";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  return (
    <ul className={styles.cityList}>
      {cities.length > 0 ? (
        cities.map((city, i) => <CityItem key={i} city={city} />)
      ) : (
        <Message message={"add city to show"} />
      )}
    </ul>
  );
}

export default CityList;
