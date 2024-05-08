import { useState } from 'react';
import ChooseAccountType from './SignupProcessComponents/ChooseAccountType';
import EnterEmail from './SignupProcessComponents/EnterEmail';
import SetPassword from './SignupProcessComponents/SetPassword';
import SetName from './SignupProcessComponents/SetName';
import SubmitPage from './SignupProcessComponents/SubmitPage';
import SetLocation from './SignupProcessComponents/SetLocation';
import Construction from './Construction';
import './styles/SignupProcess.css'

interface Props {
  onSuccessfulSignup: () => void;
}

function SignupProccess({onSuccessfulSignup}: Props) {
  const [name,setName] = useState<string>("");
  const [accountType, setAcountType] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [location, setLocation] = useState(null);

  const onSubmit = async () => {
    const newUserData = {
        id: -1,
        username: name,
        email: email,
        password: password,
        address: JSON.stringify(location),
        city: "undefined",
        region: "undefined",
        phone_number: -1,
        dogs: ['dog1','dog2']
    }

    fetch('http://localhost:8000/create_user/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_type: accountType, // Make sure this is directly under the root of the JSON body
            user_data: newUserData
        })
    }).then(res => {
        if (res.ok) {
            console.log("User created successfully");
            return res.json();
        } else {
            console.log("Error creating user");
            return res.text().then(text => { throw new Error(text) });
        }
    }).then(data => {
        console.log(data);
        onSuccessfulSignup();
    }).catch(err => {
        console.error("my error log:", err);
    });
}



  return (
    <div className='signup-container'>
    <h1 className="title">Woofi signup process</h1>
    
    {
      (accountType === "") &&
      <ChooseAccountType setAccountType={setAcountType}/>
    }
    
    {
      accountType === "walker" &&
      <Construction/>
    }

    { 
      accountType === "owner" &&
      email === "" &&
     <EnterEmail setEmail={setEmail}/>
    }

    { email !== "" &&
      password === "" &&
      <SetPassword setPassword={setPassword}/>
    }

    {
      email !== "" &&
      password !== "" &&
      name === "" &&
      <SetName setName={setName}/>
    }

    {
      email !== "" &&
      password !== "" &&
      name !== "" &&
      !location &&
      <SetLocation setFinalLocation={setLocation}/>
    }

    { email !== "" &&
    password !== "" &&
    name !== "" && 
    location && 
    <SubmitPage name={name} email={email} onSubmit={onSubmit} setEmail={setEmail} setName={setName}/>}
    </div>
  )
}

export default SignupProccess;
