import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from 'urql';

const isServerSide = () => typeof window === 'undefined';

export const urqlSSRCache = ssrExchange({ isClient: !isServerSide });
export const urqlClient = createClient({
  url: 'http://localhost:4000/api/graphql',
  exchanges: [dedupExchange, cacheExchange, urqlSSRCache, fetchExchange],
  fetchOptions: () => {
    return {
      headers: {},
    };
  },
});
