interface PropsFactoryBaseType {
    changesObject:{}
    propsObject:{
        icon:google.maps.Icon
        label:google.maps.MarkerLabel
    }
        category:string
        name:string
        fieldContext:string
}

interface PropsFactoryType extends PropsFactoryBaseType {
    listOfChanges:Array<any>

}

interface MessageHandlerType extends PropsFactoryBaseType {
    message:string

}

interface IndividualMessageHandlers extends PropsFactoryBaseType {

}




const iconScale = ({changesObject,propsObject,category,fieldContext}:IndividualMessageHandlers) => {
    if(fieldContext !== category){
        return changesObject;
    }
    changesObject = {...changesObject,...propsObject};
    return changesObject;
}

const addLabelText = ({changesObject,propsObject,name}:IndividualMessageHandlers) => {
    changesObject = {...changesObject,label:{...propsObject.label,text:name}}
    return changesObject;
}



const messageHandler = (props:MessageHandlerType) => {
    let {message,changesObject} = props;
    switch (message) {
        case "iconScale":
           changesObject = iconScale(props)
        break;
        case "addLabelText":
            changesObject = addLabelText(props)
         break;
        default:
           break ;
    }
    return changesObject;
}

export const propsFactory = ({listOfChanges,changesObject,propsObject,category,name,fieldContext}:PropsFactoryType) => {
  const arr =  [...listOfChanges]
  let message = "";
  while(arr.length){
    message = arr.shift();
 changesObject =  messageHandler({message,changesObject,propsObject,category,name,fieldContext})
  }
  return changesObject;
}

