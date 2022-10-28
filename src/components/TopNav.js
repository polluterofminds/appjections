import React, { useState } from "react";

const TopNav = () => {
  const [showResponse, setShowResponse] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [responses] = useState([
    "Nah, that won't fix the rejection problem.",
    "Nice try, you can't do that. You get rejections or nothing.",
    "Uh uh uh, you didn't say the magic word. And the magic word is No! Rejections only.",
    "Really? You thought that would work? This is a rejection only email app.",
  ]);

  const selectAndDisplayRandomResponse = () => {
    const responseIndex =
      Math.floor(Math.random() * (responses.length - 1)) + 1;
    const response = responses[responseIndex];

    setResponseText(response);
    if (response) {
      setShowResponse(true);
    }
    setTimeout(() => {
      closeResponse();
    }, 3000);
  };

  const closeResponse = () => {
    setResponseText("");
    setShowResponse(false);
  };

  if (showResponse) {
    return (
      <div className="response-modal">
        <p>{responseText}</p>
      </div>
    );
  }

  return (
    <div className="nav-flex-between">
      <button onClick={selectAndDisplayRandomResponse}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <h3 className="center">Inbox</h3>
      <div>
        <button onClick={selectAndDisplayRandomResponse}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
        <button onClick={selectAndDisplayRandomResponse}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TopNav;
