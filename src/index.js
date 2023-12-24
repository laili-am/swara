import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

// React Router
import { BrowserRouter } from "react-router-dom";

// File Css
import "./index.css";

// Ant Design
import "antd/dist/antd.css";

// Components
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

// ReactDOM.render(
//   <React.StrictMode>
//     <ApolloProvider client={client}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </ApolloProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

reportWebVitals();
