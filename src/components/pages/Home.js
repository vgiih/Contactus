import styles from './Home.module.css'

import ProfileCard from '../profile/ProfileCard'
import NoneSelected from '../profile/NoneSelected'
import NewContact from '../profile/NewContact'
import Contacts from '../layout/Contacts'

import {HiOutlineMagnifyingGlass, HiPlus} from 'react-icons/hi2'
import { useEffect, useState } from 'react'

function Home() {

    const [newContact, setNewContact] = useState(false)
    const [noneSelected, setNoneSelected] = useState(true)
    const [showContact, setShowContact] = useState(false)
    const [editContact, setEditContact] = useState(false)

    const [contacts, setContacts] = useState([])
    const [selectedContact, setSelectedContact] = useState(null);

    const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));


    function createContact(contact, photo){
    
        // check if the photo is a blob
        if (photo instanceof Blob) {
            // encode the photo as a base64 string
            const reader = new FileReader()
            reader.readAsDataURL(photo)
            reader.onloadend = function() {
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '')
    
                // add the photo to the contact object
                contact.photo = base64String
    
                // send the contact object to the server
                fetch('http://localhost:5000/contacts', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(contact),
                })
                .then((resp) => resp.json())
                .then((data) => {
                    //console.log(data)
                    //redirect
                    alert('Contact created successfully!');
                    window.location.reload();
                })
                .catch((err) => console.log(err))
            }
        } else {
            // if the photo is not a blob, add the contact object to the server without the photo
            fetch('http://localhost:5000/contacts', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(contact),
            })
            .then((resp) => resp.json())
            .then((data) => {
                //console.log(data)
                //redirect
                alert('Contact created successfully!');
                window.location.reload();
            })
            .catch((err) => console.log(err))
        }
    }

    useEffect(() => {

        fetch('http://localhost:5000/contacts', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            //console.log(data)
            setContacts(data)
        })
        .catch((err) => console.log(err))

    }, [])

    function showNewContact(){
        setNewContact(true)
        setNoneSelected(false)
        setShowContact(false)
        setEditContact(false)
    }

    function closeWindow(){
        setNewContact(false)
        setShowContact(false)
        setNoneSelected(true)
        setEditContact(false)
    }

    function showContactCard(id){
        fetch(`http://localhost:5000/contacts/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            //console.log(data)
            setSelectedContact(data)
            setNewContact(false)
            setNoneSelected(false)
            setShowContact(true)
            setEditContact(false)
        })
        .catch((err) => console.log(err))
    }

    function showEditContact(id){
        //console.log(selectedContact.id)
        fetch(`http://localhost:5000/contacts/${selectedContact.id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setSelectedContact(data)
            //console.log(data)
            setNewContact(false)
            setNoneSelected(false)
            setShowContact(false)
            setEditContact(true)
        })
        .catch((err) => console.log(err))
    }

    function editContactData(contact, photo){
        // check if the photo is a blob
        if (photo instanceof Blob) {
            // encode the photo as a base64 string
            const reader = new FileReader()
            reader.readAsDataURL(photo)
            reader.onloadend = function() {
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '')
    
                // add the photo to the contact object
                contact.photo = base64String
    
                // send the contact object to the server
                fetch(`http://localhost:5000/contacts/${contact.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(contact),
                })
                .then((resp) => resp.json())
                .then((data) => {
                    //console.log(data)
                    //redirect
                    alert('Contact modified successfully!');
                    window.location.reload();
                })
                .catch((err) => console.log(err))
            }
        } else {
            // if the photo is not a blob, add the contact object to the server without the photo
            fetch(`http://localhost:5000/contacts/${contact.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(contact),
            })
            .then((resp) => resp.json())
            .then((data) => {
                //console.log(data)
                //redirect
                alert('Contact modified successfully!')
                window.location.reload();
            })
            .catch((err) => console.log(err))
        }   
    }

    function deleteContact(contact, id) {
        fetch(`http://localhost:5000/contacts/${contact.id}`, {
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
    })
        .then((resp) =>resp.json())
        .then((data) => {
            setContacts(contacts.filter((contact) => contact.id !== id))
            alert('Contact deleted successfully!')
            window.location.reload()
        })
        .catch((err) => console.log(err))
    }

    // SEARCH CONTACT

    const [searchQuery, setSearchQuery] = useState("")
    const [searchOn, setSearchOn] = useState(false)

    function handleSearchInputChange(event) {
        setSearchQuery(event.target.value)
        setSearchOn(true)
    }

    const filteredContacts = sortedContacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return(
        <div className={styles.mainContainer}>
            <div className={styles.homeContainer}>
                <div className={styles.searchContainer}>
                    <div>
                        <HiOutlineMagnifyingGlass className={styles.icon} />
                        <input type='text' name='search' placeholder='Search a contact' onChange={handleSearchInputChange} />
                        <HiPlus className={styles.icon} title='new contact' onClick={showNewContact}/>
                    </div>
                </div>
                <div className={styles.border}></div>
                <div className={styles.contacts}>
                    {contacts.length > 0 && !searchOn &&
                        sortedContacts.map((contact) => (
                            <Contacts 
                                key={contact.id}
                                pic={contact.picture}
                                name={contact.name}
                                showContactCard={() => showContactCard(contact.id)}
                            />
                        ))
                    }
                    {contacts.length > 0 && searchOn &&
                        filteredContacts.map((contact) => (
                            <Contacts 
                                key={contact.id}
                                pic={contact.picture}
                                name={contact.name}
                                showContactCard={() => showContactCard(contact.id)}
                            />
                        ))
                    }
                </div>
            </div>
            <div className={styles.profile}>
                {!newContact && !showContact && !editContact && (
                    <NoneSelected/>
                )}
                {newContact && !showContact && (
                    <NewContact 
                        text='Add new'
                        button='create'
                        closeWindow={closeWindow}
                        handleSubmit={createContact}
                    />
                )}
                {showContact && (
                    <ProfileCard 
                        id={selectedContact}
                        key={selectedContact.id}
                        name={selectedContact.name}
                        phone={selectedContact.phone}
                        email={selectedContact.email}
                        pic={selectedContact.picture}
                        closeWindow={closeWindow}
                        showEditContact={showEditContact}
                        contactData={selectedContact}
                        deleteContact={deleteContact}
                    />
                )}
                {editContact && !showContact && !newContact && (
                    <NewContact
                        key={selectedContact.id}
                        text='Edit'
                        button='Save contact'
                        closeWindow={closeWindow}
                        contactData={selectedContact}
                        handleSubmit={editContactData}
                    />
                )}
            </div>
        </div>
    )
}

export default Home;

