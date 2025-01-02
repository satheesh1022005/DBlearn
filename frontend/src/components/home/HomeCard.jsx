import "./HomeCard.css"
const HomeCard=({source,title,link})=>{
    return(
        <>
            <div className="home-card  w-25 d-flex flex-column justify-content-center align-items-center">
            <a href={link} className="d-flex flex-column justify-content-center align-items-center">
                <img src={source} alt={title}/>
                <h3>{title}</h3>
            </a>
            </div>
        </>
    )
}
export default HomeCard;