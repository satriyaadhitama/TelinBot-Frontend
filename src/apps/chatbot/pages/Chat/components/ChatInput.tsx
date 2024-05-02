import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function ChatInput() {
  return (
    <div className="col-lg-8 col-md-9 col-sm-10 col-11 my-3">
      <div className="d-flex align-items-center">
        <input
          type="text"
          placeholder="Type Message to Telinbot..."
          className="form-control chatbot-input"
        />
        <button className="button button-primary chatbot-input-send">
          <FontAwesomeIcon icon={faPaperPlane} className="" />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
