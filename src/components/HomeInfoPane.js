import styles from '../styles/homeInfoPane.module.css';

function HomeInfoPane(props){

    return(
        <div className={styles.homeInfoPane}>
            <img src={props.image} className={styles.image} />
            <h1> {props.title}</h1>
            <p> {props.description} </p>
        </div>
    );
};


export default HomeInfoPane;