import { AppProps } from "next/app";
import "@/styles/app.scss";
import { GoogleMapProvider } from "@/lib/GoogleMap";

function AppROOT({ Component, pageProps }: AppProps) {
  return (
    <GoogleMapProvider apiKey="AIzaSyDBe2WZdmu1af-wb_zLYHxdqJZErXsRHZk">
      <Component {...pageProps} />
    </GoogleMapProvider>
  );
}

export default AppROOT;
