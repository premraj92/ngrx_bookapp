import { createAction, props } from '@ngrx/store';
import { BookModel } from '@book-co/shared-models';


// EVENT STORM i.e. identify all the API Events/actions associated with our books page

// LOAD (GET) - all books
export const allBooksLoaded = createAction(`[Books API] All Books Loaded Successfully`, props<{books: BookModel[]}>())

// CREATE (POST) - a new book
export const newBookCreated = createAction(`[Books API] New Book Created Successfully`, props<{book: BookModel}>())

// UPDATE (PATCH) - an existing book
export const bookUpdated = createAction(`[Books API] Book Updated Successfully`, props<{book: BookModel}>())

// DELETE (DELETE) - a book
export const bookDeleted = createAction(`[Books API] Book Deleted Successfully`, props<{bookId: string}>())
