import { useAuth0 } from '@auth0/auth0-react';
import WelcomeMessage from '../components/WelcomeMessage';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
      <WelcomeMessage />
  );
};

export default Login;