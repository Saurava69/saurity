'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification
} from 'firebase/auth'
import { auth, db } from '@/lib/firebase/config'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          ...userDoc.data()
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signup = async (email, password, displayName) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    
    // Create user profile in Firestore
    await setDoc(doc(db, 'users', result.user.uid), {
      email,
      displayName,
      createdAt: new Date().toISOString(),
      bookmarks: [],
      role: 'user'
    })

    return result
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    
    // Check if user profile exists, if not create it
    const userDoc = await getDoc(doc(db, 'users', result.user.uid))
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        createdAt: new Date().toISOString(),
        bookmarks: [],
        role: 'user'
      })
    }

    return result
  }

  const logout = () => {
    return signOut(auth)
  }

  const value = {
    user,
    currentUser: auth.currentUser,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    sendEmailVerification
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
