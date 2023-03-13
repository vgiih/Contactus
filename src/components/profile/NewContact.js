import styles from './NewContact.module.css'

import defaultImg from '../../images/default.jpg'

import {HiOutlinePencilSquare, HiOutlineXCircle} from 'react-icons/hi2'
import { useState } from 'react'

function NewContact({text, button, closeWindow, handleSubmit, contactData}){

    const [contact, setContact] = useState(contactData || {picture: defaultImg})

    const submit = (e) => {
        e.preventDefault()
        //console.log(contact)
        handleSubmit(contact)
    }

    function handleChange(e) {
        if (e.target.name === 'newfile') {
            // Handle changes to the picture input field
            const file = e.target.files[0];
            if (file && !["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
                // Display an error message to the user
                alert("Invalid file type");
                return;
            }
            const img = file ? URL.createObjectURL(file) : defaultImg;
            setContact(prevState => ({ ...prevState, picture: img }));
        } else {
            // Handle changes to other input fields
            setContact(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
        }
    }

    return(
        <div className={styles.wrapContainer}>
            <HiOutlineXCircle className={styles.close} title='close window' onClick={closeWindow} />
            <div className={styles.mainContainer}>
                <h2>{text} contact</h2>
                <form onSubmit={submit} >
                    <div className={styles.wrapElements}>
                        <div className={styles.pic}>
                            <img src={contact.picture} alt='pic' />
                            <label htmlFor='newfile'><HiOutlinePencilSquare title='choose file' /></label>
                            <input 
                                type='file'
                                name='newfile'
                                id='newfile'
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.inputs}>
                            <input 
                                type='text' 
                                name='name' 
                                id='name'
                                placeholder='Name'
                                onChange={handleChange}
                                value={contact.name || ''}
                            />
                            <input 
                                type='email' 
                                name='email' 
                                id='email'
                                placeholder='Email'
                                onChange={handleChange}
                                value={contact.email || ''}
                            />
                            <input 
                                type='text' 
                                name='phone'
                                id='phone' 
                                placeholder='Phone Number'
                                onChange={handleChange}
                                value={contact.phone || ''}
                            />
                        </div>
                    </div>
                    <button type='submit'>{button}</button>
                </form>
            </div>
        </div>
    )
}

export default NewContact;