import { createSelector } from 'reselect';

export const selectEmployee = state => state.employees;

export const selectEmployeesItems = createSelector(
    [selectEmployee],
    employee => employee.employees
);