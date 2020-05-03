import React from "react";
import ReactDOM from "react-dom";
import {PaginationRow} from "./PaginationRow";
import {shallow} from "enzyme";

describe("Pagination Row", () => {
   it("renders without crashing", () => {
       const div = document.createElement("div");
       ReactDOM.render(<PaginationRow handlePageTurn={jest.fn()} totalPages={4}/>, div);
   });

   it("handles page change", () => {
       const handleFn = jest.fn();
       const component = shallow(
           <PaginationRow handlePageTurn={handleFn} page={3} totalPages={4}/>,
           {disableLifecycleMethods: true}
       );

       component.instance().handlePageChange({target: {text: "2"}});

       expect(handleFn).toHaveBeenCalledWith(2);
   });
});