import React, { useMemo, useState, useEffect } from "react";
import { handleNumber } from "./UsefulFunctions";
import '../Style.css';

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
        var tempArray = [{
            Title: bookTitle,
            Author: bookAuthor,
            PagesRead: pagesRead,
            Completed: false,
            LastUpdated: new Date()
        }, ...bookList];

        setBookList(tempArray);
    }

    function UpdateCompleted(e) {
        var tempArray = [...bookList];
        var index = tempArray.indexOf(e);
        tempArray[index].Completed = !e.Completed;
        tempArray[index].LastUpdated = Date.now();

        tempArray.sort((a, b) => {
            return -1*(a.LastUpdated - b.LastUpdated);
        });
        setBookList(tempArray);
    }

    useEffect(() => {
        localStorage.setItem('BookList', JSON.stringify(bookList));
    }, [bookList]);

    const [toReadListRender, finishedListRender] = useMemo(() => {
        var readingListArray = [];
        var finishedListArray = [];
        bookList.map(e => {
            var date = new Date(e.LastUpdated);
            date = date.toLocaleString('en-US');
            let tempRender = (
                <li key={bookList.indexOf(e)}>
                    <h1>{e.Title}</h1>
                    <h2>By {e.Author}</h2>
                    <h3>Pages Read: {e.PagesRead}</h3>
                    <label>Completed: </label>
                    <input checked={e.Completed} type='checkbox' onChange={() => {
                        UpdateCompleted(e);
                    }} />
                    <h3>Last updated: {date}</h3>
                </li>
            )
            if(e.Completed === false) {
                readingListArray.push(tempRender);
            } else {
                finishedListArray.push(tempRender);
            }
        });
        return [readingListArray, finishedListArray];
    }
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
            <div className="row">
                <div className="column">
                    <label><h1>Reading List</h1></label>
                    <ol>
                        {toReadListRender}
                    </ol>
                </div>
                <div className="column">
                    <label><h1>Finished Books</h1></label>
                    <ol>
                        {finishedListRender}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default BookTracker;