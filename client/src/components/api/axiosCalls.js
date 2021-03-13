import axios from "axios";

const axiosCalls = async (method,path,body)=>{
        var r;
        const formData = new FormData();
             formData.append('file', body.profileimage);
             formData.append('file', body.aadharfrontimage);
             formData.append('file', body.aadharbackimage);
        console.log(method,path,body);
        await axios(`${path}`,{
            method:method,
            headers: {
            'Content-Type': method == 'GET'?'application/x-www-form-urlencoded':'multipart/form-data',
            Authentication: method == 'GET'? body: null
            },
           data:{body}
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

export default axiosCalls;  