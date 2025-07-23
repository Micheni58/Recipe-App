import { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaSave, FaHeart, FaComment, FaStreetView} from "react-icons/fa";
 
//Main goal: create like , dislike, comment,favourite, save 'buttton'.
//1. like & dislike: thumb-up for like and thumb-down for dislike.
function Buttonicon () {
    const [liked, setLiked] = useState(false)
    const [disLiked, setDisLiked] = useState(false)
    const [saved, setSaved] = useState(false)
    const [favourited, setFavourited] = useState(false)
    const [commented, setCommented] = useState(false)
    //function handleClick () {
   // }
    
return(
            //count likes
            //count dislike
            //save content info
            //add a favourite content info
            //add a comment about content info

    <div>
        <button className="liked" onClick={() => setLiked(!liked)} style={{color: liked ? "cyan" : "grey"}}>
            <FaThumbsUp />
        </button>
        <button className = "disLiked"onClick={() => setDisLiked(!disLiked)} style={{color: disLiked ? "black" : "grey"}}>
            <FaThumbsDown />
        </button>
        <button className="saved" onClick={() => setSaved(!saved)} style={{color: saved ? "black" : "grey"}}>
            <FaSave />
        </button>
        <button className="favourite" onClick={() => setFavourited(!favourited)} style={{color: favourited ? "red" : "grey"}}>
            <FaHeart />
        </button>
        <button className="comment" onClick={() => setCommented(!commented)} style={{color: commented ? "green" : "grey"}}>
            <FaComment />
        </button>
    </div>
)

}
export default Buttonicon;