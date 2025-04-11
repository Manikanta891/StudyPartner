import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Check, CheckCheck, Clock, Smile, Paperclip, MoreVertical } from 'lucide-react';
import './Chat.css';

const currentUserId = 1;

const contacts = [
  {
    id: 2,
    name: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastMessage: "Looking forward to our study session!",
    lastMessageTime: "10:30 AM",
    unreadCount: 2,
    online: true,
    typing: true
  },
  {
    id: 3,
    name: "Michael Park",
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastMessage: "Thanks for the help with the project",
    lastMessageTime: "Yesterday",
    online: false
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastMessage: "Can we review the presentation tomorrow?",
    lastMessageTime: "2 days ago",
    online: true
  }
];

const initialMessages = [
  {
    id: 1,
    senderId: 2,
    text: "Hi! I saw you're also studying algorithms",
    timestamp: "10:00 AM",
    status: 'read'
  },
  {
    id: 2,
    senderId: 1,
    text: "Yes! I'm preparing for technical interviews",
    timestamp: "10:15 AM",
    status: 'read'
  },
  {
    id: 3,
    senderId: 2,
    text: "Looking forward to our study session!",
    timestamp: "10:30 AM",
    status: 'delivered'
  }
];

function Chat() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const messagesEndRef = useRef(null);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      senderId: currentUserId,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sending',
      ...(replyingTo && { isReply: { messageId: replyingTo.id, text: replyingTo.text } })
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
    setReplyingTo(null);

    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === newMsg.id ? { ...msg, status: 'sent' } : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === newMsg.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 2000);

    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === newMsg.id ? { ...msg, status: 'read' } : msg
        )
      );
    }, 3000);
  };

  const getMessageStatus = (status) => {
    switch (status) {
      case 'sending': return <Clock className="icon" />;
      case 'sent': return <Check className="icon" />;
      case 'delivered': return <CheckCheck className="icon" />;
      case 'read': return <CheckCheck className="icon read" />;
      default: return null;
    }
  };

  return (
    <div className="chat-container">
      <div className="contacts-panel">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="contacts-list">
          {filteredContacts.map(contact => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`contact-item ${selectedContact?.id === contact.id ? 'active' : ''}`}
            >
              <div className="avatar-wrapper">
                <img src={contact.image} alt={contact.name} className="avatar" />
                {contact.online && <span className="online-indicator" />}
              </div>
              <div className="contact-info">
                <div className="name-row">
                  <span className="contact-name">{contact.name}</span>
                  <span className="contact-time">{contact.lastMessageTime}</span>
                </div>
                {contact.typing ? (
                  <p className="typing-status">typing...</p>
                ) : (
                  <p className="contact-message">{contact.lastMessage}</p>
                )}
              </div>
              {contact.unreadCount && (
                <span className="unread-badge">{contact.unreadCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {selectedContact ? (
        <div className="chat-panel">
          <div className="chat-header">
            <div className="header-info">
              <img src={selectedContact.image} alt={selectedContact.name} className="avatar-small" />
              <div>
                <h3>{selectedContact.name}</h3>
                <p className="status">{selectedContact.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
            <button className="more-btn"><MoreVertical /></button>
          </div>

          <div className="chat-body">
            {messages.map(message => (
              <div key={message.id} className={`message-row ${message.senderId === currentUserId ? 'sent' : 'received'}`}>
                <div className="message-bubble">
                  {message.isReply && (
                    <div className="reply-box">
                      <p className="reply-label">Replying to:</p>
                      <p className="reply-text">{message.isReply.text}</p>
                    </div>
                  )}
                  <div className="message-content">
                    <p>{message.text}</p>
                    <div className="message-meta">
                      <span className="message-time">{message.timestamp}</span>
                      {message.senderId === currentUserId && <span>{getMessageStatus(message.status)}</span>}
                    </div>
                  </div>
                  <button
                    onClick={() => setReplyingTo(message)}
                    className="reply-btn"
                  >
                    <svg className="reply-icon" viewBox="0 0 24 24">
                      <path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {replyingTo && (
            <div className="reply-preview">
              <div className="reply-info">
                <div className="reply-indicator" />
                <div>
                  <p className="replying-label">Replying to message</p>
                  <p className="replying-text">{replyingTo.text}</p>
                </div>
              </div>
              <button onClick={() => setReplyingTo(null)} className="cancel-reply">×</button>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="message-input-form">
            <button type="button" onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)} className="icon-btn">
              <Smile />
            </button>
            <button type="button" className="icon-btn">
              <Paperclip />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="message-input"
            />
            <button type="submit" className="send-btn">
              <Send />
            </button>
          </form>
        </div>
      ) : (
        <div className="chat-empty">
          <p>Select a contact to start chatting</p>
        </div>
      )}
    </div>
  );
}

export default Chat;
