import TailButton from "../UI/TailButton";

export default function Recoil3({cnt, setCnt}) {
  const handleUp = () => {
    setCnt(cnt + 1);
  }
  return (
    <div>
        <div>
          <TailButton   caption = '증가'
                        color = 'blue'
                        handleClick = {handleUp}
                    />
        </div>
    </div>
  )
}
