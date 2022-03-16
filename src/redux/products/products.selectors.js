import { createSelector } from 'reselect';

export const selectProduct = state => state.services;

export const selectProductItems = createSelector(
    [selectProduct],
    product => product.products
);