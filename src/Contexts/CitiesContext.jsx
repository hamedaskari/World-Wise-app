import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import fetchCities from "../API/useGetCities";
import supabase from "../API/supabase";

const CitiesProvider = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "showCity":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "newCity":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, ...action.payload],
        currentCity: action.payload,
      };
    case "deleteCity":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
        isLoading: false,
      };
    default:
      throw new Error("there is an error");
  }
}

function CitiesContext({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchReq() {
      dispatch({ type: "loading" });
      try {
        const data = await fetchCities();
        dispatch({ type: "loaded", payload: data });
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchReq();
  }, []);

  async function fetchCity(id) {
    if (+id === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const { data, error } = await supabase
        .from("Cities")
        .select()
        .eq("id", id);

      if (error) throw new Error(error.message);

      dispatch({ type: "showCity", payload: data });
    } catch (err) {
      console.error(err.message);
    }
  }

  async function addNewCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const { data, error } = await supabase
        .from("Cities")
        .insert([newCity])
        .select();

      if (error) throw new Error(error.message);
      dispatch({ type: "newCity", payload: data });
    } catch (err) {
      console.error(err.message);
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      const { data, error } = await supabase
        .from("Cities")
        .delete()
        .eq("id", id);

      if (error) throw new Error(error.message);

      dispatch({ type: "deleteCity", payload: id });
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <CitiesProvider.Provider
      value={{
        cities,
        isLoading,
        fetchCity,
        currentCity,
        addNewCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesProvider.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesProvider);
  if (context === undefined)
    throw new Error("citiescontext was used outside the citiescontext");

  return context;
}
export { CitiesContext, useCities };
