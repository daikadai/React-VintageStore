import React from "react";

// strapi function

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

  let isEmpty = false;

  const toggleMember = () => { };

  const handleSubmit = async e => { };

  return <h1>hello from login page</h1>;
}
