import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import firebase from "firebase/app";
import { auth, db } from "../../firebase";
import axios, { AxiosResponse } from "axios";
import { nanoid } from "nanoid";
import { SubmitInputs } from "../../templates/UserInfo";

export type Weight = {
  weightId: string;
  date: string;
  weight: number;
  breakfast: string;
  lunch: string;
  dinner: string;
};

export type UsersState = {
  uid: string | null;
  username: string | null;
  height: number | null;
  isSignedIn: boolean;
  firstLigin: boolean;
  startWeight: number;
  currentWeight: number;
  targetWeight: number;
  weights: Weight[];
  nickname: string | null;
  age: number | null;
};

export type FetchedUserInfo = Pick<
  UsersState,
  "username" | "isSignedIn" | "uid"
>;

const initialState: UsersState = {
  uid: null,
  username: null,
  height: null,
  isSignedIn: false,
  firstLigin: false,
  startWeight: 0,
  currentWeight: 0,
  targetWeight: 0,
  nickname: null,
  age: null,
  weights: [],
};

export const logIn = createAsyncThunk("users/logIn", async () => {
  const google_auth_provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithRedirect(google_auth_provider);
});
export const logOut = createAsyncThunk("users/logOut", async () => {
  auth.signOut();
  return { data: "reset" };
});

export const createUserInfo = createAsyncThunk<
  SubmitInputs,
  SubmitInputs,
  { state: RootState }
>("users/createUserInfo", async (data, thunkAPI) => {
  const uid = thunkAPI.getState().users.uid;
  if (uid) {
    const postData = { userInfo: data, uid };
    await axios
      .post("https://weight-manage-tr.herokuapp.com/create-user-info", { postData })
      .then((res) => {
        console.log("success");
      })
      .catch((res) => console.log(res));
  }
  return data;
});

export const listenAuthState = createAsyncThunk(
  "users/listenAuthState",
  async (content, thunkAPI) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const loginUser: FetchedUserInfo = {
          uid: user.uid,
          isSignedIn: true,
          username: user.displayName,
        };
        thunkAPI.dispatch(setUserInfo(loginUser));
      } else {
        const loginUser: FetchedUserInfo = {
          uid: null,
          isSignedIn: false,
          username: null,
        };
        thunkAPI.dispatch(setUserInfo(loginUser));
      }
    });
  }
);

export const createWeight = createAsyncThunk<any, any, { state: RootState }>(
  "users/createWeight",
  async (data, thunkAPI) => {
    const uid: UsersState["uid"] = thunkAPI.getState().users.uid;
    if (uid) {
      const weightId = nanoid();
      const postData = {
        ...data,
        weightId,
      };
      console.log(postData);
      axios
        .post("https://weight-manage-tr.herokuapp.com/samples/add", { uid, postData })
        .then((res) => {
          console.log("success");
        })
        .catch((res) => console.log(res));

      // const weightsRef = await db
      //   .collection("users")
      //   .doc(uid)
      //   .collection("weights")
      //   .doc();
      // const newWeight: Weight = { ...data, weightId: weightsRef.id };
      // weightsRef.set(newWeight);
      // const newWeight = { ...data };
      return postData;
    }
  }
);

export const fetchUserWeights = createAsyncThunk<
  any,
  any,
  { state: RootState }
>("users/fetchUserWeights", async (data, thunkAPI) => {
  const uid: UsersState["uid"] = thunkAPI.getState().users.uid;
  let fethcedUserInfo: UsersState = thunkAPI.getState().users;
  if (uid) {
    await axios
      .post("https://weight-manage-tr.herokuapp.com/samples/fetch-user-info", { uid })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        fethcedUserInfo = { ...fethcedUserInfo, ...res.data.userInfo };
        fethcedUserInfo.weights = res.data.weights;
      })
      .catch((res: AxiosResponse) => {
        console.log(res);
      });
    // firebase
    // await db
    //   .collection("users")
    //   .doc(uid)
    //   .collection("weights")
    //   .orderBy("date", "asc")
    //   .get()
    //   .then((snapshots) => {
    //     snapshots.forEach((snapshot) => {
    //       fetchedUserWeights.push(snapshot.data() as Weight);
    //     });
    //   });
    console.log(fethcedUserInfo);
    return fethcedUserInfo;
  }
});

export const deleteUserWeight = createAsyncThunk<
  any,
  any,
  { state: RootState }
>("users/deleteUserWeight", async (weightId: string, thunkAPI) => {
  const uid: UsersState["uid"] = thunkAPI.getState().users.uid;
  if (uid) {
    const postData = { weightId };
    let doneDeleteWeights: Weight[] = [];
    await axios
      .post("https://weight-manage-tr.herokuapp.com/samples/delete-weight", { uid, postData })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        doneDeleteWeights = res.data as Weight[];
      })
      .catch((res: AxiosResponse) => {
        console.log(res);
      });
    // await db
    //   .collection("users")
    //   .doc(uid)
    //   .collection("weights")
    //   .orderBy("date", "asc")
    //   .get()
    //   .then((snapshots) => {
    //     snapshots.forEach((snapshot) => {
    //       fetchedUserWeights.push(snapshot.data() as Weight);
    //     });
    //   });
    return doneDeleteWeights;
  }
});

export const updateUserWeights = createAsyncThunk<
  any,
  any,
  { state: RootState }
>("users/updateUserWeights", async (data: Weight, thunkAPI) => {
  const uid: UsersState["uid"] = thunkAPI.getState().users.uid;
  let updatedWeights: Weight[] = [];
  if (uid) {
    await axios
      .post("https://weight-manage-tr.herokuapp.com/samples/update-weight", { uid, data })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        updatedWeights = res.data as Weight[];
      })
      .catch((res: AxiosResponse) => {
        console.log(res);
      });
    // db.collection("users")
    //   .doc(uid)
    //   .collection("weights")
    //   .doc(data.weightId)
    //   .update(data);
    return updatedWeights;
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      console.log(action);
      const newState = { ...state, ...action.payload };
      console.log(state);
      return newState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUserInfo.fulfilled, (state, action) => {
      state.height = action.payload.height;
      state.startWeight = action.payload.startWeight;
      state.targetWeight = action.payload.targetWeight;
    });
    builder.addCase(createWeight.fulfilled, (state, action) => {
      state.weights = [...state.weights, action.payload];
      state.weights.sort((a, b) => {
        return a.date > b.date ? 1 : -1;
      });
    });
    builder.addCase(updateUserWeights.fulfilled, (state, action) => {
      console.log(action);
      state.weights = action.payload;
      state.weights.sort((a, b) => {
        return a.date > b.date ? 1 : -1;
      });
    });
    builder.addCase(deleteUserWeight.fulfilled, (state, action) => {
      console.log(action.payload);
      state.weights = action.payload;
      state.weights.sort((a, b) => {
        return a.date > b.date ? 1 : -1;
      });
    });
    builder.addCase(listenAuthState.fulfilled, (state, action) => {});
    builder.addCase(logOut.fulfilled, (state, action) => {
      state = initialState;
    });
    builder.addCase(fetchUserWeights.fulfilled, (state, action) => {
      console.log(action.payload);
      const fethcedUserInfo: UsersState = action.payload;
      return fethcedUserInfo;
    });
  },
});

export const { setUserInfo } = usersSlice.actions;

export const selectWights = (state: RootState): UsersState["weights"] =>
  state.users.weights;
export const selectStartWeight = (
  state: RootState
): UsersState["startWeight"] => state.users.startWeight;
export const selectUid = (state: RootState): UsersState["uid"] =>
  state.users.uid;
export const selectHeight = (state: RootState): UsersState["height"] =>
  state.users.height;
export const selectUsername = (state: RootState): UsersState["username"] =>
  state.users.username;
export const selectNickname = (state: RootState): UsersState["nickname"] =>
  state.users.nickname;
export const selectIsSignedIn = (state: RootState): UsersState["isSignedIn"] =>
  state.users.isSignedIn;
export const selectCurrentWeight = (state: RootState): number | null =>
  state.users.weights.length > 0
    ? state.users.weights.slice(-1)[0].weight
    : state.users.startWeight;
export const selectTargetWeight = (
  state: RootState
): UsersState["targetWeight"] => state.users.targetWeight;

export default usersSlice.reducer;
