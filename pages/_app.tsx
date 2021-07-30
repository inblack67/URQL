import { Provider } from 'urql';
import { urqlClient, urqlSSRCache } from '../src/urql';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  if (pageProps.urqlState) {
    urqlSSRCache.restoreData(pageProps.urqlState);
  }

  return (
    <Provider value={urqlClient}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
