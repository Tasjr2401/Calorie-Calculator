import React, { useMemo, useState, useEffect, SetStateAction } from "react";
import { generateID, handleNumber } from "./UsefulFunctions";
import '../Style.css';
import { useSelector, useDispatch } from "react-redux";
import { RootType } from "./ReduxFiles/Store";
import { bookActions } from "./ReduxFiles/BookSlice";

export interface Book {
    id: number,
    title: string,
    author: string,
    pagesRead: number,
    completed: boolean,
    lastUpdated: number
}

const BookTracker = () => {
    const { bookList } = useSelector((state: RootType) => state.bookTracker);
    const dispatch = useDispatch();

    useEffect(() => {
        const bookArray: Book[] = JSON.parse(localStorage.getItem('BookList') || '[]');
        dispatch(bookActions.loadBooks(bookArray));
    },[]);

    function AddBook(form: React.FormEvent<HTMLFormElement>): void {
        const bookTitle: string = (form.currentTarget.elements.namedItem('BookTitle') as HTMLInputElement).value;
        const bookAuthor: string = (form.currentTarget.elements.namedItem('Author') as HTMLInputElement).value;
        const pagesRead: number = handleNumber((form.currentTarget.elements.namedItem('PagesRead') as HTMLInputElement).value);

        const bookId = generateID();
        var tempArray: Book = {
            id: bookId,
            title: bookTitle,
            author: bookAuthor,
            pagesRead: pagesRead,
            completed: false,
            lastUpdated: Date.now()
        };

        dispatch(bookActions.addBook(tempArray));
    }

    useEffect(() => {
        localStorage.setItem('BookList', JSON.stringify(bookList));
    }, [bookList]);

    return (
        <div>
            <form onSubmit={AddBook}>
                <input placeholder="Title" name="BookTitle" type='text' />
                <input placeholder="Author" name="Author" type='text' />
                <input type='number' name="PagesRead" />
                <input type='submit' value='Submit' />
            </form>
            <div className="row">
                <div className="column">
                    <label><h1>Reading List</h1></label>
                    <ol>
                        <BookListRender completed={false} />
                    </ol>
                </div>
                <div className="column">
                    <label><h1>Finished Books</h1></label>
                    <ol>
                        <BookListRender completed={true} />
                    </ol>
                </div>
            </div>
        </div>
    )
}

interface BookListRenderProps {
    completed: boolean
}

const BookListRender = ({ completed }: BookListRenderProps) => {
    const { bookList } = useSelector((state: RootType) => state.bookTracker);
    const dispatch = useDispatch();

    return (
        <div>
            {bookList.map(e => {
                if(e.completed === completed) {
                    var date: string | Date = new Date(e.lastUpdated);
                    date = date.toLocaleString('en-US');
                    return (
                        <li key={e.id}>
                            <h1>{e.title}</h1>
                            <h2>By {e.author}</h2>
                            <h3>Pages Read: {e.pagesRead}</h3>
                            <label>Completed: </label>
                            <input checked={e.completed} type='checkbox' onChange={() => {
                                dispatch(bookActions.toggleCompleted(e.id));
                            }} />
                            <h3>Last updated: {date}</h3>
                        </li>
                    )
                }
            })}
        </div>
    )
}

export default BookTracker;