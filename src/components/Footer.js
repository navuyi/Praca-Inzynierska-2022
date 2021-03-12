import styles from '../styles/footer.module.css';
import person from '../images/person.png';
import mail from '../images/mail.png';


function Footer(){
    return(
        <div className={styles.footer}>
            <div className={styles.col_1}>
                <div className={styles.wrapper}>
                    <img src={person} />
                    <p> Rafał Figlus </p>
                </div>
                <div className={styles.wrapper}>
                    <img src={mail} />
                    <p> figlusrafal@gmail.com </p>
                </div>


            </div>
            <div className={styles.col_2}>

            </div>
            <div className={styles.col_1}>

            </div>
        </div>
    )
}

export default Footer;