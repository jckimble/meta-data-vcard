import {Version,vCardFields} from './fields';

export class StructEntry{
    entry:string
    value:string
    constructor(entry: string, value: string){
        this.entry=entry
        this.value=value
    }
    shouldWrite(version:Version=Version.v2):boolean{
        if(this.entry==='VCARD' || this.entry==='VERSION')
            return true;
        for(var i=0;i<vCardFields.length;i++){//TODO: Find better way, perhaps change to a map
            if(vCardFields[i].Name===this.entry){
                return vCardFields[i].Versions.indexOf(version)>=0
            }
        }
        return false
    }
    String(version:Version=Version.v2){
        return [this.entry,this.value].join(":")
    }
}

export class TextEntry extends StructEntry{
    type:string|null
    constructor(entry: string,type: string|null=null,value: Array<string>|string){
        super(entry,typeof value==='string'?value:value.join(";"))
        this.type=type
    }

    getType(version:Version=Version.v2){
        switch(version){
            case Version.v3,Version.v4:
                return "TYPE="+this.type
            default:
                return (this.type||"").toUpperCase()
        }    
    }

    String(version:Version=Version.v2){
        if(this.type!==null){
            return [
                [
                    this.entry,
                    this.getType(version)
                ],
                this.value
            ].join(":")
        }
        return [this.entry,this.value].join(":")
    }
}

export class MediaEntry extends StructEntry{
    type: string=""
    data: string=""
    constructor(entry: string,value: string){
        super(entry,value)
        this.getContentType().then(type=>{
            this.type=type||""
        })
        this.imgToUri().then(data=>{
            this.data=data
        })
    }

    getContentType(): Promise<string | null>{
        return fetch(this.value,{method:'HEAD'}).then(resp=>resp.headers.get('Content-Type'))
    }
    
    imgToUri(): Promise<string>{
        return new Promise((resolve,reject)=>{
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            var img=new Image();
            img.crossOrigin="anonymous"
            img.src=this.value
            img.onload=()=>{
                canvas.width=img.width;
                canvas.height=img.height;
                ctx?.drawImage(img,0,0);
                let data=canvas.toDataURL('image/png')
                canvas.remove();
                resolve(data.replace(/^data:image\/png;base64,/, ""))
            }
            img.onerror=(error)=>{
                reject(error)
            }
        })
    }

    getType(version: Version,embed: boolean){
        let type=embed?"image/png":this.type
        switch(version){
            case Version.v4:
                return embed?"ENCODING=BASE64;TYPE="+type.substring(type.indexOf("/")+1).toUpperCase():"MEDIATYPE="+type
            case Version.v3:
                return "TYPE="+type.substring(type.indexOf("/")+1).toUpperCase()+(embed?";ENCODING=b":"")
            default:
                return type.substring(type.indexOf("/")+1).toUpperCase()+(embed?";ENCODING=BASE64":"")
        }
    }

    String(version:Version=Version.v2,embed: boolean=false){
        return [
            [
                this.entry,
                this.getType(version,embed)
            ].join(";"),
            embed?this.data:this.value
        ].join(":")
    }
}