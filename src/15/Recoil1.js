import { useEffect, useState } from "react";
import Recoil2 from "./Recoil2";

export default function Recoil1() {
    const [cnt, setCnt] = useState(0);

    useEffect(() => {
        console.log(cnt)
    } , [cnt]);

  return (
    <div className="w-full h-full flex flex-col
                    text-2xl font-bold
                    justify-center items-center">
      Recoil : {cnt}
      <Recoil2  cnt = {cnt}
                setCnt = {setCnt}
        />
    </div>
  )
}
