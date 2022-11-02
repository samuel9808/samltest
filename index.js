import express from "express";
import xmlparser from "express-xml-bodyparser";

const PORT = 3000;
let app = express();

app.use(xmlparser({
    explicitArray: false,
}));

app.post('/saml/', function(req, res, next){

    try {
        let attributes = req.body['samlp:response']['saml:assertion']['saml:attributestatement']['saml:attribute'];
    
        let result = attributes.reduce((data, el) => { 
                data[el.$.Name] = el['saml:attributevalue']._;
                return data; 
            },
            {}
        );
        res.json({
            attributes: result
        })

    } catch {

        res.status(400).send('Error: Wrong SAML input')
    }

});
app.get('/saml/', function(req, res, next){

    try {
        
        res.redirect('http://localhost:3000/')

    } catch {

        res.status(400).send('Error')
    }

});

app.listen(PORT, () => 
    console.log(`Express server listening on port ${PORT}`),
);