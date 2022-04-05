import { createSelector } from 'reselect';

export const selectOffice = state => state.offices;

export const selectOfficeItems = createSelector(
    [selectOffice],
    office => office.offices
);