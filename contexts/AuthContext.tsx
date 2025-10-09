'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  AuthError
} from 'firebase/auth';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { User, LoginData, SignupData } from '../types/auth';

interface AuthContextType {
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

interface FirebaseAuthError extends Error {
  code: string;
  message: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Create user document in Firestore - FIXED VERSION
  const createUserDocument = async (firebaseUser: FirebaseUser, name: string): Promise<User> => {
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        // Check if this is the first user (make them admin)
        const usersCollection = await getDocs(collection(db, 'users'));
        const isFirstUser = usersCollection.empty;

        const userData: User = {
          uid: firebaseUser.uid,
          name: name,
          email: firebaseUser.email!,
          role: isFirstUser ? 'admin' : 'user', // First user = admin, others = user
          createdAt: new Date().toISOString()
        };

        await setDoc(userRef, userData);
        return userData;
      } else {
        return userSnapshot.data() as User;
      }
    } catch (error) {
      console.error('Error creating user document:', error);
      // Return a basic user object even if Firestore fails
      return {
        uid: firebaseUser.uid,
        name: name,
        email: firebaseUser.email!,
        role: 'user', // Default to user if there's an error
        createdAt: new Date().toISOString()
      };
    }
  };

  // Get user data from Firestore
  const getUserData = async (firebaseUser: FirebaseUser): Promise<User | null> => {
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        return userSnapshot.data() as User;
      }

      // If user document doesn't exist, create one
      return await createUserDocument(firebaseUser, firebaseUser.email?.split('@')[0] || 'User');
    } catch (error) {
      console.error('Error getting user data:', error);
      // Return a basic user object even if Firestore fails
      return {
        uid: firebaseUser.uid,
        name: firebaseUser.email?.split('@')[0] || 'User',
        email: firebaseUser.email!,
        role: 'user', // Default to user if there's an error
        createdAt: new Date().toISOString()
      };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userData = await getUserData(firebaseUser);
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (data: LoginData): Promise<void> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const userData = await getUserData(userCredential.user);

      if (!userData) {
        throw new Error('User data not found');
      }

      setUser(userData);
    } catch (error: unknown) {
      let errorMessage = 'Login failed';

      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as FirebaseAuthError;

        switch (firebaseError.code) {
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many failed attempts. Please try again later';
            break;
          default:
            errorMessage = firebaseError.message || 'Login failed';
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  };

  const signup = async (data: SignupData): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const userData = await createUserDocument(userCredential.user, data.name);

      setUser(userData);
    } catch (error: unknown) {
      let errorMessage = 'Signup failed';

      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as FirebaseAuthError;

        switch (firebaseError.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'An account with this email already exists';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password should be at least 6 characters';
            break;
          default:
            errorMessage = firebaseError.message || 'Signup failed';
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error: unknown) {
      let errorMessage = 'Logout failed';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};