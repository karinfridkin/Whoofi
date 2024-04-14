import { useState } from 'react';
import Login from './Login'
import SignupProccess from './SignupProcess';
import SearchProvider from './searchProvider';
import DogWalkersSearchPage from './DogWalkersSearchPage'
import DogWalkerProfile from './DogWalkerProfile';

const WindowSetter = () => {

    const [currentWindow, setCurrentWindow] = useState<string>("Login");

    const onGoToSignup = () => {
        setCurrentWindow("Signup");
    }

    return (
        <>
        {currentWindow === 'Login' && <Login onGoToSignup={onGoToSignup} setCurrentWindow={setCurrentWindow}/>}
        {currentWindow === 'Signup' && <SignupProccess setCurrentWindow={setCurrentWindow}/>}
        {currentWindow === 'Scroller' && <DogWalkersSearchPage/>}
        </>
    )

}

export default WindowSetter