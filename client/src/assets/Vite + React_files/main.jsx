import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=b39eab7f"; const _jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=b39eab7f"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react;
import __vite__cjsImport2_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=b39eab7f"; const ReactDOM = __vite__cjsImport2_reactDom_client.__esModule ? __vite__cjsImport2_reactDom_client.default : __vite__cjsImport2_reactDom_client;
import { Provider } from "/node_modules/.vite/deps/react-redux.js?v=b39eab7f";
import App from "/src/App.jsx?t=1705285059846";
import { persistor, store } from "/src/redux/store.js?t=1705283150967";
import { PersistGate } from "/node_modules/.vite/deps/redux-persist_integration_react.js?v=b39eab7f";
import { QueryClientProvider, QueryClient } from "/node_modules/.vite/deps/@tanstack_react-query.js?v=b39eab7f";
import "/src/index.css?t=1705285059846";
import "/node_modules/react-date-range/dist/styles.css";
import "/node_modules/react-date-range/dist/theme/default.css";
// create a client'
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/ _jsxDEV(React.StrictMode, {
    children: /*#__PURE__*/ _jsxDEV(Provider, {
        store: store,
        children: /*#__PURE__*/ _jsxDEV(PersistGate, {
            loading: null,
            persistor: persistor,
            children: /*#__PURE__*/ _jsxDEV(QueryClientProvider, {
                client: queryClient,
                children: /*#__PURE__*/ _jsxDEV(App, {}, void 0, false, {
                    fileName: "C:/Users/PAUL/OMOBOLAJI/works/gomycode/travelease/client/src/main.jsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "C:/Users/PAUL/OMOBOLAJI/works/gomycode/travelease/client/src/main.jsx",
                lineNumber: 19,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "C:/Users/PAUL/OMOBOLAJI/works/gomycode/travelease/client/src/main.jsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "C:/Users/PAUL/OMOBOLAJI/works/gomycode/travelease/client/src/main.jsx",
        lineNumber: 17,
        columnNumber: 5
    }, this)
}, void 0, false, {
    fileName: "C:/Users/PAUL/OMOBOLAJI/works/gomycode/travelease/client/src/main.jsx",
    lineNumber: 16,
    columnNumber: 3
}, this));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tL2NsaWVudFwiO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcbmltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLmpzeFwiO1xuaW1wb3J0IHsgcGVyc2lzdG9yLCBzdG9yZSB9IGZyb20gXCIuL3JlZHV4L3N0b3JlXCI7XG5pbXBvcnQgeyBQZXJzaXN0R2F0ZSB9IGZyb20gXCJyZWR1eC1wZXJzaXN0L2ludGVncmF0aW9uL3JlYWN0XCI7XG5pbXBvcnQgeyBRdWVyeUNsaWVudFByb3ZpZGVyLCBRdWVyeUNsaWVudCB9IGZyb20gXCJAdGFuc3RhY2svcmVhY3QtcXVlcnlcIjtcbmltcG9ydCBcIi4vaW5kZXguY3NzXCI7XG5pbXBvcnQgXCJyZWFjdC1kYXRlLXJhbmdlL2Rpc3Qvc3R5bGVzLmNzc1wiO1xuaW1wb3J0IFwicmVhY3QtZGF0ZS1yYW5nZS9kaXN0L3RoZW1lL2RlZmF1bHQuY3NzXCI7XG5cbi8vIGNyZWF0ZSBhIGNsaWVudCdcbmNvbnN0IHF1ZXJ5Q2xpZW50ID0gbmV3IFF1ZXJ5Q2xpZW50KCk7XG5cblJlYWN0RE9NLmNyZWF0ZVJvb3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpKS5yZW5kZXIoXG4gIDxSZWFjdC5TdHJpY3RNb2RlPlxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgPFBlcnNpc3RHYXRlIGxvYWRpbmc9e251bGx9IHBlcnNpc3Rvcj17cGVyc2lzdG9yfT5cbiAgICAgICAgPFF1ZXJ5Q2xpZW50UHJvdmlkZXIgY2xpZW50PXtxdWVyeUNsaWVudH0+XG4gICAgICAgICAgPEFwcCAvPlxuICAgICAgICA8L1F1ZXJ5Q2xpZW50UHJvdmlkZXI+XG4gICAgICA8L1BlcnNpc3RHYXRlPlxuICAgIDwvUHJvdmlkZXI+XG4gIDwvUmVhY3QuU3RyaWN0TW9kZT5cbik7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJSZWFjdERPTSIsIlByb3ZpZGVyIiwiQXBwIiwicGVyc2lzdG9yIiwic3RvcmUiLCJQZXJzaXN0R2F0ZSIsIlF1ZXJ5Q2xpZW50UHJvdmlkZXIiLCJRdWVyeUNsaWVudCIsInF1ZXJ5Q2xpZW50IiwiY3JlYXRlUm9vdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW5kZXIiLCJTdHJpY3RNb2RlIiwibG9hZGluZyIsImNsaWVudCJdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU9BLFdBQVcsUUFBUTtBQUMxQixPQUFPQyxjQUFjLG1CQUFtQjtBQUN4QyxTQUFTQyxRQUFRLFFBQVEsY0FBYztBQUN2QyxPQUFPQyxTQUFTLFlBQVk7QUFDNUIsU0FBU0MsU0FBUyxFQUFFQyxLQUFLLFFBQVEsZ0JBQWdCO0FBQ2pELFNBQVNDLFdBQVcsUUFBUSxrQ0FBa0M7QUFDOUQsU0FBU0MsbUJBQW1CLEVBQUVDLFdBQVcsUUFBUSx3QkFBd0I7QUFDekUsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sbUNBQW1DO0FBQzFDLE9BQU8sMENBQTBDO0FBRWpELG1CQUFtQjtBQUNuQixNQUFNQyxjQUFjLElBQUlEO0FBRXhCUCxTQUFTUyxVQUFVLENBQUNDLFNBQVNDLGNBQWMsQ0FBQyxTQUFTQyxNQUFNLGVBQ3pELFFBQUNiLE1BQU1jLFVBQVU7Y0FDZixjQUFBLFFBQUNaO1FBQVNHLE9BQU9BO2tCQUNmLGNBQUEsUUFBQ0M7WUFBWVMsU0FBUztZQUFNWCxXQUFXQTtzQkFDckMsY0FBQSxRQUFDRztnQkFBb0JTLFFBQVFQOzBCQUMzQixjQUFBLFFBQUNOIn0=