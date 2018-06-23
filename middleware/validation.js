exports.isValidId = (req, res, next) => {
    if (!isNaN(req.params.id)) return next();
    next(new Error('Invalid ID'));
}

exports.isValidRestaurant = (req, res, next) => {
    const restaurant = req.body;
    // Is the title of a restaurant a string & does it have a value inside of it
    const hasTitle = typeof restaurant.title === 'string' && restaurant.title.trim() != '';
    const hasUrl = typeof restaurant.url === 'string' && restaurant.url.trim() != '';
    if (hasTitle && hasUrl) {
        return next();
    } else {
        return next(new Error('No title and/or URL on restaurant creation'));
    }
}