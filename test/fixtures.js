const restaurants = [{
    owner: 1,
    title: 'Hayden',
    description: 'Oysters and Seafood',
    drinks: 'IPA'
},
{
    owner: 2,
    title: 'Burger Place',
    description: 'Good burgers',
    drinks: 'WINE'
},
{
    owner: 3,
    title: 'Simpang',
    description: 'Really good indonesian food',
    drinks: 'WATER'
},
{
    owner: 4,
    title: 'Shwarmaland',
    description: 'Good wraps and plates',
    drinks: 'BYOB'
},
{
    owner: 5,
    title: 'Bigfoot',
    description: 'Good happy hour spot with taco stand',
    drinks: 'COCKTAILS'
},
{
    owner: 6,
    title: 'Night + Market Song',
    description: 'Best thai food in L.A',
    drinks: 'BEER'
}]


const singleRestaurantTestInfo = {
    title: "This Jonathans Restaurant He Created",
    description: "Wow created a restaurant!",
    drinks: "ROSE!"
}

const singleRestaurantTestInfoUpdate = {
    owner: 5,
    title: "This is a test restaurant",
    description: "Best Test restaurant in L.A",
    drinks: "Ipa"
}

const userTestInfo = {
    name: 'Jonathan',
    email: 'jiv@jiv.com',
    password_digest: 'Password',
}

module.exports = {
    userTestInfo,
    singleRestaurantTestInfoUpdate,
    restaurants,
    singleRestaurantTestInfo
}