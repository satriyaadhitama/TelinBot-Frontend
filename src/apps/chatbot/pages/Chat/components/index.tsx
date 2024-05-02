import UserMessage from './UserMessage';
import Header from './Header';
import ChatInput from './ChatInput';
import Sidebar from './Sidebar';

interface SenderType {
  sender: 'user' | 'bot';
}

const message =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi nisi accusantium officiis non excepturi obcaecati velit, totam similique fuga laboriosam id voluptatum! Sunt sed sint aperiam praesentium odio iure rem?';
const users: SenderType[] = ['bot', 'user', 'bot', 'user', 'bot', 'user'];

function Main() {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="d-flex justify-content-center chatbot-content-container">
        <div className="col-lg-8 col-md-9 col-sm-10 col-11">
          {users.map((item) => {
            return (
              <div className="mb-3" key={item}>
                <UserMessage sender={item} message={message} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="d-flex justify-content-center chatbot-input-container">
        <ChatInput />
      </div>
    </div>
  );
}

export default Main;
