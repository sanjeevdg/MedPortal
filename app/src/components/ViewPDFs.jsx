import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { getToken } from "../utils/tokenHelpers";
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const ViewPDFs = () => {
  const [pdfNames, setPDFNames] = useState([]);

  useEffect(() => {
    getPDFs();
  }, []);

  const getPDFs = async () => {
    try {
      const response = await instance.get(
        `files/${JSON.parse(localStorage.getItem("user")).doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      let pdfList = [];
      response.data.forEach((pdf) => {
        const decodedUrl = decodeURIComponent(pdf.filePath);
        const parts = decodedUrl.split("/");
        const filename = parts[parts.length - 1];
        pdfList.push(filename);
      });
      setPDFNames(pdfList);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadPDF = async (pdfName) => {
    const S3_BUCKET = import.meta.env.VITE_AWS_BUCKET;
    const REGION = import.meta.env.VITE_AWS_REGION;

    const client = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
      },
    });
    try {
      const command = new GetObjectCommand({
        Bucket: S3_BUCKET,
        Key: pdfName,
      });
      const data = await client.send(command);
      const bytearray = await data.Body.transformToByteArray();
      const blob = new Blob([bytearray], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = pdfName;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h3 className="font-bold text-lg mb-4">View PDFs uploaded</h3>
      <hr className="mb-4" />
      <ul className=" list-inside space-y-2 ">
        {pdfNames && pdfNames.length != 0 ? (
          pdfNames.map((pdfName, index) => (
            <li
              key={index}
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => downloadPDF(pdfName)}
            >
              {pdfName}
            </li>
          ))
        ) : (
          <p>No PDFs uploaded</p>
        )}
      </ul>
    </div>
  );
};

export default ViewPDFs;
