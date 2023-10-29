import React, { createContext, useContext, useReducer } from 'react';
import { Category } from '../models/Category';
import storage from './Storage';

type State = {
  categories: Category[];
};

interface Add {
  type: CategoryActionType.ADD;
  payload: Category;
}
interface ADD_INITIAL {
    type: CategoryActionType.ADD_INITIAL;
    payload: Category;
  }

interface Update {
    type: CategoryActionType.UPDATE;
    payload: Category;
}

interface Cancel {
    type: CategoryActionType.CANCEL;
    payload: number;
}

type CategoryAction = Add | ADD_INITIAL | Update | Cancel;

const initialState: State = {
    categories: [],
};

const CategoryContext = createContext<{
    state: State;
    dispatch: React.Dispatch<CategoryAction>;
}>({ state: initialState, dispatch: () => null });
(initialState);

export const enum CategoryActionType {
    ADD_INITIAL,
    ADD,
    UPDATE,
    CANCEL,
}

const categoryReducer = (state:State, action: CategoryAction) => {
    let categories = [] as Category[];
    switch (action.type) {
        case CategoryActionType.ADD:
            categories = [...state.categories, action.payload]
            storage.saveObject('categories', categories);
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };
        case CategoryActionType.ADD_INITIAL:
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };
        case CategoryActionType.UPDATE:
            return {
                ...state,
                categories: state.categories.map(category =>
                    category.id === action.payload.id
                        ? action.payload
                        : category
                ),
            };
        case CategoryActionType.CANCEL:
            categories = state.categories.filter(category => category.id !== action.payload)
            storage.saveObject('categories', categories);
            return {
                ...state,
                categories: categories,
            };
        default:
            return state;
    }
}

export const CategoryProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(categoryReducer, initialState);
    return (
        <CategoryContext.Provider value={{ state, dispatch }}>
            {children}
        </CategoryContext.Provider>
    );
}

export const useCategoryContext = () => useContext(CategoryContext);