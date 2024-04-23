import { useEffect, useState, useContext, createContext } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Create a context for the auth data
const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider);
  };

  const signOut = () => {
    const auth = getAuth();
    return auth.signOut().then(() => setUser(null));
  };

  // Subscribe to user on mount
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithGoogle,
    signOut,
  };
}