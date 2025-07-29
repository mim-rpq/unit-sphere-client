
import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.init';
import { AuthContext } from './AuthContext';


const auth = getAuth(app)


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true)


    // const signUpWithGoogle = () => {
    //     setUserLoading(true)
    //     const provider = new GoogleAuthProvider()

    //     return signInWithPopup(auth, provider)
    // }


    const createUser = (email, password) => {
        setUserLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const signIn = (email, password) => {
        setUserLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => setUserLoading(false));
    }

    const logOut = () => {
        setUserLoading(true)
        return signOut(auth);
    }

    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setUserLoading(false)
        });

        return () => {
            unSubscribe()
        }
    }, [])

    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        userLoading,
        setUserLoading,
        updateUserProfile,
    }

    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};

export default AuthProvider;