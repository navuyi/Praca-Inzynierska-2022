import NavbarLink from "./NavbarLink";


function NavbarList(props){
    const style={
        listStyle: "none",
        margin: 0,
        padding: 0,

        display: "flex",
        justifyContent: "space-evenly"
    }
    return(
        <ul style={style}>
            {props.children}
        </ul>
    );
}

export default NavbarList;