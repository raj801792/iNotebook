import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'


const Login = (props) => {

  /*const context = useContext(noteContext);
  const { getLogin } = context;*/
  const [Credential, setCredential] = useState({ email: "", password: "" })
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: Credential.email, password: Credential.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      history.push("/");
      props.showAlert("Logged in Successfully","success");
    }
    else {
      props.showAlert("Invalid Details","danger");
    }
  }
  const onChange = (e) => {
    setCredential({ ...Credential, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='container my-3 card shadow p-3 mb-5 bg-body rounded' >
        <h2>Login to continue to Notebook</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 row my-3">
            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" name="email" value={Credential.email} onChange={onChange} id="email" />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" name="password" value={Credential.password} onChange={onChange} id="password" />
            </div>
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary mb-3">Confirm identity</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
