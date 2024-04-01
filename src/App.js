import './App.css';
import { FaHome } from "react-icons/fa";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// import MainHeader from './01/MainHeader';
// import Hello from './01/Hello'; 
// import MyClock from './01_1/MyClock';
// import HelloCss from './02/HelloCss';
// import MyDiv1 from './03_1/MyDiv1';
// import MyListMain from './04/MyListMain';
// import BoxOfficeTb from './05_1/BoxOfficeTb';
import BoxOffice from './05/BoxOffice';
import Lotto from './06/Lotto'; 
import FoodMain from './07/FoodMain';
import MyClock from './08/MyClock';
// import TrafficMain from './09/TrafficMain';
// import RefVal from './10/RefVal';
// import RefInput from './10/RefInput';
// import GalleryCard from './11/GalleryCard';
import GalleryMain from './11/GalleryMain';
import Festival from './12/Festival';
// import RouteMain from './13/RouteMain';
import Frcst from './14/Frcst';


function App() {

  return (
    <BrowserRouter>
    <div className='flex flex-col 
                    w-full max-w-screen-xl 
                    h-screen
                    mx-auto
                    overscroll-y-auto
                    '>
      <header className='flex justify-between items-center
                         h-20 p-10 
                         text-xl font-bold text-blue-800
                         bg-slate-200
                        '>
        <div>리액트실습</div>
        <div className='flex justify-end items-center'>
          <div className='mx-5 p-2 rounded-md hover:bg-blue-900 hover:text-white'>
            <Link to = '/frcst'>
            예보
            </Link>
          </div>
          <div className='mx-5 p-2 rounded-md hover:bg-blue-900 hover:text-white'>
            <Link to = '/festival'>
            축제 정보
            </Link>
          </div>
          <div className='mx-5 p-2 rounded-md hover:bg-blue-900 hover:text-white'>
            <Link to = '/gallerymain'>
            갤러리
            </Link>
          </div>
          <div className='mx-5 p-2 rounded-md hover:bg-blue-900 hover:text-white'>
            <Link to = '/foodmain'>
            푸드마켓
            </Link>
          </div>
          <div className='mx-5 p-2 rounded-md hover:bg-blue-900 hover:text-white'>
            <Link to = '/boxoffice'>
            박스오피스
            </Link>
          </div>
          <div className='mx-5 p-2 rounded-md hover:bg-blue-900 hover:text-white'>
            <Link to = '/lotto'>로또 </Link>
          </div>
            <Link to = '/'>
              <FaHome className='text-2xl text-black'/>
            </Link>
        </div>
      </header>
      
        <main className='grow flex flex-col 
                            justify-center items-center'>
            <Routes>
              <Route path='/' element={<MyClock/>} />
              <Route path='/lotto' element={<Lotto/>} />
              <Route path='/boxoffice' element={<BoxOffice/>} />
              <Route path='/foodmain' element={<FoodMain/>} />
              <Route path='/gallerymain' element={<GalleryMain/>} />
              <Route path='/festival' element={<Festival/>} />
              <Route path='/frcst' element={<Frcst/>} />
            </Routes>
        </main>
      <footer className='flex justify-center items-center
                          h-20 bg-slate-800
                          text-base text-white'>
          ⓒ 2024 Yunhwan Park. All right reserved. 
      </footer>
    </div>
    </BrowserRouter>
  );
}


//화살표 함수로 작성가능
// const App = () => {

//   return ();
// }

export default App;
