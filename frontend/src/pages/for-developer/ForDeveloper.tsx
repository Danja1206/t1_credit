import { FC } from "react";

import "./ForDeveloper.scss";

const ForDeveloper: FC = () => {
  return (
    <section className="for-developer">
      <h2>Для разработчиков</h2>
      <iframe
        title="gitbook"
        src="https://shanty.gitbook.io/credit-tracker"
      ></iframe>
    </section>
  );
};

export default ForDeveloper;
