import {StructEntry} from "./entries";

test('should just be a entry',()=>{
    const se=new StructEntry("VCARD","END")
    expect(se.String()).toBe("VCARD:END")
})