import { useState, useEffect, useRef } from "react"
import GalleryCard from "../11/GalleryCard";

export default function Festival() {

    //부산축제 전체 데이터
    const [tdata,setTdata] = useState() ;
    const [guname, setGuname] = useState();
    const [opTags, setOpTags] = useState();
    const [cardTags, setCardTags] = useState();

    //select 값
    const selRef = useRef();

    // select 선택
    const handleSelGu = (item) => {
        let tmp = tdata.filter(item => item.GUGUN_NM === selRef.current.value).map
        
        (item =>  {
          let title = item.MAIN_TITLE;
          if (title.includes('(')) {
            let i = title.indexOf('(');
            title = title.substring(0, i)
          }
          return <GalleryCard 
                     key = {item.UC_SEQ}
                     imgUrl = {item.MAIN_IMG_NORMAL} 
                     title = {title}
                     ptitle = {item.TRFC_INFO}
                     ktag = {item.USAGE_DAY_WEEK_AND_TIME} />
        });
        setCardTags(tmp)
    }

    // 실제 fetch
    const getData = (url) => {
    fetch(url)
    .then(resp => resp.json())
    .then(data => setTdata(data.getFestivalKr.item))
    .catch(err => console.log(err))
    }

    useEffect(() => {
        let url = `https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?`;
        url = url + `serviceKey=${process.env.REACT_APP_APIKEY}`;
        url = url + `&pageNo=1&numOfRows=40&resultType=json`;
        
        getData(url);
    }, []);

    // 구정보 만들기
    useEffect(() => {
        if(!tdata) return;

        let tm = tdata.map(item => item.GUGUN_NM)
        tm = new Set(tm) ;
        tm = [...tm].sort();

        setGuname(tm);
    }, [tdata]);

    //구 데이터 
    useEffect(() => {
      if(!guname)
      return;

      let op = guname.map(item => 
        <option value={item} key={item}>
          {item}
        </option>
        )

      setOpTags(op);
    }, [guname])

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <form className="w-3/5
                      mx-auto flex justify-center items-center
                      mt-10">
        <label htmlFor="countries_disabled" className="w-1/3 block mb-2 font-medium text-gray-900 text-xl">부산 지역 축제</label>
        <select id="gu"
                onChange={handleSelGu}
                ref = {selRef}
                className="w-2/3
                          bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
          <option defaultValue>---구 선택---</option>
          {opTags}
        </select>
      </form>
      <div className="w-full grid grid-cols-1 
                      md:grid-cols-2 
                      lg:grid-cols-3 
                      gap-4 p-2">
        {cardTags}
      </div>
    </div>
  )
}