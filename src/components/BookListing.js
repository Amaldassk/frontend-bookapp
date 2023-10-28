import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BookListing = () => {

    const [books, setBooks] = useState(null);

    useEffect(()=>{
        getBookDetails()
    },[]);

    const getBookDetails = async () => {
        let token = localStorage.getItem('bUApp');
        token = JSON.parse(token).token;
        let result = await fetch('http://localhost:3300/api/books',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        });
        result = await result.json();
        console.log(result);
        setBooks(result);
    }

    const handleDelete = async (id) => {
        let result = await fetch(`http://localhost:3300/api/book?id=${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        getBookDetails();
    }

    return(
        <>
            <div className="border-b border-slate-300 pl-3 mt-4 font-semibold pb-2 flex justify-between">
                <h4 className="text-slate-500">Book list</h4>
                <div>
                    <Link to="/addbook" className="mx-2 text-slate-500 underline text-sm">Add Book</Link>
                </div>
            </div>
            <table className="min-w-[900px] divide-y divide-gray-200 dark:divide-gray-700 table-fixed">
                <tbody>
                {books && books.map((book,i)=>{
                    let id;
                    return (
                        <tr key={i}>
                        {Object.entries(book).map((item,i)=>{
                            if(item[i]==='id'){
                                id=item[1];
                            }
                            return <td key={i} className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{item[1]}</td>
                        })}
                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-blue-400 dark:text-slate-400 cursor-pointer"><Link to={'/updatebook/' + id}>Update</Link></td>
                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-blue-400 dark:text-slate-400 cursor-pointer" onClick={()=>handleDelete(id)}>Delete</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}

export default BookListing;