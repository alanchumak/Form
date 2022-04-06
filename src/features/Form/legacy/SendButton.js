import React from 'react';
import styles from './MyInput.module.css';


export const SendButton = ({ canSend = true, onClick, isPending}) => {
    return (
        <button
            className={styles.mybutton}
            type='button'
            disabled={!canSend}
            onClick={onClick}
        >
            {isPending ?
                <div className={styles.spiner1}></div>
                : 'Отправить'}
        </button>
    )
}