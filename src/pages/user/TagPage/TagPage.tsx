import UserProfileEdit from "../../../Components/user/Home/UserProfileEdit"

import Navbar from "../../../Components/user/Home/Navbar"

import { useLocation } from "react-router-dom"
import TagSearch from "../../../Components/user/Home/TagSearch"

function TagPage() {

  
 const location=useLocation()  
  const searchParams = new URLSearchParams(location.search);
  const searchTag = location.state?.tag || searchParams.get("tag") || ""; // Handle null case
console.log(searchTag ," searchTag in uselocation 888888888888 ")
console.log(searchTag,"search tag in search page1111111111111111111111111")
  return (
    <>
   
      <Navbar/>     
      <TagSearch searchTag={searchTag} />
    </>
  )
}

export default TagPage