import styles from '../styles/homeQuickSearch.module.css';


function HomeQuickSearch(){
    return(
        <div className={styles.homeQuickSearch}>
            <h1> Znajdź wyjazd już teraz </h1>
            <input
                type="text"
                placeholder="Jakie miejsca Cie interesują?"
                className={styles.placeInput}
            />
            <button> Szukaj </button>
        </div>
    )
}

export default HomeQuickSearch;