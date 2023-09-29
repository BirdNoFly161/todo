/****************************************************/
/*
either load the variables from environement or use default values
environement variables willb be populated by the hosting environment or will be loaded from .env file using dotenv
*/
/****************************************************/
import dotenv from 'dotenv';


if(process.env.Environment != 'production'){
    dotenv.config()
  }


export const secret = process.env.secret || 'what is a secret bruh';