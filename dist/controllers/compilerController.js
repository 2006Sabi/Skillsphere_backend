"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCode = void 0;
// This is a MOCK compiler endpoint. DO NOT run arbitrary code on server in production.
// For real execution you'd use sandboxed execution (Docker/Lambda) and heavy safety checks.
const runCode = async (req, res) => {
    const { language, code, stdin } = req.body;
    // return a mocked execution response based on language
    let output = '';
    if (language === 'javascript') {
        output = 'Mocked JS output:\nHello from Skillsphere!';
    }
    else if (language === 'python') {
        output = 'Mocked Python output:\nHello from Skillsphere!';
    }
    else {
        output = 'Language not supported in mock runner';
    }
    res.json({ stdout: output, stderr: '', status: 'ok' });
};
exports.runCode = runCode;
