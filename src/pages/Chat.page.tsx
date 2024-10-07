import { useParams } from 'react-router-dom';

const Chat = () => {
  const params = useParams();

  return <div>Chat Page, params: {JSON.stringify(params)}</div>;
};

export default Chat;
