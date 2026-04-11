import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commanServices from "../services/commanServices";


// ===============================
// ⭐ fetch watch videos
// ===============================
export const fetchWatchVideos = createAsyncThunk(
  "common/fetchWatchVideos",
  async (_, { rejectWithValue }) => {
    try {
      const { videos } = await commanServices.getWatchVideos();
      return videos;
    } catch (err) {
      return rejectWithValue("Unable to load watch videos");
    }
  }
);



// ===============================
// ⭐ fetch notification
// ===============================

export const fetchNotifications = createAsyncThunk(
  "common/fetchNotifications",
  async (token, { rejectWithValue }) => {
    try {
      const { count, notifications } = await commanServices.getNotifications(token);
      return { count, notifications };
    } catch (err) {
      return rejectWithValue("Unable to load notifications");
    }
  }
);

// ===============================
// 📢 fetch advertisements
// ===============================
export const fetchAdvertisements = createAsyncThunk(
  "common/fetchAdvertisements",
  async (_, { rejectWithValue }) => {
    try {
      const { advertisements } = await commanServices.getAdvertisements();
      return advertisements;
    } catch (err) {
      return rejectWithValue("Unable to load advertisements");
    }
  }
);


// 🔥 MAIN COMMON SLICE
const commonSlice = createSlice({
  name: "common",

  initialState: {
    loading: false,
    schoolInfo: null,
    error: null,

    // 🎥 Watch Videos
    watchVideos: [],
    watchLoading: false,

    // notification badge
    notifications: [],
    notificationsLoading: false,
    unreadCount: 0,   // from API "count"

    // 📢 Advertisements
    advertisements: [],
    advertisementsLoading: false,



  },
  reducers: {
    clearSchoolInfo: (state) => {
      state.schoolInfo = null;
      state.error = null;
      state.loading = false;
    },
    // getMarksSummaryData
    clearMarks(state) {
      state.marksSummary = {
        exams: [],
        exam: null,
        overall: null,
        subjects: [],
      };
      state.marksError = null;
      state.marksLoading = false;
    },
    // Notification reducers
    clearUnreadCount(state) {
      state.unreadCount = 0;
    },
    clearNotifications(state) {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },

  extraReducers: (builder) => {


    /* ------------------ Fetch Watch Videos ------------------ */
    builder
      .addCase(fetchWatchVideos.pending, (state) => {
        state.watchLoading = true;
      })
      .addCase(fetchWatchVideos.fulfilled, (state, action) => {
        state.watchLoading = false;
        state.watchVideos = action.payload;
      })
      .addCase(fetchWatchVideos.rejected, (state) => {
        state.watchLoading = false;
      });


    /* ------------------ Fetch Notifications ------------------ */
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.notificationsLoading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notificationsLoading = false;
        state.notifications = action.payload.notifications;

        // ⭐ unread badge count from API
        state.unreadCount = action.payload.count;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.notificationsLoading = false;
      });

    /* ------------------ Fetch Advertisements ------------------ */
    builder
      .addCase(fetchAdvertisements.pending, (state) => {
        state.advertisementsLoading = true;
      })
      .addCase(fetchAdvertisements.fulfilled, (state, action) => {
        state.advertisementsLoading = false;
        state.advertisements = action.payload;
      })
      .addCase(fetchAdvertisements.rejected, (state) => {
        state.advertisementsLoading = false;
      });

  },
});

export const { clearSchoolInfo, clearUnreadCount, clearNotifications } = commonSlice.actions;

export default commonSlice.reducer;
