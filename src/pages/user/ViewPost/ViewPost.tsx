import ViewPost1 from '../../../Components/user/Home/ViewPost'
import { useSearchParams } from "react-router-dom";

function ViewPost() {
  //getting query data for shared link
    const [searchParams] = useSearchParams();
    const copyPostId:string = searchParams.get("postId"); // Retrieve the postId from query
    console.log(typeof(copyPostId)," copy post id data in query data")
    console.log(copyPostId," post id data %%%%%%%%%%%%%%%")
  return (
    <div>
      <ViewPost1 copyPostId={copyPostId} />
      
    </div>
  )
}

export default ViewPost
