export const userState = {
    id: 0,
    avatar_url: '',
    created_at: new Date(),
    email: '',
    first_name: '',
    gender: '',
    last_name: '',
    latitude: '',
    longitude: '',
    state: '',
    city: '',
    logged_in: false,
}

export const strangerState = {
    id: 0,
    images: [],
    seen: false,
    seen_by: 0,
    distance: 0,
    user_id: 0,
    user: {
        state: '',
        city: '',
        interests: [],
        basics: [],
        bio: '',
        id: 0,
        prompts: [],
        first_name: '',
        last_name: '',
        dob: '',
    }
}

