import { Header } from "../components/Header"
import './NotFound.css'

export function NotFound({cart}){
    return (
        <>
            <Header cart={cart}/>
           <div className="page-not-found-wrapper">
            <h1 className="not-found-text">Page Not Found</h1>
           </div>
        </>
    )
}