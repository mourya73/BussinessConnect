import { useAuth } from '../useAuth';

export default function Login() {
  const { signInWithGoogle } = useAuth();

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}