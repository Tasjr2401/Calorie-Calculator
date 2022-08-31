import React, { useMemo, useState, useEffect } from "react";
import { handleNumber } from "./UsefulFunctions";

const BookTracker = () => {
    const [bookInput, setBookInput] = useState({
        Title: '',
        Author: '',
        PagesRead: 0,
        Completed: false
    })
    const [bookList, setBookList] = useState(() => {
        var tempArray = JSON.parse(localStorage.getItem('BookList'));
        if(!tempArray) {
            tempArray = [];
        }
        return tempArray;
    })

    function AddBook() {

    }

    const bookListRender = useMemo(() => 
        bookList.map(e => 
            <li key={bookList.indexOf(e)}>
                <h1>{e.Title}</h1>
                <h2>By {e.Author}</h2>
                <h3>Pages Read: {e.PagesRead}</h3>
                <label>Completed: </label>
                <input value={e.Completed} type='checkbox' onChange={() => {
                    
                }} />
            </li>
        )
    , [bookList.length]);

    return (
        <div>
            <form onSubmit={AddBook}>

            </form>
        </div>
    )
}

export default BookTracker;