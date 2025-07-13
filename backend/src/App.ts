import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import { contentSecurityConfig } from './config/contentSecurityOption'
import { corsOptions } from './config/corsOption'
import { httpConfig } from './config/httpConfig'
import { globalLimiter } from './config/rateLimitConfig'
import auth_routes from './routes/auth_routes'
import category_routes from './routes/category_routes'
import comment_routes from './routes/comment_routes'
import post_routes from './routes/post_routes'
import postTag_routes from './routes/postTag_routes'
import tag_routes from './routes/tag_routes'
import user_routes from './routes/user_routes'

dotenv.config();
const app = express()   
const port = process.env.PORT || 3000;

app.use(helmet.contentSecurityPolicy(contentSecurityConfig))
app.use(helmet.hsts(httpConfig))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(globalLimiter)

app.use('/api/auth', auth_routes)
app.use('/api/users', user_routes)
app.use('/api/categories', category_routes)
app.use('/api/posts', post_routes)
app.use('/api/comments', comment_routes)
app.use('/api/tags', tag_routes)
app.use('/api/posts', postTag_routes)

app.listen(port, () => {
    console.log(`Sunucu Ayakta!!! ${port}`)
})