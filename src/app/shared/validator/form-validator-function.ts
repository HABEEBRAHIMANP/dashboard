import { FormGroup, FormArray } from "@angular/forms";

export class FormValidator {
    constructor (private validationMassage:{[strKey:string]:any}){}
    processMessage(container:FormGroup | FormArray,blnConsiderDirty=true):{[strKey:string]:any} {
        let messages ={};
        for( const strControlKey in container.controls){
            const objTemp = {};
            const c = container.controls[strControlKey];
            /**
             * if it is a FormGroup ,progress its child controls
             */
            if(c instanceof FormGroup){
                const childMessages = this.processMessage(c,blnConsiderDirty);
                objTemp[strControlKey]=childMessages;
                messages ={...messages,...objTemp};
            }else if(c instanceof FormArray){
                const childMessages = this.processMessage(c,blnConsiderDirty);
                objTemp[strControlKey]=childMessages;
                messages ={...messages,...objTemp};
            }
            else{
                /**
                 * Only validation if there are validation message for the control
                 */
                if(this.validationMassage[strControlKey]){
                    messages[strControlKey]='';
                    if((!blnConsiderDirty || (c.dirty || c.touched)) && c.errors){
                        for(const strMessageKey in c.errors){
                            if(this.validationMassage[strControlKey][strMessageKey]){
                                messages[strControlKey] +=this.validationMassage[strControlKey][strMessageKey];
                            }
                        }
                    }
                }
            }
        }
        return messages;
    }
}
