import express from "express";
import { createPresignedPost } from "../utils/s3.js";
const s3Router = express.Router();

s3Router.post("/signed_url", async (req, res) => {
  try {
    const { key, content_type } = req.body;
    const { signedUrl, fileLink } = await createPresignedPost({
      key: "public/" + key,
      contentType: content_type,
    });

    return res.send({ data: { signedUrl, fileLink } });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
});

export default s3Router;
