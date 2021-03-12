import React from 'react';

import IsMe from './isMe';
import Other from './other';

export default function ChatItem({isMe, message, dateTime}) {
  if (isMe) {
    return <IsMe message={message} dateTime={dateTime} />;
  }
  return <Other message={message} dateTime={dateTime} />;
}
