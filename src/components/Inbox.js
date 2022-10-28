import React, { useEffect, useState } from "react";
import Email from "./Email";
import axios from "axios";

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [unread, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  //  Swipe pull down check code from https://stackoverflow.com/a/46248086
  const pStart = { x: 0, y: 0 };
  const pStop = { x: 0, y: 0 };

  function swipeStart(e) {
    if (typeof e["targetTouches"] !== "undefined") {
      const touch = e.targetTouches[0];
      pStart.x = touch.screenX;
      pStart.y = touch.screenY;
    } else {
      pStart.x = e.screenX;
      pStart.y = e.screenY;
    }
  }

  const swipeEnd = (e) => {
    if (typeof e["changedTouches"] !== "undefined") {
      const touch = e.changedTouches[0];
      pStop.x = touch.screenX;
      pStop.y = touch.screenY;
    } else {
      pStop.x = e.screenX;
      pStop.y = e.screenY;
    }

    swipeCheck();
  };

  const swipeCheck = async () => {
    const changeY = pStart.y - pStop.y;
    const changeX = pStart.x - pStop.x;
    if (isPullDown(changeY, changeX)) {
      unread === 0 && (await fetchMoreEmails());
    }
  };

  function isPullDown(dY, dX) {
    // methods of checking slope, length, direction of line created by swipe action
    return (
      dY < 0 &&
      ((Math.abs(dX) <= 100 && Math.abs(dY) >= 300) ||
        (Math.abs(dX) / Math.abs(dY) <= 0.3 && dY >= 60))
    );
  }

  useEffect(() => {
    loadEmails();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener(
      "touchstart",
        swipeStart,
      false
    );
    document.addEventListener(
      "touchend",
        swipeEnd,
      false
    );

    return () => {
      document.removeEventListener('touchstart', swipeStart);
      document.removeEventListener('touchend', swipeEnd);
    };
    //eslint-disable-next-line
  }, []);

  const loadEmails = () => {
    const localEmails = localStorage.getItem("appjection-emails");
    if (localEmails) {
      const parsedEmails = JSON.parse(localEmails);
      const unreadCount = parsedEmails.filter((e) => e.read !== true);
      setEmails(parsedEmails);
      setUnreadCount(unreadCount.length);
    }
  };

  const fetchMoreEmails = async () => {
    setLoading(true);
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
    const res = await axios.get(API_ENDPOINT);
    const data = res.data;
    data.forEach((d) => {
      d.read = false;
      d.received = new Date().toISOString();
    });
    const oldEmails =
      JSON.parse(localStorage.getItem("appjection-emails")) || [];
    const updatedEmails = [...data, ...oldEmails];
    localStorage.setItem("appjection-emails", JSON.stringify(updatedEmails));
    loadEmails();
    setLoading(false);
  };

  if (emails.length > 0) {
    return (
      <div>
        <div className="nav-flex-between container">
          <h6 className="unread">
            {unread} Unread Email{unread > 1 && "s"}
          </h6>
          {unread === 0 && (
            <button onClick={fetchMoreEmails} className={loading ? "spin" : ""}>
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
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          )}
        </div>
        {emails.map((e) => {
          return (
            <Email
              key={e.text}
              email={e}
              emails={emails}
              loadEmails={loadEmails}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="inbox-main center inbox-empty">
        <h3>Inbox Zero!</h3>
        <p>
          You haven't been rejected lately. Pull down to refresh and change that
          or click below.
        </p>
        <button className={loading ? "spin" : ""} onClick={fetchMoreEmails}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#fff"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
    );
  }
};

export default Inbox;
