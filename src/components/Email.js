import React, { useState } from "react";

const Email = ({ email, emails, loadEmails }) => {
  const [showFullEmail, setShowFullEmail] = useState(false);

  const replaceWithBr = () => {
    return email.text.replace(/\n/g, "<br />");
  };

  const toggleEmail = () => {
    setShowFullEmail(!showFullEmail);
    const index = emails.map((e) => e.text).indexOf(email.text);
    emails[index].read = true;
    localStorage.setItem("appjection-emails", JSON.stringify(emails));
    loadEmails();
  };

  const deleteEmail = () => {
    const index = emails.map((e) => e.text).indexOf(email.text);
    emails[index].read = true;
    emails.splice(index, 1);
    localStorage.setItem("appjection-emails", JSON.stringify(emails));
    loadEmails();
  };

  if (showFullEmail) {
    return (
      <div className="full-email">
        <div>
          <div className="nav-flex-between">
            <button onClick={toggleEmail}>
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
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <button onClick={deleteEmail}>
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
          <div className="container border-bottom email-info">
            <div className="center">
              <h2>App Rejection</h2>
            </div>
            <div className="nav-flex-between">
              <h4>App Review Team</h4>
              <p>{new Date(email.received).toLocaleDateString("en-US")}</p>
            </div>           
          </div>
          <p dangerouslySetInnerHTML={{ __html: replaceWithBr() }} />
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={
          email.read
            ? "email-read border-bottom-border-top"
            : "email border-bottom border-top"
        }
      >
        <button onClick={toggleEmail} className="align-center-flex container">
          <h3 className="flex sender-avatar">AS</h3>
          <div>
            <h4>
              App Review Team
              <br /> App Rejection
            </h4>
          </div>
          <p>{new Date(email.received).toLocaleDateString("en-US")}</p>
        </button>
      </div>
    );
  }
};

export default Email;
