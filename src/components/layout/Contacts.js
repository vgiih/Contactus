import styles from './Contacts.module.css'

import {HiChevronDown} from 'react-icons/hi2'
import img from '../../images/default.jpg'

import { useState } from 'react';

function Contacts({name, id, pic, showContactCard}){  

    return(
        <div className={styles.contact} onClick={showContactCard}>
            <div className={styles.person}>
                <img src={pic} alt='pic' />
                <p>{name}</p></div>
        </div>
    )
}

export default Contacts;