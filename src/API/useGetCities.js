import supabase from "./supabase";

async function fetchCities() {
  let { data: Cities, error } = await supabase.from("Cities").select("*");
  if (error) {
    console.log(error);
  }

  return Cities;
}

export default fetchCities;
