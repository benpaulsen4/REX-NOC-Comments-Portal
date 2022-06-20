import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Button, Label, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { useState } from 'react';

const AppVer = "0.5"

function App() {
  const [dropdown1Open, setDropdown1] = useState(false);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [notify, setNotify] = useState(false);
  const [node, setNode] = useState(0);
  const [site, setSite] = useState(0);
  const [disableNodes, setDisableNodes] = useState(true);

  const toggleDropdown1 = () => {
    setDropdown1(!dropdown1Open);
  }

  const submitClick = () => {
    setNotify(true);
    createComment();
    setTimeout(() => setNotify(false), 5000);
  }

  const siteUpdate = (newSite) => {
    if (newSite === 3){
      setDisableNodes(false);
    } else {
      setDisableNodes(true);
    }
    setSite(newSite);
  }

  const createComment = async () => {
    await fetch ('/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'site': site,
        'node': node,
        'name': username,
        'comment': comment
      })
    })
    .then(res => res.json());
  }

  function Notifier() {
    if (notify) {
      return (
        <div className='notif'>
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
        <img src={logo} alt='REX logo' className='App-logo' />
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
                    Select site
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => siteUpdate(1)}>Cairns St</DropdownItem>
                    <DropdownItem onClick={() => siteUpdate(2)}>Somewhere else</DropdownItem>
                    <DropdownItem onClick={() => siteUpdate(3)}>Site w/ nodes</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className='p-3 node-input'>
                <Label for='node'>Node:</Label>
                <Input type='number' id='node' disabled={disableNodes} value={node} onChange={(event) => setNode(event.target.value)} />
              </div>

              <div className='p-3'>
                <Label for='user'>Name:</Label>
                <Input id='user' value={username} onChange={(event) => setUsername(event.target.value)} />
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
