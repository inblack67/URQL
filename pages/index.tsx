import React from 'react';
import { useQuery } from 'urql';
import { urqlClient, urqlSSRCache } from '../src/urql';

const query = `{
  users{
    email
    id
    name
    insertedAt
  }
}`;

const index = () => {
  const [result] = useQuery({
    query,
  });

  const { fetching, data, error } = result;

  if (fetching) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 3)}</pre>
    </div>
  );
};

export const getServerSideProps = async () => {
  await urqlClient.query(query).toPromise();
  return {
    props: {
      urqlState: urqlSSRCache.extractData(),
    },
  };
};

// export const getStaticProps = async () => {
//   await urqlClient.query(query).toPromise();
//   return {
//     props: {
//       urqlState: urqlSSRCache.extractData(),
//     },
//     revalidate: 60, // per 60 seconds
//   };
// };

export default index;
