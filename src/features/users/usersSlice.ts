import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import firebase from "firebase/app";
import { auth, db } from "../../firebase";

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
  isSignedIn: false,
  firstLigin: false,
  startWeight: 80,
  currentWeight: 70,
  targetWeight: 60,
  nickname: null,
  age: null,
  weights: [
    // {
    //   weightId: "001",
    //   date: "2020-02-02",
    //   weight: 80,
    //   breakfast: "おにぎり",
    //   lunch: "コエンザイム",
    //   dinner: "ご飯ですよ",
    // },
  ],
};

export const logIn = createAsyncThunk("users/logIn", async () => {
  const google_auth_provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithRedirect(google_auth_provider);
});
export const logOut = createAsyncThunk("users/logOut", async () => {
  auth.signOut();
  return { data: "reset" };
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
      const weightsRef = await db
        .collection("users")
        .doc(uid)
        .collection("weights")
        .doc();
      const newWeight: Weight = { ...data, weightId: weightsRef.id };
      weightsRef.set(newWeight);
      return newWeight;
    }
  }
);

export const fetchUserWeights = createAsyncThunk<
  any,
  any,
  { state: RootState }
>("users/fetchUserWeights", async (data, thunkAPI) => {
  const uid: UsersState["uid"] = thunkAPI.getState().users.uid;
  if (uid) {
    let fetchedUserWeights: UsersState["weights"] = [];
    await db
      .collection("users")
      .doc(uid)
      .collection("weights")
      .orderBy("date", "asc")
      .get()
      .then((snapshots) => {
        snapshots.forEach((snapshot) => {
          fetchedUserWeights.push(snapshot.data() as Weight);
        });
      });
    return fetchedUserWeights;
  }
});

export const updateUserWeights = createAsyncThunk<
  any,
  any,
  { state: RootState }
>("users/updateUserWeights", async (data, thunkAPI) => {
  const uid: UsersState["uid"] = thunkAPI.getState().users.uid;
  if (uid) {
    db.collection("users")
      .doc(uid)
      .collection("weights")
      .doc(data.weightId)
      .update(data);
    return data;
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
    builder.addCase(createWeight.fulfilled, (state, action) => {
      state.weights = [...state.weights, action.payload];
      state.weights.sort((a, b) => {
        return a.date > b.date ? 1 : -1;
      });
    });
    builder.addCase(updateUserWeights.fulfilled, (state, action) => {
      const index = state.weights.findIndex((weight) => {
        return weight.weightId === action.payload.weightId;
      });
      state.weights[index] = action.payload;
      state.weights.sort((a, b) => {
        return a.date > b.date ? 1 : -1;
      });
    });
    builder.addCase(listenAuthState.fulfilled, (state, action) => {});
    builder.addCase(logOut.fulfilled, (state, action) => {
      state = initialState;
    });
    builder.addCase(fetchUserWeights.fulfilled, (state, action) => {
      state.weights = [...action.payload];
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
export const selectUsername = (state: RootState): UsersState["username"] =>
  state.users.username;
export const selectNickname = (state: RootState): UsersState["nickname"] =>
  state.users.nickname;
export const selectIsSignedIn = (state: RootState): UsersState["isSignedIn"] =>
  state.users.isSignedIn;
export const selectCurrentWeight = (state: RootState): number | null =>
  state.users.weights.length > 0
    ? state.users.weights.slice(-1)[0].weight
    : null;
export const selectTargetWeight = (
  state: RootState
): UsersState["targetWeight"] => state.users.targetWeight;

export default usersSlice.reducer;
