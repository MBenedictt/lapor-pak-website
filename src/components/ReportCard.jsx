/* eslint-disable react/prop-types */
import { MessageCircle, Bookmark, Share, Eye, ArrowBigUp, ArrowBigDown, MoreVertical, ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";
import Tooltip from "./Tooltip";
import { Link } from "react-router-dom";
import DropdownInfo from "./DropdownInfo";

const ReportCard = ({ report }) => {
  const {
    title,
    author,
    date,
    tags,
    views,
    likes,
    comments,
    image,
    location,
    isBookmarked: initialBookmarked
  } = report;

  const [upvotes, setUpvotes] = useState(likes || 215);
  const [downvotes, setDownvotes] = useState(0);
  const [userVote, setUserVote] = useState(null); // 'up', 'down', or null
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const handleUpvote = () => {
    if (userVote === 'up') {
      // Remove upvote
      setUpvotes(prev => prev - 1);
      setUserVote(null);
    } else if (userVote === 'down') {
      // Switch from downvote to upvote
      setUpvotes(prev => prev + 1);
      setDownvotes(prev => prev - 1);
      setUserVote('up');
    } else {
      // Add upvote
      setUpvotes(prev => prev + 1);
      setUserVote('up');
    }
  };

  const handleDownvote = () => {
    if (userVote === 'down') {
      // Remove downvote
      setDownvotes(prev => prev - 1);
      setUserVote(null);
    } else if (userVote === 'up') {
      // Switch from upvote to downvote
      setUpvotes(prev => prev - 1);
      setDownvotes(prev => prev + 1);
      setUserVote('down');
    } else {
      // Add downvote
      setDownvotes(prev => prev + 1);
      setUserVote('down');
    }
  };

  const handleReadPost = () => {
    window.open('#', '_blank');
  };

  const handleComment = () => {
    console.log('Comment clicked');
    // Add your comment functionality here
  };

  const handleBookmark = () => {
    setIsBookmarked(prev => !prev);
    console.log('Bookmark toggled:', !isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this post: ${title}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      console.log('Link copied to clipboard');
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm border border-gray-200 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between p-4">

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
             <Link to="/report/detail">
                <button className=" flex items-center gap-1 cursor-pointer px-3 py-1 border-2 border-red-600 text-red-600 font-semibold hover:bg-red-600 hover:text-white transition max-md:rounded-none max-md:w-full text-sm">
                  <span> Baca Laporan </span> <ExternalLink className="w-3 h-3" />
                </button>
              </Link>
            <DropdownInfo options={[
              { label: 'Share' },
              { label: 'Hide' },
              { label: 'Not Interested' },
              { label: 'Report' },
            ]} />
          </div>
        </div>

        {/* Title */}
        <div className="px-4 pb-3">
          <h3 className="text-gray-900 text-lg font-semibold leading-tight">
            {title}
          </h3>
        </div>

        {/* Tags */}
        <div className="px-4 pb-3">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-gray-600 text-sm border border-gray-400 px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Date and Location */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <span>{date}</span>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* Image */}
        <div className="px-4 pb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>

        {/* Actions */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600 text-sm">{views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Tooltip message="Upvote">
                  <button onClick={handleUpvote}>
                    <ArrowBigUp className={`w-5 h-5 cursor-pointer ${userVote === 'up' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
                      }`} />
                  </button>
                </Tooltip>
                <span className="text-gray-600 text-sm">{upvotes - downvotes}</span>
                <Tooltip message="Downvote">
                  <button onClick={handleDownvote}>
                    <ArrowBigDown className={`w-5 h-5 cursor-pointer ${userVote === 'down' ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                      }`} />
                  </button>
                </Tooltip>
              </div>
              <div className="flex items-center space-x-1">
                <Tooltip message="Comments">
                  <button onClick={handleComment}>
                    <MessageCircle className="w-4 h-4 text-gray-600 hover:text-blue-600 cursor-pointer" />
                  </button>
                </Tooltip>
                <span className="text-gray-600 text-sm">{comments}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Tooltip message="Bookmark">
                <button onClick={handleBookmark}>
                  <Bookmark
                    className={`w-4 h-4 cursor-pointer ${isBookmarked ? 'text-yellow-600 fill-yellow-600' : 'text-gray-600 hover:text-yellow-600'
                      }`}
                  />
                </button>
              </Tooltip>
              <Tooltip message="Share">
                <button onClick={handleShare}>
                  <Share className="w-4 h-4 text-gray-600 hover:text-blue-600 cursor-pointer" />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;