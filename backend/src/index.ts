import * as dotenv from 'dotenv';
import run from './server';

// import ENVs from .env (gitignored)
dotenv.config();

run().then(() => console.log('Server Successfully Started'));
