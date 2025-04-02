"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingPage = LandingPage;
const react_1 = require("react");
const ourReports_1 = require("@/services/ourReports");
//! Ten al lado el services/ourReports.services.js
function LandingPage() {
    const [ourReports, setOurReports] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        //! Esto es una función autoinvocada, se ejecuta al momento de leerse
        (function fetchData() {
            return __awaiter(this, void 0, void 0, function* () {
                const data = yield (0, ourReports_1.getOurReports)();
                setOurReports(data);
            });
        })();
    }, []);
    return (<div>
      <h1>A</h1>
      {ourReports.map(report => (<h2 key={report.id}>{report.name}</h2>))}
    </div>);
}
