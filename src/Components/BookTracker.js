import React, { useMemo, useState, useEffect } from "react";
import { handleNumber } from "./UsefulFunctions";

const BookTracker = () => {
    const [bookTitle, setBookTitle] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [pagesRead, setPagesRead] = useState(0);
    const [completed, setCompleted] = useState(false);

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
                <input value={e.Completed} type='checkbox' onChange={({target}) => {
                    var index = bookList.indexOf(e);
                    var tempArray = [...bookList];
                    tempArray[index].Completed = target.value;
                    setBookList(tempArray);
                }} />
                <h3>Last updated: {e.LastUpdated}</h3>
            </li>
        )
    , [bookList.length]);

    return (
        <div>
            <form onSubmit={AddBook}>
                <input type='text' />
                <input type='text' />
                <input type='number' />
            </form>
        </div>
    )
}

export default BookTracker;