import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'


const Signup = (props) => {
  const [Credential, setCredential] = useState({ name:"",email: "", password: "",cpassword: "" })
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password}=Credential;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name,email, password,})
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      history.push("/");
      props.showAlert("Account Created Successfully","success");
    }
    else {
      props.showAlert("Invalid credentials","danger");
    }
  }
  const onChange = (e) => {
    setCredential({ ...Credential, [e.target.name]: e.target.value })
  }


  return (
    <>
     <div className='container my-3 card shadow p-3 mb-5 bg-body rounded' >
      <h2>Create an account</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3 row my-3">
            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="name"  onChange={onChange} id="name" />
            </div>
          </div>
          <div className="mb-3 row my-3">
            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" name="email"  onChange={onChange} id="email" />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" name="password"  onChange={onChange} id="password" minLength={5} required/>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="cpassword" className="col-sm-2 col-form-label">Conform Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" name="password"  onChange={onChange} id="cpassword" minLength={5} required/>
            </div>
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary mb-3">submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Signup
