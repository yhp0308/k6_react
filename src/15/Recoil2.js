import Recoil3 from "./Recoil3"

export default function Recoil2({cnt, setCnt}) {
  return (
    <div className="w-full flex flex-col
                    text-2xl font-bold
                    justify-center items-center">
      Recoil2
      <Recoil3  cnt = {cnt}
                setCnt = {setCnt}/>
    </div>
  )
}
