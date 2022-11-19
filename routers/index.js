const router = require('express').Router();

router.get('/', require('../controllers/IndexController'));

/* API v1 */
router.get('/api', require('../controllers/Api'));
router.get('/api/v1', require('../controllers/v1/Main'));
router.get('/api/v1/animals/:endpoint', require('../controllers/v1/Animals'));
router.get('/api/v1/string/:endpoint', require('../controllers/v1/String'));
router.get('/api/v1/kaomoji/:endpoint', require('../controllers/v1/Kaomoji'));
router.get('/api/v1/filter/:endpoint', require('../controllers/v1/Filters'));

module.exports = router;