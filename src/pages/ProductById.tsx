import { useNavigate, useParams } from "react-router-dom"


 const ProductById = () => {
    const navigate = useNavigate()
    const params = useParams()
    console.log("param",params);
    
  return (
    <div>
        <button onClick={() => navigate("/product")}>back to home page</button>
    </div>
  )
}
export default ProductById
