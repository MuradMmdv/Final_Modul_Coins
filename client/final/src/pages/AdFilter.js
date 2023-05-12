import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactModal from 'react-modal';


const AdFilter = () => {
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
        <Link className='link' to='/'>
          Advanced filter ↑
        </Link>
      </button>
      <div className='adFilters'>
        <div className='leftFilters'>
        <form className='formInput'>
  <label for="country"> Issuing country:</label>
  <select className='homeInputAdLeft' id="country" name="country">
    <option value="country1">Canada</option>
    <option value="country2">USA </option>
    <option value="country3">Costa Rica</option>
    <option value="country4">China</option>
  </select>
</form>
<form  className='formInput'>
  <label for="metal">Metal:</label>
  <select className='homeInputAdLeft' id="metal" name="metal">
    <option value="metal1">Sink</option>
    <option value="metal2">Gold </option>
    <option value="metal3">Bronze </option>
    <option value="metal4">Steel</option>
  </select>
</form>      
<form className='formInput' >
<label htmlFor="quality">Quality of Coin:</label>
<select className='homeInputAdLeft' id="quality" name="quality">
  <option value="quality1">BU</option>
  <option value="quality2">Proof</option>
</select>


</form></div>
      <div className='rightFilters'>
        <div className='rightInputs'>
          <p className='upside1'>price</p>
          <p className='fromTo'>from:</p>
          <input className='homeInputAd'/>
          <p className='fromTo'>to:</p>
      <input className='homeInputAd'/></div>
      <div className='rightInputs'>
      <p className='upside2'>year of issue</p>
        <p className='fromTo'>from:</p>
        <input className='homeInputAd'/>
        <p className='fromTo'>to:</p>
      <input className='homeInputAd'/></div></div>

      </div>

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
  );
};

export default AdFilter;
