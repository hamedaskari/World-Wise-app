import { BrowserRouter, Routes, Route } from "react-router-dom";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import { FakeAuthContext } from "./Contexts/FakeAuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import { CitiesContext } from "./Contexts/CitiesContext";
import CityList from "./Components/CityList";
import CountryList from "./Components/CountryList";
import City from "./Components/City";
import Form from "./Components/Form";
import { Suspense, lazy } from "react";

const Pricing = lazy(() => import("./Pages/Pricing"));
const HomePage = lazy(() => import("./Pages/HomePage"));
const Product = lazy(() => import("./Pages/Product"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const Login = lazy(() => import("./Pages/Login"));
import SpinnerFullPage from "./Components/SpinnerFullPage";

function App() {
  polyfillCountryFlagEmojis();
  return (
    <CitiesContext>
      <FakeAuthContext>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<h3>Select City or Countries</h3>} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="Form" element={<Form />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </FakeAuthContext>
    </CitiesContext>
  );
}

export default App;
