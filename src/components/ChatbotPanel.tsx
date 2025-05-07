import { useEffect, useState } from 'react';
import { getInfo } from '../api';
import { OptionType } from '../common/types';

interface ChatbotProps {
  id: string; // The URL or path of the PDF file
  model: OptionType | null;
}
interface ChatMessages {
  id?: string;
  msg: string;
  isQuestion: boolean;
  isTag?: boolean;
}

const ChatbotPanel: React.FC<ChatbotProps> = ({ id, model }) => {
  const [msgInput, setMsgInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessages[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const tags = ['What is the contract title?', 'What is the contract type?'];

  const handleQnA = async (msg: string) => {
    const newChat = { msg: msg, isQuestion: true };
    let newChatHistory = [...chatHistory];

    newChatHistory = [newChat, ...chatHistory];
    setChatHistory(newChatHistory);
    setLoading(true);
    setMsgInput('');

    const response = await getInfo({
      id,
      is_qna: newChat.isQuestion,
      question: msg,
      model_name: model?.value || 'rls',
    });

    if (response.result?.answer) {
      const newResponse = { msg: response.result.answer, isQuestion: false };

      setChatHistory([newResponse, ...newChatHistory]);

      setLoading(false);
    }
  };

  useEffect(() => {
    setMsgInput('');
    setChatHistory([]);
  }, [id]);

  return (
    <section className="panel">
      <div className="panel-title">AI Assistant</div>
      <div className="chat-area">
        {/* Sticky tag section */}
        <div className="sticky-tags">
          {tags.map((tag, index) => (
            <div
              className="tag-message"
              key={`tag-${index}`}
              onClick={() => setMsgInput(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
        {loading ? (
          <div className="chat-message bot">
            <span className="jumping-dots">
              <span className="dot-1"></span>
              <span className="dot-2"></span>
              <span className="dot-3"></span>
            </span>
          </div>
        ) : (
          <></>
        )}
        {chatHistory.map((chat, index) => {
          return chat.isQuestion ? (
            <div className="chat-message user" key={index}>
              {chat.msg}
            </div>
          ) : (
            <div className="chat-message bot" key={index}>
              {chat.msg}
            </div>
          );
        })}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleQnA(msgInput); // your function to call
            }
          }}
          placeholder="Ask anything..."
          value={msgInput}
          onChange={(e) => setMsgInput(e.target.value)}
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          onClick={() => handleQnA(msgInput)}
          className={loading ? 'send-icon-disabled' : 'send-icon'}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M22 2L15 22L11 13L2 9L22 2Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default ChatbotPanel;
