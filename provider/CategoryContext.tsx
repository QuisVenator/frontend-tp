import React, { createContext, useContext, useReducer } from 'react';
import { Category } from '../models/Category';
import storage from './Storage';

type State = {
  categories: Category[];
  edit: Category; 
};

interface Add {
  type: CategoryActionType.ADD;
  payload: Category;
}
interface SET_EDIT {
    type: CategoryActionType.EDIT;
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

type CategoryAction = Add | ADD_INITIAL | Update | Cancel | SET_EDIT;

const initialState: State = {
    categories: [],
    edit: {} as Category,
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
    EDIT,
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
        case CategoryActionType.EDIT:
            return {
                ...state,
                edit: action.payload,
            }
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