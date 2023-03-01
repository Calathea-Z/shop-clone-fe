import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../components/CheckoutSteps";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { useContext } from "react";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

const Payment = () => {

  const navigate = useNavigate();
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart: { shippingAddress, paymentMethod }, } = state;
  const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || 'PayPal');


  const submitHandler = (e) => {
    e.preventDefault();
    contextDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate])

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div>
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <Button type='submit'>
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Payment;
