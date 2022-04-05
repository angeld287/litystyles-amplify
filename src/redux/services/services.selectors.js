import { createSelector } from 'reselect';

export const selectService = state => state.services;

export const selectServiceItems = createSelector(
    [selectService],
    service => service.services
);