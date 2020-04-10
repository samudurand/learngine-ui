import {shallow} from "enzyme";
import React from "react";
import MovieRow from "./MovieRow";

describe('MovieRow', () => {
    let component;

    beforeEach(() => {
        component = shallow(<MovieRow movie={matrix} audio={'en'}/>, {disableLifecycleMethods: true});
    });

    it('gets movie cover url when available', () => {
        expect(component.instance().getMovieCoverOrDefaultCover("http://my/img.jpg"))
            .toBe("http://my/img.jpg");
    });

    it('gets defaut cover when movie cover is empty', () => {
        expect(component.instance().getMovieCoverOrDefaultCover(""))
            .toBe("/no-cover.jpg");
    });

    it('gets defaut cover when movie cover is missing', () => {
        expect(component.instance().getMovieCoverOrDefaultCover(null))
            .toBe("/no-cover.jpg");
    });

    it('formats description by truncating it if too long', () => {
        const formattedDesc = component.instance().truncateDescription(veryLongText);

        expect(formattedDesc).toHaveLength(500);
        expect(formattedDesc).toEndWith("...");
    });

    it('does not truncate a not too long description', () => {
        const formattedDesc = component.instance().truncateDescription(shortEnoughText);

        expect(formattedDesc).toHaveLength(499);
        expect(formattedDesc).not.toEndWith("...");
    });

    it('does not truncate an empty description', () => {
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

describe('MovieRow render', () => {
    it('displays the details of a movie with links to corresponding search', async () => {
        const wrapper = shallow(
            <MovieRow movie={matrix} audio={'en'}/>
        );

        const link = wrapper.find(".movieTableRow a");
        expect(link.props())
            .toHaveProperty("href", "/search/stream?movieId=591955&title=the%20matrix&audio=en");
    });
});

const matrix = {
    id: 591955,
    title: "the matrix",
    imageUrl: "http://store.com/img.jpg",
    date: "2004",
    description: "the matrix movie",
    voteAverage: 9.0
};