import { NgModule } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import * as fromBooks from './books.reducer';

export const FEATURE_KEY = 'shared-books';

/**
 * State Shape
 **/
export interface State {
  books: fromBooks.State
}

export const reducers: ActionReducerMap<State> = {
  books: fromBooks.sharedBooksReducer
}

export const metaReducers: MetaReducer<State>[] = [];

/**
 * Module
 **/
@NgModule({
  imports: [StoreModule.forFeature(FEATURE_KEY, reducers, { metaReducers })],
})
export class SharedStateBooksModule {}



// Local Selectors written inside the books.reducer.ts file works only on the "local State" declared inside the reducer file
// and since in NGRX all the feature module STATE are composed together in a TREE to form a SINGLE GLOBAL state
// we need to make these local selectors available globally so that the STATE of this feature module can be accessed globally

// TODO: still have some confusion on how the scoping of selectors to MODULE works - look into it

// Feature Selector
// this createFeatureSelector returns the full STATE of this feature module
export const selectSharedBooksState = createFeatureSelector<State>(FEATURE_KEY);

//  Books Selectors
export const selectBooksState = createSelector(
  selectSharedBooksState,
  (sharedBooksFeatureState) => sharedBooksFeatureState.books
)

export const selectAllBooks = createSelector(
  selectBooksState,
  // (fullFeatureState) => fromBooks.selectBooks(fullFeatureState)
  fromBooks.selectBooks
)

export const selectActiveBook = createSelector(
  selectBooksState,
  fromBooks.selectActiveBook
)

export const selectBooksEarningsTotal = createSelector(
  selectBooksState,
  fromBooks.selectEarningsTotal
)
