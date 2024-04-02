import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UltraSrtFcst() {

    const dt = useParams().dt;
    const area = useParams().area;
    const x = useParams().x;
    const y = useParams().y;
    
    //fetch data state 변수로 저장
    const [tdata, setTdata] = useState([]);

    //화면에 표시되는 테이블 tr저장
    const [trtag, setTrtag] = useState([]);

    console.log(dt, area, x, y);

    //fetch 함수
    const getData = async(url) => { // async = 비동기 함수 - await을 쓰면 중간에서 멈춘다. (.then이랑 똑같은 것)
      const resp = await fetch(url);
      const data = await resp.json();
      setTdata(data.response.body.items.item);
    }

    //데이터 가져오기

    useEffect(() => {
        
        let url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?`;
        url = url + `serviceKey=${process.env.REACT_APP_APIKEY}`;
        url = url + `&pageNo=1&numOfRows=1000&dataType=json&base_date=${dt}&base_time=0630&nx=${x}&ny=${y}`;
        console.log(url)

        //fetch 함수
        getData(url)

    }, []);

    //tdata가 저장 되었을 때, 

    useEffect(() => {
      console.log(tdata)
      let tm = tdata.map(item => 
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.category}
              </th>
              <td className="px-6 py-4">
                  {`${item.fcstDate.substring(0, 4)}-${item.fcstDate.substring(4, 6)}-${item.fcstDate.substring(6, 8)}`}
              </td>
              <td className="px-6 py-4">
                  {`${item.fcstTime.substring(0, 2)} : ${item.fcstTime.substring(2, 4)}`}
              </td>
              <td className="px-6 py-4">
                  {item.fcstValue}
              </td>
            </tr>
        )
        setTrtag(tm);
    }, [tdata])

  return (
    <div className="w-full h-full flex flex-col
                    justify-start items-center">
      <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-10/12 text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                      <th scope="col" className="px-6 py-1">
                          항목명
                      </th>
                      <th scope="col" className="px-6 py-1">
                          예측일자
                      </th>
                      <th scope="col" className="px-6 py-1">
                          예측시간
                      </th>
                      <th scope="col" className="px-6 py-3">
                          예보값
                      </th>
                  </tr>
              </thead>
              <tbody>
                {trtag}
              </tbody>
          </table>
      </div>
    </div>
  )
}
