var express = require('express');
var router = express.Router();

function redirect_docs(req, res) {
        

    if('DOCS_PATH' in process.env) {
            docs_path = process.env.DOCS_PATH;
        } else {
            console.error({
                error: 'environment variable DOCS_PATH was not found!',
            });
	        return;
        }


        res.redirect(301, docs_path);
        
        
}


/* GET users listing. */
router.get('/', redirect_docs);

module.exports = router;