import {Version,vCardFields} from './fields';
import {StructEntry,TextEntry,MediaEntry} from './entries';

type Options = {
    version?: Version,
    embedImgs?: boolean,
}

const defaults={
    version: Version.v2,
    embedImgs:false,
}

export class vCard {
    opts: Options;

    lines: Array<StructEntry|TextEntry|MediaEntry>=[];

    constructor(options: Partial<Options>={}){
        this.opts=Object.assign(defaults,options)
        this.parse()
    }

    toDataURL(options: Partial<Options>={}){
        let text=this.String(options)
        return "data:text/vcard;base64,"+btoa(text)
    }

    String(options: Partial<Options>={}){
        const opts=Object.assign(this.opts,options)
        const entryBuffer: Array<StructEntry|MediaEntry|TextEntry>=[
            new StructEntry("BEGIN","VCARD"),
            new StructEntry("VERSION",this.opts.version||Version.v2),
            ...this.lines,
            new StructEntry("END","VCARD")
        ];
        const buf:Array<string>=[]
        entryBuffer.forEach(struct=>{
            if(struct.shouldWrite(opts.version))
                buf.push(struct.String(opts.version,opts.embedImgs))
        })
        return buf.join("\n")
    }

    parse(){
        this.lines=[];
        vCardFields.forEach(val=>{//list valid vCard Fields
            if(typeof val.Value === 'string'){//single field tag
                let tags=document.querySelectorAll("[data-vcard=\""+val.Value+"\"]")
                if(!val.Multi && tags.length>1){
                    console.warn("Format Error: Only one instance of `"+val.Name+"` allowed in vCard")
                    return;
                }
                tags.forEach(el=>{
                    if(!val.Type && el.getAttribute("data-vcard-type")!==null){
                        console.warn("Format Error: vCard field `"+val.Name+"` doesn't allow type")
                        return;
                    }
                    if(val.Media){
                        this.lines.push(new MediaEntry(val.Name,this.getValue(el)||""))
                    }else{
                        this.lines.push(new TextEntry(val.Name,el.getAttribute("data-vcard-type"),this.getValue(el)||""))
                    }
                })
            }else{//vCard field with multiple tags
                let write: boolean=true
                let entryKeys: Array<string>=[]
                val.Value.forEach(tag=>{//run sanitity checks
                    if(!write) return
                    let tags=document.querySelectorAll("[data-vcard=\""+tag+"\"")
                    if(!val.Multi && tags.length>1){
                        console.warn("Format Error: Only one instance of `"+val.Name+"` allowed in vCard")
                        write=false
                        return;
                    }                        
                    tags.forEach(el=>{
                        if(!write) return
                        if(tags.length>1 && el.getAttribute("data-vcard-key")===null){
                            console.warn("Format Error: vCard fields with multiple entries require `data-vcard-key`")
                            write=false
                            return;
                        }
                        if(!val.Type && el.getAttribute("data-vcard-type")!==null){
                            console.warn("Format Error: vCard field `"+val.Name+"` doesn't allow type")
                            write=false
                            return;
                        }
                        if(el.getAttribute("data-vcard-key")===null){ //set default key for single line entries
                            el.setAttribute("data-vcard-key",val.Name)
                        }
                        let key=el.getAttribute("data-vcard-key")
                        if(key!==null && entryKeys.indexOf(key)===-1){
                            entryKeys.push(key)
                        }
                    })    
                })
                if(!write) return;
                entryKeys.forEach(key=>{
                    let tagVal:Array<string>=Object.assign([],val.Value)
                    let tagType:string|null=null
                    tagVal.forEach((tag,i)=>{
                        let el=document.querySelector("[data-vcard=\""+tag+"\"][data-vcard-key=\""+key+"\"]")
                        if(el===null){//set tag to empty
                            tagVal[i]=""
                            return;
                        }
                        if(val.Type){
                            let type=el.getAttribute("data-vcard-type")
                            if(type!==null) tagType=type
                        }
                        tagVal[i]=this.getValue(el)||""
                    })
                    this.lines.push(new TextEntry(val.Name,tagType,tagVal))
                })
            }
        })
    }

    getValue(item: Element): string | null{
        let setVal=item.getAttribute("data-vcard-value");
        if(setVal!==null) return setVal;
        switch(item.tagName){
            case "A":
                let href=item.getAttribute("href")
                if(href?.startsWith("mailto:") || href?.startsWith("tel:")){
                    return href.substring(href.indexOf(':') + 1)
                }
                return href
                break;
            case "IMG":
                return item.getAttribute("src")
                break;
            default:
                return item.textContent
        }
    }
}