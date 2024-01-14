type MessageProps = {
  icon: JSX.Element;
  title: string;
  text: string;
};

const Message = ({ icon, title, text }: MessageProps) => {
  return (
    <div className="message">
      <div className="message__container">
        <div className="message__container__content">
          <h1 className="message__container__content-title">{title}</h1>
          <p className="message__container__content-text">{text}</p>
        </div>
        <div className="message__container__content-icon">{icon}</div>
      </div>
    </div>
  );
};

export default Message;
