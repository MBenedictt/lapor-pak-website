import { useState } from 'react';
import { Tooltip } from './Tooltip';
import { ArrowBigUp, ArrowBigDown, MessageSquareReply, User } from 'lucide-react';
import DropdownInfo from './DropdownInfo';

const Comment = ({ comment, isReply, onReplySubmit }) => {

    const [votes, setVotes] = useState(comment.votes);
    const [userVote, setUserVote] = useState(null);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState("");

    const handleVote = (type) => {
        if (type === 'up') {
            if (userVote === 'up') {
                setUserVote(null);
                setVotes(votes - 1);
            } else {
                setVotes(votes + (userVote === 'down' ? 2 : 1));
                setUserVote('up');
            }
        } else if (type === 'down') {
            if (userVote === 'down') {
                setUserVote(null);
                setVotes(votes + 1);
            } else {
                setVotes(votes - (userVote === 'up' ? 2 : 1));
                setUserVote('down');
            }
        }
    };

    const handleAddReply = () => {
        if (replyText.trim() === "") return;
        const newReply = {
            id: `r${Date.now()}`,
            author: 'Anda',
            text: replyText,
            votes: 0,
            timestamp: 'Baru saja',
            replies: [],
            replyingTo: comment.author
        };
        onReplySubmit(newReply, comment.id);
        setReplyText("");
        setShowReplyForm(false);
    };

    const replies = comment.replies || [];

    return (
        <div className={isReply ? "ml-4 md:ml-8 flex justify-between items-center" : "flex justify-between items-center"}>
            <div className="flex gap-3">
                <div className="w-8 h-8 bg-black rounded-full flex-shrink-0 mt-1 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                </div>

                <div className="w-full">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-semibold">{comment.author}</span>
                        {comment.replyingTo && (
                            <span className="text-gray-500 font-normal flex items-center gap-1">
                                <span className='font-bold'>&gt;</span> {comment.replyingTo}
                            </span>
                        )}
                        <span className="text-gray-500">• {comment.timestamp}</span>
                    </div>

                    <p className="text-gray-800 my-2">{comment.text}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                            <Tooltip message="Upvote">
                                <button onClick={() => handleVote('up')}>
                                    <ArrowBigUp className={`w-5 h-5 cursor-pointer ${userVote === 'up' ? 'text-green-600 fill-green-600' : 'text-gray-600 hover:text-green-600'}`} />
                                </button>
                            </Tooltip>
                            <span className="text-gray-800 text-sm font-bold w-4 text-center">{votes}</span>
                            <Tooltip message="Downvote">
                                <button onClick={() => handleVote('down')}>
                                    <ArrowBigDown className={`w-5 h-5 cursor-pointer ${userVote === 'down' ? 'text-red-600 fill-red-600' : 'text-gray-600 hover:text-red-600'}`} />
                                </button>
                            </Tooltip>
                        </div>
                        <Tooltip message="Balas">
                            <button onClick={() => setShowReplyForm(!showReplyForm)} className="flex items-center gap-1 font-semibold hover:text-blue-600">
                                <MessageSquareReply className="w-4 h-4" />
                                <span>Balas</span>
                            </button>
                        </Tooltip>
                    </div>


                    {showReplyForm && (
                        <div className="mt-3">
                            <input
                                type="text"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                                rows="2"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddReply();
                                    }
                                }}
                                placeholder="Tulis balasan..."
                            ></input>
                            <div className="flex justify-end gap-2 mt-2">
                                <button onClick={() => setShowReplyForm(false)} className="px-3 py-1 text-sm rounded-md hover:bg-gray-100">Batal</button>
                                <button onClick={handleAddReply} className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700">Kirim</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <DropdownInfo options={[
                { label: 'Delete' },
                { label: 'Report' },
            ]} />
        </div>
    );
}

export default Comment;