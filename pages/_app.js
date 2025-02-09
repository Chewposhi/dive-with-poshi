import '../styles/globals.css'
import { TripProvider } from '../context/TripContext';

function MyApp({ Component, pageProps }) {
  return (
    <TripProvider>
      <Component {...pageProps} />
    </TripProvider>
  );
}

export default MyApp
