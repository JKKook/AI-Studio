const openai = new OpenAIApi(configuration);
const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const cors = require('cors');
const PORT = 7003;
const app = express();

// POST 요청 처리
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors 옵션 세팅
let corsOptions = {
    origin: 'https://ai-studio-eight.vercel.app/',
    credentials: true,
};
app.use(cors(corsOptions));

// Server
app.get('/', function (req, res) {
    // console.log('server open')
});

// GPT Settings
const configuration = new Configuration({
    apiKey: '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',
});

app.post('/studio/chatgpt/answers', function (req, res) {
    async function apiCall() {
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            max_tokens: '30',
            temperature: 0.5,
            messages: [
                {
                    role: 'system',
                    content:
                        '당신의 최고의 프론트엔드 개발자입니다. 만약 변수명에 대한 질문을 받는다면 해당 질문에 대한 올바른 답변을 할 수 있습니다 ',
                },
                {
                    role: 'user',
                    content:
                        '당신의 최고의 프론트엔드 개발자입니다. 만약 변수명에 대한 질문을 받는다면 해당 질문에 대한 올바른 답변을 할 수 있습니다 ',
                },
                { role: 'assistant', content: '안녕하세요 CodrLee 입니다' },
                { role: 'user', content: '' },
            ],
        });

        const answer = completion.data.choices[0].message['content'];
        console.log(`ChatGpt Output : ${answer}`);
        res.send(answer);
    }

    apiCall();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
