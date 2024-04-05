import { useSearchParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react";
import TailSelect from "../UI/TailSelect";
import getcode from './getcode.json'

export default function FrcstList() {
  const [queryParams] = useSearchParams() ;
  const dt = queryParams.get('dt');
  const area = queryParams.get('area');
  const x = queryParams.get('x');
  const y = queryParams.get('y');
  const gubun = queryParams.get('gubun');

  const newURL = gubun === '단기예보' ? 'getVilageFcst?' : 'getUltraSrtFcst?'

  const bTime = gubun === '단기예보' ? '0500' : '0630'


  const ops = getcode.filter(item => item["예보구분"] === gubun)
  .map(item => `${item["항목명"]} (${item["항목값"]})`);

  const itemRef = useRef()

      //fetch data state 변수로 저장
      const [tdata, setTdata] = useState([]);

      //화면에 표시되는 테이블 tr저장
      const [trtag, setTrtag] = useState([]);
  
      //select 박스 선택값
      const [selItem, setSelItem] = useState();
      const [selItemName, setSelItemName] = useState();
  
      //select 박스 항목 선택
      const handleItem = () => {
        if (itemRef.current.value === ''){
          alert('항목을 선택하세요.')
          itemRef.current.focus();
          setTrtag([]);
          return;
        }
        console.log(itemRef.current.value)
        setSelItemName(itemRef.current.value.split(' (')[0]);
        setSelItem(itemRef.current.value.split(' (')[1].replace(')',''));
      }
  
      console.log(dt, area, x, y);
  
      //fetch 함수
      const getData = async(url) => { // async = 비동기 함수 - await을 쓰면 중간에서 멈춘다. (.then이랑 똑같은 것)
        const resp = await fetch(url);
        const data = await resp.json();
        setTdata(data.response.body.items.item);
      }
  
      //데이터 가져오기
  
      useEffect(() => {
          
          let url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/${newURL}`;
          url = url + `serviceKey=${process.env.REACT_APP_APIKEY}`;
          url = url + `&pageNo=1&numOfRows=1000&dataType=json&base_date=${dt}&base_time=${bTime}&nx=${x}&ny=${y}`;
          console.log(url)
  
          //fetch 함수
          getData(url)
      }, []);
  
      //tdata가 저장 되었을 때, 
  
      useEffect(() => {
        let tm = tdata.filter(item => item["category"] === selItem)
        .map(item => 
              <tr key = {item.fcstDate + item.fcstTime}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {selItemName}
                </td>
                <td className="px-6 py-2">
                    {`${item.fcstDate.substring(0, 4)}-${item.fcstDate.substring(4, 6)}-${item.fcstDate.substring(6, 8)}`}
                </td>
                <td className="px-6 py-2">
                    {`${item.fcstTime.substring(0, 2)} : ${item.fcstTime.substring(2, 4)}`}
                </td>
                <td className="px-6 py-2">
                    {item.fcstValue}
                </td>
              </tr>
          )
          setTrtag(tm);
      }, [selItem])

  return (
    <div className="w-10/12 h-full flex flex-col
                    justify-start items-start">
      <div className="w-full justify-start grid grid-cols-1 
                      md:grid-cols-2 
                      gap-2 p-2">
      </div>
        <div className="text-lg font-bold p-5">
          {`${area} ${gubun} (${dt.substring(0, 4)}-${dt.substring(4, 6)}-${dt.substring(6, 8)}) 일자`}
        </div>
        <div className="p-4">
          <TailSelect ops = {ops}
                      opDefault ="---항목선택---"
                      selRef = {itemRef}
                      handleSel ={handleItem}
          />
        </div>
        <div>

        </div>
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
