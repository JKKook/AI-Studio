const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const cors = require('cors');
const PORT = 7005;
const app = express();
require('dotenv').config();

// POST 요청 처리
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors 옵션 세팅
let corsOptions = {
    origin: 'https://ai-studio-eight.vercel.app/',
    credentials: true,
};
app.use(cors(corsOptions));

// // Server
// app.get('/', function (req, res) {
//     res.send(`server open`);
// });

// GPT Settings
const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Server Posting
app.get('/studio/naming', async function (req, res) {
    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        max_tokens: 50,
        temperature: 0.8, // 창의적인 답변을 얻기 위함
        messages: [
            {
                role: 'system',
                content:
                    '당신의 최고의 프론트엔드 개발자입니다. 당신은 모든 프로그래밍 언어에 대한 코드 이해도가 아주 높으며, 리팩토링 또한 마틴 파울러처럼 잘 이해하고 있습니다. 만약 변수명에 대한 질문을 받는다면 해당 질문에 대한 올바른 답변을 할 수 있습니다 ',
            },
            {
                role: 'user',
                content:
                    '당신의 최고의 프론트엔드 개발자입니다. 당신은 모든 프로그래밍 언어에 대한 코드 이해도가 아주 높으며, 리팩토링 또한 마틴 파울러처럼 잘 이해하고 있습니다. 만약 변수명에 대한 질문을 받는다면 해당 질문에 대한 올바른 답변을 할 수 있습니다 ',
            },
            {
                role: 'assistant',
                content:
                    '안녕하세요 CodrLee 입니다. 보다 명확한 변수명, 함수명을 얻기위해 사용하고자 하는 로직이 있다면 구체적으로 알려주세요.',
            },
            {
                role: 'user',
                content: `현재 저는 버튼 인터렉션을 리액트 코드를 통해 짜고 있어요. 버튼에는 추가 삭제 수정 등의 기능이 첨부되어 있는데 이 로직에 맞는 변수명이 떠오르지 않습니다. 추천해줄 수 있나요?`,
            },
        ],
    });
    let writeVariable = completion.data.choices[0].message['content']; // content만 불러오기!
    console.log(`ChatGpt Output : ${writeVariable}`);
    res.send(writeVariable);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
