'use client';

function Message({ text, author, authorId, profilePicture }: { text: string, author: string, authorId: number, profilePicture: string }) {
    let chatClass: string = 'chat chat-';
    let baseURLProfiles: string = '//quizmatix.com/client/assets/profiles/';
    if (authorId === parseInt(localStorage.getItem('id') ?? '')) {
        chatClass += 'end';
    } else {
        chatClass += 'start';
    }
    return (
        <div className={chatClass}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        src={(baseURLProfiles + profilePicture) ?? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                </div>
            </div>
            <div className="chat-header">
                {author}
            </div>
            <div className="chat-bubble break-words max-w-[70vw]">{text}</div>
        </div>
    );
}

export default Message;