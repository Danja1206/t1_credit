import { FC, MouseEvent } from "react";

import download from "../../../assets/ui/download.webp";

import "./DownloadButton.scss";

export interface IDownloadButton {
  downloadButtonFn: () => void;
}

const DownloadButton: FC<IDownloadButton> = ({ downloadButtonFn }) => {
  const handleDownload = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    downloadButtonFn();
  };

  return (
    <div className="download-button" onClick={handleDownload}>
      <img src={download} alt="#" />
    </div>
  );
};

export default DownloadButton;
