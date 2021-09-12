import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';

import { MEAL, MEAL_STATE } from '../types';
import {GridSelectionModel} from "@mui/x-data-grid";

const apiUrl = process.env.REACT_APP_DEV_API_URL;

export const fetchAsyncGetMeal = createAsyncThunk(
  'meal/getMeal',
  async () => {
    const res = await axios.get(`${apiUrl}api/meal/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const initialState: MEAL_STATE = {
  openDeleteDialog: false,
  openUpdateDialog: false,
  selectedRowIds: [],
  meals: [
    {
      id: 0,
      company: 0,
      company_name: '',
      name: '',
      price: 0,
      calorie: 0,
      protein: 0,
      carbohydrate: 0,
      sugar: 0,
      lipid: 0,
      dietary_fiber: 0,
      salt: 0,
      is_bad: false,
      url: '',
      img: null,
    },
  ],
};

export const mealSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    setOpenDeleteDialog(state) {
      state.openDeleteDialog = true;
    },
    resetOpenDeleteDialog(state) {
      state.openDeleteDialog = false;
    },
    setOpenUpdateDialog(state) {
      state.openUpdateDialog = true;
    },
    resetOpenUpdateDialog(state) {
      state.openUpdateDialog = false;
    },
    setSelectedRowIds(state, action) {
      state.selectedRowIds = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetMeal.fulfilled,
      (state, action: PayloadAction<MEAL[]>) => {
        return {
          ...state,
          meals: action.payload,
        };
      }
    );
  }
});

export const {
  setOpenDeleteDialog,
  resetOpenDeleteDialog,
  setOpenUpdateDialog,
  resetOpenUpdateDialog,
  setSelectedRowIds,
} = mealSlice.actions;

export const selectOpenDeleteDialog = (state: RootState) => state.meal.openDeleteDialog;
export const selectOpenUpdateDialog = (state: RootState) => state.meal.openUpdateDialog;
export const selectSelectedRowIds = (state: RootState) => state.meal.selectedRowIds;
export const selectMeals = (state: RootState) => state.meal.meals;

export default mealSlice.reducer;
