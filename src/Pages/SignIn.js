import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";

const SignIn = () => {
  const {search} = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  return (
    <Container className='small-container'>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className='my-3'>Sign In</h1>
      <Form>

        <Form.Group className='mb-3' controlled='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' required></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlled='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' required></Form.Control>
        </Form.Group>

        <div className='mb-3'>
          <Button type='submit'>
            Sign In
          </Button>
        </div>

        <div className='mb-3'>
            New Customer?{' '}
            <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>

      </Form>
    </Container>
  )
}
export default SignIn