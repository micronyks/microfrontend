const CongnitoService = require("../services/cognito.service")

exports.getLogin = (req, res, next) => {
    res.send('login route working')
}

exports.postLogin = async (req, res, next) => {
    console.log('checking...', req.body);
    const { username, password } = req.body;
    console.log('login post method', username, password);
    const cognito = new CongnitoService();
    try {
        const data = await cognito.signInUser(username, password);
        if (data) {
            console.log('data', data);
            res.status(200).send(data);
        } else {
            res.status(500).send("someting went wrong !")
        }
    } catch (error) {
        console.log(error);
    }
}               