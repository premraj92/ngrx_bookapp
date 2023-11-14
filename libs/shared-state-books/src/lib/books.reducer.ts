import { createReducer, on, Action, createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { BookModel, calculateBooksGrossEarnings } from '@book-co/shared-models';
import { BooksPageActions, BooksApiActions } from '@book-co/books-page/actions';

export interface State {
  collection: BookModel[],
  activeBookId: string | null
}

export const initialState: State = {
  collection: [],
  activeBookId: null
}

export const sharedBooksReducer = createReducer(
  initialState,

  on(BooksPageActions.enter, BooksPageActions.clearSelectedBook, (state) => {
    return {
      ...state,
      activeBookId: null
    }
  }),

  on(BooksPageActions.selectBook, (state, action) => {
    return {
      ...state,
      activeBookId: action.bookId
    }
  }),

  on(BooksApiActions.allBooksLoaded, (state, action) => {
    return {
      ...state,
      collection: action.books
    }
  }),

  on(BooksApiActions.newBookCreated, (state, action) => {
    return {
      activeBookId: null,
      collection: createBook(state.collection, action.book)
    }
  }),

  on(BooksApiActions.bookUpdated, (state, action) => {
    return {
      activeBookId: null,
      collection: updateBook(state.collection, action.book)
    }
  }),

  on(BooksApiActions.bookDeleted, (state, action) => {
    return {
      ...state,
      collection: deleteBook(state.collection, action.bookId)
    }
  })
  )

const createBook = (books: BookModel[], book: BookModel) => [...books, book]

const updateBook = (books: BookModel[], changes: BookModel) =>
  books.map((book) => {
    return book.id === changes.id ? Object.assign({}, book, changes) : book;
  })

const deleteBook = (books: BookModel[], bookId: string) =>
  books.filter((book) => bookId !== book.id)



// Selectors - you can keep it together with reducers in this file as both the SELECTORS & REDUCERS depend & intercat with the STATE in a big way -
// that state(initialState) is also here so it can be a better practice to keep - all the related reducers, selectors & state here


export const selectBooks = (state: State) => state.collection
export const selectActiveBookId = (state: State) => state.activeBookId



// In a most basic form you can write small selector functions like selectAllBooks, selectActiveBookId above and then
// compose them together to achieve other selections(like selectActiveBook) - while this works absolutely fine - this misses the performance benefits offered
// by NGRX via createSelector helper method that uses MEMOIZATION to call these composable small functions only when its required
// i.e. when the value of the bound property changes

// // Less PERFORMANT selector using basic JS function composition
  // export const selectActiveBook = (state: State) => {
  //   const allBooks = selectAllBooks(state)
  //   const activeBookId = selectActiveBookId(state)

  //   return allBooks.find(book => book.id === activeBookId) || null
  // }



// Better version using the createSelecor
// same result as the above less performant version - but this createSelector uses memoization to avoid recomputing the smaller functions unless their output changes

  export const selectActiveBook = createSelector(
    selectBooks,
    selectActiveBookId,
    (allBooks, activeBookId) => {
      return allBooks.find(book => book.id === activeBookId) || null
    }
  )


  export const selectEarningsTotal =  createSelector(
    selectBooks,
    calculateBooksGrossEarnings
    )
