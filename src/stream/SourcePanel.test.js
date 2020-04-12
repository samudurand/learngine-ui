import {SourcePanel} from "./SourcePanel";

describe('SourcePanel', () => {
    it('finds the source logo url', () => {
        expect(SourcePanel.getSourceLogo("altadefinizione")).toBe("/sources/altadefinizione.png")
    });
});