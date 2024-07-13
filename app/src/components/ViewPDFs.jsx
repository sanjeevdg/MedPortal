import { useEffect, useState } from "react";
import AWS from "aws-sdk/global"; // Import global AWS namespace (recommended)
import S3 from "aws-sdk/clients/s3"; // Import only the S3 client
import instance from "../utils/axios";
import { getToken } from "../utils/tokenHelpers";

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
    AWS.config.update({
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
    });

    const s3 = new S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    s3.getObject({ Bucket: S3_BUCKET, Key: pdfName }, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const blob = new Blob([data.Body], { type: "application/pdf" });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = pdfName;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    });
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
