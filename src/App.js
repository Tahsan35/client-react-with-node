import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users,setUsers] = useState([]);

  useEffect ( () =>{
    fetch('http://localhost:5000/users')
    .then(res =>res.json())
    .then(data =>setUsers(data));
  },[])

  const handleAdUser = e =>{
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    // console.log(name, email);
    const user = {name, email};

    // post data to server

    fetch('http://localhost:5000/user', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
.then(res => res.json())
.then (data => {
  const newUsers =[...users, data];
  setUsers(newUsers);
})

  }




  return (
    <div>
    <h1>my data is:{users.length}</h1>
    <form onSubmit={handleAdUser}>
      <input type="text" name="name" placeholder='Name' />
      <input type="text" name="email" placeholder='email' />
      <input type="submit" value="added user" />
    </form>
    <ul>
      {
        users.map(user => <li key={user.id}>{user.name}</li>)
      }
    </ul>
    </div>
  );
}

export default App;
