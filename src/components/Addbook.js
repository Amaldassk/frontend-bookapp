import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Addbook = () => {

    const [bookTitle, setBookTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    const handleAddBook = async(e) => {
        e.preventDefault();
        let result = await fetch('http://localhost:3300/api/book',{
            method:'POST',
            body:JSON.stringify({'book_title':bookTitle,'description':description,'author_name':author,'price':price}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        navigate('/');
    }
  return (
    <div className="w-[400px] m-auto p-4 box-border border border-gray-400 rounded-md mt-3">
        <h2>Please enter book details</h2>
        <form onSubmit={handleAddBook} className="flex flex-row flex-wrap justify-center">
            <input className="w-full border-gray-400 border my-3 p-2 rounded-md" type="text" placeholder="Book Title" value={bookTitle} onChange={(e)=>setBookTitle(e.target.value)}/>
            <input className="w-full border-gray-400 border my-3 p-2 rounded-md" type="text" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <input className="w-full border-gray-400 border my-3 p-2 rounded-md" type="text" placeholder="Author" value={author} onChange={(e)=>setAuthor(e.target.value)}/>
            <input className="w-full border-gray-400 border my-3 p-2 rounded-md" type="text" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            <button type="submit" className="bg-orange-500 p-2 text-white rounded-md">Add Book</button>
            <Link to="/"  className="bg-orange-500 p-2 text-white rounded-md ml-3">Back</Link>
        </form>
    </div>
  )
}

export default Addbook