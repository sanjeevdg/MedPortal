import { useState } from "react";
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

import instance from "../utils/axios";
import { getToken } from "../utils/tokenHelpers";

const UploadPDFCard = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files[0].type == "application/pdf") {
      setFile(event.target.files[0]);
    } else {
      alert("Please upload a PDF file only");
    }
  };

  const uploadFile = async () => {
    setUploading(true);
    const S3_BUCKET = import.meta.env.VITE_AWS_BUCKET;
    const REGION = import.meta.env.VITE_AWS_REGION;

    const client = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
      },
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    try {
      const command = new PutObjectCommand(params);
      await client.send(command);
      const encodedFileName = encodeURIComponent(file.name);
      const fileUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${encodedFileName}`;
      const doctorId = JSON.parse(localStorage.getItem("user")).doctorId;
      instance.post(
        "uploadFile",
        { fileUrl, doctorId },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setUploading(false);
      alert("File uploaded successfully.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert("Error uploading file: " + error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="border border-gray-300 inline-block p-2 cursor-pointer mt-4"
      />
      {!uploading ? (
        <button className="btn btn-primary btn-md " onClick={uploadFile}>
          Upload
        </button>
      ) : (
        <button className="btn btn-primary btn-md ">
          <span className="loading loading-spinner">Uploading...</span>
        </button>
      )}
    </div>
  );
};

export default UploadPDFCard;
