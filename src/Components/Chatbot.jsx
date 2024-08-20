import { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages([...messages, { text: input, user: true }]);
    try {
      const response = await axios.post('http://localhost:5000/chat', { message: input });
      setMessages([...messages, { text: input, user: true }, { text: response.data.reply, user: false }]);
    } catch (error) {
      console.error('Error:', error);
    }
    setInput('');
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isOpen ? 'w-80' : 'w-16'} transition-all duration-300`}>
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold">Weather Chatbot</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="h-64 overflow-y-auto p-4 bg-gray-100">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.user ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.user ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="p-4 bg-white">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the weather..."
                className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-200">
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-blue-500 rounded-full text-white flex items-center justify-center hover:bg-blue-600 transition duration-200 shadow-lg"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chatbot;
