import { createAction, props } from '@ngrx/store';
import { BookRequiredProps } from '@book-co/shared-models';


// EVENT Storming - what are all the possible events/actions that can happen in the books page & associated data
  // 1. Identify all the events in the System - create, delete
  // 2. Identify the commands that trigger the events - button click, scroll, keypress, api response etc
  // 3. Identify the actor that triggers the event - in this case an USER, but it can be a response from a server
  // 4.Find the DATAMODELs of the additional data if any to be be sent with th Action when its dispatched - to give context to the event


// This page mostly handles CRUD operations related to the BOOK - so the events are all related to that


// User Enters the page
export const enter = createAction('[Books Page] Enter')
// User Create Book
export const createBook = createAction('[Books Page] Create Book', props<{book: BookRequiredProps}>())
// User Selects Book
export const selectBook = createAction('[Books Page] Select Book', props<{bookId: string}>())
// User clear selected book
export const clearSelectedBook = createAction('[Books Page] Clear Selected Book')
// User Updates Book
export const updateBook = createAction('[Books Page] Update Book', props<{bookId: string, changedBook: BookRequiredProps}>())
// User Deletes Book
export const deleteBook = createAction('[Books Page] Delete Book', props<{bookId: string}>())
