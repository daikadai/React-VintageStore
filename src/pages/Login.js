import React from "react";

// strapi function
import loginUser from '../strapi/loginUser';
import registerUser from '../strapi/registerUser';
// handle user
import { useHistory } from "react-router-dom";


export default function Login() {
  const history = useHistory();
  // setup user context

  //state values
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('default');
  const [isMember, setIsMember] = React.useState(true);

  let isEmpty = !email || !password || !username;

  console.log(isEmpty);

  const toggleMember = () => {
    setIsMember(prevMember => {
      let isMember = !prevMember
      isMember ? setUsername('default') : setUsername('');
      return isMember;
    })
  };

  const handleSubmit = async e => {
    // alert
    e.preventDefault();
    let response;
    if (isMember) {
      //response = await loginUser
    } else {
      response = await registerUser({ email, password, username });

    }
    if (response) {
      //
      console.log('success');
      console.log(response);

    } else {
      // show alert
    }
  };

  return (
    <section className="form section">
      <h2 className="section-title">{isMember ? "sign in" : "register"}</h2>
      <form className="login-form">
        {/* single input */}
        <div className="form-control">
          <label htmlFor="email">email</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        {/* single input */}
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {/* single input */}
        {!isMember && <div className="form-control">
          <label htmlFor="username">username</label>
          <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
        </div>}
        {/* empty form text */}
        {
          isEmpty && <p className="form-empty">please fill out all form fields</p>
        }
        {/* submit btn */}
        {!isEmpty && <button type="submit" className="btn btn-block btn-primary" onClick={handleSubmit}>submit</button>}
        {/* register link */}
        <p className="register-link">
          {isMember ? "need to register" : "already a membter"}
          <button type="button" onClick={toggleMember}>
            click here
          </button>
        </p>
      </form>
    </section>
  )
}
