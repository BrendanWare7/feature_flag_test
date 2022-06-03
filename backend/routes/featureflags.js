let express = require('express');
const {getFlags} = require("../utils/FeatureFlags");
let router = express.Router();

router.get('/', async function(req, res) {

    getFlags().then(f => res.status(200).send(f))

})

module.exports = router