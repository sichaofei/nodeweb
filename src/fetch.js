// const url = 'http://192.168.0.108:8081';
const url = 'http://192.168.60.228:8081';
export default class NetUtil {
    static get(uri) {
        return new Promise(function (resolve, reject) {
            fetch(url+uri,{
                method: 'GET',
                    header: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Token': localStorage.getItem('token')
                    },
               })
                .then(response => {
                    if(response.status==200){
                        return response.json()
                    }else{
                        return {message:'请求错误'}
                    }
                })
                .then(data => {
                    resolve(data);
                }).catch(function (ex) {
                    console.log(ex)
                });
        });
    }
    static post(uri,params,multer) {
        uri = url + uri;
        let init = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Token': localStorage.getItem('token')
            },
            body: JSON.stringify(params)
        };
        // 上传图片
        if(multer){
            init={
                // formdata请求设置
                method: "POST",
                body: params
            }
        }
        return new Promise(function (resolve, reject) {
            fetch(uri, init)
                .then(response => {
                    if(response.status==200){
                        return response.json()
                    }else{
                        return {message:'请求错误'}
                    }
                }).then(data => {
                    resolve(data);
                }).catch(function (ex) {
                   console.log(ex)
                    // Alert.alert('错误提示', '网络链接出错');
                    // window.location='/my';
                });
        });
    }
    
}
