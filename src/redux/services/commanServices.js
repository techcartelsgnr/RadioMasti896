import axios from 'axios';
import Toast from 'react-native-toast-message';

const authAxios = axios.create({
  baseURL: 'https://fmmasti.com/api/',
  headers: {
    'Content-Type': 'application/json',
    'Acess-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});


// ================================
// 📌 Get Watch Videos
// ================================
const getWatchVideos = async () => {
  try {
    const res = await authAxios.get("/get-watch", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const list = res.data || [];

    // 🔥 Clean & UI-friendly structure
    const videos = list.map((item) => ({
      id: item.id,
      title: item.title ?? "",
      thumbnail: item.image_path ?? null,
      url: item.url ?? "",
      timeStamp: item.time_stamp ?? "",
    }));

    return { videos };

  } catch (error) {
    console.log("Get Watch API Error:", error);
    return { videos: [] };
  }
};


// ================================
// 🎧 Get Podcasts
// ================================
const getPodcasts = async () => {
  // ================================
  // 🧼 Strip HTML tags from strings
  // ================================
  const stripHtml = (html) => {
    if (!html || typeof html !== 'string') return '';
    return html.replace(/<[^>]*>?/gm, '').trim();
  };
  try {
    const res = await authAxios.get('/get-podcasts', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log('line number 57', res);
    // ✅ API RETURNS ARRAY DIRECTLY
    const list = Array.isArray(res.data) ? res.data : [];
    console.log('line number 60', list);
    
    const podcasts = list.map(item => ({
      id: item.id,
      title: item.title ?? '',
      shortDesc: stripHtml(item.short_desc ?? ''),
      about: stripHtml(item.about_the_show ?? ''),
      image: item.image_path ?? null,
      audio: item.audio_path ?? null,
    }));
    return { podcasts };

  } catch (error) {
    console.log('Get Podcasts API Error:', error);
    return { podcasts: [] };
  }
};

// ================================
// 🎙️ Get RJ Shows
// ================================
const getRjShows = async () => {
  try {
    const res = await authAxios.get('/get-rjshows', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const list = Array.isArray(res.data) ? res.data : [];

    const rjShows = list.map(item => ({
      id: item.id,
      name: item.name ?? '',
      image: item.image_path ?? null,
      description: item.description ?? '',
      url: item.url ?? '',
    }));

    return { rjShows };
  } catch (error) {
    console.log('Get RJ Shows API Error:', error);
    return { rjShows: [] };
  }
};


// ================================
// 📲 Get Social Media Links
// ================================
const getSocialMediaLinks = async () => {
  try {
    const res = await authAxios.get('/get-social-media', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = res.data || {};

    const socialLinks = {
      instagram: data.instagrame ?? '',
      youtube: data.youtube ?? '',
      facebook: data.facebook ?? '',
      twitter: data.twitter ?? '',
    };

    return { socialLinks };

  } catch (error) {
    console.log('Get Social Media API Error:', error);
    return {
      socialLinks: {
        instagram: '',
        youtube: '',
        facebook: '',
        twitter: '',
      },
    };
  }
};

// ================================
// 📖 Get Read PDF
// ================================
const getReadLink = async () => {
  try {
    const res = await authAxios.get('/get-read', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return {
      readLink: res?.data?.read_link ?? '',
    };

  } catch (error) {
    console.log('Get Read API Error:', error);
    return { readLink: '' };
  }
};


// ================================
// 📢 Get Advertisements
// ================================
const getAdvertisements = async () => {
  try {
    const res = await authAxios.get('/advertisements', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const list = res?.data?.data || [];

    // ✅ Clean UI-friendly structure
    const advertisements = list.map(item => ({
      id: item.id,
      title: item.title ?? '',
      image: item.image ?? null,
      type: item.type ?? '',
      startDate: item.start_date ?? '',
      endDate: item.end_date ?? '',
    }));

    return { advertisements };

  } catch (error) {
    console.log('Get Advertisements API Error:', error);
    return { advertisements: [] };
  }
};


const getBlogs = async (token) => {
  try {
    const res = await authAxios.get("/blogs", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token, // if API requires token
      },
    });
    const blogList = res.data.data || [];
    // Format for UI
    const blogs = blogList.map((item) => ({
      id: item.id,
      title: item.title ?? "Untitled Blog",
      slug: item.slug,
      short_desc: item.short_description ?? "",
      image: item.image_url ?? null,
      created_at: item.created_at ?? "",
    }));

    return { blogs };

  } catch (error) {
    console.log("Blog API Error:", error);
    return { blogs: [] };
  }
};


// ================================
// 📌 Submit Feedback
// ================================
const submitFeedback = async (token, payload) => {
  try {
    const res = await authAxios.post(
      "/feedback-submit",
      {
        problem_type: payload.problem_type,
        feedback_text: payload.feedback_text,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    return {
      success: true,
      message: res.data.message || "Submitted",
      feedback: res.data.data || null,
    };

  } catch (error) {
    console.log("Feedback Submit API Error:", error);

    return {
      success: false,
      message: "Something went wrong",
      feedback: null,
    };
  }
};

// ================================
// 📌 Get My Feedback History
// ================================
const getFeedbackHistory = async (token) => {
  try {
    const res = await authAxios.get("/my-feedbacks", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const list = res.data.data || [];

    // Format clean structure for UI
    const feedbackHistory = list.map((item) => ({
      id: item.id,
      problem_type: item.problem_type ?? "",
      description: item.feedback_text ?? "",
      status: item.status === "1" ? "Solved" : "Pending",
      date: item.created_at ? new Date(item.created_at).toDateString() : "",
    }));

    return { feedbackHistory };

  } catch (error) {
    console.log("Feedback History API Error:", error);
    return { feedbackHistory: [] };
  }
};

// ================================
// 🔴 Get Live Stream
// ================================
// ================================
// 🔴 Get Live Stream (PUBLIC API)
// ================================
const getLiveStream = async () => {
  try {
    const res = await authAxios.get('/get-live-stream', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const streamData = res?.data?.data;

    // 🔍 Debug (optional - remove in production)
    console.log("STREAM API RESPONSE:", streamData);

    return {
      stream: {
        id: streamData?.id ?? null,
        url: streamData?.live_stream ?? '',
        status: streamData?.status === "1",
        createdAt: streamData?.created_at ?? null,
        updatedAt: streamData?.updated_at ?? null,
      },
    };

  } catch (error) {
    console.log('Live Stream API Error:', error);

    return {
      stream: {
        id: null,
        url: '',
        status: false,
        createdAt: null,
        updatedAt: null,
      },
    };
  }
};




const showToast = Message => {
  Toast.show({
    type: 'success',
    text1: Message,
    visibilityTime: 5000,
  });
};

const commanServices = {
  showToast,
  getWatchVideos,
  getPodcasts,
  getRjShows,
  getSocialMediaLinks,
  getReadLink,
  
  getBlogs,
  getAdvertisements,
  submitFeedback,
  getFeedbackHistory,
  getLiveStream
};
export default commanServices;