import React, {useState, useEffect, useRef } from 'react'
import Phonebook from './Phonebook/Phonebook'
import Contacts from "./Contacts/Contacts"
import Filter from './Filter/Filter'
import { nanoid } from 'nanoid'
import './Styles/App.scss'





export default function App() {
const [contacts, setContacts] = useState([])
const [filter, setFilter] = useState("")

const firstRen = useRef(false)

useEffect(() => {

  if (firstRen.current) {

    localStorage.setItem("contacts", JSON.stringify(contacts))
    
  }

  
    

  
}, [contacts])

useEffect(() => {
  
  const parsedContacts = JSON.parse(localStorage.getItem("contacts"))
    
 if (localStorage.getItem("contacts") && parsedContacts.length !== 0 ) {setContacts([...parsedContacts])};

 firstRen.current = true
}, [])





function formSubmit (data) {
  let arrName = contacts.map(el=>el.name.toLowerCase())

  let newContact = {id: nanoid(), ...data}
  arrName.includes(data.name.toLowerCase()) ? alert(`${data.name} is already in your contacts`) : 
  setContacts([newContact, ...contacts]) 
    
}

const filterOnChange  = e => {
    const {value} = e.currentTarget
    setFilter(value);
  };

  const deleteContact = contactId => {
      
        setContacts(contacts.filter(contact => contact.id !== contactId))
    };


const toLowFilter = filter.toLowerCase()
const visibleContacts = contacts.filter(cont => cont.name.toLowerCase().includes(toLowFilter))
  return (
    <div className='container'>

      <h2>Phonebook</h2>
      <Phonebook className="Phonebook" onSubmit={formSubmit}  />
      
      <h2>Contacts</h2>
      
      {contacts.length ?
       <div className='contacts-wrapper'>
       <Filter filter={filter} changeFilter={filterOnChange}/> 
       <Contacts filter={filter} deleteContact={deleteContact} filterOnChange={filterOnChange} contactsList={visibleContacts}/> 
       </div>
       : <h2>В вашей книге еще нет контактов</h2>}
      
     </div>
  )
}


// export default class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//          }

// filterOnChange  = e => {
//   const {value} = e.currentTarget
//   this.setState({ filter: value });
// };

// formSubmit = data => {
//   let arrName = this.state.contacts.map(el=>el.name.toLowerCase())

//   let newContact = {id: nanoid(), ...data}
//   arrName.includes(data.name.toLowerCase()) ? alert(`${data.name} is already in your contacts`) : 
//   this.setState(({ contacts }) => ({
//     contacts: [newContact, ...contacts],
//   }))
  
// }

// deleteContact = contactId => {
//   this.setState(prevState => ({
//     contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//   }));
// };

// componentDidMount () {
   
//   const parsedContacts = JSON.parse(localStorage.getItem("contacts"))
 
  

//  if (localStorage.getItem("contacts")) {this.setState ({ contacts: [...parsedContacts] })};


// }

// componentDidUpdate (prevProps, prevState) {
  
//   if (prevState.contacts !== this.state.contacts) {
//     localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
//   }
// }



//   render() {
    
    
//     const toLowFilter = this.state.filter.toLowerCase()
//     const visibleContacts = this.state.contacts.filter(cont => cont.name.toLowerCase().includes(toLowFilter))
//     return (
//      <div className='container'>

//       <h2>Phonebook</h2>
//       <Phonebook className="Phonebook" onSubmit={this.formSubmit}  />
      
//       <h2>Contacts</h2>
      
//       {this.state.contacts.length ?
//        <div className='contacts-wrapper'>
//        <Filter filter={this.state.filter} changeFilter={this.filterOnChange}/> 
//        <Contacts filter={this.state.filter} deleteContact={this.deleteContact} filterOnChange={this.filterOnChange} contactsList={visibleContacts}/> 
//        </div>
//        : <h2>В вашей книге еще нет контактов</h2>}
      
//      </div>
//     )
//   }
// }

