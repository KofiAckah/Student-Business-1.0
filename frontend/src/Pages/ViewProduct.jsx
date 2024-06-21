import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

export default function ViewProduct() {
  const [product, setProduct] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3005/user/view-product/${id}`,
          {
            withCredentials: true,
          }
        );
        setProduct(res.data);
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error.response.data.msg, { variant: "error" });
      }
    };
    fetchProduct();
  }, [enqueueSnackbar, id]);
  return (
    <div>
      ViewProduct
      <p>{product.title}</p>
    </div>
  );
}
