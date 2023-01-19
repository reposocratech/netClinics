import {  NetClinicsProvider } from "./context/NetClinicsProvider";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
      <div>
        <NetClinicsProvider>
          <AppRoutes/>
        </NetClinicsProvider>
      </div>
  );
}

export default App;
