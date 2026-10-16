import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"


 const Wraper = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}
export default Wraper
