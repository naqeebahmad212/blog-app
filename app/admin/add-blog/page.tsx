
import { Metadata } from "next"
import AddBlogClient from "./AddBlogClient"


export const metadata = {
  title: "Add-Blog",
};


const AddBlogPage = async() => {
  return (
    <div>
      <AddBlogClient/>
    </div>
  )
}

export default AddBlogPage