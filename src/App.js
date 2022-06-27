import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Button, Label, Toast, 
  ToastBody, ToastHeader, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useEffect, useState } from 'react';

const AppVer = "0.65";

function App() {
  //State declarations
  const [dropdown1Open, setDropdown1] = useState(false);
  const [dropdown2Open, setDropdown2] = useState(false);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [notify, setNotify] = useState(false);
  const [node, setNode] = useState(0);
  const [site, setSite] = useState("");
  const [disableNodes, setDisableNodes] = useState(true);
  const [siteArray, setSiteArray] = useState([]);
  const [sitesWithNodes, setWithNodes] = useState([]);
  const [notifyHeader, setNotifyHeader] = useState("");
  const [notifyBody, setNotifyBody] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [existingComments, setExistingComments] = useState([]);

  const toggleDropdown1 = () => {
    setDropdown1(!dropdown1Open);
  }

  const toggleDropdown2 = () => {
    setDropdown2(!dropdown2Open);
  }

  const submitClick = () => {
    //Prepare notification 
    setNotifyHeader("Comment Sent");
    setNotifyBody(`The comment for site ${site} has been sent to the server`);
    setNotify(true);
    createComment();
    setTimeout(() => setNotify(false), 5000); //Make it dissapear after 5 seconds
  }

  //Updates the site and determines if it will enable nodes
  const siteUpdate = async (newSite) => {
    setNode(0);
    setDisableNodes(true);
    for (let i = 0; i < sitesWithNodes.length; i++) {
      if (sitesWithNodes[i] === newSite) setDisableNodes(false);
    }

    //TODO: Gets list of comments given a site for use in upcoming delete function
    await fetch('/comments', {
      method: 'get',
      body: JSON.stringify({
        'site': site
      })
    })
      .then(res => res.json())
      .then(res => setExistingComments(res["result"]));
    setSite(newSite);
  }

  const createComment = async () => {
    await fetch('/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'site': site,
        'node': node === 0 ? "Site_1" : `Node_${node}`,
        'name': username,
        'comment': comment
      })
    })
      .then(res => res.json());
  }

  const toggleModal = () => setShowModal(!showModal);

  //Component to display notifications to the user in a standard way
  function Notifier() {
    if (notify) {
      return (
        <div className='notif'>
          <Toast>
            <ToastHeader>{notifyHeader}</ToastHeader>
            <ToastBody>{notifyBody}</ToastBody>
          </Toast>
        </div>
      );
    } else return;
  }

  let siteSet = new Set(); //Temporary set to filter sites with multiple nodes

  //This will fetch site information on page load and never again
  useEffect(() => {
    fetch('/sites')
      .then(res => res.json())
      .then(res => res["result"].forEach(i => {
        console.log(i);

        //Rudimentarily determines if a site has nodes by looking for a node 1
        if (i["Site"] === "Node_1") {
          let temp = Array.from(sitesWithNodes);
          temp.push(i["Device Name"]);
          setWithNodes(temp);
        }

        siteSet.add(i["Device Name"]);
      }))
      .then(() => setSiteArray(Array.from(siteSet))); //Prevents site array from having multiple sites with the same name

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt='REX logo' className='App-logo' />
        <dev className="delete-button">
          <Button color="danger" onClick={toggleModal}>Delete comment</Button>
        </dev>
      </header>
      <Notifier />
      <Modal toggle={toggleModal} isOpen={showModal}>
        <ModalHeader>Delete a comment</ModalHeader>
        <ModalBody>
          <Dropdown isOpen={dropdown2Open} toggle={toggleDropdown2}>
            <DropdownToggle caret>
              Select site
            </DropdownToggle>
            <DropdownMenu>
              {siteArray.map(i => <DropdownItem onClick={() => siteUpdate(i)}>{i}</DropdownItem>)}
            </DropdownMenu>
          </Dropdown>
          <Input type='select'>
            {/* Here is where the available comments to delete would be populated  */}
          </Input>
        </ModalBody>
      </Modal>
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
                    {siteArray.map(i => <DropdownItem onClick={() => siteUpdate(i)}>{i}</DropdownItem>)}
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
        <p>REX Energy branding and 'X' logo (C) REX Energy 2022. Created by Ben Paulsen. Licensed under GPLv3. App Version {AppVer}.</p>
      </footer>
    </div>
  );
}

export default App;
