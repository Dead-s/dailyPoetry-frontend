type props = {
    setPostbox: React.Dispatch<React.SetStateAction<boolean>>,
}

function Add_postBtn(props: props) {
    return (<i className="fa-solid fa-plus" onClick={() => { props.setPostbox(true) }}></i>)
}
export default Add_postBtn