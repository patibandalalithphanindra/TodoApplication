import React, {useState, useEffect } from 'react';

import './App.css';
import Form from './Components/Form';
import TodoList from './Components/TodoList';

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus ] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(()=> {
   getLocalTodos();
  },[])

  useEffect(()=> {
   filterHandler();
   saveLocalTodos();
  }, [todos,status]);

  const filterHandler = () => {
      switch(status){
        case 'completed' : 
           setFilteredTodos(todos.filter(todo => todo.completed === true));
           break;

        case 'uncompleted' : 
           setFilteredTodos(todos.filter(todo => todo.completed === false));
           break;

        default :
           setFilteredTodos(todos);
           break;
      }
  }

  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
  }

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let localTodos = JSON.parse(localStorage.getItem("todos"));
      console.log(localTodos);
      setTodos(localTodos);
    }
  }
  
  return (
    <div className="App">
     <header>
     <h1>Todo Application</h1>
     </header>
     <Form 
     todos={todos} 
     setTodos={setTodos} 
     inputText = {inputText} 
     setInputText={setInputText}
     status = {status}
     setStatus = {setStatus}
     />
     <TodoList 
     setTodos={setTodos} 
     todos = {todos}
     filteredTodos = {filteredTodos}
     />
    </div>
  );
}

export default App;
