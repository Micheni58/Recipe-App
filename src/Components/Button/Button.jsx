import { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaSave, FaHeart, FaComment} from "react-icons/fa";
//Main goal: create like , dislike, comment,favourite, save 'buttton'.
//1. like & dislike: thumb-up for like and thumb-down for dislike.
function Buttonicon () {
    const [likes, setLikes] = useState(0)
    const [liked, setLiked] = useState(false)
    const [disLiked, setDisLiked] = useState(false)
    const [saved, setSaved] = useState(false)
    const [favourited, setFavourited] = useState(false)
    const [commented, setCommented] = useState(false)
    function handleLike(){
        if (liked){
            setLikes(likes -1);
            setLiked(false);
        }
        else {
            setLikes(likes +1)
            setLiked(true)
        }
    }
   // function handleFavourite(){

   // }
return(
            //count likes
            //dislike
            //save content info on save pages
            //add a favourite content info on favourite pages
            //add a comment about content info

    <div>
        <button className="liked" onClick= {handleLike} style={{color: liked ? "black" : "grey"}}>
            <FaThumbsUp /><span>{likes} {likes === 1? "like" : "likes"}</span>
        </button>
        <button className = "disLiked"onClick={() => setDisLiked(!disLiked)} style={{color: disLiked ? "cyan" : "grey"}}>
            <FaThumbsDown />
        </button>
        <button className="saved" onClick={() => setSaved(!saved)} style={{color: saved ? "black" : "grey"}}>
            <FaSave />
        </button>
        <button className="favourite" onClick={() => setFavourited(!favourited)} style={{color: favourited ? "red" : "grey"}}>
            <FaHeart />
        </button>
        <button className="comment" onClick={() => setCommented(!commented)} style={{color: commented ? "cyan" : "grey"}}>
            <FaComment />
        </button>
    </div>
)
}
export default Buttonicon;