require('dotenv').config();
const express = require("express")
const OpenAI = require("openai")
const app=express()
app.use(express.json())

const openai=new OpenAI({
    apiKey:process.env.OPENAI_API_KEY
})

app.get('/getResponse',async(req,res)=>{
    const userPrompt=req.body.userPrompt;
    console.log(userPrompt)
    const response = await openai.chat.completions.create({
        model:'gpt-3.5-turbo',
        messages:[{"role":"user","content":userPrompt}],
        max_tokens:100
    })
    console.log(response.choices[0].message.content)
    res.send(response.choices[0].message.content)
})

app.listen(3000,()=>{
    console.log("server started")
})