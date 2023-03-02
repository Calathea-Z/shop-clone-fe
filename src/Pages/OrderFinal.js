import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useContext, useEffect, useReducer } from "react";
import Store from "../Store";
import { useNavigate, useParams } from "react-router-dom";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function OrderFinal() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });
  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      return navigate("/login");
    }
  }, []);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div></div>
  );
}

export default OrderFinal;
