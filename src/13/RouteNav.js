import TailButton from "../UI/TailButton"
import { Link, useNavigate } from "react-router-dom"

export default function RouteNav() {
    const navigator = useNavigate() ;

  return (
    <div className="w-11/12 flex flex-col
                    justify-center items-center">

            <ul className="w-11/12 flex
                    justify-between items-center">
               <li className="px-4 py-2 m-2 rounded-md w-full bg-slate-200 text-center">
                    <Link to ='/'>홈</Link>
                </li>
               <li className="px-4 py-2 m-2 rounded-md w-full bg-slate-200 text-center">
                <Link to ='/page1/오렌지'>Page1</Link>
                </li>
               <li className="px-4 py-2 m-2 rounded-md w-full bg-slate-200 text-center">
                <Link to ='/page2?item1=커피&item2=쥬스'>Page2</Link>
                </li>
            </ul>
            <div className="w-11/12 flex
                    justify-center items-center">
            <TailButton caption = "홈"
                        color = "blue"
                        handleClick = {() => {navigator("/")}}/>
            <TailButton caption = "Page1"
                        color = "blue"
                        handleClick = {() => {navigator("/Page1/포도")}}/>
            <TailButton caption = "Page2"
                        color = "blue"
                        handleClick = {() => {navigator("/Page2?item1=사과&item2=바나나")}}/>
        </div>
    </div>
  )
}
