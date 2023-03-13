import styles from './ProfileCard.module.css'

import {HiOutlinePencilSquare, HiTrash, HiOutlineXCircle} from 'react-icons/hi2'

function ProfileCard({id, name, email, phone, pic, closeWindow, deleteContact, showEditContact, contactData}){

    const remove = (e) => {
        e.preventDefault()
        deleteContact(id)
    }

    return(
        <div className={styles.profileContainer}>
            <HiOutlineXCircle className={styles.close} title='close window' onClick={closeWindow} />
            <div className={styles.profileData}>
                <div className={styles.pic}>
                    <img src={pic} alt='pic' />
                </div>
                <h2>{name}</h2>
                <p>{phone}</p>
                <p>{email}</p>
            </div>
            <div className={styles.icons}>
                <div className={styles.edit}>
                    <HiOutlinePencilSquare className={styles.icon} onClick={showEditContact}/>
                    <p>Edit Contact</p> 
                </div>
                <div className={styles.delete}>
                    <HiTrash className={styles.icon} onClick={remove}/>
                    <p>Delete</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;