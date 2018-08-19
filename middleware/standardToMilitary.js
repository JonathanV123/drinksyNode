exports.standardToMilitaryTO = (req, res, next) => {
    let toMilitary = null;
    // For Add Restaurant Route
    if (req.body.to) {
        standardToMilitary(req.body.to, req.body.toTimeOfDay)
    } else {
        // Edit Restaurant Route
        standardToMilitary(req.body.toStandard, req.body.toTimeOfDay)
    }
    function standardToMilitary(time, m) {
        time = parseInt(time, 10);
        if (m === 'am') {
            toMilitary = time === 12 ? 0 : time;
        } else {
            toMilitary = time === 12 ? 12 : time + 12;
        }
    }
    res.locals.toMilitary = toMilitary;
    next();
}

exports.standardToMilitaryFROM = (req, res, next) => {
    let fromMilitary = null;
    // For Add Restaurant Route
    if (req.body.from) {
        standardToMilitary(req.body.from, req.body.fromTimeOfDay)
    } else {
        // Edit Restaurant Route
        standardToMilitary(req.body.fromStandard, req.body.fromTimeOfDay)
    } function standardToMilitary(time, m) {
        time = parseInt(time, 10);
        if (m === 'am') {
            fromMilitary = time === 12 ? 0 : time;
        } else {
            fromMilitary = time === 12 ? 12 : time + 12;
        }
    }
    res.locals.fromMilitary = fromMilitary;
    next();
}


