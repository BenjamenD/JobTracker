import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.NODE_ENV === "development" ? 
`http://localhost:${process.env.PORT}`: 
process.env.DEV_URL;

export default BASE_URL;