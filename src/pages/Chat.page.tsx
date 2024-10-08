import { useParams, useSearchParams } from 'react-router-dom';

const Chat = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();

  return (
    <div>
      Chat Page
      <div>Querystring: {searchParams.toString()}</div>
      <div>Params: {JSON.stringify(params)}</div>
    </div>
  );
};

export default Chat;
