
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ejs = require('ejs');
const app = express();
const port = 3000;

const configuration = new Configuration({
    organization: "org-dni9CbcYFXXJVJfwtA6d6LC3",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();


app.use(bodyParser.json());
app.use(cors());
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true }));

app.post("/ge", async function(req,res){
    const prompted = req.body.promptt;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompted,
        max_tokens: 1000,
        temperature: 0
    });
     console.log(response.data);
     console.log(prompted);
     console.log(response.data.choices[0].text);
    //  const respon = JSON.stringify(response.data.choices[0].text);
     res.render("index", {response});
     console.log(prompted);
})


app.get('/', async(req,res) =>{
    res.sendFile(__dirname+"/index.html");

// const response = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: "Anything",
//     max_tokens: 1000,
//     temperature: 0
// });
//  console.log(response.data);
//  console.log(response.data.choices[0].text)
//  if(response.data){
//     if(response.data.choices){
//         res.json({

//         })
//     }
//  }

});

app.listen(port, () => {
    console.log("Server Started");
})