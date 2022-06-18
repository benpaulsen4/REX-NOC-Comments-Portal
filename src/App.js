import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Button, Label, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { useState } from 'react';

const AppVer = "0.1"

function App() {
  const [dropdown1Open, setDropdown1] = useState(false);
  const [dropdown2Open, setDropdown2] = useState(false);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [notify, setNotify] = useState(false);

  const toggleDropdown1 = () => {
    setDropdown1(!dropdown1Open);
  }

  const toggleDropdown2 = () => {
    setDropdown2(!dropdown2Open);
  }

  const submitClick = () => {
    setNotify(true);
    setTimeout(() => setNotify(false), 5000);
  }

  function Notifier() {
    if (notify) {
      return (
        <div className='container'>
          <Toast>
            <ToastHeader>Congrats!</ToastHeader>
            <ToastBody>You pressed a button! Good job~</ToastBody>
          </Toast>
        </div>
      );
    } else return;
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt='REX logo' className='App-logo'/>
      </header>
      <Notifier />
      <body className='App-body'>
        <div className='container py-4'>
        <div className='p-5 mb-4 text-white bg-dark super-rounded'>
            <h1 className='display-5 fw-bold'>NOC Comment Portal</h1>
          <div className='container-fluid py-4 my-content'>
            
              <div className='p-3'>
                <Dropdown isOpen={dropdown1Open} toggle={toggleDropdown1}>
                  <DropdownToggle caret>
                    Select site type
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Commercial EN</DropdownItem>
                    <DropdownItem>Distributed</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                </div>

                <div className='p-3'>
              <Dropdown isOpen={dropdown2Open} toggle={toggleDropdown2}>
                <DropdownToggle caret>
                  Select site/node
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Cairns St</DropdownItem>
                  <DropdownItem>Somewhere else</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

                <div className='p-3'>
                <Label for='user'>Name:</Label>
                  <Input placeholder='Name' id='user' value={username} onChange={(event) => setUsername(event.target.value)} />
              </div>
              <div className='p-3'>
                  <Label for='comment'>Comment:</Label>
                  <Input id='comment' type='textarea' value={comment} onChange={(event) => setComment(event.target.value)} />
              </div>
              
          </div>
            <div className='align-right'>
              <Button onClick={submitClick}>Submit</Button>
            </div>
        </div>
        </div>
      </body>
      <footer className='App-footer'>
        <p>REX Energy branding and 'X' logo (C) REX Energy 2022. Created by Ben Paulsen. Licensed under GPL-3. V {AppVer}.</p>
      </footer>
    </div>
  );
}

export default App;
