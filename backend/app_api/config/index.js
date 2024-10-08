import {config as loadConfig} from "dotenv";

loadConfig({
    path:".env"
});

const config = {
    db: {
        uri: process.env.DATABASE_URL
    },
    AWS: {
        ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        REGION: process.env.AWS_REGION,
        BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME
    }
};

export default config;