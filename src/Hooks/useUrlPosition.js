import { useSearchParams } from "react-router-dom";

function useUrlPosition() {
  const [searchPrams] = useSearchParams();
  const lng = searchPrams.get("lng");
  const lat = searchPrams.get("lat");

  return [lat, lng];
}

export default useUrlPosition;
