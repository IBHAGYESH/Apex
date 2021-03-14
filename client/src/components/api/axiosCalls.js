import axios from "axios";

const axiosCalls = async (method,path,body)=>{
        var r;
        console.log('=========',body);
        const formData = new FormData();
             formData.append('file', body.profileimage);
             formData.append('file', body.aadharfrontimage);
             formData.append('file', body.aadharbackimage);
        console.log(method,path,body);
        await axios(`${path}`,{
            method:method,
            data:JSON.stringify(body)
        })
        .then((to)=>{
            r=to;
            console.log('ok',to);
        })
        .catch(error=>{
            console.log(error); r="something was wrong"
        })

    return r;
}
const axiosCallsFile = async (method,path,body)=>{
    var r;
    console.log('=========',body.profileimage);
    
    console.log(method,path,body);
    await axios(path,
        {
            method:method,
            headers:{
                'Content-Type':'application/json'
            },
            data:body
        }
    )
    .then((to)=>{
        r=to;
        console.log('ok',to);
    })
    .catch(error=>{
        console.log(error); r="something was wrong"
    })

return r;
}

export {axiosCalls ,axiosCallsFile};  