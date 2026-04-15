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


// ===============================
// 🎙️ fetch Our RJ
// ===============================
export const fetchOurRj = createAsyncThunk(
  "common/fetchOurRj",
  async (_, { rejectWithValue }) => {
    try {
      const { rjList } = await commanServices.getOurRj();
      return rjList;
    } catch (err) {
      return rejectWithValue("Unable to load RJ list");
    }
  }
);

// ===============================
// 📅 fetch Events
// ===============================
export const fetchEvents = createAsyncThunk(
  "common/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const { events } = await commanServices.getEvents();
      return events;
    } catch (err) {
      return rejectWithValue("Unable to load events");
    }
  }
);

// ===============================
// 📅 fetch Event Detail
// ===============================
export const fetchEventDetail = createAsyncThunk(
  "common/fetchEventDetail",
  async (id, { rejectWithValue }) => {
    try {
      const { eventDetail } = await commanServices.getEventDetail(id);
      return eventDetail;
    } catch (err) {
      return rejectWithValue("Unable to load event detail");
    }
  }
);

// ===============================
// 🖼️ fetch Gallery
// ===============================
export const fetchGallery = createAsyncThunk(
  "common/fetchGallery",
  async (_, { rejectWithValue }) => {
    try {
      const { gallery } = await commanServices.getGallery();
      return gallery;
    } catch (err) {
      return rejectWithValue("Unable to load gallery");
    }
  }
);

// ===============================
// 📘 fetch About Us
// ===============================
export const fetchAboutUs = createAsyncThunk(
  "common/fetchAboutUs",
  async (_, { rejectWithValue }) => {
    try {
      const { about } = await commanServices.getAboutUs();
      return about;
    } catch (err) {
      return rejectWithValue("Unable to load about data");
    }
  }
);

// ===============================
// 🎙️ fetch RJ Shows
// ===============================
export const fetchRjShows = createAsyncThunk(
  "common/fetchRjShows",
  async (_, { rejectWithValue }) => {
    try {
      const { rjShows } = await commanServices.getRjShows();
      return rjShows;
    } catch (err) {
      return rejectWithValue("Unable to load RJ Shows");
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

    // 🎙️ RJ List
    rjList: [],
    rjLoading: false,

    // 📅 Events
    events: [],
    eventsLoading: false,

    // 📅 Event Detail
    eventDetail: null,
    eventDetailLoading: false,
    // 🖼️ Gallery
    gallery: [],
    galleryLoading: false,
    // 📘 About Us
    about: null,
    aboutLoading: false,


    // 🎙️ RJ Shows
rjShows: [],
rjShowsLoading: false,



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

    /* ------------------ Fetch Our RJ ------------------ */
    builder
      .addCase(fetchOurRj.pending, (state) => {
        state.rjLoading = true;
      })
      .addCase(fetchOurRj.fulfilled, (state, action) => {
        state.rjLoading = false;
        state.rjList = action.payload;
      })
      .addCase(fetchOurRj.rejected, (state) => {
        state.rjLoading = false;
      });

    /* ------------------ Fetch Events ------------------ */
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.eventsLoading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.eventsLoading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state) => {
        state.eventsLoading = false;
      });

    /* ------------------ Fetch Event Detail ------------------ */
    builder
      .addCase(fetchEventDetail.pending, (state) => {
        state.eventDetailLoading = true;
      })
      .addCase(fetchEventDetail.fulfilled, (state, action) => {
        state.eventDetailLoading = false;
        state.eventDetail = action.payload;
      })
      .addCase(fetchEventDetail.rejected, (state) => {
        state.eventDetailLoading = false;
      });
    /* ------------------ Fetch Gallery ------------------ */
    builder
      .addCase(fetchGallery.pending, (state) => {
        state.galleryLoading = true;
      })
      .addCase(fetchGallery.fulfilled, (state, action) => {
        state.galleryLoading = false;
        state.gallery = action.payload;
      })
      .addCase(fetchGallery.rejected, (state) => {
        state.galleryLoading = false;
      });
    /* ------------------ Fetch About Us ------------------ */
    builder
      .addCase(fetchAboutUs.pending, (state) => {
        state.aboutLoading = true;
      })
      .addCase(fetchAboutUs.fulfilled, (state, action) => {
        state.aboutLoading = false;
        state.about = action.payload;
      })
      .addCase(fetchAboutUs.rejected, (state) => {
        state.aboutLoading = false;
      });
      /* ------------------ Fetch RJ Shows ------------------ */
builder
  .addCase(fetchRjShows.pending, (state) => {
    state.rjShowsLoading = true;
  })
  .addCase(fetchRjShows.fulfilled, (state, action) => {
    state.rjShowsLoading = false;
    state.rjShows = action.payload;
  })
  .addCase(fetchRjShows.rejected, (state) => {
    state.rjShowsLoading = false;
  });

  },
});

export const { clearSchoolInfo, clearUnreadCount, clearNotifications } = commonSlice.actions;

export default commonSlice.reducer;
