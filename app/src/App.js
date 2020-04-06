import React, {useState, useEffect} from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import './App.css';

const App = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
    .then(res => {
      setUsers(res.data);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <h1>Dream Team Directory</h1>
      {/* app is a container  that has a title and usercards*/}
      {users.map(user => <UserCard user={user} /> )}
      
    </div>
  );
}

export default App;
