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
        var tempArray = [...bookList, {
            Title: bookTitle,
            Author: bookAuthor,
            PagesRead: pagesRead,
            Completed: false,
            LastUpdated: new Date()
        }];

        setBookList(tempArray);
    }

    useEffect(() => {
        localStorage.setItem('BookList', JSON.stringify(bookList));
    }, [bookList]);

    const bookListRender = useMemo(() => 
        bookList.map(e => {
            var date = new Date(e.LastUpdated);
            date = date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            return (<li key={bookList.indexOf(e)}>
                <h1>{e.Title}</h1>
                <h2>By {e.Author}</h2>
                <h3>Pages Read: {e.PagesRead}</h3>
                <label>Completed: </label>
                <input checked={e.Completed} type='checkbox' onChange={() => {
                    var tempArray = [...bookList];
                    var index = tempArray.indexOf(e);
                    tempArray[index].Completed = !e.Completed;
                    tempArray[index].LastUpdated = Date.now();
                    setBookList(tempArray);
                }} />
                <h3>Last updated: {date}</h3>
            </li>
        )})
    , [bookList]);

    return (
        <div>
            <form onSubmit={AddBook}>
                <input placeholder="Title" value={bookTitle} type='text' onChange={({target}) => {
                    setBookTitle(target.value);
                }} />
                <input placeholder="Author" value={bookAuthor} type='text' onChange={({target}) => {
                    setBookAuthor(target.value);
                }} />
                <input type='number' value={pagesRead} onChange={({target}) => {
                    var input = handleNumber(target.value);
                    setPagesRead(input);
                }} />
                <input type='submit' value='Submit' />
            </form>

            <ol>
                {bookListRender}
            </ol>
        </div>
    )
}

export default BookTracker;