import axios from 'axios'

const gamesApi = axios.create({
    baseURL: 'https://real-rose-worm-kit.cyclic.app/api'
})

const getReviews = () => {
return gamesApi.get('/reviews').then((reviews) => {
    return reviews.data.reviews
})
}

export default getReviews