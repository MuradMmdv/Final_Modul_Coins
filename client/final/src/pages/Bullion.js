import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import './allcoins.css'
// import bullion from "../../public/img/Canadian Beaver_1.png";
import {  Link } from "react-router-dom";
import ReactModal from 'react-modal';


const Bullion = () => {
 const [coinB, setcoinB] = useState([])
 const [isOpen, setIsOpen] = useState({});


 useEffect(()=>{
  const fetchAllBullian= async ()=>{
    try{
      const res= await axios.get("http://localhost:3002/Bullion")
      setcoinB(res.data);
      console.log(res);
    }
    catch(err){
        console.log(err)
    }
  }
  fetchAllBullian()
 },[])

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
 }

 return(
    <div>
        <h1 className='homepage'>List of the Coins</h1>
        <p className='input-field'>input field</p>
        <div className='input-search'>
        <input className='homeInput'/>
        <button className='search'>Search</button>
        </div>
        <button className='advancedFilter' ><Link className='link' to='/filter'>Advanced filter ↓</Link></button>
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
    </div>
 )
}

export default Bullion
