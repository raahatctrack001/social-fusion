import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import ApiResponse from './Utils/apiResponse.js';
import path from 'path';


const app = express();

app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(cookieParser());

import authRouter from './Routes/auth.routes.js';
import postRouter from './Routes/posts.routes.js';
import commentRouter from './Routes/comment.routes.js';
import userRouter from './Routes/user.route.js';
import dataSeederRouter from './Routes/data.seeder.js';
import feedbackRouter from './Routes/feedback.router.js';
import otpRouter from './Routes/otp.router.js';
import storyRouter from './Routes/story.routes.js';

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/data', dataSeederRouter);
app.use('/api/v1/feedback', feedbackRouter);
app.use('/api/v1/otp', otpRouter);
app.use('/api/v1/story', storyRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  });

app.use((err, req, res, next)=>{
    res
    .status(err.statusCode||500)
    .json(
        new ApiResponse(err.statusCode||400, err.message||"something went wrong", err)
    );
});
export default app;