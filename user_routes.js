import express from 'express'
import convertLink from './services/convert.js';
import { getShortURL } from './services/getShortURL.js';
const user_router = express.Router();

user_router.post('/convert',convertLink );
user_router.get('/:shortId', getShortURL)

export default user_router;