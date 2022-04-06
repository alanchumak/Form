import React from 'react';
import styles from './MyInput.module.css';
import { ArrowClosed, ArrowOpen } from '../OpenCloseArrows';


export const ExtraFieldsButton = ({ isShowed = false, onClick}) => {
    const action = isShowed ? 'Скрыть' : 'Показать';
    const arrow = isShowed ? <ArrowOpen /> : <ArrowClosed />
    return (
        <div className={styles.mydiv}>
            <div className={styles.extraFieldsButton} onClick={onClick}>
                {`${action} дополнительные поля`}
                <span className={styles.arrow}>{arrow}</span>
            </div>
        </div>
    )
}