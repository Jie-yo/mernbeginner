import './App.css';
import { useState, useEffect } from "react";
import Axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [listOfFriends, setListOfFriends] = useState([]);

  const addFriend = () => { 
    Axios.post('https://jie-mern.herokuapp.com/addfriend', { name: name, age: age }).then((response) => {
      setListOfFriends([...listOfFriends, { _id: response.data._id,name: name, age: age}]);
    })
  };


  const updateFriend = (id) => {
    const newAge = prompt("Enter new age: ");

    Axios.put('https://jie-mern.herokuapp.com/update', {newAge: newAge, id: id}).then(()=>{
      setListOfFriends(listOfFriends.map((val)=>{
        return val._id === id 
        ? {_id: id, name: val.name, age: newAge} 
        : val
      }))
    })
  };

  const deleteFriend = (id) => {
    Axios.delete(`https://jie-mern.herokuapp.com/delete/${id}`).then(()=>{
      setListOfFriends(
        listOfFriends.filter((val) => {
        return val._id !== id;
      })
      );
    })
  };

  useEffect(()=>{
    Axios.get('https://jie-mern.herokuapp.com/read')
    .then((response)=>{
      setListOfFriends(response.data);
 
    }).catch(()=>{
      console.log("err");
    });
  }, []);


  return (
    <div className="App">
      <div class="inputs">
        <input type="text" placeholder = "Friend Name" onChange = {(event) => {
          setName(event.target.value);
        }} />
        <input type="number" placeholder = "Age" onChange = {(event) => {
          setAge(event.target.value);
        }} />

        <button onClick={addFriend}>Add Friend</button>
      </div>

      <div className="listOfFriends">
      {listOfFriends.map((val) => {
        return (
          <div className="friendContainer">
            <div className="friend"> 
              <h3>Name: {val.name}</h3>
              <h3>Age: {val.age}</h3>
            </div>
            <button onClick={() => {updateFriend(val._id)}} >Update</button>
            <button id = "remove" onClick={() => {deleteFriend(val._id)}} >Delete</button>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default App;