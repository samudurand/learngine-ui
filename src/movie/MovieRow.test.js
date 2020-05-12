import {shallow} from "enzyme";
import React from "react";
import MovieRow from "./MovieRow";

describe("MovieRow", () => {
    let component;

    beforeEach(() => {
        component = shallow(
            <MovieRow.WrappedComponent.WrappedComponent i18n={{language: "it"}}
                                                        movie={matrix}
                                                        t={jest.fn()}
                                                        targetLanguage="en"/>,
            {disableLifecycleMethods: true});
    });

    it("formats description by truncating it if too long", () => {
        const formattedDesc = component.instance().truncateDescription(veryLongText);

        // eslint-disable-next-line no-magic-numbers
        expect(formattedDesc).toHaveLength(500);
        expect(formattedDesc).toEndWith("...");
    });

    it("does not truncate a not too long description", () => {
        const formattedDesc = component.instance().truncateDescription(shortEnoughText);

        // eslint-disable-next-line no-magic-numbers
        expect(formattedDesc).toHaveLength(499);
        expect(formattedDesc).not.toEndWith("...");
    });

    it("does not truncate an empty description", () => {
        const formattedDesc = component.instance().truncateDescription("");
        expect(formattedDesc).toBe("");
    });

    const shortEnoughText = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean " +
        "commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis " +
        "parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque " +
        "eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel" +
        ", aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae" +
        ", justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapib";

    const veryLongText = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit." +
        " Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus " +
        "et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies" +
        " nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim." +
        " Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo" +
        ", rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis " +
        "pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate" +
        " eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim." +
        " Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla " +
        "ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. " +
        "Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget" +
        " condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.";
});

describe("MovieRow render", () => {
    it("displays the details of a movie with links to corresponding search", () => {
        const wrapper = shallow(
            <MovieRow.WrappedComponent.WrappedComponent
                i18n={{language: "it"}} movie={matrix} t={jest.fn()} targetLanguage="en"/>
        );

        const links = wrapper.find(".movieTableRow a");
        expect(links.at(0).props()).toHaveProperty("href", "/search/stream?movieId=591955&title=the%20matrix&audio=en");
    });
});

describe("MovieRow async", () => {
    let component;

    beforeEach(() => {
        component = shallow(
            <MovieRow.WrappedComponent.WrappedComponent i18n={{language: "it"}}
                                                        movie={matrix}
                                                        t={jest.fn()}
                                                        targetLanguage="en"/>,
            {disableLifecycleMethods: true});
        fetch.resetMocks();
    });

    it("fails to translates description", async() => {
        fetch.mockReject(new Error("fake error message"));

        await component.instance().translateDescription({preventDefault: jest.fn()});

        expect(component.state().movie.description).toBe("the matrix movie");
        expect(component.state().transInProgress).toBeFalsy();
    });

    it("translates description", async() => {
        fetch.once(JSON.stringify({translation: "la matrix"}));

        await component.instance().translateDescription({preventDefault: jest.fn()});

        expect(component.state().movie.description).toBe("la matrix");
        expect(component.state().transInProgress).toBeFalsy();
    });
});

const matrix = {
    date: "2004",
    description: "the matrix movie",
    id: 591955,
    imageUrl: "http://store.com/img.jpg",
    title: "the matrix",
    voteAverage: 9.0
};