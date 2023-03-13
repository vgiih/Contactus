import styles from './NoneSelected.module.css'

import {HiOutlineUserGroup, HiPlus, HiOutlinePencilSquare, HiTrash} from 'react-icons/hi2'

function NoneSelected(){
    return(
        <div className={styles.profileContainer}>
            <div className={styles.wrap}>
                <HiOutlineUserGroup className={styles.icon} />
                <p>Manage your contact list with just one click!</p>
            </div>
            <div className={styles.learn}>
            <p>Touch the symbol <HiPlus className={styles.minIcon} /> to add new contacts to your list, edit contacts touching the symbol <HiOutlinePencilSquare className={styles.minIcon} /> or delete them with the symbol <HiTrash className={styles.minIcon} />.</p>
            </div>
        </div>
    )
}

export default NoneSelected;

// #8204ff