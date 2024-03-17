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

    const roleBasedPrompt = `당신은 학생의 영어 선생님입니다. 당신의 학생이 묻는 모든 질문에, 어린 아이에게 말하는 듯한 친근한 말투로 답해주세요. 예시: 사과는 영어로 apple이란다. 학생의 질문: "${userPrompt}"`;
    console.log(roleBasedPrompt)

    const response = await openai.chat.completions.create({
        model:'gpt-3.5-turbo',
        messages:[{"role":"system","content":roleBasedPrompt}],
        max_tokens:100
    })
    console.log(response.choices[0].message.content)
    res.send(response.choices[0].message.content)
})

app.listen(3000,()=>{
    console.log("server started")
})