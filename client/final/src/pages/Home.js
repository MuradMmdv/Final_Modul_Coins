import React from 'react'
import {  Link} from "react-router-dom";
  import './allcoins.css';
  import bullion from "../pages/img1/Canadian Beaver_1.png";
  import exclusive from "../pages/img1/Rial_1.png";
  import commeromative from "../pages/img1/Cron_1.png";
  import { useState, useEffect } from 'react';
  import axios from 'axios';
import ReactModal from 'react-modal';



const Home = () => {
  
  const [query, setQuery] = useState('');
  const [coinB, setcoinB] = useState([]);
  const [isOpen, setIsOpen] = useState({});


  useEffect(() => {
    const fetchAllBullian = async () => {
      try {
        const res = await axios.get('http://localhost:3002/');
        setcoinB(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBullian()},[query]);
    const handleOpen = (coinId) => {
      setIsOpen({
          ...isOpen,
          [coinId]: true
      });
   }
  
   const handleClose = (coinId) => {
      setIsOpen({
          ...isOpen,
          [coinId]: false
      });
  };

  const handleSearch = () => {
    if (query === '') {
      setcoinB([]);
    } 
    else if (query.length === 1) {
      setcoinB([]);
    }
    else {
      const filteredCoins = coinB.filter((coin) =>
        coin.coinname.toLowerCase().includes(query.toLowerCase())
      );
      setcoinB(filteredCoins);
    }
  };

  return (
    <div>
        <div>
      <h1 className='homepage'>Homepage</h1>
      <p className='input-field'>input field</p>
      <div className='input-search'>
        <input
          onChange={(e) => setQuery(e.target.value)}
          className='homeInput'
        />
        <button onClick={handleSearch} className='search'>
          Search
        </button>
      </div>
      <button className='advancedFilter'>
        <Link className='link' to='/filter'>
          Advanced filter ↓
        </Link>
      </button>
      
      {query !== '' && (
        <div className='coinsBul'>

        {coinB.map(coin=>(
           <div className='coinB' key={coin.id}>
            <div className='forFlex'>
                <img className='imgBul' src={`${process.env.PUBLIC_URL}./img/${coin.images}`} alt=''/>
            <div className='descAndName'><h2 className='nameBul' onClick={() => handleOpen(coin.id)}>{coin.coinname}</h2>
            <p className='coinDesc'>{coin.description.slice(coin.description.indexOf('.') + 1, coin.description.indexOf('.', coin.description.indexOf('.') + 1) + 1)}</p>
            </div></div>



            <ReactModal
                    isOpen={isOpen[coin.id]}
                    contentLabel="Example Modal"
                    onRequestClose={() => handleClose(coin.id)}
                    className="popup"
                >
                    <div className='popupContainerDiv'>
                    <div className='popupImg'><img className='imgBul' src={`${process.env.PUBLIC_URL}./img/${coin.images}`} alt=''/> 
                <img className='imgBul' src={`${process.env.PUBLIC_URL}./img/${coin.images_2}`} alt=''/></div>
                    <div className='popupRightSide'><h2>{coin.coinname}</h2>
                    <p>Description: {coin.description}</p>
                    <p>Country: {coin.country}</p>
                    <p>Composition: {coin.composition}</p>                   
                    <p>Denomination: {coin.denomination}</p>
                    <p>Price: {coin.price}</p>
                    <p>Quality: {coin.quality}</p>
                    <p>Weight: {coin.weight} g </p>
                    <p>Year: {coin.years}</p></div></div>
                </ReactModal>
           </div> 
        ))}
    </div>
      )}
    </div>

        <div className='container'>
            <div className='container-part'>
            <h2 className='htwoForHome'>Bullion Coins</h2>
            <button className='buttonForHome'><Link className='link' to='/bullion'>Show all→</Link></button>
                <img className='imageForHome' src={bullion} alt='bullian'/>
                </div>
            <div className='container-part'>
                <h2 className='htwoForHome'>Exclusive Coins</h2>
                <button className='buttonForHome'><Link className='link' to='/exclusive'>Show all→</Link></button>
                <img className='imageForHome' src={exclusive} alt='bullian'/>
                </div>
            <div className='container-part'>
            <h2 className='htwoForHome'>Commemorative Coins</h2>
            <button className='buttonForHome'><Link className='link' to='/commemorative'>Show all→</Link></button>
            <img className='imageForHome' src={commeromative} alt='bullian'/>
            </div>
        </div>

    </div>
  )
}

export default Home;