import { useState } from "react";
import AWS from "aws-sdk/global"; // Import global AWS namespace (recommended)
import S3 from "aws-sdk/clients/s3"; // Import only the S3 client
import instance from "../utils/axios";
import { getToken } from "../utils/tokenHelpers";

const UploadPDFCard = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const uploadFile = async () => {
    setUploading(true);
    const S3_BUCKET = import.meta.env.VITE_AWS_BUCKET;
    const REGION = import.meta.env.VITE_AWS_REGION;
    AWS.config.update({
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
    });

    const s3 = new S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    try {
      const upload = await s3.putObject(params).promise();
      console.log(upload);
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
