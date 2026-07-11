import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api"; 

//GET MENUS
export const getMenus = createAsyncThunk(
  "menus/getMenus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/v1/eats/stores/${id}/menus`);

      let menuData = [];
      let menuDocId = null;
     console.log("getMenus response", response);
      if (response.data.data && response.data.data.length > 0) {
        menuDocId = response.data.data[0]._id;
        menuData = response.data.data[0].menu;
      }

      return { menu: menuData, menuId: menuDocId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

//CREATE MENU
export const createMenu = createAsyncThunk(
  "menus/createMenu",
  async ({ restaurantId, category }, { rejectWithValue }) => {
    try {
      const body = {
        restaurant: restaurantId,
        menu: [{ category, items: [] }],
      };

      const { data } = await API.post(
        `/v1/eats/stores/${restaurantId}/menus`,
        body,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

//ADD ITEM
export const addItemToMenu = createAsyncThunk(
  "menus/addItemToMenu",
  async (
    { menuId, category, foodItemId, restaurantId },
    { rejectWithValue }
  ) => {
    try {
      const body = { category, foodItemId };

      const { data } = await API.patch(
        `/v1/eats/stores/${restaurantId}/menus/${menuId}/addItem`,
        body,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);


// import API from "../../utils/api";

// import {
//   getMenusRequest,
//   getMenusSuccess,
//   getMenusFail,

//   createMenuRequest,
//   createMenuSuccess,
//   createMenuFail,

//   addItemRequest,
//   addItemSuccess,
//   addItemFail,
// } from "../slices/menuSlice";

// // GET MENUS
// export const getMenus = (id) => async (dispatch) => {
//   try {
//     dispatch(getMenusRequest());

//     const response = await API.get(
//       `/v1/eats/stores/${id}/menus`
//     );

//     let menuData = [];
//     let menuDocId = null;

//     if (response.data.data?.length > 0) {
//       menuDocId = response.data.data[0]._id;
//       menuData = response.data.data[0].menu;
//     }

//     dispatch(
//       getMenusSuccess({
//         menu: menuData,
//         menuId: menuDocId,
//       })
//     );
//   } catch (error) {
//     dispatch(
//       getMenusFail(
//         error.response?.data?.message || error.message
//       )
//     );
//   }
// };

// // CREATE MENU
// export const createMenu =
//   ({ restaurantId, category }) =>
//   async (dispatch) => {
//     try {
//       dispatch(createMenuRequest());

//       const body = {
//         restaurant: restaurantId,
//         menu: [{ category, items: [] }],
//       };

//       const { data } = await API.post(
//         `/v1/eats/stores/${restaurantId}/menus`,
//         body,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       dispatch(createMenuSuccess(data.data));
//     } catch (error) {
//       dispatch(
//         createMenuFail(
//           error.response?.data?.message || error.message
//         )
//       );
//     }
//   };

// // ADD ITEM
// export const addItemToMenu =
//   ({ menuId, category, foodItemId, restaurantId }) =>
//   async (dispatch) => {
//     try {
//       dispatch(addItemRequest());

//       const body = {
//         category,
//         foodItemId,
//       };

//       const { data } = await API.patch(
//         `/v1/eats/stores/${restaurantId}/menus/${menuId}/addItem`,
//         body,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       dispatch(addItemSuccess(data.data));
//     } catch (error) {
//       dispatch(
//         addItemFail(
//           error.response?.data?.message || error.message
//         )
//       );
//     }
//   };