import { useEffect, useState, useRef } from "react";
import Pill from "./components/Pill.jsx";
import "./styles.css";

export default function App() {
  // TODO 1: Add debouncing to search box
  // TODO 2: Keyboard Navigation for Options
  // TODO 3: Use Async-Await instead of Promise
  // TODO 4: Add loading symbol to let user know options are loading

  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userSet, setUserSet] = useState(new Set());

  const inputRef = useRef(null);
  const handleSelectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setUserSet(new Set([...userSet, user.email]));
    setSearchInput("");
    setUsers([]);
    inputRef.current.focus();
  };

  const handleRemoveUser = (email) => {
    let updatedUsers = selectedUsers.filter((user) => user.email !== email);
    setSelectedUsers(updatedUsers);
    let updatedSet = new Set([...userSet]);
    updatedSet.delete(email);
    setUserSet(updatedSet);
  };

  const handleBackSpace = (e) => {
    if (!e.target.value && e.key === "Backspace" && selectedUsers.length) {
      handleRemoveUser(selectedUsers.at(-1).email);
    }
  };

  const fetchUsers = () => {
    if (searchInput) {
      fetch(`https://dummyjson.com/users/search?q=${searchInput}`)
        .then((res) => res.json())
        .then((res) => {
          setUsers(res.users);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchInput]);

  return (
    <div className="container">
      <div className="input-container">
        {selectedUsers.map((user) => {
          return (
            <Pill
              image={user.image}
              text={`${user.firstName} ${user.lastName}`}
              key={user.email}
              handleClick={() => handleRemoveUser(user.email)}
            />
          );
        })}
        <input
          ref={inputRef}
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter text to search"
          onKeyDown={handleBackSpace}
          autoFocus
        ></input>
      </div>
      <ul className="search-list">
        {users?.map((user) => {
          return !userSet.has(user.email) ? (
            <li
              className="user"
              key={user.email}
              onClick={() => handleSelectUser(user)}
            >
              <img src={user.image} />
              <span>
                {user.firstName} {user.lastName}
              </span>
            </li>
          ) : (
            <></>
          );
        })}
      </ul>
    </div>
  );
}
