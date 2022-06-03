let express = require('express');
let router = express.Router();

const {checkFlag} = require("../utils/FeatureFlags");

const requireFeatureFlag = (flag) => {
    return async (req, res, next) => {
        if (await checkFlag(flag)) {
            next()
        } else {
            res.status(401).send();
        }
    }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send("OK")
});

router.get('/ping', requireFeatureFlag('test_FF'), async function (req, res) {
    res.status(200).send({message: "pong"})
});

router.get('/pong', async function (req, res) {
    res.status(200).send({message: "ping"})
});



module.exports = router;
