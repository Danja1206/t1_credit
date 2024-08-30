import { FC, useRef } from "react";
import "./PaymentSchedule.scss";
import { IPayment } from "../../store/services/types";

import { useSelector } from "react-redux";
import { RootType } from "../../store";

import download from "../../assets/ui/download.webp";

import html2pdf from "html2pdf.js";

import DownloadButton from "../UI/download-button/DownloadButton";

export interface IPaymentSchedule {
  tableData: IPayment[];
}

const PaymentSchedule: FC<IPaymentSchedule> = ({ tableData }) => {
  const { isAuth } = useSelector((state: RootType) => state.userSlice);

  const paramRef = useRef<HTMLTableElement>(null);

  const handlePrintPdf = () => {
    if (paramRef.current) {
      const opt = {
        margin: 10,
        filename: "document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      html2pdf().set(opt).from(paramRef.current).save();
    }
  };

  return (
    <div className="payment-schedule">
      {isAuth ? (
        <div className="download-wrapper">
          <DownloadButton downloadButtonFn={handlePrintPdf} />
        </div>
      ) : (
        ""
      )}
      <table
        className={isAuth ? "table auth" : "table"}
        id="table"
        ref={paramRef}
      >
        <thead className="thead">
          <tr>
            <td>Год/месяц</td>
            <td>Оплата процентов</td>
            <td>Основной долг</td>
            <td>Платеж в месяц</td>
            <td>Остаток погашения</td>
          </tr>
        </thead>

        <tbody className={tableData.length > 15 ? "tbody long" : "tbody"}>
          {tableData.length ? (
            tableData.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.interest}</td>
                <td>{row.paymentAmount}</td>
                <td>{row.principal}</td>
                <td>{row.remainingBalance}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Данных пока нет</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentSchedule;
