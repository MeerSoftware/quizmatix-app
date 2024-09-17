'use client';

interface MessageProps {
    text: string;
    author: string;
    authorId: number;
    profilePicture: string;
}

const Message: React.FC<MessageProps> = ({ text, author, authorId, profilePicture }) => {
    const chatClass = `chat chat-${authorId === parseInt(localStorage.getItem('id') ?? '') ? 'end' : 'start'}`;
    const baseURLProfiles = '//quizmatix.com/client/assets/profiles/';
    const profileSrc = profilePicture ? `${baseURLProfiles}${profilePicture}` : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";

    return (
        <div className={chatClass}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={profileSrc} alt={`${author}'s profile`} />
                </div>
            </div>
            <div className="chat-header">{author}</div>
            <div className="chat-bubble break-words max-w-[70vw]">{text}</div>
        </div>
    );
};

export default Message;
