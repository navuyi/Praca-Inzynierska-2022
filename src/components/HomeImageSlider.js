
import styles from '../styles/homeImageSlider.module.css';

import img01 from '../images/slider01.jpg';
import img02 from '../images/slider02.jpg';
import img03 from '../images/slider03.jpg';
import img04 from '../images/slider04.jpg';
import img05 from '../images/slider05.jpg';
import img06 from '../images/slider06.jpg';

function HomeImageSlider(props){

    return(
        <div className={styles.slider}>
            {props.children}
        </div>
    );
}

export default HomeImageSlider;