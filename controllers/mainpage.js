
exports.gethomePage = (request, response, next) => {
    response.sendFile('sign-up.html', { root: 'views' });
   
}
exports.geterrorPage = (request,response,next) =>{
    response.sendFile('notFound.html',{root:'views'});
}



exports.getloginpage = (request,response,next) =>{
    response.sendFile('login.html',{root:'views'});
}

exports.getforgotoage = (request,response,next) =>{
    response.sendFile('forgotPassword.html',{root:'views'});
}

exports.getindex3page = (request,response,next) =>{
    response.sendFile('index3.html',{root:'views'});
}

exports.getindex1page = (request,response,next) =>{
    response.sendFile('index1.html',{root:'views'});
}

exports.getindex2page = (request,response,next) =>{
    response.sendFile('index2.html',{root:'views'});
}

exports.getindex4page = (request,response,next) =>{
    response.sendFile('index4.html',{root:'views'});
}


exports.getreportspage = (request,response,next) =>{
    response.sendFile('reports.html',{root:'views'});
}

exports.getresetpasspage= (request,response,next) =>{
    response.sendFile('resetPassword.html',{root:'views'});
}
